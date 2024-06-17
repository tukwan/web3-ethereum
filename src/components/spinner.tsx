import { cn } from "@/lib/utils"

type Props = {
  className?: string
  size?: number
}

export const Spinner = ({ className }: Props) => (
  <div className={cn("flex items-center justify-center", className)}>
    <div className="border-4 border-lime border-t-transparent border-t-4 rounded-full w-14 h-14 animate-spin"></div>
  </div>
)
