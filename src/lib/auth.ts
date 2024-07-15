import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { SiweMessage } from "siwe"

const secretKey = process.env.AUTH_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export const encrypt = async (payload: any) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key)

export const decrypt = async (token: string) => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  })

  return payload
}

export const login = async (req: NextRequest) => {
  const data = await req.json()

  // Authentication using SIWE
  const user = await authorize(data)
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 }
    )
  }

  const expires = new Date(Date.now() + 10 * 10000)
  const session = await encrypt({ user, expires })
  cookies().set("session", session, { expires, httpOnly: true })

  return NextResponse.json({ success: true })
}

export const logout = async () => {
  cookies().set("session", "", { expires: new Date(0) })

  return NextResponse.json({ success: true })
}

export const getSession = async () => {
  const session = cookies().get("session")?.value
  if (!session) return null
  const sessionDecrypted = await decrypt(session)
  return sessionDecrypted || null
}

export const updateSession = async (req: NextRequest) => {
  const session = req.cookies.get("session")?.value
  if (!session) return

  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 10000)

  const res = NextResponse.next()
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date,
    // secret
    // nonce
  })

  return res
}

const authorize = async (credentials: any) => {
  try {
    const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
    // const nextAuthUrl = new URL(process.env.NEXTAUTH_URL)

    console.log("CREDENTIALS", credentials)
    console.log("SiweMessage ", siwe)

    const result = await siwe.verify({
      signature: credentials?.signature || "",
      // domain: nextAuthUrl.host,
      // nonce: await getCsrfToken({ req }),
      nonce: "ZmrESFBsQIxt1BE90",
    })

    console.log("RESULTS", result)

    if (result.success) {
      return {
        address: siwe.address,
      }
    }
    return null
  } catch (e) {
    return null
  }
}
