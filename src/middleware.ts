import { NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value

  // TODO: decrypt vefiry session cookie

  if (!session && req.nextUrl.pathname.startsWith("/hidden")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (session && !req.nextUrl.pathname.startsWith("/hidden")) {
    return NextResponse.redirect(new URL("/hidden", req.url))
  }

  return await updateSession(req)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|svg)$).*)"],
}
