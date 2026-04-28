import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hikaye Yazıcısı - Çocuklar İçin Yapay Zeka Masal Üreticisi",
  description: "3-12 yaş arası çocuklara özel, kişiselleştirilmiş, resimli ve sesli uyku öncesi masalları yaratan yapay zeka platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${nunito.variable} ${lora.variable} font-nunito antialiased bg-[#fdf8f0] text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
