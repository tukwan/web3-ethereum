import Image from "next/image"

export const Header = () => (
  <header>
    <div className="flex justify-center items-center py-8">
      <Image src="/logo.svg" alt="logo" width={108} height={24} />
      <h3 className="ml-2 text-title-muted">Pokemon List</h3>
    </div>
    <div className="h-0.5 bg-steel"></div>
  </header>
)
