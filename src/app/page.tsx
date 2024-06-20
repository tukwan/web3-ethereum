import { getPokemonList, getPokemonDetails } from "@/services/pokemon"
import { Pokemons } from "@/components/pokemon/pokemons"
import type { PokemonData } from "@/components/pokemon/types"

export const revalidate = 3600
export const dynamic = "force-static"

const PokemonsPage = async () => {
  const allPokemons = await getPokemonList()
  const pokemons = await Promise.all(allPokemons.map(fetchPokemonDetails))
  return <Pokemons pokemons={pokemons} />
}

export default PokemonsPage

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
