"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { SiweMessage } from "siwe"
import { Button } from "@/components/ui/button"

export const AuthButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { address, isConnected, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      setSession(data)
    }

    fetchSession()
  }, [])

  const handleSignMessage = async () => {
    if (!isConnected) return

    try {
      const nonceRes = await fetch("/api/auth/nonce")
      if (!nonceRes.ok) throw new Error("Failed to fetch nonce")

      const nonce = await nonceRes.text()

      const message = new SiweMessage({
        address,
        chainId,
        domain: window.location.host,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        uri: window.location.origin,
        version: "1",
        nonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

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
      if (!response.ok) throw new Error("Login failed.")

      const data = await response.json()
      setSession(data)

      router.push("/premium")
    } catch (error) {
      console.log("Login error:", error)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })
      if (!res.ok) throw new Error("Failed to log out")

      setSession(null)
      router.replace("/")
    } catch (error) {
      console.log("Logout error:", error)
    }
  }

  const handleButtonRedirect = () => {
    if (pathname === "/premium") {
      router.push("/")
    } else {
      router.push("/premium")
    }
  }

  return (
    <div className="scale-75 sm:scale-90">
      {isConnected && !session && (
        <Button onClick={handleSignMessage}>Sign in</Button>
      )}

      {session && (
        <div className="flex flex-col sm:flex-row">
          <Button onClick={handleButtonRedirect}>
            {pathname === "/premium" ? "Standard" : "Premium"}
          </Button>

          <Button className="sm:ml-2 mt-2 sm:mt-0" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
