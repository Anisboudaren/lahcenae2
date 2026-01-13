"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Certificate2() {
  return (
    <section 
      className="relative w-full py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20"
      style={{
        background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(14, 165, 233, 0.02) 10px,
            rgba(14, 165, 233, 0.02) 20px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(14, 165, 233, 0.02) 10px,
            rgba(14, 165, 233, 0.02) 20px
          )
        `
      }}
    >
      {/* Hero Image - Full Width */}
      <div className="relative mb-8 md:mb-10 -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-20" style={{ width: 'calc(100% + 3rem)' }}>
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden pr-6 md:pr-12 lg:pr-16 xl:pr-20" style={{ borderRadius: '0 120px 120px 0' }}>
          <Image
            src="/certifciate/guy handing out the certifcate.png"
            alt="شهادة الكفاءة المهنية"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">

        <div className="text-right mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            شهادة <span className="text-sky-500">الكفاءة المهنية</span> لنقل البضائع
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            احصل على التأهيل المهني للعمل كسائق محترف
          </p>
        </div>

        <div className="max-w-3xl mr-auto">
          <div className="space-y-4 text-right">
            <ul className="space-y-2 mb-4" dir="rtl">
              <li className="flex items-start gap-2 text-gray-700 text-right">
                <span className="text-sky-500 mt-1 font-bold flex-shrink-0">•</span>
                <span className="text-sm md:text-base">مطلوبة قانونياً للعمل في مجال النقل التجاري</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700 text-right">
                <span className="text-sky-500 mt-1 font-bold flex-shrink-0">•</span>
                <span className="text-sm md:text-base">تفتح آفاقاً واسعة للعمل في الشركات الكبرى</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700 text-right">
                <span className="text-sky-500 mt-1 font-bold flex-shrink-0">•</span>
                <span className="text-sm md:text-base">مدة التكوين: 11 يوماً</span>
              </li>
            </ul>

            <div className="pt-2 text-right">
              <p className="text-sm md:text-base text-gray-700 mb-4 text-right">
                احصل على شهادتك المهنية وابدأ عملك في مجال النقل التجاري
              </p>
              <div className="text-right">
                <Link href="/certificate">
                  <Button className="px-6 md:px-10 py-2.5 md:py-3 bg-sky-500 text-white font-semibold text-sm md:text-base hover:bg-sky-600 transition-colors border-2 border-sky-500 rounded-lg">
                    معرفة المزيد
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
