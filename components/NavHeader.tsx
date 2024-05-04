import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { NavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/Layouts"

export function NavHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-mauve-7 backdrop-blur">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <NavItems items={siteConfig.mainNav} />
        {/* <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div> */}
      </div>
    </header>
  )
}

interface NavItemsProps {
  items?: NavItem[]
}

function NavItems({ items }: NavItemsProps) {
  const { theme } = useTheme()
  const [logoSrc, setLogoSrc] = React.useState('/infernix-logo.svg')
  

  React.useEffect(() => {
    setLogoSrc(theme === 'light' ? "/infernix-logo.svg" : "/infernix-logo-dark.svg")
  },[theme])

  return (
    <div className="flex w-full items-center  justify-between gap-6">
      <div className="flex items-center gap-20">
        <Link href="/train">
            Train
        </Link>
        <Link href="/query">
            Support
        </Link>
        <Link href="/tools">
            Tools
        </Link>
      </div>
      <ThemeToggle />
    </div>
  )
}
