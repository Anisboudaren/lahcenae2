"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";

const categories = [
  {
    code: "A",
    nameAr: "رخصة A",
    nameFr: "Permis A",
    imagePath: "/types/categorie A.jpg",
  },
  {
    code: "A1",
    nameAr: "رخصة A1",
    nameFr: "Permis A1",
    imagePath: "/types/categorie A1.jpg",
  },
  {
    code: "B",
    nameAr: "رخصة B",
    nameFr: "Permis B",
    imagePath: "/types/categorie b.jpg",
  },
  {
    code: "C",
    nameAr: "رخصة C",
    nameFr: "Permis C",
    imagePath: "/types/categorie c.jpg",
  },
  {
    code: "C1",
    nameAr: "رخصة C1",
    nameFr: "Permis C1",
    imagePath: "/types/categorie c1.jpg",
  },
  {
    code: "D",
    nameAr: "رخصة D",
    nameFr: "Permis D",
    imagePath: "/types/categorie d.jpg",
  },
  {
    code: "E",
    nameAr: "رخصة E",
    nameFr: "Permis E",
    imagePath: "/types/categorie e.jpg",
  },
];

const licenseDetails: Record<string, {
  description: string;
  details: string[];
  note?: string;
  offers: string[];
  callToAction: string;
}> = {
  A: {
    description: "رخصة A2: الدراجات النارية من الصنف ب (حجم الاسطوانة من 80 إلى 400 سم مكعب) والصنف ج (أكثر من 400 سم مكعب).",
    details: [
      "الدراجات النارية من الصنف ب: حجم الاسطوانة من 80 إلى 400 سم مكعب",
      "الدراجات النارية من الصنف ج: أكثر من 400 سم مكعب",
      "تسمح بقيادة جميع أنواع الدراجات النارية بدون قيود على حجم المحرك"
    ],
    offers: [
      "مدرّبون محترفون ذوو خبرة في قيادة الدراجات النارية",
      "تجهيزات عصرية ودراجات نارية مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك على الطريق",
      "برنامج تدريبي شامل يتضمن التدريب النظري والعملي"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة الدراجات النارية من الصنف A2"
  },
  A1: {
    description: "رخصة A1: الدراجات النارية من الصنف أ (حجم الاسطوانة من 50 إلى 80 سنتمتر مكعب) والدراجات الثلاثية والرباعية العجلات (حجم الاسطوانة يساوي أو يقل عن 125 سم مكعب).",
    details: [
      "الدراجات النارية من الصنف أ: حجم الاسطوانة من 50 إلى 80 سم مكعب",
      "الدراجات الثلاثية والرباعية العجلات: حجم الاسطوانة يساوي أو يقل عن 125 سم مكعب",
      "دراجات نارية خفيفة (Mobylettes, Scooters) مثل الكوكسي والاستايت"
    ],
    note: "ملاحظة مهمة: رخص السيارات (الصنف B) أصبحت تخول لحاملها قانونيًا قيادة الدراجات النارية من الصنف A1 دون الحاجة لرخصة منفصلة، وفقًا لتحديثات قانون المرور في الجزائر.",
    offers: [
      "مدرّبون محترفون ذوو خبرة في قيادة الدراجات النارية الخفيفة",
      "تجهيزات عصرية ودراجات خفيفة مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك على الطريق",
      "برنامج تدريبي متكامل مناسب للمبتدئين"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة الدراجات النارية الخفيفة"
  },
  B: {
    description: "رخصة B: السيارات الأقل من 10 مقاعد وزنها الاجمالي مع الحمولة أقل من 3.5 طن.",
    details: [
      "السيارات الأقل من 10 مقاعد",
      "الوزن الإجمالي مع الحمولة أقل من 3.5 طن",
      "أكثر رخص السياقة شيوعًا"
    ],
    note: "ملاحظة: حاملي رخصة B يمكنهم قيادة الدراجات النارية من الصنف A1 (حتى 125 سم مكعب) دون رخصة منفصلة.",
    offers: [
      "مدرّبون محترفون ذوو خبرة واسعة في تعليم قيادة السيارات",
      "تجهيزات عصرية وسيارات مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك خلف عجلة القيادة",
      "برنامج تدريبي شامل مع 20 ساعة تدريب عملي"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة السيارات"
  },
  C: {
    description: "رخصة C2: تسمح بقيادة مركبات نقل البضائع التي يتجاوز وزنها مع الحمولة 19 طن (مركبة منفردة) أو التي يتجاوز وزنها 12.5 طن (مركبة جارة لمجموعة مركبات أو مركبة متمفصلة).",
    details: [
      "مركبات نقل البضائع التي يتجاوز وزنها مع الحمولة 19 طن (مركبة منفردة)",
      "مركبات نقل البضائع التي يتجاوز وزنها 12.5 طن (مركبة جارة لمجموعة مركبات أو مركبة متمفصلة)"
    ],
    offers: [
      "مدرّبون محترفون ذوو خبرة في قيادة الشاحنات الثقيلة",
      "تجهيزات عصرية ومركبات نقل مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة التجارية",
      "برنامج تدريبي متقدم مع 30 ساعة تدريب عملي"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات نقل البضائع الثقيلة"
  },
  C1: {
    description: "رخصة C1: تسمح بقيادة المركبات المنفردة المخصصة لنقل البضائع التي يكون وزنها بين 3.5 طن و 19 طن.",
    details: [
      "المركبات المنفردة المخصصة لنقل البضائع",
      "الوزن بين 3.5 طن و 19 طن",
      "تستخدم في النقل التجاري للمسافات المتوسطة"
    ],
    offers: [
      "مدرّبون محترفون ذوو خبرة في قيادة مركبات النقل المتوسطة",
      "تجهيزات عصرية ومركبات نقل مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة التجارية",
      "برنامج تدريبي شامل مع 25 ساعة تدريب عملي"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات نقل البضائع المتوسطة"
  },
  D: {
    description: "رخصة D: سيارات النقل العام للأشخاص (أكثر من 9 مقاعد)، أو التي يتجاوز وزنها الإجمالي المرخص به مع الحمولة 3.5 طن.",
    details: [
      "سيارات النقل العام للأشخاص (أكثر من 9 مقاعد)",
      "المركبات التي يتجاوز وزنها الإجمالي المرخص به مع الحمولة 3.5 طن",
      "تستخدم في النقل الجماعي للأشخاص"
    ],
    offers: [
      "مدرّبون محترفون ذوو خبرة في قيادة مركبات النقل الجماعي",
      "تجهيزات عصرية ومركبات نقل عام مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك في النقل الجماعي",
      "برنامج تدريبي متقدم مع 40 ساعة تدريب عملي"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات النقل العام للأشخاص"
  },
  E: {
    description: "رخصة E: السيارات من الصنف 'ب - ج - د' تجر مقطورة وزنها أكبر من 750 كلغ.",
    details: [
      "السيارات من الصنف ب التي تجر مقطورة وزنها أكبر من 750 كلغ",
      "السيارات من الصنف ج التي تجر مقطورة وزنها أكبر من 750 كلغ",
      "السيارات من الصنف د التي تجر مقطورة وزنها أكبر من 750 كلغ"
    ],
    offers: [
      "مدرّبون محترفون ذوو خبرة في قيادة المركبات مع المقطورات",
      "تجهيزات عصرية ومركبات مع مقطورات مخصّصة للتدريب",
      "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة المعقدة",
      "برنامج تدريبي متخصص مع 15 ساعة تدريب عملي"
    ],
    callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة المركبات مع المقطورات"
  },
};

export function Categories2() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { openForm } = useFormContext();

  const handleShowDetails = (code: string) => {
    setSelectedCategory(code);
    setIsOpen(true);
  };

  const handleRegister = () => {
    if (selectedCategory) {
      sessionStorage.setItem("selectedLicense", selectedCategory);
    }
    setIsOpen(false);
    openForm();
  };

  const category = selectedCategory ? categories.find(c => c.code === selectedCategory) : null;
  const details = selectedCategory ? licenseDetails[selectedCategory] : null;
  return (
    <section className="relative w-full bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            أصناف الرخص المتوفرة
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            اختر الصنف المناسب لك
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.code}
              onClick={() => handleShowDetails(category.code)}
              className="relative bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden active:scale-[0.98] rounded-lg"
            >
              <div className="relative w-full min-h-[300px] bg-gray-50">
                <Image
                  src={category.imagePath}
                  alt={category.nameAr}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  priority={index < 4}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowDetails(category.code);
                }}
                className="absolute bottom-0 left-0 right-0 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-[5px] transition-colors duration-300 z-10 rounded-b-lg"
              >
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
        <DrawerContent className="!max-h-[90vh] bg-white flex flex-col">
          <div className="flex flex-col flex-1 overflow-hidden">
            <DrawerHeader className="bg-white flex-shrink-0">
              <DrawerTitle className="text-2xl font-bold text-gray-900">
                {category?.nameAr} - {category?.nameFr}
              </DrawerTitle>
              <DrawerDescription className="text-base text-gray-700 leading-relaxed">
                {details?.description}
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 pb-4 space-y-6 bg-white overflow-y-auto flex-1">
              {details?.details && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">التفاصيل:</h3>
                  <ul className="space-y-3">
                    {details.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-sky-500 mt-1 font-bold">•</span>
                        <span className="flex-1 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details?.note && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-sky-50 border-r-4 border-sky-500 p-4 rounded-lg">
                    <p className="text-base text-gray-800 leading-relaxed font-medium">
                      {details.note}
                    </p>
                  </div>
                </div>
              )}

              {details?.offers && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ما نقدمه لك:</h3>
                  <ul className="space-y-3">
                    {details.offers.map((offer, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-sky-500 mt-1 font-bold">•</span>
                        <span className="flex-1 leading-relaxed">{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details?.callToAction && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-base text-gray-800 leading-relaxed font-semibold">
                    {details.callToAction}
                  </p>
                </div>
              )}
            </div>

            <DrawerFooter className="bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  إغلاق
                </Button>
                <Button 
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={handleRegister}
                >
                  تسجيل
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
