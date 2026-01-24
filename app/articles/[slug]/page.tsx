"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { mapDbToArticle, type DbArticle } from "@/lib/db-mappers";
import type { Article } from "@/lib/admin-data";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (i < retries - 1) {
        await sleep(RETRY_DELAY_MS * (i + 1));
        continue;
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(RETRY_DELAY_MS * (i + 1));
    }
  }
  throw new Error("Failed to fetch after retries");
}

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function loadArticle() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetchWithRetry(`/api/articles?slug=${encodeURIComponent(slug)}`);
      if (res.status === 404) {
        router.push("/articles");
        return;
      }
      const data = await res.json();
      if (!res.ok || (data as { error?: string }).error) {
        throw new Error((data as { error?: string }).error || "فشل تحميل المقال");
      }
      setArticle(mapDbToArticle(data as DbArticle));
    } catch (e) {
      const err = e instanceof Error ? e.message : "فشل تحميل المقال";
      console.error("Failed to fetch article:", e);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#57534E]">جاري التحميل...</p>
      </main>
    );
  }

  if (error && !article) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={loadArticle} className="bg-sky-500 hover:bg-sky-600 text-white">
          <RefreshCw className="w-4 h-4 ml-2" />
          إعادة المحاولة
        </Button>
        <Link href="/articles" className="text-sky-500 hover:text-sky-600">
          العودة إلى المقالات
        </Link>
      </main>
    );
  }

  if (!article) {
    return null;
  }

  // Calculate read time based on text length (approximate)
  const calculateReadTime = (text: string | undefined): string => {
    if (!text || text.trim().length === 0) return "أقل من دقيقة";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} دقيقة`;
  };

  const readTime = calculateReadTime(article.text);

  // Convert YouTube URL to embed format if needed
  const getVideoEmbedUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    
    // Already an embed URL
    if (url.includes('youtube.com/embed/') || url.includes('youtu.be/')) {
      return url;
    }
    
    // Extract video ID from various YouTube URL formats
    let videoId: string | null = null;
    
    // https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) {
      videoId = watchMatch[1];
    }
    
    // https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) {
      videoId = shortMatch[1];
    }
    
    // https://www.youtube.com/embed/VIDEO_ID (already embed)
    if (url.includes('/embed/')) {
      return url;
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // If we can't parse it, return as-is (might be a valid embed URL or other format)
    return url;
  };

  const videoEmbedUrl = getVideoEmbedUrl(article.videoLink);

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
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 pb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 break-words overflow-wrap-anywhere">
                {article.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-4 break-words overflow-wrap-anywhere">
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
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
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
          {videoEmbedUrl && (
            <div className="mb-12">
              <div className="bg-gray-50 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#57534E] mb-6 text-right">
                  فيديو تعليمي
                </h2>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={videoEmbedUrl}
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
                  className="text-lg text-[#57534E] leading-relaxed whitespace-pre-line break-words overflow-wrap-anywhere word-break-break-word"
                  style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
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
