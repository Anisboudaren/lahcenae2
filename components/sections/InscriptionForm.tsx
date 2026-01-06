"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Phone, MapPin, Clock } from "lucide-react";
import {
  licenseTypes,
  algerianWilayas,
  getMunicipalities,
  maritalStatusOptions,
  genderOptions,
} from "@/lib/constants";
import {
  inscriptionFormSchema,
  type InscriptionFormData,
} from "@/lib/form-validation";

export function InscriptionForm() {
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]);

  const form = useForm<InscriptionFormData>({
    resolver: zodResolver(inscriptionFormSchema),
    defaultValues: {
      licenseType: "",
      nationalId: "",
      nameAr: "",
      surnameAr: "",
      nameFr: "",
      surnameFr: "",
      gender: undefined,
      birthDate: "",
      birthWilaya: "",
      birthMunicipality: "",
      fatherName: "",
      motherName: "",
      motherSurname: "",
      address: "",
      maritalStatus: "",
      phone1: "",
      phone2: "",
      originalNationality: "",
      currentNationality: "",
    },
  });

  // Check for pre-selected license from sessionStorage
  useEffect(() => {
    const selectedLicense = sessionStorage.getItem("selectedLicense");
    if (selectedLicense) {
      form.setValue("licenseType", selectedLicense);
      sessionStorage.removeItem("selectedLicense");
    }
  }, [form]);

  // Update municipalities when wilaya changes
  useEffect(() => {
    const wilaya = form.watch("birthWilaya");
    if (wilaya) {
      setSelectedWilaya(wilaya);
      const municipalities = getMunicipalities(wilaya);
      setSelectedMunicipalities(municipalities);
      // Reset municipality when wilaya changes
      form.setValue("birthMunicipality", "");
    }
  }, [form.watch("birthWilaya"), form]);

  const onSubmit = (data: InscriptionFormData) => {
    console.log("Form data:", data);
    // In a real app, this would submit to an API
    setShowSuccess(true);
    form.reset();
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <SectionContainer id="inscription-form" className="bg-[#FEF9E7]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#57534E]">
          سجّل الآن واحجز مكانك
        </h2>
        <p className="text-lg md:text-xl text-[#78716C]">
          املأ النموذج وسنتصل بك في أقرب وقت
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
        {/* Form */}
        <div>
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <p className="text-green-800 font-medium">
                تم إرسال طلبك بنجاح! سنتصل بك قريباً.
              </p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* License Type */}
                <FormField
                  control={form.control}
                  name="licenseType"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>نوع الرخصة المطلوبة *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} dir="rtl">
                        <FormControl>
                          <SelectTrigger className="w-full text-right">
                            <SelectValue placeholder="اختر نوع الرخصة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {licenseTypes.map((license) => (
                            <SelectItem key={license.code} value={license.code}>
                              {license.code} - {license.nameAr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* National ID */}
                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم بطاقة التعريف الوطنية *</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Arabic Name */}
                <FormField
                  control={form.control}
                  name="nameAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم بالعربية *</FormLabel>
                      <FormControl>
                        <Input placeholder="محمد" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Arabic Surname */}
                <FormField
                  control={form.control}
                  name="surnameAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اللقب بالعربية *</FormLabel>
                      <FormControl>
                        <Input placeholder="بن علي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* French Name */}
                <FormField
                  control={form.control}
                  name="nameFr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم بالفرنسية *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mohamed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* French Surname */}
                <FormField
                  control={form.control}
                  name="surnameFr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اللقب بالفرنسية *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ben Ali" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>الجنس *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-6"
                        >
                          {genderOptions.map((option) => (
                            <div key={option.value} className="flex items-center gap-2">
                              <RadioGroupItem value={option.value} id={option.value} />
                              <Label htmlFor={option.value} className="cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birth Date */}
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ الميلاد *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birth Wilaya */}
                <FormField
                  control={form.control}
                  name="birthWilaya"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مكان الميلاد - الولاية *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} dir="rtl">
                        <FormControl>
                          <SelectTrigger className="w-full text-right">
                            <SelectValue placeholder="اختر الولاية" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {algerianWilayas.map((wilaya) => (
                            <SelectItem key={wilaya} value={wilaya}>
                              {wilaya}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birth Municipality */}
                <FormField
                  control={form.control}
                  name="birthMunicipality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مكان الميلاد - البلدية *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedWilaya}
                        dir="rtl"
                      >
                        <FormControl>
                          <SelectTrigger className="w-full text-right">
                            <SelectValue placeholder={selectedWilaya ? "اختر البلدية" : "اختر الولاية أولاً"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedMunicipalities.map((municipality) => (
                            <SelectItem key={municipality} value={municipality}>
                              {municipality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Father Name */}
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الأب *</FormLabel>
                      <FormControl>
                        <Input placeholder="علي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mother Name */}
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الأم *</FormLabel>
                      <FormControl>
                        <Input placeholder="فاطمة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mother Surname */}
                <FormField
                  control={form.control}
                  name="motherSurname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>لقب الأم *</FormLabel>
                      <FormControl>
                        <Input placeholder="بن أحمد" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>العنوان *</FormLabel>
                      <FormControl>
                        <Input placeholder="شارع... رقم..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marital Status */}
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الحالة المدنية *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} dir="rtl">
                        <FormControl>
                          <SelectTrigger className="w-full text-right">
                            <SelectValue placeholder="اختر الحالة المدنية" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {maritalStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone 1 */}
                <FormField
                  control={form.control}
                  name="phone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف 1 *</FormLabel>
                      <FormControl>
                        <Input placeholder="0550123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone 2 */}
                <FormField
                  control={form.control}
                  name="phone2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف 2 (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="0770123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Original Nationality */}
                <FormField
                  control={form.control}
                  name="originalNationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجنسية الأصلية *</FormLabel>
                      <FormControl>
                        <Input placeholder="جزائري" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Nationality */}
                <FormField
                  control={form.control}
                  name="currentNationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجنسية الحالية *</FormLabel>
                      <FormControl>
                        <Input placeholder="جزائري" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white py-6 text-lg"
              >
                إرسال الطلب
              </Button>
            </form>
          </Form>
        </div>

        {/* Summary Card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="bg-white border-2 border-[#FDE68A] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#57534E]">
                لماذا التسجيل معنا؟
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  "مدرسة معتمدة رسمياً",
                  "مدربون محترفون وذوو خبرة",
                  "مركبات حديثة ومجهزة",
                  "أسعار تنافسية",
                  "جدول مرن يناسب الجميع",
                  "متابعة شخصية لكل طالب",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span className="text-[#78716C]">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#57534E]">اتصل بنا</p>
                    <p className="text-[#78716C]">0550123456</p>
                    <p className="text-[#78716C]">0770123456</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#57534E]">العنوان</p>
                    <p className="text-[#78716C]">وهران، الجزائر</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#57534E]">ساعات العمل</p>
                    <p className="text-[#78716C]">من السبت إلى الخميس</p>
                    <p className="text-[#78716C]">8:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionContainer>
  );
}
