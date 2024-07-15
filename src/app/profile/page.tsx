"use client"

import { useState, useEffect } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { SiweMessage } from "siwe"

export default function ProfilePage() {
  const { address, isConnected, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [session, setSession] = useState(null)
  const [hasSigned, setHasSigned] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    async function fetchSession() {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      setSession(data)
    }

    fetchSession()
  }, [])

  const handleSignMessage = async () => {
    if (!isConnected) return

    try {
      const message = new SiweMessage({
        address,
        chainId,
        domain: window.location.host,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        uri: window.location.origin,
        version: "1",
        nonce: "ZmrESFBsQIxt1BE90", // TODO: csrfToken
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      setHasSigned(true)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          message: JSON.stringify(message),
          signature,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setSession(data)
    } catch (error) {
      console.log("Error occurred", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    setSession(null)
  }

  if (!isMounted) return null

  return (
    <section>
      {isConnected && !hasSigned && (
        <button
          className="rounded-lg py-2 px-4 mt-2 bg-violet-700 hover:border hover:border-violet-700 hover:bg-transparent"
          onClick={handleSignMessage}
        >
          Sign Message to Login
        </button>
      )}
      {isConnected && hasSigned && (
        <p>You are being authenticated. Please wait...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
