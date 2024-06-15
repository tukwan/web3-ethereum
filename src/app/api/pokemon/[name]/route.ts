import { NextResponse } from "next/server"
import { load } from "cheerio"

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params

  if (!name) {
    return NextResponse.json({ error: "Missing Pokémon name" }, { status: 400 })
  }

  try {
    const url = `https://bulbapedia.bulbagarden.net/wiki/${name}`
    const response = await fetch(url)
    const data = await response.text()
    const $ = load(data)

    const basicInfo = $(".mw-parser-output > p").first().text().trim()

    return NextResponse.json({ name, basicInfo }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Pokémon data" },
      { status: 500 }
    )
  }
}
