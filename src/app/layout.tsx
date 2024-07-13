import "@/styles/globals.css"
import "@/styles/app.scss"

import type { Metadata } from "next"
import { headers } from "next/headers"
import { DM_Sans } from "next/font/google"
import { cookieToInitialState } from "wagmi"
import { getConfig } from "@/config/wagmi"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { WalletConnect } from "@/components/wallet-connect"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Pokemon explorer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  )

  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased bg-navy text-blue`}>
        <Providers initialState={initialState}>
          <WalletConnect />
          <Header />
          <div className="container mx-auto px-4 mt-20 max-w-screen-2xl w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
