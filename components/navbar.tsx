"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">AutismCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
              Cách hoạt động
            </Link>
            <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
              Tài nguyên
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Liên hệ
            </Link>
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Đăng ký</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/about" className="block text-foreground hover:text-primary transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/how-it-works" className="block text-foreground hover:text-primary transition-colors">
              Cách hoạt động
            </Link>
            <Link href="/resources" className="block text-foreground hover:text-primary transition-colors">
              Tài nguyên
            </Link>
            <Link href="/contact" className="block text-foreground hover:text-primary transition-colors">
              Liên hệ
            </Link>
            <div className="flex space-x-2 pt-4">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/auth/register" className="flex-1">
                <Button size="sm" className="w-full">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
