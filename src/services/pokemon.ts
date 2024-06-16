import { config } from "@/config"

export const getPokemonList = async () =>
  (await fetchFromApi(`${config.pokemonApiUrl}?limit=151`)).results

export const getPokemonDetails = async (name: string) =>
  fetchFromApi(`${config.pokemonApiUrl}/${name}`)

export const getPokemonBulbapedia = async (name: string) =>
  fetchFromApi(`${config.bulbediaUrl}/${name}`, "text")

const fetchFromApi = async (url: string, resType: "json" | "text" = "json") => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch data from the API")
  return resType === "text" ? res.text() : res.json()
}
