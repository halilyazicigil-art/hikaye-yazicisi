import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Türkçe karakter desteği için font kaydediyoruz
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfChc9AMP6lQ.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Roboto',
  },
  coverPage: {
    flexDirection: 'column',
    backgroundColor: '#FEF3C7',
    padding: 40,
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#92400E',
    textAlign: 'center',
    marginBottom: 20,
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#B45309',
    textAlign: 'center',
    marginTop: 20,
  },
  coverImageContainer: {
    width: 400,
    height: 400,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  pageImageContainer: {
    width: '100%',
    height: 350,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  pageText: {
    fontSize: 18,
    color: '#334155',
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
  }
});

interface StoryPDFProps {
  title: string;
  coverImage?: string | null;
  pages: Array<{ text: string; image_url?: string }>;
}

export const StoryPDF = ({ title, coverImage, pages }: StoryPDFProps) => (
  <Document>
    {/* Kapak Sayfası */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.title}>{title || 'Masal'}</Text>
      {coverImage && (
        <View style={styles.coverImageContainer}>
          <Image src={coverImage} style={styles.coverImage} />
        </View>
      )}
      <Text style={styles.coverSubtitle}>Özel Resimli Masal Kitabı</Text>
    </Page>

    {/* Hikaye Sayfaları */}
    {pages.map((page, index) => (
      <Page key={index} size="A4" style={styles.page}>
        {page.image_url && (
          <View style={styles.pageImageContainer}>
            <Image src={page.image_url} style={styles.pageImage} />
          </View>
        )}
        <Text style={styles.pageText}>{page.text}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Sayfa ${pageNumber - 1} / ${totalPages - 1}`
        )} fixed />
      </Page>
    ))}
  </Document>
);
