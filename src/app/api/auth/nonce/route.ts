import { NextResponse } from "next/server"
import { generateNonce } from "siwe"

export async function GET() {
  const csrfToken = generateNonce()
  const res = NextResponse.json({ csrfToken })
  res.cookies.set("csrfToken", csrfToken, { httpOnly: true, path: "/" })
  return res
}
