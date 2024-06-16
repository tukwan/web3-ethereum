type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search pokemons..."
      className="bg-charcoal max-w-[635px] w-full h-[48px] rounded-md border-2 border-midnight pt-3 pr-4 pb-3 pl-4 placeholder-slate focus:outline-none mx-6"
    />
  )
}
