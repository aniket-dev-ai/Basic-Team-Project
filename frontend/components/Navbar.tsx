"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const names = ["Aniket", "mursaleen", "Piyush", "Bishal", "Vinod", "Tejas"];

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b bg-background sticky top-0 z-50">
      {/* Logo */}
      <div className="font-bold text-2xl hover:scale-110 hover:text-primary transition-all cursor-pointer">
        Logo
      </div>

      {/* Center Names (Desktop) */}
      <div className="hidden md:flex gap-4 text-base font-semibold">
        {names.map((name) => (
          <Link
            href={`/${name}`}
            key={name}
            className={cn(
              "transition-all duration-200 px-2 py-1 rounded-lg cursor-pointer",
              "hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-lg hover:underline hover:underline-offset-8"
            )}
          >
            {name}
          </Link>
        ))}
      </div>

      {/* Right: Theme Toggle (Desktop) */}
      <div className="hidden md:flex">
        <ModeToggle />
      </div>

      {/* Hamburger (Mobile) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-primary/20 hover:scale-110"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[75vw] sm:w-[350px] flex flex-col gap-8 pt-10"
          >
            {/* Logo */}
            <div className="font-bold text-2xl mb-6 text-center">Logo</div>
            {/* Names */}
            <div className="flex flex-col gap-4 text-lg font-medium items-center">
              {names.map((name) => (
                <span
                  key={name}
                  className={cn(
                    "transition-all duration-200 px-2 py-1 rounded-lg cursor-pointer w-full text-center",
                    "hover:bg-primary/20 hover:text-primary hover:scale-105 hover:shadow"
                  )}
                >
                  {name}
                </span>
              ))}
            </div>
            {/* Mode Toggle */}
            <div className="flex justify-center mt-8">
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
