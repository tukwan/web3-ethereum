"use client"

import { useState } from "react"
import { WagmiProvider, cookieToInitialState } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configWagmi } from "@/config/wagmi"
import { rainbowTheme } from "@/styles/rainbow-theme"

type Props = {
  wagmiCookie: string
  children: React.ReactNode
}

export function Providers({ children, wagmiCookie }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const initialWagmiState = cookieToInitialState(configWagmi, wagmiCookie)

  return (
    <WagmiProvider config={configWagmi} initialState={initialWagmiState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={rainbowTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
