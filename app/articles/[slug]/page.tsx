"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getArticles, type Article } from "@/lib/admin-data";

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const articles = getArticles();
    const foundArticle = articles.find((a) => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      router.push("/articles");
    }
    setIsLoading(false);
  }, [slug, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#57534E]">جاري التحميل...</p>
      </main>
    );
  }

  if (!article) {
    return null;
  }

  // Calculate read time based on text length (approximate)
  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} دقيقة`;
  };

  const readTime = calculateReadTime(article.text);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative w-full">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-20 pb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {article.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-4">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
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
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} قراءة</span>
                </div>
                <div>
                  <span>بواسطة مدرسة لحسن لتعليم السياقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="container mx-auto max-w-4xl">
          {/* Back to Articles Link */}
          <div className="mb-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[#0EA5E9] hover:text-[#0284C7] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى المقالات</span>
            </Link>
          </div>

          {/* Video Section if available */}
          {article.videoLink && (
            <div className="mb-12">
              <div className="bg-gray-50 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#57534E] mb-6 text-right">
                  فيديو تعليمي
                </h2>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={article.videoLink}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0"
                    title={article.title}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-right">
              {article.text ? (
                <div
                  className="text-lg text-[#57534E] leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: article.text.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-lg text-[#78716C]">لا يوجد محتوى متاح</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
