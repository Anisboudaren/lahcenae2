"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, X, Save, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { mapDbToLicenseType, type DbLicenseType } from "@/lib/db-mappers";
import type { LicenseType } from "@/lib/admin-data";

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

export default function EditTypePage() {
  const router = useRouter();
  const params = useParams();
  const typeId = params.id as string;

  const [formData, setFormData] = useState<Partial<LicenseType>>({
    code: "",
    nameAr: "",
    nameFr: "",
    description: "",
    imagePath: "",
    details: [],
    offers: [],
    callToAction: "",
    videoLink: "",
    extraImages: [],
    text: "",
  });
  const [detailInput, setDetailInput] = useState("");
  const [offerInput, setOfferInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]);

  async function loadType() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/admin/license-types");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: DbLicenseType[] = await res.json();
      if (typeId === "new") {
        setFormData({
          code: "",
          nameAr: "",
          nameFr: "",
          description: "",
          imagePath: "",
          details: [],
          offers: [],
          callToAction: "",
          videoLink: "",
          extraImages: [],
          text: "",
        });
      } else {
        const row = data.find((t) => t.id === typeId);
        if (row) setFormData(mapDbToLicenseType(row));
        else setError("الصنف غير موجود");
      }
    } catch (e) {
      setError("فشل تحميل البيانات");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingMain(true);
      const url = await uploadImage(file, "types");
      setFormData({ ...formData, imagePath: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل رفع الصورة");
    } finally {
      setUploadingMain(false);
      e.target.value = "";
    }
  }

  async function handleExtraImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingExtra(true);
      const url = await uploadImage(file, "types");
      setFormData({
        ...formData,
        extraImages: [...(formData.extraImages || []), url],
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل رفع الصورة");
    } finally {
      setUploadingExtra(false);
      e.target.value = "";
    }
  }

  const handleSave = async () => {
    if (!formData.code?.trim() || !formData.nameAr?.trim() || !formData.nameFr?.trim()) {
      alert("يرجى ملء الحقول المطلوبة (الكود، الاسم بالعربية، الاسم بالفرنسية)");
      return;
    }

    const payload = {
      code: formData.code.trim(),
      name_ar: formData.nameAr.trim(),
      name_fr: formData.nameFr.trim(),
      description: formData.description ?? "",
      image_path: formData.imagePath ?? "",
      details: formData.details ?? [],
      offers: formData.offers ?? [],
      call_to_action: formData.callToAction ?? "",
      video_link: formData.videoLink?.trim() || null,
      extra_images: formData.extraImages ?? [],
      text: formData.text ?? null,
      note: formData.note ?? null,
    };

    try {
      setIsSaving(true);
      setError(null);
      if (typeId === "new") {
        const res = await fetch("/api/admin/license-types", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "فشل الحفظ");
        }
      } else {
        const res = await fetch("/api/admin/license-types", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "فشل الحفظ");
        }
      }
      router.push("/admin/dashboard?tab=types");
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
    } finally {
      setIsSaving(false);
    }
  };

  const addDetail = () => {
    if (detailInput.trim()) {
      setFormData({
        ...formData,
        details: [...(formData.details || []), detailInput.trim()],
      });
      setDetailInput("");
    }
  };

  const removeDetail = (index: number) => {
    setFormData({
      ...formData,
      details: formData.details?.filter((_, i) => i !== index) || [],
    });
  };

  const addOffer = () => {
    if (offerInput.trim()) {
      setFormData({
        ...formData,
        offers: [...(formData.offers || []), offerInput.trim()],
      });
      setOfferInput("");
    }
  };

  const removeOffer = (index: number) => {
    setFormData({
      ...formData,
      offers: formData.offers?.filter((_, i) => i !== index) || [],
    });
  };

  const removeExtraImage = (index: number) => {
    setFormData({
      ...formData,
      extraImages: formData.extraImages?.filter((_, i) => i !== index) || [],
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <p className="text-[#57534E]">جاري التحميل...</p>
      </div>
    );
  }

  if (error && typeId !== "new" && !formData.code) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.push("/admin/dashboard?tab=types")} variant="outline">
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
                {typeId === "new" ? "إضافة صنف جديد" : "تعديل الصنف"}
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] mt-0.5">
                {typeId === "new" ? "Ajouter un nouveau type" : "Modifier le type"}
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin/dashboard?tab=types")}
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-[#78716C] text-[#57534E] hover:bg-gray-50 h-10 sm:h-9"
            >
              <ArrowRight className="w-4 h-4 shrink-0" />
              العودة
            </Button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
        )}
        <div className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">المعلومات الأساسية</CardTitle>
              <CardDescription className="text-[#78716C]">Informations de base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#57534E]">الكود *</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="مثال: A, B, C"
                    dir="rtl"
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-[#57534E]">الاسم بالعربية *</Label>
                  <Input
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    placeholder="رخصة A"
                    dir="rtl"
                    className="bg-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#57534E]">الاسم بالفرنسية *</Label>
                <Input
                  value={formData.nameFr}
                  onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                  placeholder="Permis A"
                  className="bg-white"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[#57534E]">الصورة الرئيسية</Label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                    {formData.imagePath ? (
                      <img
                        src={formData.imagePath}
                        alt="معاينة"
                        className="w-full h-full object-cover"
                      />
                    ) : uploadingMain ? (
                      <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-sm font-medium">
                      <Upload className="w-4 h-4" />
                      {formData.imagePath ? "استبدال الصورة" : "رفع صورة"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleMainImageChange}
                        disabled={uploadingMain}
                      />
                    </label>
                    <p className="text-xs text-[#78716C] mt-2">PNG, JPG, WebP أو AVIF. يتم التحويل تلقائياً.</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-[#57534E]">الوصف</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="وصف الصنف..."
                  rows={3}
                  dir="rtl"
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">الوسائط</CardTitle>
              <CardDescription className="text-[#78716C]">Médias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#57534E]">رابط الفيديو (اختياري)</Label>
                <Input
                  value={formData.videoLink || ""}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                  dir="rtl"
                  className="bg-white"
                />
                <p className="text-xs text-[#78716C] mt-1">أدخل الرابط فقط (مثال: YouTube embed)</p>
              </div>

              <div>
                <Label className="text-[#57534E]">النص الإضافي</Label>
                <Textarea
                  value={formData.text || ""}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="نص إضافي للصنف..."
                  rows={4}
                  dir="rtl"
                  className="bg-white"
                />
              </div>

              <div>
                <Label className="text-[#57534E]">صور إضافية</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    {uploadingExtra ? "جاري الرفع..." : "رفع صورة"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleExtraImageChange}
                      disabled={uploadingExtra}
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  {formData.extraImages?.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded"
                    >
                      <img src={url} alt="" className="w-12 h-12 object-cover rounded" />
                      <span className="flex-1 text-right text-sm text-[#57534E] truncate max-w-[200px]">
                        صورة {index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExtraImage(index)}
                        className="text-[#DC2626] hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">التفاصيل</CardTitle>
              <CardDescription className="text-[#78716C]">Détails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={detailInput}
                  onChange={(e) => setDetailInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())}
                  placeholder="أضف تفصيل..."
                  dir="rtl"
                  className="bg-white"
                />
                <Button type="button" onClick={addDetail} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white">
                  إضافة
                </Button>
              </div>
              <div className="space-y-2">
                {formData.details?.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded"
                  >
                    <span className="flex-1 text-right text-[#57534E]">{detail}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDetail(index)}
                      className="text-[#DC2626] hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">العروض</CardTitle>
              <CardDescription className="text-[#78716C]">Offres</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={offerInput}
                  onChange={(e) => setOfferInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addOffer())}
                  placeholder="أضف عرض..."
                  dir="rtl"
                  className="bg-white"
                />
                <Button type="button" onClick={addOffer} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white">
                  إضافة
                </Button>
              </div>
              <div className="space-y-2">
                {formData.offers?.map((offer, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded"
                  >
                    <span className="flex-1 text-right text-[#57534E]">{offer}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOffer(index)}
                      className="text-[#DC2626] hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#57534E]">دعوة للعمل وملاحظات</CardTitle>
              <CardDescription className="text-[#78716C]">Appel à l'action et notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#57534E]">دعوة للعمل</Label>
                <Textarea
                  value={formData.callToAction || ""}
                  onChange={(e) => setFormData({ ...formData, callToAction: e.target.value })}
                  placeholder="سجّل الآن..."
                  rows={2}
                  dir="rtl"
                  className="bg-white"
                />
              </div>
              <div>
                <Label className="text-[#57534E]">ملاحظة (اختياري)</Label>
                <Textarea
                  value={formData.note || ""}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="ملاحظة مهمة..."
                  rows={2}
                  dir="rtl"
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/dashboard?tab=types")}
              className="border-[#78716C] text-[#57534E] hover:bg-gray-50"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Save className="w-4 h-4 ml-2" />}
              حفظ
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
