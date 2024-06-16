type Props = {
  children: React.ReactNode
  onClick: () => void
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="bg-mint text-charcoal py-3 px-6 rounded-md hover:bg-lime focus:outline-none font-bold"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
