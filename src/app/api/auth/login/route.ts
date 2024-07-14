import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const data = await req.json()

  const expires = new Date(Date.now() + 10 * 10000)
  const session = await encrypt({ data, expires })

  cookies().set("session", session, { expires, httpOnly: true })

  return NextResponse.json({ success: true })
}
