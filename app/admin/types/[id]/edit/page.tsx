"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, X, Save, Image as ImageIcon } from "lucide-react";
import {
  getLicenseTypes,
  saveLicenseType,
  type LicenseType,
} from "@/lib/admin-data";

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
  const [extraImageInput, setExtraImageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const types = getLicenseTypes();
    const type = types.find((t) => t.id === typeId);
    if (type) {
      setFormData(type);
    } else if (typeId === "new") {
      // New type
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
    }
    setIsLoading(false);
  }, [typeId]);

  const handleSave = () => {
    if (!formData.code || !formData.nameAr || !formData.nameFr) {
      alert("يرجى ملء الحقول المطلوبة");
      return;
    }

    const typeToSave: LicenseType = {
      id: typeId === "new" ? Date.now().toString() : typeId,
      code: formData.code,
      nameAr: formData.nameAr,
      nameFr: formData.nameFr,
      description: formData.description || "",
      imagePath: formData.imagePath || "",
      details: formData.details || [],
      offers: formData.offers || [],
      callToAction: formData.callToAction || "",
      videoLink: formData.videoLink,
      extraImages: formData.extraImages,
      text: formData.text,
      note: formData.note,
    };

    saveLicenseType(typeToSave);
    router.push("/admin/dashboard?tab=types");
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

  const addExtraImage = () => {
    if (extraImageInput.trim()) {
      setFormData({
        ...formData,
        extraImages: [...(formData.extraImages || []), extraImageInput.trim()],
      });
      setExtraImageInput("");
    }
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

  return (
    <div className="min-h-screen bg-white relative" dir="rtl">
      {/* Light dotted pattern on one side (right for RTL) */}
      <div
        className="absolute top-0 right-0 w-48 md:w-64 lg:w-80 h-full bg-dotted-pattern opacity-50 pointer-events-none"
        aria-hidden
      />

      {/* Header */}
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

      {/* Main Content */}
      <main className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
        <div className="space-y-6">
          {/* Basic Information */}
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
                <Label className="text-[#57534E]">مسار الصورة الرئيسية</Label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                    {formData.imagePath ? (
                      <div className="relative w-full h-full">
                        <img
                          src={formData.imagePath}
                          alt="Type image preview"
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
                      value={formData.imagePath}
                      onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                      placeholder="/types/categorie A.jpg"
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

          {/* Media */}
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
                <Label className="text-[#57534E]">الصور الإضافية</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={extraImageInput}
                    onChange={(e) => setExtraImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addExtraImage())}
                    placeholder="/images/extra-image.jpg"
                    dir="rtl"
                    className="bg-white"
                  />
                  <Button type="button" onClick={addExtraImage} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white">
                    إضافة
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.extraImages?.map((img, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded">
                      <span className="flex-1 text-right text-sm text-[#57534E]">{img}</span>
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

          {/* Details */}
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
                  <div key={index} className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded">
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

          {/* Offers */}
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
                  <div key={index} className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded">
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

          {/* Call to Action & Note */}
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

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/dashboard?tab=types")}
              className="border-[#78716C] text-[#57534E] hover:bg-gray-50"
            >
              إلغاء
            </Button>
            <Button onClick={handleSave} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
