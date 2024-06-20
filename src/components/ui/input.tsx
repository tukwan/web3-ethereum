import { cn } from "@/lib/utils"

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ value, onChange, className, ...props }: Props) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className={cn(
      "bg-charcoal max-w-[635px] w-full h-[48px] rounded border-2 border-midnight pt-3 pr-4 pb-3 pl-4 placeholder-slate focus:outline-none mx-6",
      className
    )}
    {...props}
  />
)
