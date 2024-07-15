import { NextRequest, NextResponse } from "next/server"
import { refreshSession, getValidatedSession } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value

  if (req.nextUrl.pathname.startsWith("/premium")) {
    const sessionData = await getValidatedSession(sessionCookie)
    if (!sessionData) return NextResponse.redirect(new URL("/", req.url))
  }

  // TODO: Optmize this to only refresh the session if it's about to expire
  const res = await refreshSession()
  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|svg)$).*)"],
}
