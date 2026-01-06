"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { DecorativeDivider } from "@/components/shared/DecorativeDivider";
import { licenseTypes } from "@/lib/constants";
import { useFormContext } from "@/contexts/FormContext";

export function LicenseCategories() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedLicenseInfo, setSelectedLicenseInfo] = useState<string | null>(null);
  const { openForm } = useFormContext();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openLicenseInfo = (licenseCode: string) => {
    setSelectedLicenseInfo(licenseCode);
  };

  const closeLicenseInfo = () => {
    setSelectedLicenseInfo(null);
  };

  const handleInscriptionFromInfo = (licenseCode: string) => {
    sessionStorage.setItem("selectedLicense", licenseCode);
    closeLicenseInfo();
    openForm();
  };

  const scrollToForm = (licenseCode: string) => {
    sessionStorage.setItem("selectedLicense", licenseCode);
    openForm();
  };

  const selectedLicense = selectedLicenseInfo
    ? licenseTypes.find((l) => l.code === selectedLicenseInfo)
    : null;

  return (
    <SectionContainer id="license-categories" className="bg-[#FEF9E7]" ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#57534E]">
          اختر صنف الرخصة المناسب لك
        </h2>
        <p className="text-lg md:text-xl text-[#78716C]">
          نوفر تدريباً شاملاً لجميع أصناف رخص السياقة
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {licenseTypes.map((license, index) => {
          const isHovered = hoveredCard === license.code;
          
          return (
            <motion.div
              key={license.code}
              className="flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-t-[#DC2626] bg-white h-[400px] md:h-[450px]"
                onMouseEnter={() => setHoveredCard(license.code)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image - Full Background */}
                <div className="absolute inset-0 bg-white">
                  <Image
                    src={license.imagePath}
                    alt={license.nameAr}
                    fill
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>

                {/* Logo - Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  <Image
                    src="/images/logo no bg.png"
                    alt="Logo"
                    width={80}
                    height={32}
                    className="h-8 w-auto md:h-10 md:w-auto object-contain drop-shadow-lg"
                  />
                </div>

                {/* Buttons - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  {/* License Type Badge - Above Buttons on Right */}
                  <div className="flex justify-end mb-2">
                    <div className="bg-[#DC2626] text-white px-4 py-2 rounded-lg font-bold text-lg md:text-xl shadow-lg">
                      {license.code}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {isHovered && (
                      <Button
                        onClick={() => scrollToForm(license.code)}
                        className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
                      >
                        التسجيل لهذا الصنف
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => openLicenseInfo(license.code)}
                      className="w-full border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white bg-white/95 backdrop-blur-sm font-semibold shadow-md"
                    >
                      معرفة المزيد
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Description Text Below Card */}
              <div className="mt-4 px-2">
                <p className="text-base md:text-lg text-[#57534E] font-medium text-center leading-relaxed">
                  {license.description}
                </p>
              </div>
              
              {/* Add divider after every 3 cards (desktop) */}
              {(index + 1) % 3 === 0 && index < licenseTypes.length - 1 && (
                <div className="hidden lg:block mt-8">
                  <DecorativeDivider />
                </div>
              )}
              {/* Add divider after every 2 cards (tablet) */}
              {(index + 1) % 2 === 0 && index < licenseTypes.length - 1 && (
                <div className="hidden md:block lg:hidden mt-8">
                  <DecorativeDivider />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* License Info Dialog */}
      <Dialog open={!!selectedLicenseInfo} onOpenChange={(open) => !open && closeLicenseInfo()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-[#57534E] text-center">
              {selectedLicense?.code} - {selectedLicense?.nameAr}
            </DialogTitle>
            <DialogDescription className="text-center text-[#78716C] text-sm sm:text-base">
              {selectedLicense?.nameFr}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedLicense?.imagePath && (
              <div className="flex justify-center">
                <Image
                  src={selectedLicense.imagePath}
                  alt={selectedLicense.nameAr}
                  width={200}
                  height={200}
                  className="object-contain w-32 h-32 sm:w-48 sm:h-48"
                />
              </div>
            )}
            
            <div className="bg-[#FEF3C7] rounded-lg p-3 sm:p-4">
              <p className="text-[#57534E] font-semibold text-center text-sm sm:text-base leading-relaxed">
                {selectedLicense?.description}
              </p>
            </div>

            <div className="space-y-2 text-[#57534E]">
              <p className="font-semibold text-sm sm:text-base">معلومات إضافية:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#78716C] pr-4">
                <li>تدريب نظري وعملي شامل</li>
                <li>مدربون محترفون وذوو خبرة</li>
                <li>مركبات حديثة ومجهزة</li>
                <li>شهادة معتمدة رسمياً</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 sticky bottom-0 bg-white pb-2">
            <Button
              onClick={() => selectedLicense && handleInscriptionFromInfo(selectedLicense.code)}
              className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 sm:py-6 text-base sm:text-lg"
            >
              التسجيل الآن
            </Button>
            <Button
              variant="outline"
              onClick={closeLicenseInfo}
              className="w-full border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white font-semibold py-4 sm:py-6 text-sm sm:text-base"
            >
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
}
