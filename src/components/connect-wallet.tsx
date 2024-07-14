import { ConnectButton } from "@rainbow-me/rainbowkit"
import { cn } from "@/lib/utils"
import styles from "./connect-wallet.module.scss"

export const ConnectWallet = () => (
  <div
    className={cn(
      "absolute right-2 lg:right-12 top-0 bottom-0 flex items-center text-xs sm:text-sm",
      styles["connect-wallet"]
    )}
  >
    <ConnectButton showBalance={false} accountStatus="avatar" />
  </div>
)
