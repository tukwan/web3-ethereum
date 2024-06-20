import { cn } from "@/lib/utils"

type Props = {
  className?: string
  size?: number
}

export const Spinner = ({ className, size = 48 }: Props) => (
  <div className="flex items-center justify-center">
    <div
      className={cn(
        "border-4 border-lime border-t-transparent rounded-full animate-spin",
        className
      )}
      style={{ width: size, height: size }}
    ></div>
  </div>
)
