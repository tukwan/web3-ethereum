import { getPokemonDetails } from "@/services/pokemon"
import { PokemonControls } from "./pokemon-controls"
import { PokemonCard } from "./pokemon-card"
import type { PokemonData } from "./types"

type Props = {
  pokemon: PokemonData
}

export const Pokemon = async ({ pokemon }: Props) => {
  const pokemonDetails = await fetchPokemonDetails(pokemon)

  return (
    <PokemonCard pokemon={pokemonDetails} className="h-[506px]">
      <ul className="font-medium text-seafoam">
        {pokemonDetails.abilities.map((ability, index) => (
          <li key={index}>{ability}</li>
        ))}
      </ul>
      <PokemonControls pokemon={pokemonDetails} />
    </PokemonCard>
  )
}

const fetchPokemonDetails = async (
  pokemon: PokemonData
): Promise<PokemonData> => {
  try {
    const details = await getPokemonDetails(pokemon.name)
    const image = details.sprites.other["official-artwork"].front_default

    const abilities = details.abilities
      .map((ability: { ability: { name: string } }) => ability.ability.name)
      .slice(0, 3)

    return { ...pokemon, abilities, image }
  } catch (error) {
    console.error(`Failed to load details for ${pokemon.name}:`, error)

    return {
      name: pokemon.name,
      abilities: ["unknown ability"],
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
    }
  }
}
