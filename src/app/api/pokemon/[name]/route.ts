import { NextResponse } from "next/server"
import { load } from "cheerio"
import { getPokemonBulbapedia } from "@/services/pokemon"

export async function GET(
  _request: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params

  if (!name) {
    return NextResponse.json({ error: "Missing Pokemon name" }, { status: 400 })
  }

  try {
    const pokemonData = await getPokemonBulbapedia(name)
    const $ = load(pokemonData)
    const info = $(".mw-parser-output > p").first().text().trim()

    return NextResponse.json({ name, info }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Pokemon data" },
      { status: 500 }
    )
  }
}
