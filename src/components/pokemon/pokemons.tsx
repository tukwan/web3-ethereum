"use client"

import { useState, useEffect } from "react"
import { Pokemon } from "@/components/pokemon/pokemon"
import { Search } from "./search"
import type { PokemonData } from "@/components/pokemon/types"

type Props = {
  pokemons: PokemonData[]
}

export const Pokemons = ({ pokemons }: Props) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPokemons, setFilteredPokemons] =
    useState<PokemonData[]>(pokemons)

  useEffect(() => {
    setFilteredPokemons(filterPokemons(pokemons, searchQuery))
  }, [pokemons, searchQuery])

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-9">
        {filteredPokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </>
  )
}

const filterPokemons = (pokemons: PokemonData[], query: string) => {
  if (!query) return pokemons
  return pokemons.filter((pokemon: { name: string }) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  )
}
