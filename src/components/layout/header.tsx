"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mainNav } from "@/config/navigation";
import { Menu, Heart } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-background border-b"
      )}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-14" : "h-16"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "font-bold text-primary transition-all duration-300",
              isScrolled ? "text-xl" : "text-2xl"
            )}>KGNA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNav.map((item) => (
              <Link
                key={item.title}
                href={item.href!}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/donate" className="hidden sm:block">
              <Button
                className="bg-primary hover:bg-primary/90 transition-all duration-300"
                size={isScrolled ? "sm" : "default"}
              >
                <Heart className={cn(
                  "mr-2 transition-all duration-300",
                  isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                )} />
                Donate Now
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {mainNav.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href!}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block py-2 px-3 rounded-md font-medium transition-colors",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Link
                    href="/donate"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4"
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}