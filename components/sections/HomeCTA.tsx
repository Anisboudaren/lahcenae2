"use client";

import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, UserPlus } from "lucide-react";
import Link from "next/link";

export function HomeCTA() {
  const phoneNumber = "05 50 49 69 53";
  const whatsappNumber = "+213550496953";

  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ابدأ رحلتك نحو رخصة القيادة اليوم
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين حصلوا على رخصهم من مدرسة لحسن. سجل الآن واحصل على أفضل تدريب احترافي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Link href="/signup">
                <UserPlus className="w-5 h-5 ml-2" />
                سجل الآن
              </Link>
            </Button>
            <div className="flex gap-4">
              <a
                href="tel:05550496953"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                اتصل بنا
              </a>
              <a
                href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
