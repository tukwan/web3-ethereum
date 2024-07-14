import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const secretKey = process.env.AUTH_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export const encrypt = async (payload: any) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("https://pokemon.com")
    .setAudience("https://pokemon.com")
    .setExpirationTime("2h")
    .sign(key)

export const decrypt = async (token: string) => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  })

  return payload
}

export const getSession = async () => {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
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
  })

  return res
}
