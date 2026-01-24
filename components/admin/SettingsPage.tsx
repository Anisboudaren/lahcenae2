"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Image as ImageIcon } from "lucide-react";
import type { SiteSettings } from "@/lib/admin-data";
import { mapDbToSiteSettings, type DbSiteSettings } from "@/lib/db-mappers";
import { inscriptionFormSchema } from "@/lib/form-validation";
import { z } from "zod";

type FormFieldKey = keyof z.infer<typeof inscriptionFormSchema>;

const formFieldLabels: Record<FormFieldKey, { ar: string; fr: string }> = {
  licenseType: { ar: "نوع الرخصة", fr: "Type de permis" },
  nationalId: { ar: "الرقم الوطني", fr: "Numéro national" },
  nameAr: { ar: "الاسم بالعربية", fr: "Prénom (arabe)" },
  surnameAr: { ar: "اللقب بالعربية", fr: "Nom (arabe)" },
  nameFr: { ar: "الاسم بالفرنسية", fr: "Prénom (français)" },
  surnameFr: { ar: "اللقب بالفرنسية", fr: "Nom (français)" },
  gender: { ar: "الجنس", fr: "Sexe" },
  birthDate: { ar: "تاريخ الميلاد", fr: "Date de naissance" },
  birthWilaya: { ar: "ولاية الميلاد", fr: "Wilaya de naissance" },
  birthMunicipality: { ar: "بلدية الميلاد", fr: "Commune de naissance" },
  fatherName: { ar: "اسم الأب", fr: "Nom du père" },
  motherName: { ar: "اسم الأم", fr: "Prénom de la mère" },
  motherSurname: { ar: "لقب الأم", fr: "Nom de la mère" },
  address: { ar: "العنوان", fr: "Adresse" },
  maritalStatus: { ar: "الحالة المدنية", fr: "État civil" },
  phone1: { ar: "الهاتف 1", fr: "Téléphone 1" },
  phone2: { ar: "الهاتف 2", fr: "Téléphone 2" },
  originalNationality: { ar: "الجنسية الأصلية", fr: "Nationalité d'origine" },
  currentNationality: { ar: "الجنسية الحالية", fr: "Nationalité actuelle" },
};

export function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    logo: "",
    name: "",
    description: "",
    formElements: {},
  });
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: DbSiteSettings | null = await res.json();
      if (data) {
        setSettings(mapDbToSiteSettings(data));
      }
    } catch (e) {
      console.error("Failed to fetch settings:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logo: settings.logo,
          name: settings.name,
          description: settings.description,
          form_elements: settings.formElements,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("تم حفظ الإعدادات بنجاح");
    } catch (e) {
      console.error("Failed to save:", e);
      alert("فشل حفظ الإعدادات");
    } finally {
      setIsSaving(false);
    }
  };

  const updateFormElement = (
    fieldKey: FormFieldKey,
    updates: Partial<SiteSettings["formElements"][string]>
  ) => {
    const existingField = settings.formElements[fieldKey] || {};
    setSettings({
      ...settings,
      formElements: {
        ...settings.formElements,
        [fieldKey]: {
          label: existingField.label || formFieldLabels[fieldKey].ar,
          required: existingField.required ?? (inscriptionFormSchema.shape[fieldKey] ? true : false),
          visible: existingField.visible ?? true,
          ...updates,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#57534E]">إعدادات الموقع</CardTitle>
          <CardDescription className="text-[#78716C]">Paramètres du site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Settings */}
          <div className="space-y-2">
            <Label>شعار الموقع</Label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white">
                {settings.logo ? (
                  <img
                    src={settings.logo}
                    alt="Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  value={settings.logo}
                  onChange={(e) =>
                    setSettings({ ...settings, logo: e.target.value })
                  }
                  placeholder="/images/logo.png"
                  dir="rtl"
                />
                <p className="text-sm text-gray-500 mt-1">
                  أدخل مسار الصورة
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Site Name */}
          <div className="space-y-2">
            <Label>اسم الموقع</Label>
            <Input
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              placeholder="اسم الموقع..."
              dir="rtl"
            />
          </div>

          {/* Site Description */}
          <div className="space-y-2">
            <Label>وصف الموقع</Label>
            <Textarea
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
              placeholder="وصف الموقع..."
              rows={3}
              dir="rtl"
            />
          </div>

          <Separator />

          {/* Form Elements Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات حقول الاستمارة</h3>
              <div className="space-y-4">
                {(Object.keys(formFieldLabels) as FormFieldKey[]).map((fieldKey) => {
                  const fieldSettings = settings.formElements[fieldKey] || {
                    label: formFieldLabels[fieldKey].ar,
                    required: inscriptionFormSchema.shape[fieldKey] ? true : false,
                    visible: true,
                  };

                  return (
                    <Card key={fieldKey} className="p-4 border-gray-200">
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="font-medium text-[#57534E]">{formFieldLabels[fieldKey].ar}</p>
                          <p className="text-sm text-[#78716C]">
                            {formFieldLabels[fieldKey].fr}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`visible-${fieldKey}`} className="text-sm whitespace-nowrap">
                              مرئي
                            </Label>
                            <Switch
                              id={`visible-${fieldKey}`}
                              checked={fieldSettings.visible}
                              onCheckedChange={(checked) =>
                                updateFormElement(fieldKey, { visible: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`required-${fieldKey}`} className="text-sm whitespace-nowrap">
                              مطلوب
                            </Label>
                            <Switch
                              id={`required-${fieldKey}`}
                              checked={fieldSettings.required}
                              onCheckedChange={(checked) =>
                                updateFormElement(fieldKey, { required: checked })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-[#78716C] mb-1 block">تسمية الحقل</Label>
                          <Input
                            value={fieldSettings.label}
                            onChange={(e) =>
                              updateFormElement(fieldKey, { label: e.target.value })
                            }
                            placeholder="تسمية الحقل..."
                            dir="rtl"
                            className="bg-white"
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator />

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} className="min-w-32 bg-[#DC2626] hover:bg-[#B91C1C] text-white">
              {isSaving ? (
                "جاري الحفظ..."
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
