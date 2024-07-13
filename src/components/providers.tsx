"use client"

import { WagmiProvider, cookieToInitialState } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configWagmi } from "@/config/wagmi"
import { rainbowTheme } from "@/styles/rainbow-theme"

const queryClient = new QueryClient()

type Props = {
  cookie: string
  children: React.ReactNode
}

export function Providers({ children, cookie }: Props) {
  const initialWagmiState = cookieToInitialState(configWagmi, cookie)

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
