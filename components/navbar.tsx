"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Heart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">AutismCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-xl font-medium text-foreground hover:text-primary transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/how-it-works" className="text-xl font-medium text-foreground hover:text-primary transition-colors">
              Cách hoạt động
            </Link>
            <Link href="/resources" className="text-xl font-medium text-foreground hover:text-primary transition-colors">
              Tài nguyên
            </Link>
            <Link href="/contact" className="text-xl font-medium text-foreground hover:text-primary transition-colors">
              Liên hệ
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur transition-transform duration-300 ease-in-out",
            isOpen ? "transform translate-y-0" : "transform -translate-y-full"
          )}
        >
          <div className="flex flex-col items-center py-6 space-y-6">
            <Link href="/about" className="text-xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Về chúng tôi
            </Link>
            <Link href="/how-it-works" className="text-xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Cách hoạt động
            </Link>
            <Link href="/resources" className="text-xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Tài nguyên
            </Link>
            <Link href="/contact" className="text-xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}