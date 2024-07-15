import { ConnectButton } from "@rainbow-me/rainbowkit"
import { cn } from "@/lib/utils"
import styles from "./connect-wallet.module.scss"

export const ConnectWallet = () => (
  <div className={cn("text-xs sm:text-sm", styles["connect-wallet"])}>
    <ConnectButton showBalance={false} accountStatus="avatar" />
  </div>
)
