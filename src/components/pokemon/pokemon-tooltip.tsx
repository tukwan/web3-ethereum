import { useState, useEffect } from "react"
import { cn, fetchFromApi } from "@/lib/utils"
import { PokemonCard } from "./pokemon-card"
import type { Pokemon } from "./types"

type Props = {
  pokemon: Pokemon
  isVisible: boolean
}

export const PokemonTooltip = ({ pokemon, isVisible }: Props) => {
  const [tooltipInfo, setTooltipInfo] = useState(null)

  useEffect(() => {
    const fetchTooltipInfo = async () => {
      const { info } = await fetchFromApi(`/api/pokemon/${pokemon.name}`)
      setTooltipInfo(info)
    }

    if (isVisible && !tooltipInfo) fetchTooltipInfo()
  }, [isVisible, pokemon.name, tooltipInfo])

  return (
    <div
      className={cn(
        "absolute z-50 bottom-full mb-4 shadow-2xl left-0 right-0 transition-opacity duration-300",
        isVisible ? "visible" : "hidden"
      )}
    >
      <PokemonCard pokemon={pokemon} className="h-[400px]">
        <p className="text-sm text-seafoam">{tooltipInfo}</p>
      </PokemonCard>
    </div>
  )
}
