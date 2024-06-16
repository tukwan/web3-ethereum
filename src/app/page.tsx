import { getPokemonList, getPokemonDetails } from "@/services/pokemon"
import { PokemonItem } from "@/components/pokemon/pokemon-item"
import { Search } from "@/components/search"
import type { Pokemon } from "@/components/pokemon/types"

type Props = {
  searchParams: {
    search?: string
  }
}

const PokemonsPage = async ({ searchParams }: Props) => {
  const searchQuery = searchParams.search || ""

  const allPokemons = await getPokemonList()
  const filteredPokemons = filterPokemons(allPokemons, searchQuery)
  const pokemonsWithDetails = await Promise.all(
    filteredPokemons.map(loadPokemonDetails)
  )
  return (
    <>
      <Search searchQuery={searchQuery} />
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-9">
        {pokemonsWithDetails.map((pokemon) => (
          <PokemonItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </>
  )
}

export default PokemonsPage

const filterPokemons = (pokemons: Pokemon[], query: string) => {
  if (!query) return pokemons
  return pokemons.filter((pokemon: { name: string }) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  )
}

const loadPokemonDetails = async (pokemon: Pokemon) => {
  const details = await getPokemonDetails(pokemon.name)
  const image = details.sprites.front_default
  const abilities = details.abilities
    .map((ability: { ability: { name: string } }) => ability.ability.name)
    .slice(0, 3)

  return { ...pokemon, abilities, image }
}
