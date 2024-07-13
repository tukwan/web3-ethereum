import { Suspense } from "react"
import { getPokemonList } from "@/services/pokemon"
import { PokemonLoader } from "@/components/pokemon/pokemon.loader"
import { Search } from "@/components/search"
import { PokemonPlaceholder } from "@/components/pokemon/pokemon.placeholder"
import type { PokemonData } from "@/components/pokemon/types"

export const revalidate = 3600

type Props = {
  searchParams?: {
    search?: string
  }
}

const PokemonsPage = async ({ searchParams }: Props) => {
  const searchQuery = searchParams?.search || ""
  const allPokemons = await getPokemonList()
  const filteredPokemons = filterPokemons(allPokemons.slice(0, 10), searchQuery)

  return (
    <>
      <Search searchQuery={searchQuery} />
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-9">
        {filteredPokemons.map((pokemon) => (
          <Suspense key={pokemon.name} fallback={<PokemonPlaceholder />}>
            <PokemonLoader pokemon={pokemon} />
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
