"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/button"
import { Input } from "@/components/input"

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
    <div className="flex items-center mb-12">
      <h2 className="text-title">Search</h2>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}
