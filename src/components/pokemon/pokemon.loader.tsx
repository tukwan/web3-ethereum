import { getPokemonDetails } from "@/services/pokemon"
import { Pokemon } from "./pokemon"
import type { PokemonData } from "./types"

type Props = {
  pokemon: PokemonData
}

export const PokemonLoader = async ({ pokemon }: Props) => {
  const pokemonDetails = await fetchPokemonDetails(pokemon)
  return <Pokemon pokemon={pokemonDetails} />
}

const fetchPokemonDetails = async (pokemon: PokemonData) => {
  try {
    const details = await getPokemonDetails(pokemon.name)
    const image = details.sprites.front_default
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
