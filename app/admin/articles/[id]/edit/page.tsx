"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Save, Image as ImageIcon } from "lucide-react";
import {
  getArticles,
  saveArticle,
  type Article,
} from "@/lib/admin-data";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const [formData, setFormData] = useState<Partial<Article>>({
    title: "",
    description: "",
    image: "",
    slug: "",
    videoLink: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const articles = getArticles();
    const article = articles.find((a) => a.id === articleId);
    if (article) {
      setFormData(article);
    } else if (articleId === "new") {
      setFormData({
        title: "",
        description: "",
        image: "",
        slug: "",
        videoLink: "",
        text: "",
      });
    }
    setIsLoading(false);
  }, [articleId]);

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.slug) {
      alert("يرجى ملء الحقول المطلوبة (العنوان، الوصف، الرابط المختصر)");
      return;
    }

    const existing = articleId !== "new" && "createdAt" in formData && formData.createdAt;
    const articleToSave: Article = {
      id: articleId === "new" ? Date.now().toString() : articleId,
      title: formData.title,
      description: formData.description,
      image: formData.image || "",
      slug: formData.slug,
      videoLink: formData.videoLink,
      text: formData.text || "",
      createdAt: typeof existing === "string" ? existing : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveArticle(articleToSave);
    router.push("/admin/dashboard?tab=articles");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      ...(articleId === "new" && { slug: generateSlug(title) }),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <p className="text-[#57534E]">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative" dir="rtl">
      <div
        className="absolute top-0 right-0 w-48 md:w-64 lg:w-80 h-full bg-dotted-pattern opacity-50 pointer-events-none"
        aria-hidden
      />

      <header className="relative bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#57534E]">
                {articleId === "new" ? "إضافة مقال جديد" : "تعديل المقال"}
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] mt-0.5">
                {articleId === "new"
                  ? "Ajouter un nouvel article"
                  : "Modifier l'article"}
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin/dashboard?tab=articles")}
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-[#78716C] text-[#57534E] hover:bg-gray-50 h-10 sm:h-9"
            >
              <ArrowRight className="w-4 h-4 shrink-0" />
              العودة
            </Button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">المعلومات الأساسية</CardTitle>
              <CardDescription className="text-[#78716C]">
                Titre, description et identifiant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#57534E]">العنوان *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="عنوان المقال..."
                  dir="rtl"
                  className="bg-white text-base"
                />
              </div>
              <div>
                <Label className="text-[#57534E]">الوصف *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="وصف مختصر للمقال..."
                  rows={4}
                  dir="rtl"
                  className="bg-white resize-y min-h-[100px]"
                />
              </div>
              <div>
                <Label className="text-[#57534E]">الرابط المختصر (Slug) *</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="article-slug"
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">الوسائط</CardTitle>
              <CardDescription className="text-[#78716C]">
                Image de couverture et vidéo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-[#57534E]">مسار صورة الغلاف</Label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                    {formData.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={formData.image}
                          alt="Article cover preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Show placeholder on error
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <Input
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="/articles/article-image.jpg"
                      dir="rtl"
                      className="bg-white"
                    />
                    <p className="text-xs text-[#78716C] mt-2">
                      أدخل مسار الصورة من مجلد public
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-[#57534E]">رابط الفيديو (اختياري)</Label>
                <Input
                  value={formData.videoLink || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, videoLink: e.target.value })
                  }
                  placeholder="https://www.youtube.com/embed/..."
                  dir="rtl"
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">محتوى المقال</CardTitle>
              <CardDescription className="text-[#78716C]">
                النص الكامل للمقال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                placeholder="محتوى المقال الكامل... يمكنك كتابة نص طويل هنا."
                rows={20}
                dir="rtl"
                className="bg-white resize-y min-h-[320px] w-full text-base leading-relaxed"
              />
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/dashboard?tab=articles")}
              className="w-full sm:w-auto border-[#78716C] text-[#57534E] hover:bg-gray-50"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#B91C1C] text-white"
            >
              <Save className="w-4 h-4 ml-2 shrink-0" />
              حفظ
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
