import Image from "next/image"
import { cn } from "@/lib/utils"
import type { PokemonData } from "./types"

type Props = {
  pokemon: PokemonData
  className?: string
  children?: React.ReactNode
}

export const PokemonCard = ({ pokemon, className, children }: Props) => (
  <div className={cn("w-[395px] rounded-xl bg-steel text-center", className)}>
    <Image
      src={pokemon.image}
      alt={`${pokemon.name} image`}
      width={96}
      height={96}
      priority
      className="w-full h-[222px] bg-charcoal rounded-t-xl"
    />
    <div className="p-8">
      <h5 className="font-bold text-lg capitalize mb-2">{pokemon.name}</h5>
      {children}
    </div>
  </div>
)
