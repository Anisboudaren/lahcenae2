"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Languages, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export function Header2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "/", label: "الرئيسية", description: "الصفحة الرئيسية", isAnchor: false },
    { href: "/#categories", label: "رخص القيادة", description: "أنواع رخص القيادة", isAnchor: true },
    { href: "/#certificate", label: "الشهادات المهنية", description: "الشهادات المتاحة", isAnchor: true },
    { href: "/articles", label: "المقالات والأخبار", description: "أخبار ونصائح", isAnchor: false },
    { href: "/#locations", label: "مواقعنا", description: "عنواننا وموقعنا", isAnchor: true },
    { href: "/policies", label: "السياسات والشروط", description: "سياسة الخصوصية والشروط", isAnchor: false },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isAnchor) {
      // Handle anchor links (sections on home page)
      const hash = href.substring(2); // Remove "/#"
      
      if (pathname === "/") {
        // Already on home page, scroll to section
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      } else {
        // Navigate to home page with hash, then scroll after page loads
        router.push(href);
        // Wait for navigation and DOM update
        setTimeout(() => {
          const scrollToElement = () => {
            const element = document.getElementById(hash);
            if (element) {
              const headerOffset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            } else {
              // Retry if element not found yet
              setTimeout(scrollToElement, 100);
            }
          };
          scrollToElement();
        }, 300);
      }
    } else {
      // Regular page navigation
      router.push(href);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-[60px]">
            {/* Menu Icon - Left */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors z-10"
            >
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

            {/* Languages Icon - Right */}
            <button className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors z-10">
              <Languages className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen} direction="right">
        <DrawerContent className="h-full w-80 sm:w-96" dir="rtl">
          <DrawerHeader className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-2xl font-bold text-[#57534E]">القائمة</DrawerTitle>
              <DrawerClose className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </DrawerClose>
            </div>
            <DrawerDescription className="text-[#78716C]">الصفحات الرئيسية</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.href, item.isAnchor)}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-base text-[#57534E] group-hover:text-[#DC2626] transition-colors mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-[#78716C]">{item.description}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
