"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "أول حصة في السياقة: أهم درس وتمرين للمبتدئين",
    description: "دليل شامل للمبتدئين في أول حصة قيادة - تعرف على الأساسيات والتمارين المهمة التي يجب إتقانها",
    image: "/articles/teaching inside the car.png",
    slug: "first-driving-lesson"
  },
  {
    id: 2,
    title: "كل ما تحتاج معرفته للحصول على رخصة القيادة في سن 18",
    description: "دليل كامل للشباب الذين بلغوا 18 عاماً - المتطلبات، الخطوات، والنصائح المهمة",
    image: "/articles/guy wiht the car.png",
    slug: "getting-license-at-18"
  },
  {
    id: 3,
    title: "قوانين المرور الجديدة 2026 في الجزائر: ما الذي تغير؟",
    description: "تعرف على آخر التحديثات والتغييرات في قانون المرور الجزائري لعام 2026 وأهم النقاط",
    image: "/articles/new laws.jpg",
    slug: "new-traffic-laws-2026"
  }
];

export function Articles2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible articles based on screen size
  const getVisibleArticles = () => {
    if (isDesktop) {
      // On desktop, show 3 articles starting from currentIndex
      const visible = [];
      for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % articles.length;
        visible.push({ ...articles[index], displayIndex: i });
      }
      return visible;
    } else {
      // On mobile, show only the current article
      return [{ ...articles[currentIndex], displayIndex: 0 }];
    }
  };

  const visibleArticles = getVisibleArticles();

  return (
    <section className="relative w-full bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-right mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            <span className="text-sky-500">نصائح</span> وأخبار ومقالات وأكثر
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            كل ما تحتاج معرفته عن تعليم السياقة
          </p>
        </div>

        <div className="relative w-full">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-lg w-full">
            {/* Articles Grid - Desktop shows 3, Mobile shows 1 */}
            <div className="flex transition-all duration-500 ease-in-out">
              {visibleArticles.map((article) => (
                <div
                  key={`${article.id}-${article.displayIndex}`}
                  className="w-full md:w-1/3 flex-shrink-0 px-2"
                >
                  <div className="relative w-full h-[400px] md:h-[500px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-right">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-2xl">
                        {article.description}
                      </p>
                      <div>
                        <Link href={`/articles/${article.slug}`}>
                          <Button 
                            className="px-6 md:px-10 py-2.5 md:py-3 bg-sky-500 text-white font-semibold text-sm md:text-base hover:bg-sky-600 transition-colors border-2 border-sky-500 rounded-lg"
                          >
                            اقرأ المزيد
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-sky-500 w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
              aria-label="Next article"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
