import { getNonce } from "@/lib/auth"

export function GET() {
  return getNonce()
}
