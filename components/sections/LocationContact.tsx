"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export function LocationContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionContainer id="location-contact" className="bg-white" ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#57534E]">
          موقعنا
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Contact Details */}
        <Card className="bg-[#FEF3C7] border-2 border-[#FDE68A] shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#57534E]">
              معلومات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#DC2626] rounded-full p-3 shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#57534E] mb-1">العنوان</h3>
                <p className="text-[#78716C]">
                  وهران، الجزائر
                  <br />
                  [العنوان الكامل سيتم إضافته لاحقاً]
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#DC2626] rounded-full p-3 shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#57534E] mb-1">الهاتف</h3>
                <p className="text-[#78716C]">
                  <a href="tel:+213550123456" className="hover:text-[#DC2626] transition-colors">
                    0550123456
                  </a>
                  <br />
                  <a href="tel:+213770123456" className="hover:text-[#DC2626] transition-colors">
                    0770123456
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#DC2626] rounded-full p-3 shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#57534E] mb-1">ساعات العمل</h3>
                <p className="text-[#78716C]">
                  من السبت إلى الخميس
                  <br />
                  8:00 صباحاً - 6:00 مساءً
                  <br />
                  <span className="text-sm">الجمعة: مغلق</span>
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 text-lg"
              onClick={() => {
                window.open("https://wa.me/213550123456", "_blank");
              }}
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              تواصل معنا عبر واتساب
            </Button>
          </CardContent>
        </Card>

        {/* Map */}
        <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102404.1234567890!2d-0.6419264!3d35.6972921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzUwLjMiTiAwwrAzOCczMC45Ilc!5e0!3m2!1sen!2sdz!4v1234567890123!5m2!1sen!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع مدرسة لحسن لتعليم السياقة"
          />
        </div>
      </motion.div>
    </SectionContainer>
  );
}
