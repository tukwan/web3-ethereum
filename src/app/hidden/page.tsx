"use client"
// next:"https://pokeapi.co/api/v2/ability/?limit=20&offset=20"

import { useEffect, useState } from "react"

export default function HiddenPage() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      setSession(data)
    }

    fetchSession()
  }, [])

  if (!session) {
    return <p>Loading...</p>
  }

  return (
    <section>
      <h1>Hidden Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
