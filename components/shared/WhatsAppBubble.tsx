"use client";

import { Phone } from "lucide-react";
import Link from "next/link";

export function WhatsAppBubble() {
  // Replace with your actual WhatsApp number (format: country code + number without + or spaces)
  const whatsappNumber = "213550496953"; // Algeria: 05 50 49 69 53
  const whatsappMessage = "مرحباً، أريد الاستفسار عن دورات تعليم السياقة";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
      aria-label="اتصل بنا على واتساب"
    >
      <Phone className="w-6 h-6 md:w-7 md:h-7" />
      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-ping">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </Link>
  );
}
