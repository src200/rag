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
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavItems items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

interface NavItemsProps {
  items?: NavItem[]
}

function NavItems({ items }: NavItemsProps) {
  let { theme } = useTheme()
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          className="mt-3"
          src={theme === 'dark' ? "/infernix-logo-dark.svg" : "/infernix-logo.svg"}
          alt="logo"
          width={200}
          height={100} />
      </Link>
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
  )
}
