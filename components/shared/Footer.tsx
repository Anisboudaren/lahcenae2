"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full relative mt-auto bg-white pb-8 md:pb-12">
      <Image
        src="/illustration/splitter.png"
        alt="منظر مدينة وهران"
        width={1920}
        height={200}
        className="w-full h-auto object-cover object-bottom"
        priority={false}
      />
    </footer>
  );
}
