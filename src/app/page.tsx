import { WalletConnect } from "@/components/wallet-connect"
import { getPokemons, getPokemonDetails } from "@/services/pokemon"
import { Pokemon } from "@/components/pokemon"
import { Search } from "@/components/search"

const loadPokemonDetails = async (pokemon: { name: string }) => {
  const details = await getPokemonDetails(pokemon.name)

  const image = details.sprites.front_default

  const abilities = details.abilities.map(
    (ability: { ability: { name: string } }) => ability.ability.name
  )
  return { ...pokemon, abilities, image }
}

const PokemonsPage = async ({ searchParams }) => {
  const searchQuery = searchParams.search || ""

  const pokemons = await getPokemons()

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pokemonsWithDetails = await Promise.all(
    filteredPokemons.map(loadPokemonDetails)
  )

  return (
    <div className="container mx-auto p-4">
      <WalletConnect />
      <h2 className="text-xl font-bold mt-6 mb-4">Pokémon List</h2>
      <Search searchQuery={searchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonsWithDetails.map((pokemon, index) => (
          <Pokemon key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default PokemonsPage
