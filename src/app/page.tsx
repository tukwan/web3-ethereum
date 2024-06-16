import { getPokemonList, getPokemonDetails } from "@/services/pokemon"
import { Pokemon } from "@/components/pokemon"
import { Search } from "@/components/search"

const loadPokemonDetails = async (pokemon: { name: string }) => {
  const details = await getPokemonDetails(pokemon.name)

  const image = details.sprites.front_default

  const abilities = details.abilities
    .map((ability: { ability: { name: string } }) => ability.ability.name)
    .slice(0, 3)

  return { ...pokemon, abilities, image }
}

const PokemonsPage = async ({ searchParams }) => {
  const searchQuery = searchParams.search || ""

  const pokemons = await getPokemonList()

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pokemonsWithDetails = await Promise.all(
    filteredPokemons.map(loadPokemonDetails)
  )

  return (
    <div className="container mx-auto p-4">
      <Search searchQuery={searchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonsWithDetails.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default PokemonsPage
