import { configApp } from "@/config"
import { fetchFromApi } from "@/lib/utils"

export const getPokemonList = async () =>
  (await fetchFromApi(`${configApp.pokemonApiUrl}?limit=151`)).results

export const getPokemonDetails = async (name: string) =>
  fetchFromApi(`${configApp.pokemonApiUrl}/${name}`)

export const getPokemonBulbapedia = async (name: string) =>
  fetchFromApi(`${configApp.bulbediaUrl}/${name}`, "text")

// Simulate access to a protected API
export const getPremiumPokemonList = async () =>
  (await fetchFromApi(`${configApp.pokemonApiUrl}?limit=16&offset=151`)).results
