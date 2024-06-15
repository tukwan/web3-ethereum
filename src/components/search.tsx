"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export const Search = ({ searchQuery }: { searchQuery: string }) => {
  const router = useRouter()
  const [search, setSearch] = useState(searchQuery)

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/?search=${search}`)
    } else {
      router.push(`/`)
    }
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon by name"
        className="p-2 border text-black border-gray-300 rounded"
      />
      <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500  rounded">
        Search
      </button>
    </div>
  )
}
