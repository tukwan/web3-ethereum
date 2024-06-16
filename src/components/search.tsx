"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/button"

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
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="p-2 border text-black border-gray-300 rounded-l-md bg-gray-800 placeholder-gray-500 focus:outline-none flex-grow"
      />
      <Button
        onClick={handleSearch}
        // className="ml-2 p-2 bg-green-500 text-black rounded-r-md"
      >
        Search
      </Button>
    </div>
  )
}
