export const config = {
  infuraProjectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  pokemonApiUrL: "https://pokeapi.co/api/v2/pokemon",
  bulbediaUrl: "https://bulbapedia.bulbagarden.net/wiki",
}

export type Config = typeof config
