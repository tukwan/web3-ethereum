"use client"

import { useRef, useEffect } from "react"
import { useEthers } from "@usedapp/core"

export const WalletConnect = () => {
  const { activateBrowserWallet, active, isLoading, error } = useEthers()
  const hasAttemptedRef = useRef(false)

  useEffect(() => {
    const connectWallet = () => {
      if (isLoading || hasAttemptedRef.current) return
      hasAttemptedRef.current = true

      try {
        activateBrowserWallet()
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error)
      }
    }

    connectWallet()
  }, [isLoading, activateBrowserWallet])

  if (active && !isLoading) return null

  return (
    <div className="fixed top-6 right-4 p-3 text-sm bg-midnight rounded-md">
      {isLoading && <p>Connecting to MetaMask...</p>}
      {error && (
        <p className="text-red-600">
          Failed to connect to MetaMask. Try to refresh.
        </p>
      )}
    </div>
  )
}
