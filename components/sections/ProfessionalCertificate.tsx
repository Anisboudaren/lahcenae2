"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { CheckCircle2 } from "lucide-react";

export function ProfessionalCertificate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionContainer 
      id="professional-certificate"
      className="relative bg-white"
      ref={ref}
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(220, 38, 38, 0.03) 10px,
          rgba(220, 38, 38, 0.03) 20px
        )`,
      }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#57534E]">
          شهادة الكفاءة المهنية لنقل البضائع
        </h2>
        <p className="text-lg md:text-xl text-[#78716C]">
          احصل على التأهيل المهني للعمل كسائق محترف
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left Column - Accordion */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-it" className="border border-gray-200 rounded-lg px-4 mb-4">
              <AccordionTrigger className="text-right text-lg font-bold text-[#57534E] hover:no-underline">
                ما هي؟
              </AccordionTrigger>
              <AccordionContent className="text-[#78716C] text-base leading-relaxed">
                شهادة الكفاءة المهنية هي وثيقة رسمية تثبت أن حاملها مؤهل للعمل كسائق محترف لنقل البضائع. 
                هذه الشهادة إلزامية لكل من يرغب في العمل في مجال النقل التجاري والصناعي في الجزائر.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="why-necessary" className="border border-gray-200 rounded-lg px-4 mb-4">
              <AccordionTrigger className="text-right text-lg font-bold text-[#57534E] hover:no-underline">
                لماذا هي ضرورية؟
              </AccordionTrigger>
              <AccordionContent className="text-[#78716C] text-base leading-relaxed">
                <ul className="list-none space-y-2 pr-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>مطلوبة قانونياً للعمل في مجال النقل التجاري</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>تفتح آفاقاً واسعة للعمل في الشركات الكبرى</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>تزيد من فرص الحصول على رواتب أفضل</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>تعزز المصداقية المهنية والثقة</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-is-it-for" className="border border-gray-200 rounded-lg px-4 mb-4">
              <AccordionTrigger className="text-right text-lg font-bold text-[#57534E] hover:no-underline">
                لمن هي؟
              </AccordionTrigger>
              <AccordionContent className="text-[#78716C] text-base leading-relaxed">
                <ul className="list-none space-y-2 pr-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>السائقين الذين يرغبون في العمل في مجال النقل التجاري</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>حاملي رخص C1, C2, E الذين يريدون العمل في الشركات</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>الذين يسعون لتطوير مهاراتهم المهنية</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-get" className="border border-gray-200 rounded-lg px-4 mb-4">
              <AccordionTrigger className="text-right text-lg font-bold text-[#57534E] hover:no-underline">
                كيف تحصل عليها؟
              </AccordionTrigger>
              <AccordionContent className="text-[#78716C] text-base leading-relaxed">
                <ul className="list-none space-y-2 pr-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>الحصول على رخصة قيادة من الصنف C1, C2, أو E</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>إتمام دورة التكوين المهني (11 يوماً)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>اجتياز الامتحان النظري والعملي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] mt-0.5 shrink-0" />
                    <span>الحصول على الشهادة المعتمدة</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="costs-duration" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-right text-lg font-bold text-[#57534E] hover:no-underline">
                التكاليف والمدة
              </AccordionTrigger>
              <AccordionContent className="text-[#78716C] text-base leading-relaxed">
                <p className="mb-4">
                  لمزيد من المعلومات حول التكاليف والبرنامج التفصيلي، يرجى الاتصال بنا أو زيارة المدرسة.
                </p>
                <p className="font-semibold text-[#57534E]">
                  مدة التكوين: 11 يوماً
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right Column - Sticky Card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="border-2 border-[#F59E0B] shadow-lg bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#57534E] mb-4">
                نوفر أيضاً
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="rounded-lg overflow-hidden mb-6 shadow-lg bg-white relative">
                <div className="relative w-full" style={{ aspectRatio: "210/297" }}>
                  <Image
                    src="/certifciate/image.png"
                    alt="شهادة الكفاءة المهنية"
                    fill
                    className="object-contain"
                    priority
                  />
                  {/* Duration Stamp on Top of Certificate */}
                  <div className="absolute top-4 right-4 z-10 transform rotate-12">
                    <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] text-white px-4 py-3 rounded-lg shadow-2xl border-4 border-white">
                      <div className="text-3xl font-bold mb-1">11</div>
                      <div className="text-sm font-semibold">يوماً</div>
                      <div className="text-xs mt-1 opacity-90">مدة التكوين</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white py-6 text-lg font-bold"
                  onClick={() => {
                    const formSection = document.getElementById("inscription-form");
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  استفسر الآن
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white py-6 text-lg font-semibold"
                  onClick={() => {
                    // Scroll to the accordion section or expand first item
                    const firstAccordion = document.querySelector('[value="what-is-it"]');
                    if (firstAccordion) {
                      firstAccordion.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                >
                  معرفة المزيد
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
