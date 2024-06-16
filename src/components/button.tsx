interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-mint text-charcoal py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
