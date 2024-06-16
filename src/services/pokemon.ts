import { config } from "@/config"
import { fetchFromApi } from "@/lib/utils"

export const getPokemonList = async () =>
  (await fetchFromApi(`${config.pokemonApiUrl}?limit=151`)).results

export const getPokemonDetails = async (name: string) =>
  fetchFromApi(`${config.pokemonApiUrl}/${name}`)

export const getPokemonBulbapedia = async (name: string) =>
  fetchFromApi(`${config.bulbediaUrl}/${name}`, "text")
