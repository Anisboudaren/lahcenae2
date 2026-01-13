"use client";

import { Hero2 } from "@/components/sections/Hero2";
import { Categories2 } from "@/components/sections/Categories2";
import { Certificate2 } from "@/components/sections/Certificate2";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero2 />
      <Categories2 />
      <Certificate2 />
    </main>
  );
}
