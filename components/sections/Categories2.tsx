"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
import { RefreshCw } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { mapDbToLicenseType, type DbLicenseType } from "@/lib/db-mappers";
import type { LicenseType } from "@/lib/admin-data";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (i < retries - 1) {
        await sleep(RETRY_DELAY_MS * (i + 1));
        continue;
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(RETRY_DELAY_MS * (i + 1));
    }
  }
  throw new Error("Failed to fetch after retries");
}

export function Categories2() {
  const [categories, setCategories] = useState<LicenseType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openForm } = useFormContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchWithRetry("/api/license-types");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setCategories((data as DbLicenseType[]).map(mapDbToLicenseType));
    } catch (e) {
      const err = e instanceof Error ? e.message : "فشل تحميل أصناف الرخص";
      console.error("Failed to fetch license types:", e);
      setError(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

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
  return (
    <section id="categories" className="relative w-full bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
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
          {loading && categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">جاري التحميل...</div>
          ) : error && categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchCategories} className="bg-sky-500 hover:bg-sky-600 text-white">
                <RefreshCw className="w-4 h-4 ml-2" />
                إعادة المحاولة
              </Button>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">لا توجد أصناف متاحة</div>
          ) : (
            categories.map((category, index) => (
            <div
              key={category.code}
              onClick={() => handleShowDetails(category.code)}
              className="relative bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden active:scale-[0.98] rounded-lg"
            >
              <div className="relative w-full min-h-[300px] bg-gray-50">
                {category.imagePath ? (
                  <Image
                    src={category.imagePath}
                    alt={category.nameAr}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    priority={index < 4}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">لا توجد صورة</span>
                  </div>
                )}
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
          ))
          )}
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
                {category?.description}
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 pb-4 space-y-6 bg-white overflow-y-auto flex-1">
              {category?.videoLink && (
                <div className="w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="200"
                    src={category.videoLink}
                    title={category.nameFr}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              )}
              {category?.details && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">التفاصيل:</h3>
                  <ul className="space-y-3">
                    {category.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-sky-500 mt-1 font-bold">•</span>
                        <span className="flex-1 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {category?.note && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-sky-50 border-r-4 border-sky-500 p-4 rounded-lg">
                    <p className="text-base text-gray-800 leading-relaxed font-medium">
                      {category.note}
                    </p>
                  </div>
                </div>
              )}

              {category?.offers && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ما نقدمه لك:</h3>
                  <ul className="space-y-3">
                    {category.offers.map((offer, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-sky-500 mt-1 font-bold">•</span>
                        <span className="flex-1 leading-relaxed">{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {category?.callToAction && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-base text-gray-800 leading-relaxed font-semibold">
                    {category.callToAction}
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
