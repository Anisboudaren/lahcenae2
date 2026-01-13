import type { Metadata } from "next";
import { Cairo, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header2 } from "@/components/shared/Header2";
import { FormProvider } from "@/contexts/FormContext";
import { WhatsAppBubble } from "@/components/shared/WhatsAppBubble";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "مدرسة لحسن لتعليم السياقة - الوهرانية",
  description: "طريقك الآمن نحو رخصة القيادة - مدرسة معتمدة رسمياً لتعليم السياقة في وهران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        <FormProvider>
          <Header2 />
          {children}
          <WhatsAppBubble />
        </FormProvider>
      </body>
    </html>
  );
}
