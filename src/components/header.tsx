import Image from "next/image"

export const Header = () => (
  <header>
    <div className="flex justify-center items-center py-8">
      <Image src="/logo.svg" alt="logo" width={108} height={24} />
      <span className="ml-2 text-primary font-bold text-pokemon">
        Pokemon List
      </span>
    </div>
    <div className="h-0.5 bg-[#182D32]"></div>
  </header>
)
