"use client";

import { Hero } from "@/components/sections/Hero";
import { LicenseCategories } from "@/components/sections/LicenseCategories";
import { ProfessionalCertificate } from "@/components/sections/ProfessionalCertificate";
import { A1LicenseUpdate } from "@/components/sections/A1LicenseUpdate";
import { Stats } from "@/components/sections/Stats";
import { LocationContact } from "@/components/sections/LocationContact";
import { MultiStepForm } from "@/components/sections/MultiStepForm";
import { Footer } from "@/components/shared/Footer";
import { useFormContext } from "@/contexts/FormContext";

export default function Home() {
  const { isFormOpen, closeForm } = useFormContext();

  return (
    <main className="min-h-screen">
      <Hero />
      <LicenseCategories />
      <ProfessionalCertificate />
      <A1LicenseUpdate />
      <Stats />
      <LocationContact />
      <Footer />
      <MultiStepForm open={isFormOpen} onOpenChange={closeForm} />
    </main>
  );
}
