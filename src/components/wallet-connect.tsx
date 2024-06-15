"use client"

import { useEthers, useEtherBalance } from "@usedapp/core"
import { formatEther } from "ethers/lib/utils"

export const WalletConnect = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers()
  const balance = useEtherBalance(account)

  return (
    <div>
      {account ? (
        <div>
          <p className="mb-2">Account: {account}</p>
          <p className="mb-4">
            Balance: {balance ? formatEther(balance) : "Loading..."} ETH
          </p>
          <button
            onClick={deactivate}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={activateBrowserWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}
