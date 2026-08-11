"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mainNav } from "@/config/navigation";
import { Menu, Heart } from "lucide-react";

// The header is fixed, so its own shrink never changes the document height —
// a spacer below it holds the full height permanently. Keep these in sync:
// SPACER_HEIGHT must always equal the *unshrunk* header height, or the page
// reflows on every toggle and the scroll position oscillates near the bottom.
const SPACER_HEIGHT = "h-16";
// Asymmetric thresholds. A single threshold flickers when the user parks the
// scroll on it and trackpad momentum jitters by a pixel.
const SHRINK_AT = 24;
const EXPAND_AT = 8;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled((prev) => {
        const y = window.scrollY;
        if (!prev && y > SHRINK_AT) return true;
        if (prev && y < EXPAND_AT) return false;
        return prev;
      });
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    // Reloads and back-navigation restore scroll before we ever hear an event.
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300 motion-reduce:transition-none",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
            : "bg-background border-b",
        )}
      >
        <div className="container mx-auto px-4">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-300 motion-reduce:transition-none",
              isScrolled ? "h-14" : "h-16",
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/kgna-logo.png"
                alt="KGNA - Kashmiri Group of North America"
                width={512}
                height={512}
                priority
                className={cn(
                  "w-auto transition-[height] duration-300 motion-reduce:transition-none",
                  isScrolled ? "h-10" : "h-12",
                )}
              />
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
                      : "text-foreground/60 hover:text-foreground",
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
                  className="bg-primary hover:bg-primary/90"
                  size={isScrolled ? "sm" : "default"}
                >
                  <Heart
                    className={cn(
                      "mr-2 transition-[height,width] duration-300 motion-reduce:transition-none",
                      isScrolled ? "h-3.5 w-3.5" : "h-4 w-4",
                    )}
                  />
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
                            : "hover:bg-accent hover:text-accent-foreground",
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

      {/* Holds the header's full height in flow so the document never resizes. */}
      <div className={SPACER_HEIGHT} aria-hidden />
    </>
  );
}
