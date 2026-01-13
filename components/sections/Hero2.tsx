"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero2() {
  return (
    <section className="relative w-full bg-white">
      {/* Banner Image */}
      <div className="relative w-full h-auto overflow-hidden" style={{ borderRadius: '0px 0 0 120px' }}>
        <Image
          src="/types/hero section 2.jpg"
          alt="Auto École Lahcen L'oranie"
          width={1280}
          height={853}
          className="w-full h-auto object-cover"
          priority
          quality={90}
        />
      </div>
      
      {/* Content Section */}
      <div 
        className="w-full px-6 md:px-12 lg:px-16 xl:px-20"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(14, 165, 233, 0.015) 10px,
              rgba(14, 165, 233, 0.015) 20px
            )
          `
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block">
              <span className="px-3 py-1 bg-sky-50 text-sky-600 font-semibold text-[10px] md:text-xs border border-sky-200">
                معتمد رسمياً
              </span>
            </div>
            
            <div className="text-right mb-4 md:mb-6">
              <h1 className="text-[14px] font-bold text-gray-900 mb-2">
                مدرسة <span className="text-sky-500">تعليم السياقة</span> لحسن لوراني
              </h1>
              
              <p className="text-[30px] text-gray-800 font-semibold leading-tight whitespace-nowrap">
                Auto École Lahcen L&apos;oranie
              </p>
            </div>

            {/* Features Paragraph */}
            <div className="pt-2 md:pt-3">
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed md:leading-loose">
                نقدم لك مدرّبين محترفين ذوي خبرة واسعة، مع تجهيزات عصرية ومركبات مخصّصة للتدريب، بالإضافة إلى مرافقة نفسية لزيادة ثقتك بنفسك. سجّل الآن، وابدأ رحلتك معنا من هنا.
              </p>
            </div>

            <div className="pt-4 md:pt-6">
              <Link href="/signup">
                <button className="px-8 md:px-12 py-3 md:py-4 bg-sky-500 text-white font-semibold text-base md:text-lg hover:bg-sky-600 transition-colors border-2 border-sky-500 rounded-lg">
                  التسجيل الآن
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
