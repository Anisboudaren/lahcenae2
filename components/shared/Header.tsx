"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`absolute md:sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-end h-20 md:h-24">
          <Link href="/" className="flex items-center pt-2 md:pt-3">
            <Image
              src="/images/logo no bg.png"
              alt="مدرسة لحسن لتعليم السياقة"
              width={200}
              height={80}
              className="h-16 w-auto md:h-20 md:w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
