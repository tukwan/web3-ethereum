import { getPremiumPokemonList } from "@/services/pokemon"
import { PokemonLoader } from "@/components/pokemon/pokemon.loader"
import type { PokemonData } from "@/components/pokemon/types"

export const revalidate = 3600
export const dynamic = "force-static"

const PremiumPokemonsPage = async () => {
  const allPremiumPokemons: PokemonData[] = await getPremiumPokemonList()

  return (
    <>
      <h3 className="text-h3 text-center -mt-12 mb-6">Premium Pokemons</h3>
      <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allPremiumPokemons.map((pokemon) => (
          <PokemonLoader key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </>
  )
}

export default PremiumPokemonsPage
