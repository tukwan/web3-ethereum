const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon"
// const BULBAPEDIA_URL = "https://bulbapedia.bulbagarden.net/wiki"

export const getPokemons = async () =>
  (await fetchFromApi(`${POKEMON_API_URL}?limit=151`)).results

export const getPokemonDetails = async (idOrName: string) =>
  fetchFromApi(`${POKEMON_API_URL}/${idOrName}`)

// export const getBulbapediaLink = (name: string) => `${BULBAPEDIA_URL}/${name}`

const fetchFromApi = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch data from the API")
  const data = await res.json()

  return data
}
