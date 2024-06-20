import Image from "next/image"

export const Header = () => (
  <header>
    <div className="flex justify-center items-center py-8">
      <Image src="/logo.svg" alt="logo" width={108} height={26} priority />
      <h4 className="ml-2 text-h4-muted">Pokemon List</h4>
    </div>
    <div className="h-0.5 bg-steel"></div>
  </header>
)
