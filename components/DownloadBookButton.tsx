"use client";

import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { StoryPDF } from './StoryPDF';

// @react-pdf/renderer's PDFDownloadLink must be imported dynamically to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface DownloadBookButtonProps {
  story: {
    id: string;
    title: string;
    image_url: string;
    content_json: Array<{ text: string; image_url?: string }>;
  };
}

export default function DownloadBookButton({ story }: DownloadBookButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Client-side render'a kadar boş buton göster (Hydration error'u önlemek için)
    return (
      <button className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-sky-200 font-bold text-sky-800 hover:bg-sky-50 transition-all text-sm opacity-50 cursor-not-allowed">
        <Download size={16} />
        Hazırlanıyor...
      </button>
    );
  }

  const pages = Array.isArray(story.content_json) ? story.content_json : [];

  return (
    <PDFDownloadLink
      document={<StoryPDF title={story.title} coverImage={story.image_url} pages={pages} />}
      fileName={`${(story.title || 'Masal').replace(/\\s+/g, '_')}_Kitabi.pdf`}
      className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-sky-200 font-bold text-sky-800 hover:bg-sky-50 hover:border-amber-300 transition-all text-sm"
    >
      {/* @ts-ignore */}
      {({ loading }) => (
        <>
          <Download size={16} />
          {loading ? 'PDF Hazırlanıyor...' : 'Kitabı İndir'}
        </>
      )}
    </PDFDownloadLink>
  );
}
