"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";

export function Stats() {
  const { openForm } = useFormContext();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionContainer className="relative bg-gradient-to-b from-white to-[#FEF9E7] py-16" ref={ref}>
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#57534E]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          جاهز للبدء؟
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#78716C] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          سجّل الآن واحجز مكانك في مدرسة لحسن لتعليم السياقة
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            onClick={openForm}
            size="lg"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-12 py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            سجّل الآن
          </Button>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
