"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Phone } from "lucide-react";

export function Header2() {
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Menu Icon - Left */}
          <button className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors z-10">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo - Center */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
            <Image
              src="/images/logo auto echole lahcen.png"
              alt="Auto École L'Oranie Lahcen"
              width={220}
              height={70}
              className="h-14 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Phone Icon - Right */}
          <button className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors z-10">
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
