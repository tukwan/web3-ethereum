import { config } from "@/config"

export const getPokemons = async () =>
  (await fetchFromApi(`${config.pokemonApiUrl}?limit=151`)).results

export const getPokemonDetails = async (name: string) =>
  fetchFromApi(`${config.pokemonApiUrl}/${name}`)

// export const getBulbapediaLink = (name: string) => `${BULBAPEDIA_URL}/${name}`

const fetchFromApi = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch data from the API")
  const data = await res.json()
  return data
}
