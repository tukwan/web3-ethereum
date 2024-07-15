import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import { SiweMessage, generateNonce } from "siwe"

type Credentials = { message: string; signature: string }

const COOKIE_SESSION = "session"
const authSecretKey = process.env.AUTH_SECRET_KEY
const encodedAuthSecretKey = new TextEncoder().encode(authSecretKey)

export const createJWT = async (payload: any) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedAuthSecretKey)

export const verifyJWT = async (token: string) => {
  const { payload } = await jwtVerify(token, encodedAuthSecretKey, {
    algorithms: ["HS256"],
  })
  return payload
}

const authenticate = async ({ message, signature }: Credentials) => {
  try {
    const siwe = new SiweMessage(JSON.parse(message || "{}"))

    // Verify EIP-1271 by calling the .isValidSignature method on the contract
    // https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/client.ts#L348
    // https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/utils.ts#L33
    const result = await siwe.verify({ signature })

    if (!result.success) {
      throw new Error("Invalid signature.")
    }

    if (result.data.statement !== process.env.NEXT_PUBLIC_SIGNIN_MESSAGE) {
      throw new Error("Statement mismatch.")
    }

    return { address: siwe.address }
  } catch (error) {
    console.log("Authentication error: ", error)
    return null
  }
}

export const login = async (req: NextRequest) => {
  const credentials: Credentials = await req.json()

  // Authentication using SIWE
  const user = await authenticate(credentials)

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 }
    )
  }

  const sessionToken = await createJWT({ user })

  cookies().set(COOKIE_SESSION, sessionToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1h
    secure: process.env.NODE_ENV === "production",
  })

  return NextResponse.json({ success: true })
}

export const logout = async () => {
  cookies().set(COOKIE_SESSION, "", { expires: new Date(0) })

  return NextResponse.json({ success: true })
}

export const getSession = async () => {
  const sessionCookie = cookies().get(COOKIE_SESSION)?.value
  const session = await getValidatedSession(sessionCookie)

  if (!session) return NextResponse.json(null, { status: 401 })
  return NextResponse.json(session)
}

export const refreshSession = async () => {
  const sessionCookie = cookies().get(COOKIE_SESSION)?.value
  const res = NextResponse.next()

  const session = await getValidatedSession(sessionCookie)

  if (!session) return res

  const sessionToken = await createJWT(session)

  res.cookies.set(COOKIE_SESSION, sessionToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1h
    secure: process.env.NODE_ENV === "production",
  })

  return res
}

export const getNonce = () => {
  const csrfToken = generateNonce()
  return new NextResponse(csrfToken)
}

export const getValidatedSession = async (
  sessionCookie: string | undefined
) => {
  if (!sessionCookie) return null

  try {
    return await verifyJWT(sessionCookie)
  } catch (error) {
    console.log("Invalid session.", error)
    return null
  }
}
