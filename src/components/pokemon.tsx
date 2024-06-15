"use client"

import { useState, useEffect } from "react"
import { useEthers } from "@usedapp/core"

type PokemonProps = {
  pokemon: {
    name: string
    abilities: string[]
  }
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  const { name, abilities } = pokemon

  const { activateBrowserWallet, account, library } = useEthers()
  const [isCollecting, setIsCollecting] = useState(false)
  const [collected, setCollected] = useState(false)

  useEffect(() => {
    if (account) {
      console.log("Connected account:", account)
    }
  }, [account])

  const handleCollect = async () => {
    if (!account) {
      activateBrowserWallet()
      return
    }

    setIsCollecting(true)
    try {
      const signer = library.getSigner()
      const message = `Collecting ${pokemon.name}`
      const signature = await signer.signMessage(message)
      console.log("Message signed:", { message, signature })

      setCollected(true)
    } catch (error) {
      console.error("Message signing failed:", error)
    }
    setIsCollecting(false)
  }

  return (
    <div className="p-4 border rounded shadow hover:shadow-md">
      <p className="font-semibold text-lg">{name}</p>
      <div className="mt-2">
        <p className="font-semibold">Abilities:</p>
        <ul className="list-disc list-inside">
          {abilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
      </div>
      {collected ? (
        <p className="mt-2 text-green-500">Collected</p>
      ) : (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleCollect}
          disabled={isCollecting}
        >
          {isCollecting ? "Collecting..." : "Collect"}
        </button>
      )}
      <p className="mt-2 text-gray-600">Details</p>
    </div>
  )
}
