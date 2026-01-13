"use client";

import { Hero2 } from "@/components/sections/Hero2";
import { Categories2 } from "@/components/sections/Categories2";
import { Certificate2 } from "@/components/sections/Certificate2";
import { Stats2 } from "@/components/sections/Stats2";
import { Articles2 } from "@/components/sections/Articles2";
import { LocationContact } from "@/components/sections/LocationContact";
import { HomeCTA } from "@/components/sections/HomeCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero2 />
      <Categories2 />
      <Certificate2 />
      <Stats2 />
      <Articles2 />
      <LocationContact />
      <HomeCTA />
    </main>
  );
}
