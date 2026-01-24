"use client";

import { usePathname } from "next/navigation";
import { Header2 } from "@/components/shared/Header2";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppBubble } from "@/components/shared/WhatsAppBubble";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header2 />
      {children}
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
