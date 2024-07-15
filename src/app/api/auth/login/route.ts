import { NextRequest } from "next/server"
import { login } from "@/lib/auth"

export async function POST(req: NextRequest) {
  return await login(req)
}
