import Image from "next/image"
import { ConnectWallet } from "@/components/connect-wallet"
import { AuthButton } from "@/components/auth-button"

export const Header = () => (
  <header>
    <div className="relative max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center py-4 sm:py-8">
        <Image src="/logo.svg" alt="logo" width={48} height={48} priority />
        <h4 className="ml-2 text-h4-muted hidden sm:block">Pokemons</h4>
      </div>
      <div className="absolute left-0 sm:left-2 top-0 bottom-0 flex items-center">
        <AuthButton />
      </div>
      <div className="absolute right-2 lg:right-6 top-0 bottom-0 flex items-center">
        <ConnectWallet />
      </div>
    </div>
    <div className="h-0.5 bg-steel"></div>
  </header>
)
