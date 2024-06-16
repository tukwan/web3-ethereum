import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const fetchFromApi = async (
  url: string,
  resType: "json" | "text" = "json"
) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch data from the API")
  return resType === "text" ? res.text() : res.json()
}
