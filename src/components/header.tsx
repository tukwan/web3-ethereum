import Image from "next/image"
import { ConnectWallet } from "@/components/connect-wallet"

export const Header = () => (
  <header>
    <div className="relative max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center py-8">
        <Image src="/logo.svg" alt="logo" width={108} height={26} priority />
        <h4 className="ml-2 text-h4-muted hidden sm:block">Pokemon List</h4>
      </div>
      <ConnectWallet />
      {/* <SignIn /> */}
    </div>
    <div className="h-0.5 bg-steel"></div>
  </header>
)
