import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const fetchFromApi = async (
  url: string,
  resType: "json" | "text" = "json",
  retries: number = 3,
  timeout: number = 5000
) => {
  for (let retry = 0; retry < retries; retry++) {
    try {
      const controller = new AbortController()
      const id = setTimeout(() => controller.abort(), timeout)

      const res = await fetch(url, {
        signal: controller.signal,
        cache: "force-cache", // force cache for searchParams
        // next: {
        //   revalidate: 3600,
        //   tags: ["pokemon"],
        // },
      })
      clearTimeout(id)

      if (!res.ok) throw new Error("Failed to fetch data from the API")
      return resType === "text" ? res.text() : res.json()
    } catch (error) {
      console.error(
        `Fetch retry ${retry + 1} failed: ${(error as Error).message}`
      )

      if (retry === retries - 1) throw error
    }
  }
}
