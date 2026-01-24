"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  licenseTypes,
  algerianWilayas,
  maritalStatusOptions,
  genderOptions,
} from "@/lib/constants";
import {
  inscriptionFormSchema,
  type InscriptionFormData,
} from "@/lib/form-validation";

interface MultiStepFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MultiStepForm({ open, onOpenChange }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const totalSteps = 5;

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

  // Update wilaya state when it changes (for display purposes)
  useEffect(() => {
    const wilaya = form.watch("birthWilaya");
    if (wilaya) {
      setSelectedWilaya(wilaya);
    }
  }, [form.watch("birthWilaya"), form]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setShowSuccess(false);
      form.reset();
    }
  }, [open, form]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof InscriptionFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["licenseType"];
    } else if (step === 2) {
      fieldsToValidate = ["nationalId", "nameAr", "surnameAr", "nameFr", "surnameFr", "gender", "birthDate", "birthWilaya", "birthMunicipality"];
    } else if (step === 3) {
      fieldsToValidate = ["fatherName", "motherName", "motherSurname"];
    } else if (step === 4) {
      fieldsToValidate = ["address", "maritalStatus", "phone1"];
    } else if (step === 5) {
      fieldsToValidate = ["originalNationality", "currentNationality"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: InscriptionFormData) => {
    console.log("Form data:", data);
    // Save to admin data storage
    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error("Error saving form submission:", error);
      // Optionally show error message to user
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#57534E]">
            سجّل الآن واحجز مكانك
          </DialogTitle>
          <DialogDescription>
            املأ النموذج وسنتصل بك في أقرب وقت
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s < step
                    ? "bg-[#DC2626] text-white"
                    : s === step
                    ? "bg-[#DC2626] text-white ring-4 ring-[#DC2626]/20"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? "bg-[#DC2626]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {showSuccess ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            </motion.div>
            <motion.p
              className="text-xl font-bold text-green-800 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              تم إرسال طلبك بنجاح!
            </motion.p>
            <motion.p
              className="text-[#78716C]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              سنتصل بك قريباً
            </motion.p>
          </motion.div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: License Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="licenseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-black font-semibold">نوع الرخصة المطلوبة *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} dir="rtl">
                          <FormControl>
                            <SelectTrigger className="w-full text-right h-12">
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
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">رقم بطاقة التعريف الوطنية *</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890123456" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nameAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">الاسم بالعربية *</FormLabel>
                        <FormControl>
                          <Input placeholder="محمد" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surnameAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">اللقب بالعربية *</FormLabel>
                        <FormControl>
                          <Input placeholder="بن علي" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nameFr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">الاسم بالفرنسية *</FormLabel>
                        <FormControl>
                          <Input placeholder="Mohamed" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surnameFr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">اللقب بالفرنسية *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ben Ali" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-black font-semibold">الجنس *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-row gap-6"
                          >
                            {genderOptions.map((option) => (
                              <div key={option.value} className="flex items-center gap-2">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value} className="cursor-pointer text-black font-semibold">
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
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">تاريخ الميلاد *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthWilaya"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">مكان الميلاد - الولاية *</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="birthMunicipality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">مكان الميلاد - البلدية *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل اسم البلدية"
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Family Information */}
              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">اسم الأب *</FormLabel>
                        <FormControl>
                          <Input placeholder="علي" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">اسم الأم *</FormLabel>
                        <FormControl>
                          <Input placeholder="فاطمة" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motherSurname"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-black font-semibold">لقب الأم *</FormLabel>
                        <FormControl>
                          <Input placeholder="بن أحمد" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Contact Information */}
              {step === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-black font-semibold">العنوان *</FormLabel>
                        <FormControl>
                          <Input placeholder="شارع... رقم..." {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">الحالة المدنية *</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="phone1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">رقم الهاتف 1 *</FormLabel>
                        <FormControl>
                          <Input placeholder="0550123456" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">رقم الهاتف 2 (اختياري)</FormLabel>
                        <FormControl>
                          <Input placeholder="0770123456" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Nationality */}
              {step === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="originalNationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">الجنسية الأصلية *</FormLabel>
                        <FormControl>
                          <Input placeholder="جزائري" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentNationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">الجنسية الحالية *</FormLabel>
                        <FormControl>
                          <Input placeholder="جزائري" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center gap-2"
                  >
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                  >
                    إرسال الطلب
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
