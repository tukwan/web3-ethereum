// import { DAppProvider, Config, Mainnet, Sepolia } from "@usedapp/core"
// import { config } from "@/config"

// const configDApp: Config = {
//   readOnlyChainId: Mainnet.chainId,
//   readOnlyUrls: {
//     [Mainnet.chainId]: `https://mainnet.infura.io/v3/${config.infuraId}`,
//     [Sepolia.chainId]: `https://sepolia.infura.io/v3/${config.infuraId}`,
//   },
// }

// export const Providers = ({ children }: { children: React.ReactNode }) => (
//   <DAppProvider config={configDApp}>{children}</DAppProvider>
// )

"use client"

import { WagmiProvider, State } from "wagmi"
import { getConfig } from "@/config/wagmi"

import { mainnet, sepolia } from "wagmi/chains"
// import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { config } from '@/lib/config'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

// const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia]

// export const config = getDefaultConfig({
//   appName: 'WalletConnection',
//   projectId,
//   chains: supportedChains as any,
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {}),
// })

const queryClient = new QueryClient()
const config = getConfig()

type Props = {
  initialState?: State
  children: React.ReactNode
}

export function Providers({ children, initialState }: Props) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#0E76FD',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })} */}
        {/* > */}
        {children}
        {/* </RainbowKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
