"use client"

import { useState } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { cn } from "@/lib/utils"
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

  const isDisabled = !isConnected || isCollected

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
        className={cn("my-8", {
          "duration-300 hover:scale-105": !isDisabled,
        })}
        onClick={handleCollect}
        disabled={isDisabled}
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
