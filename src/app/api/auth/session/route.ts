import { getSession } from "@/lib/auth"

export async function GET() {
  return await getSession()
}
