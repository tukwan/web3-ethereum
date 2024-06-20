"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowIcon } from "@/components/ui/icons"
import { useCollecting } from "@/hooks/useCollecting"
import { useSigning } from "@/hooks/useSigning"
import { PokemonTooltip } from "./pokemon-tooltip"
import type { PokemonData } from "./types"

type Props = {
  pokemon: PokemonData
}

export const PokemonControls = ({ pokemon }: Props) => {
  const { sign, signer } = useSigning()
  const { isCollected, collectPokemon } = useCollecting(pokemon.name)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const handleCollect = async () => {
    try {
      await sign(`Collecting ${pokemon.name}`)
      collectPokemon(pokemon.name)
    } catch (error) {
      console.error("Failed to collect Pokemon:", error)
    }
  }

  return (
    <>
      <Button
        className="my-8"
        onClick={handleCollect}
        disabled={isCollected || !signer}
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
