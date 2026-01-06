"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { licenseTypes } from "@/lib/constants";
import { useFormContext } from "@/contexts/FormContext";

export function Hero() {
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const { openForm } = useFormContext();

  const handleInscriptionClick = () => {
    if (selectedLicense) {
      sessionStorage.setItem("selectedLicense", selectedLicense);
    }
    openForm();
  };

  const handleLicenseSelect = (value: string) => {
    setSelectedLicense(value);
  };

  return (
    <section className="relative w-full h-screen md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          opacity: [1, 0.95, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/geometric Islamic design warm beige and soft red color.png"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FEF3C7]/20 via-transparent to-[#DC2626]/10" />
      </motion.div>

      {/* Decorative Illustration - Oran Landmarks */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-20 z-0 hidden lg:block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/images/Simplified silhouette illustration of Oran, Algeria landmarks (Santa Cruz Fort, Le Theatre, waterfront), single color warm red (#DC2626), transparent background, minimal line art style, suitable as header decoration.png"
          alt=""
          fill
          className="object-contain object-left"
        />
      </motion.div>

      {/* Auto School Items - Mobile Only */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[5] md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/illustration/auto echole items on bottom.png"
          alt=""
          width={800}
          height={200}
          className="w-full h-auto object-contain object-bottom"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 md:py-0 -mt-16 md:-mt-8">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Badge className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white border-2 border-[#991B1B] px-5 py-2.5 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2">
              <Image
                src="/illustration/verifed icon.png"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 md:w-6 md:h-6"
              />
              معتمد رسمياً
            </Badge>
          </motion.div>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#57534E] leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          مدرسة لحسن الوهرانية لتعليم{" "}
          <span className="text-[#DC2626]">السياقة</span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-10 text-[#78716C] font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          طريقك الآمن نحو رخصة القيادة
        </motion.p>

        <motion.div
          className="flex flex-row gap-4 justify-center items-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Select value={selectedLicense} onValueChange={handleLicenseSelect}>
            <SelectTrigger className="h-[64px] min-w-[240px] max-w-[280px] border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white px-8 py-6 text-xl font-bold rounded-xl transition-all bg-white shadow-lg hover:shadow-xl">
              <SelectValue placeholder="اختر نوع الرخصة" className="text-xl" />
            </SelectTrigger>
            <SelectContent className="min-w-[280px] text-lg">
              {licenseTypes.map((license) => (
                <SelectItem key={license.code} value={license.code} className="text-lg py-3 cursor-pointer">
                  {license.code} - {license.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleInscriptionClick}
            size="lg"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            التسجيل الآن
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
