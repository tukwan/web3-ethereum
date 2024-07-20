import { Suspense } from "react"
import { getPokemonList } from "@/services/pokemon"
import { Pokemon } from "@/components/pokemon/pokemon"
import { Search } from "@/components/search"
import { PokemonPlaceholder } from "@/components/pokemon/pokemon.placeholder"
import type { PokemonData } from "@/components/pokemon/types"

type Props = {
  searchParams?: {
    search?: string
  }
}

const PokemonsPage = async ({ searchParams }: Props) => {
  const searchQuery = searchParams?.search || ""
  const allPokemons = await getPokemonList()
  const filteredPokemons = filterPokemons(allPokemons, searchQuery).slice(0, 32)

  return (
    <>
      <Search searchQuery={searchQuery} />
      <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPokemons.map((pokemon) => (
          <Suspense key={pokemon.name} fallback={<PokemonPlaceholder />}>
            <Pokemon pokemon={pokemon} />
          </Suspense>
        ))}
      </div>
    </>
  )
}

export default PokemonsPage

const filterPokemons = (pokemons: PokemonData[], query: string) => {
  if (!query) return pokemons
  return pokemons.filter((pokemon: { name: string }) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  )
}
