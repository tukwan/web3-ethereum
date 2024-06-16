import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  onClick,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "py-3 px-6 rounded-lg focus:outline-none font-bold",
        disabled
          ? "bg-charcoal text-midnight cursor-not-allowed outline outline-2 outline-midnight"
          : "bg-mint text-charcoal hover:bg-lime",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
