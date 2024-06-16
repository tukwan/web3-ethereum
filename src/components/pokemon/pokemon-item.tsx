import { PokemonControls } from "./pokemon-controls"
import { PokemonCard } from "./pokemon-card"
import type { Pokemon } from "./types"

type Props = {
  pokemon: Pokemon
}

export const PokemonItem = ({ pokemon }: Props) => (
  <PokemonCard pokemon={pokemon} className="h-[506px]">
    <ul className="font-medium text-seafoam">
      {pokemon.abilities.map((ability, index) => (
        <li key={index}>{ability}</li>
      ))}
    </ul>
    <PokemonControls pokemon={pokemon} />
  </PokemonCard>
)
