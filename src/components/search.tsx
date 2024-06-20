"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

type Props = {
  searchQuery: string
}

export const Search = ({ searchQuery }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchQuery)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  const handleSearch = () => {
    const searchParam = searchParams.get("search") || ""
    const trimSearch = search.trim()

    if (trimSearch !== searchParam) {
      setIsLoading(true)
      router.push(trimSearch ? `/?search=${trimSearch}` : "/")
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
      <label htmlFor="search" className="text-h3 mb-4 sm:mb-0">
        Search
      </label>
      <Input
        id="search"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokemon..."
        className="mb-4 sm:mb-0 sm:mr-4"
      />
      <Button
        onClick={handleSearch}
        className="w-full sm:w-auto max-w-[300px] min-w-[103px]"
      >
        {isLoading ? <Spinner size={24} /> : "Search"}
      </Button>
    </div>
  )
}
