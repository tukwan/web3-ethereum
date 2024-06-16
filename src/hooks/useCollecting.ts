import { useState, useEffect, useCallback } from "react"

export const useCollecting = (pokemonName: string) => {
  const [isCollected, setIsCollected] = useState(false)

  useEffect(() => {
    const checkIfCollected = () => {
      if (isPokemonCollected(pokemonName)) {
        setIsCollected(true)
      } else {
        setIsCollected(false)
      }
    }

    checkIfCollected()
  }, [pokemonName])

  const collectPokemon = (name: string) => {
    addPokemonToCollection(name)
    setIsCollected(true)
  }

  return { isCollected, collectPokemon }
}

const COLLECTED_POKEMONS_KEY = "collectedPokemons"

const getCollectedPokemons = (): string[] =>
  JSON.parse(localStorage.getItem(COLLECTED_POKEMONS_KEY) || "[]")

const isPokemonCollected = (name: string): boolean =>
  getCollectedPokemons().includes(name)

const addPokemonToCollection = (name: string) => {
  const collectedPokemons = getCollectedPokemons()

  if (!isPokemonCollected(name)) {
    collectedPokemons.push(name)
    localStorage.setItem(
      COLLECTED_POKEMONS_KEY,
      JSON.stringify(collectedPokemons)
    )
  }
}
