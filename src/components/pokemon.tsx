"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useEthers } from "@usedapp/core"
import { Button } from "@/components/button"
import { ArrowIcon } from "@/components/icons"

type Pokemon = {
  name: string
  abilities: string[]
  image: string
}

type Props = {
  pokemon: Pokemon
}

export const Pokemon = ({ pokemon }: Props) => {
  const { name, abilities, image } = pokemon

  const { activateBrowserWallet, account, library } = useEthers()
  const [isCollected, setIsCollected] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const collectedPokemons = JSON.parse(
      localStorage.getItem("collectedPokemons") || "[]"
    )
    if (collectedPokemons.includes(name)) {
      setIsCollected(true)
    }
  }, [name])

  const handleCollect = async () => {
    try {
      const signer = library.getSigner()
      const message = `Collecting ${name}`
      const signature = await signer.signMessage(message)
      console.log("Message signed:", { message, signature })

      const collectedPokemons = JSON.parse(
        localStorage.getItem("collectedPokemons") || "[]"
      )
      collectedPokemons.push(name)
      localStorage.setItem(
        "collectedPokemons",
        JSON.stringify(collectedPokemons)
      )

      setIsCollected(true)
    } catch (error) {
      console.error("Message signing failed:", error)
    }
  }

  const handleMouseEnter = async () => {
    if (!tooltip) {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/pokemon/${pokemon.name}`)
        const data = await response.json()

        setTooltip(data.info)
      } catch (error) {
        console.error("Error fetching tooltip:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="max-w-[395px] h-[506px] rounded-xl bg-steel text-center">
      <Image
        src={image}
        alt="Pokemon image"
        width={96}
        height={96}
        className="w-full h-[222px] bg-charcoal rounded-t-xl"
      />

      <div className="p-8">
        <h5 className="font-bold text-lg capitalize mb-2">{name}</h5>
        <ul className="font-medium text-seafoam">
          {abilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>

        <Button className="my-8" onClick={handleCollect} disabled={isCollected}>
          {isCollected ? "Collected" : "Collect"}
        </Button>

        <p
          className="text-mint cursor-pointer flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
        >
          Details
          <ArrowIcon className="ml-2" />
        </p>
        {tooltip && (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <h4 className="text-md font-bold mb-2">{pokemon.name} Tooltip</h4>
            <p className="text-sm whitespace-pre-line">{tooltip}</p>
          </div>
        )}
      </div>
    </div>
  )
}
