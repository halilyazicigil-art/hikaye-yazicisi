import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";
import GlobalRealtimeListener from "@/components/GlobalRealtimeListener";
import { Toaster } from "sonner";
import FloatingCompanion from "@/components/FloatingCompanion";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LumiBook - Çocuklar İçin Yapay Zeka Masal Üreticisi",
  description: "3-12 yaş arası çocuklara özel, kişiselleştirilmiş, resimli ve sesli uyku öncesi masalları yaratan yapay zeka platformu.",
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${nunito.variable} ${lora.variable} font-nunito antialiased bg-[#BDD9F2] text-gray-800`}>
        <LanguageProvider>
          <AudioPlayerProvider>
            {children}
            <GlobalAudioPlayer />
            <FloatingCompanion />
          </AudioPlayerProvider>
        </LanguageProvider>
        <GlobalRealtimeListener />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
