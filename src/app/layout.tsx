import "@rainbow-me/rainbowkit/styles.css"
import "@/styles/global.scss"

import type { Metadata } from "next"
import { cookies } from "next/headers"
import { DM_Sans } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Pokemon explorer",
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  const wagmiCookie = cookies().get("wagmi.store")?.value ?? ""

  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased bg-navy text-blue`}>
        <Providers wagmiCookie={wagmiCookie}>
          <Header />
          <div className="container mx-auto px-4 mt-20 max-w-screen-2xl w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
