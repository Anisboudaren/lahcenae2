"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function A1LicenseUpdate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToLicenseCategories = () => {
    const licenseSection = document.getElementById("license-categories");
    if (licenseSection) {
      licenseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionContainer className="bg-[#FEF3C7]" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-[#F59E0B] rounded-full p-3 shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#57534E]">
                هل تعلم؟ رخصة B تخولك قيادة الدراجات النارية الخفيفة
              </h3>
              <p className="text-base md:text-lg text-[#78716C] leading-relaxed mb-6">
                رخص السيارات (الصنف B) أصبحت تخول لحاملها قانونيًا قيادة الدراجات النارية من الصنف A1 
                (حتى 125 سم³) دون الحاجة لرخصة منفصلة، وفقًا لتحديثات قانون المرور.
              </p>
              <Button
                onClick={scrollToLicenseCategories}
                variant="outline"
                className="border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
              >
                معرفة التفاصيل
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
