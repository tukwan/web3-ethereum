"use client"

import { Button } from "@/components/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-charcoal p-6 rounded-lg shadow-md text-center">
        <h2 className="text-h3 mb-4">Something went wrong!</h2>
        <p className="text-red-700 mb-6">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
