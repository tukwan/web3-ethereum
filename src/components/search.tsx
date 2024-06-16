"use client"

import { useRouter } from "next/navigation"
import { useState, ChangeEvent, KeyboardEvent } from "react"
import { Button } from "@/components/button"
import { Input } from "@/components/input"

type Props = {
  searchQuery: string
}

export const Search = ({ searchQuery }: Props) => {
  const router = useRouter()
  const [search, setSearch] = useState(searchQuery)

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/?search=${search}`)
    } else {
      router.push(`/`)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div className="flex flex-col items-center mb-12 sm:flex-row justify-center">
      <h3 className="text-h3 mb-4 sm:mb-0">Search</h3>
      <Input
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="mb-4 sm:mb-0 sm:mr-4"
      />
      <Button onClick={handleSearch} className="w-full sm:w-auto">
        Search
      </Button>
    </div>
  )
}
