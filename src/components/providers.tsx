"use client"

import { DAppProvider, Config, Mainnet, Sepolia } from "@usedapp/core"
import { config } from "@/config"

const configDApp: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${config.infuraProjectId}`,
    [Sepolia.chainId]: `https://sepolia.infura.io/v3/${config.infuraProjectId}`,
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <DAppProvider config={configDApp}>{children}</DAppProvider>
}
