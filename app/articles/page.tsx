"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";
import { getArticles, type Article } from "@/lib/admin-data";

const ARTICLES_PER_PAGE = 10;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = useMemo(
    () => articles.slice(startIndex, endIndex),
    [articles, startIndex, endIndex]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <main className="min-h-screen bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#57534E] mb-4">
            المقالات والأخبار
          </h1>
          <p className="text-lg md:text-xl text-[#78716C]">
            Articles et actualités
          </p>
        </div>

        {/* Articles List */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#78716C] text-lg">لا توجد مقالات متاحة حالياً</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-12">
              {currentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block group"
                >
                  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-64 h-48 md:h-full flex-shrink-0">
                        {article.image ? (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">لا توجد صورة</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold text-[#57534E] mb-3 group-hover:text-[#DC2626] transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-[#78716C] mb-4 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-[#78716C]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(article.createdAt).toLocaleDateString("ar-DZ", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[#0EA5E9] font-medium group-hover:gap-3 transition-all">
                          <span>اقرأ المزيد</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-gray-300 text-[#57534E] hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>

                {getPageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-3 py-2 text-[#78716C]">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className={
                          currentPage === page
                            ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                            : "border-gray-300 text-[#57534E] hover:bg-gray-50"
                        }
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-gray-300 text-[#57534E] hover:bg-gray-50 disabled:opacity-50"
                >
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
