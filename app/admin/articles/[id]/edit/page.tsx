"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Save, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { mapDbToArticle, type DbArticle } from "@/lib/db-mappers";
import type { Article } from "@/lib/admin-data";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadImage(file: File, folder: string): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.error || "فشل رفع الصورة");
  }
  const { url } = await res.json();
  if (!url) throw new Error("فشل رفع الصورة");
  return url;
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
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  async function loadArticle() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/admin/articles");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: DbArticle[] = await res.json();
      if (articleId === "new") {
        setFormData({
          title: "",
          description: "",
          image: "",
          slug: "",
          videoLink: "",
          text: "",
        });
      } else {
        const row = data.find((a) => a.id === articleId);
        if (row) setFormData(mapDbToArticle(row));
        else setError("المقال غير موجود");
      }
    } catch (e) {
      setError("فشل تحميل البيانات");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const url = await uploadImage(file, "articles");
      setFormData({ ...formData, image: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل رفع الصورة");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  }

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.description?.trim() || !formData.slug?.trim()) {
      alert("يرجى ملء الحقول المطلوبة (العنوان، الوصف، الرابط المختصر)");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: formData.image ?? "",
      slug: formData.slug.trim(),
      video_link: formData.videoLink?.trim() || null,
      text: formData.text ?? "",
    };

    try {
      setIsSaving(true);
      setError(null);
      if (articleId === "new") {
        const res = await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "فشل الحفظ");
        }
      } else {
        const res = await fetch("/api/admin/articles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "فشل الحفظ");
        }
      }
      router.push("/admin/dashboard?tab=articles");
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
    } finally {
      setIsSaving(false);
    }
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

  if (error && articleId !== "new" && !formData.title) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.push("/admin/dashboard?tab=articles")} variant="outline">
          العودة
        </Button>
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
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
        )}
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
                <Label className="text-[#57534E]">صورة الغلاف</Label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="معاينة"
                        className="w-full h-full object-cover"
                      />
                    ) : uploadingImage ? (
                      <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-sm font-medium">
                      <Upload className="w-4 h-4" />
                      {formData.image ? "استبدال الصورة" : "رفع صورة"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={uploadingImage}
                      />
                    </label>
                    <p className="text-xs text-[#78716C] mt-2">PNG, JPG, WebP أو AVIF. يتم التحويل تلقائياً.</p>
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
                  placeholder="https://www.youtube.com/watch?v=... أو https://youtu.be/..."
                  dir="rtl"
                  className="bg-white"
                />
                <p className="text-xs text-[#78716C] mt-1">
                  يمكنك إدخال رابط YouTube العادي (سيتم تحويله تلقائياً) أو رابط embed
                </p>
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
              disabled={isSaving}
              className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#B91C1C] text-white"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin ml-2 shrink-0" /> : <Save className="w-4 h-4 ml-2 shrink-0" />}
              حفظ
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
