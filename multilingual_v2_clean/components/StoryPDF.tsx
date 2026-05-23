import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font, Svg, Polygon } from '@react-pdf/renderer';

// Google Fonts doğrudan TTF (gstatic) bağlantılarını kaydediyoruz
Font.register({
  family: 'EB Garamond',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v32/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUAw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v32/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-DPNUAw.ttf', fontWeight: 700 }
  ]
});

Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 80,
    paddingBottom: 100, // Sayfa numarasının üzerine binmemesi için alt dolgu artırıldı
    paddingHorizontal: 60,
    justifyContent: 'center', // Tüm içeriği dikey eksende mükemmel şekilde ortalar
    alignItems: 'center',
    position: 'relative',
  },
  coverPage: {
    flexDirection: 'column',
    backgroundColor: '#FCF8F2', // Premium fildişi/krem arka plan
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  titleDecorationContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStar: {
    marginHorizontal: 3,
  },
  title: {
    fontFamily: 'Playfair Display',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A365D', // Lacivert renk tonu
    textAlign: 'center',
    lineHeight: 1.3,
  },
  coverSubtitle: {
    fontSize: 14,
    color: '#7C5C43',
    textAlign: 'center',
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  coverAuthor: {
    fontSize: 10,
    color: '#9E8573',
    fontFamily: 'EB Garamond',
    textAlign: 'center',
  },
  coverImageContainer: {
    width: 380,
    height: 285,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D69E2E', // Dış kalın altın varaklı çerçeve çizgisi
    padding: 3, // Dış çerçeve ile iç çerçeve arası boşluk (paspartu)
    backgroundColor: '#FCF8F2',
  },
  coverInnerFrame: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D69E2E', // İç ince altın varaklı çerçeve çizgisi
    padding: 3, // İç çerçeve ile görsel arası boşluk
    backgroundColor: '#FCF8F2',
  },
  coverImageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // İç Sayfa Yerleşimi
  pageContentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageImageContainer: {
    width: 380, // Sayfa yüzeyinde daha dolgun ve şık durması için boyut artırıldı
    height: 285, // 4:3 yatay dikdörtgen oranı tam sağlandı
    marginBottom: 40, // Görsel altındaki cerrahi nefes alma boşluğu
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8DED1',
    overflow: 'hidden',
  },
  pageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  pageTextContainer: {
    width: 380, // Görsel genişliğiyle dikeyde kusursuz hizalama
    alignItems: 'center',
  },
  pageText: {
    fontFamily: 'EB Garamond',
    fontSize: 20, // Çocuk kitabı standartlarında daha okunaklı ve dolgun boyuta getirildi
    color: '#2D3748',
    lineHeight: 1.65,
    textAlign: 'center',
  },
  // Sayfa Numarası ve Altın Yıldız Yerleşimi
  pageNumberContainer: {
    position: 'absolute',
    bottom: 45,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumberText: {
    fontSize: 12,
    color: '#7C5C43',
    fontFamily: 'EB Garamond',
  },
  pageNumberStarContainer: {
    marginTop: 4,
  },
  // Kapanış Sayfası Tasarımı (Back Cover)
  backCoverPage: {
    flexDirection: 'column',
    backgroundColor: '#FCF8F2',
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backCoverTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A365D',
    textAlign: 'center',
    marginTop: 20,
  },
  backCoverImageContainer: {
    width: 380,
    height: 285,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D69E2E',
    padding: 3,
    backgroundColor: '#FCF8F2',
  },
  backCoverFooter: {
    fontSize: 11,
    color: '#7C5C43',
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  }
});

interface StoryPDFProps {
  title: string;
  coverImage?: string | null;
  pages: Array<{ text: string; image_url?: string }>;
  language?: string;
}

const getSubtitle = (language?: string) => {
  const lang = (language || 'tr').toLowerCase();
  if (lang.startsWith('en')) {
    return 'Custom Illustrated Storybook';
  } else if (lang.startsWith('de')) {
    return 'Ein speziell illustriertes Märchenbuch';
  } else if (lang.startsWith('fr')) {
    return 'Livre de contes illustré personnalisé';
  }
  return 'Özel Resimli Masal Kitabı';
};

const getEndText = (language?: string) => {
  const lang = (language || 'tr').toLowerCase();
  if (lang.startsWith('en')) return 'THE END';
  if (lang.startsWith('de')) return 'ENDE';
  if (lang.startsWith('fr')) return 'FIN';
  return 'SON';
};

const getAuthorText = (language?: string) => {
  const lang = (language || 'tr').toLowerCase();
  if (lang.startsWith('en')) {
    return 'Written and Illustrated by AI Storyteller';
  } else if (lang.startsWith('de')) {
    return 'Geschrieben und illustriert von AI Storyteller';
  } else if (lang.startsWith('fr')) {
    return 'Écrit et illustré par AI Storyteller';
  }
  return 'Yapay Zeka Hikaye Anlatıcısı Tarafından Yazıldı ve Resimlendi';
};

export const StoryPDF = ({ title, coverImage, pages, language }: StoryPDFProps) => {
  const lastPageImage = pages.length > 0 ? pages[pages.length - 1].image_url : coverImage;

  return (
    <Document>
      {/* Ön Kapak Sayfası */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.titleContainer}>
          <View style={styles.titleDecorationContainer}>
            <Svg height="8" width="8" viewBox="0 0 24 24" style={styles.titleStar}>
              <Polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
            </Svg>
            <Svg height="8" width="8" viewBox="0 0 24 24" style={styles.titleStar}>
              <Polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
            </Svg>
            <Svg height="8" width="8" viewBox="0 0 24 24" style={styles.titleStar}>
              <Polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
            </Svg>
          </View>
          <Text style={styles.title}>{title || 'Masal'}</Text>
        </View>
        {coverImage && (
          <View style={styles.coverImageContainer}>
            <View style={styles.coverInnerFrame}>
              <View style={styles.coverImageWrapper}>
                <Image src={coverImage} style={styles.coverImage} />
              </View>
            </View>
          </View>
        )}
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.coverSubtitle}>{getSubtitle(language)}</Text>
          <Text style={styles.coverAuthor}>{getAuthorText(language)}</Text>
        </View>
      </Page>

      {/* Hikaye Sayfaları */}
      {pages.map((page, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.pageContentWrapper}>
            {page.image_url && (
              <View style={styles.pageImageContainer}>
                <Image src={page.image_url} style={styles.pageImage} />
              </View>
            )}
            <View style={styles.pageTextContainer}>
              <Text style={styles.pageText}>{page.text}</Text>
            </View>
          </View>
          <View style={styles.pageNumberContainer}>
            <Text style={styles.pageNumberText}>{index + 1}</Text>
            <View style={styles.pageNumberStarContainer}>
              <Svg height="8" width="8" viewBox="0 0 24 24">
                <Polygon
                  points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21"
                  fill="#D69E2E"
                />
              </Svg>
            </View>
          </View>
        </Page>
      ))}

      {/* Arka Kapak/Kapanış Sayfası */}
      <Page size="A4" style={styles.backCoverPage}>
        <Text style={styles.backCoverTitle}>{getEndText(language)}</Text>
        {lastPageImage && (
          <View style={styles.backCoverImageContainer}>
            <View style={styles.coverInnerFrame}>
              <View style={styles.coverImageWrapper}>
                <Image src={lastPageImage} style={styles.coverImage} />
              </View>
            </View>
          </View>
        )}
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.backCoverFooter}>{getSubtitle(language)}</Text>
          <Text style={styles.coverAuthor}>{getAuthorText(language)}</Text>
        </View>
      </Page>
    </Document>
  );
};
