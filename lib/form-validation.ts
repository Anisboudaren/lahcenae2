import { z } from "zod";

export const inscriptionFormSchema = z.object({
  licenseType: z.string().min(1, "يجب اختيار نوع الرخصة"),
  nationalId: z.string().min(1, "رقم بطاقة التعريف الوطنية مطلوب").regex(/^\d+$/, "يجب أن يكون رقماً"),
  nameAr: z.string().min(2, "الاسم بالعربية مطلوب"),
  surnameAr: z.string().min(2, "اللقب بالعربية مطلوب"),
  nameFr: z.string().min(2, "الاسم بالفرنسية مطلوب"),
  surnameFr: z.string().min(2, "اللقب بالفرنسية مطلوب"),
  gender: z.enum(["ذكر", "أنثى"]).refine((val) => val === "ذكر" || val === "أنثى", {
    message: "يجب اختيار الجنس",
  }),
  birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),
  birthWilaya: z.string().min(1, "يجب اختيار الولاية"),
  birthMunicipality: z.string().min(1, "يجب اختيار البلدية"),
  fatherName: z.string().min(2, "اسم الأب مطلوب"),
  motherName: z.string().min(2, "اسم الأم مطلوب"),
  motherSurname: z.string().min(2, "لقب الأم مطلوب"),
  address: z.string().min(5, "العنوان مطلوب"),
  maritalStatus: z.string().min(1, "يجب اختيار الحالة المدنية"),
  phone1: z.string().min(1, "رقم الهاتف 1 مطلوب").regex(/^[0-9+\-\s()]+$/, "رقم هاتف غير صحيح"),
  phone2: z.string().optional(),
  originalNationality: z.string().min(2, "الجنسية الأصلية مطلوبة"),
  currentNationality: z.string().min(2, "الجنسية الحالية مطلوبة"),
});

export type InscriptionFormData = z.infer<typeof inscriptionFormSchema>;
