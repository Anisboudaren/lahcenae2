"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Facebook, FileText, Newspaper } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const phoneNumber = "0550496953";
  const whatsappNumber = "+213550496953";
  const facebookUrl = "https://www.facebook.com/share/1ACD1Lu8jV/";

  return (
    <footer className="w-full relative mt-auto bg-black">
      {/* Footer Content */}
      <div className="bg-black">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
              {/* Logo and About */}
              <div>
                <Link href="/" className="inline-block mb-4">
                  <Image
                    src="/images/logo auto echole lahcen.png"
                    alt="مدرسة لحسن لتعليم السياقة"
                    width={150}
                    height={60}
                    className="h-auto"
                  />
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  مدرسة لحسن لتعليم السياقة - خبرة سنوات في تدريب السائقين المحترفين
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    صُنع بفخر بواسطة{" "}
                    <a
                      href="https://wajjda.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      wajjda.com
                    </a>{" "}
                    للوكالات
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">معلومات الاتصال</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phoneNumber}</span>
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>فيسبوك</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/articles"
                      className="text-gray-400 hover:text-sky-400 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Newspaper className="w-4 h-4" />
                      أخبار ونصائح
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/policies"
                      className="text-gray-400 hover:text-sky-400 transition-colors flex items-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      السياسات والشروط
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">خدماتنا</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li>
                    <Link href="/#categories" className="hover:text-sky-400 transition-colors">
                      رخص القيادة
                    </Link>
                  </li>
                  <li>
                    <Link href="/#certificate" className="hover:text-sky-400 transition-colors">
                      الشهادات المهنية
                    </Link>
                  </li>
                  <li>
                    <Link href="/#locations" className="hover:text-sky-400 transition-colors">
                      مواقعنا
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} مدرسة لحسن لتعليم السياقة. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
