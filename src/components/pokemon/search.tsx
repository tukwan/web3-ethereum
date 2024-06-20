import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

type Props = {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

export const Search = ({ searchQuery, setSearchQuery }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    const trimSearch = searchQuery.trim()

    if (trimSearch !== searchQuery) {
      setIsLoading(true)
      setSearchQuery(trimSearch)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className="flex flex-col items-center mb-12 sm:flex-row justify-center">
      <label htmlFor="search" className="text-h3 mb-4 sm:mb-0">
        Search
      </label>
      <Input
        id="search"
        value={searchQuery}
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
