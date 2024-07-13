"use client"

import { useState } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { Button } from "@/components/ui/button"
import { ArrowIcon } from "@/components/ui/icons"
import { useCollecting } from "@/hooks/useCollecting"
import { PokemonTooltip } from "./pokemon-tooltip"
import type { PokemonData } from "./types"

type Props = {
  pokemon: PokemonData
}

export const PokemonControls = ({ pokemon }: Props) => {
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const { isCollected, collectPokemon } = useCollecting(pokemon.name)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const handleCollect = async () => {
    try {
      const message = `${pokemon.name} collected!`
      const signature = await signMessageAsync({ message })
      console.log("Message signed:", { message, signature })

      collectPokemon(pokemon.name)
    } catch (error) {
      console.error("Failed to collect Pokemon:", error)
    }
  }

  return (
    <>
      <Button
        className="my-8 duration-300 hover:scale-110"
        onClick={handleCollect}
        disabled={isCollected || !isConnected}
      >
        {isCollected ? "Collected" : "Collect"}
      </Button>
      <div className="flex justify-center relative">
        <div
          className=" text-mint cursor-pointer flex items-center"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          Details
          <ArrowIcon className="ml-2" />
          <PokemonTooltip pokemon={pokemon} isVisible={isTooltipVisible} />
        </div>
      </div>
    </>
  )
}
