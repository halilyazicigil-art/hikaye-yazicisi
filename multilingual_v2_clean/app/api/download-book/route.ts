import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new NextResponse('Missing ID', { status: 400 })
  }

  const supabase = await createClient()
  const { data: story, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !story) {
    return new NextResponse('Story not found', { status: 404 })
  }

  const bookPages = story.pages || []
  const title = story.title || 'Masal'
  const imageUrl = story.image_url
  const metadata = story.metadata || {}
  const language = metadata.language || 'tr'

  const getSubtitle = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.startsWith('en')) return 'Custom Illustrated Storybook';
    if (l.startsWith('de')) return 'Ein speziell illustriertes Märchenbuch';
    if (l.startsWith('fr')) return 'Livre de contes illustré personnalisé';
    return 'Özel Resimli Masal Kitabı';
  }

  const getEndText = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.startsWith('en')) return 'THE END';
    if (l.startsWith('de')) return 'ENDE';
    if (l.startsWith('fr')) return 'FIN';
    return 'SON';
  }

  const getAuthorText = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.startsWith('en')) return 'Written and Illustrated by AI Storyteller';
    if (l.startsWith('de')) return 'Geschrieben und illustriert von AI Storyteller';
    if (l.startsWith('fr')) return 'Écrit et illustré par AI Storyteller';
    return 'Yapay Zeka Hikaye Anlatıcısı Tarafından Yazıldı ve Resimlendi';
  }

  const subtitleText = getSubtitle(language);
  const endText = getEndText(language);
  const authorText = getAuthorText(language);
  
  const coverImageUrl = bookPages[0]?.image_url || imageUrl;
  const backCoverImageUrl = bookPages[bookPages.length - 1]?.image_url || imageUrl;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Playfair+Display:wght@700;900&display=swap');
        
        body { 
          font-family: 'EB Garamond', serif; 
          line-height: 1.65; 
          color: #2D3748; 
          margin: 0; 
          padding: 0; 
          background: #fff; 
        }
        
        /* Ön Kapak Tasarımı */
        .cover { 
          height: 100vh; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: space-between; 
          background: linear-gradient(135deg, #FCF8F2, #F5ECE3); 
          text-align: center; 
          box-sizing: border-box;
          padding: 60px 40px;
          page-break-after: always; 
        }
        
        .title-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }

        .title-decoration {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .cover h1 { 
          font-family: 'Playfair Display', serif;
          color: #1A365D; 
          font-size: 42px; 
          font-weight: 900;
          margin: 0; 
          line-height: 1.3;
        }
        
        .cover-image-container, .back-cover-image-container {
          width: 100%;
          max-width: 380px;
          height: 285px;
          border-radius: 10px;
          border: 2px solid #D69E2E; /* Dış kalın altın varaklı çerçeve çizgisi */
          padding: 3px; /* Dış ve iç çerçeve arası boşluk (paspartu) */
          background: #FCF8F2;
          box-shadow: 0 10px 25px rgba(74,43,21,0.08);
          margin: 20px auto;
          box-sizing: border-box;
        }
        
        .cover-image-inner-frame {
          width: 100%;
          height: 100%;
          border-radius: 7px;
          border: 1px solid #D69E2E; /* İç ince altın varaklı çerçeve çizgisi */
          padding: 3px; /* İç çerçeve ile görsel arası boşluk */
          background: #FCF8F2;
          box-sizing: border-box;
        }

        .cover-image-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
        }

        .cover-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .cover-footer-block {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cover p {
          font-family: 'EB Garamond', serif;
          color: #7C5C43;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 5px 0;
          letter-spacing: 0.5px;
        }
        
        .cover-author {
          font-family: 'EB Garamond', serif;
          color: #9E8573;
          font-size: 13px;
          margin: 0;
        }

        /* Hikaye Sayfaları */
        .page { 
          padding: 80px 60px 100px 60px; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; /* Dikeyde mükemmel şekilde ortalar */
          min-height: 100vh;
          box-sizing: border-box;
          position: relative;
          page-break-after: always; 
        }
        
        .page-content-wrapper {
          width: 100%;
          max-width: 380px; /* Sayfada daha dolgun ve şık durması için 380px */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .page-image-container {
          width: 100%;
          height: 285px; /* 4:3 yatay dikdörtgen oranı tam sağlandı */
          border-radius: 8px;
          border: 1px solid #E8DED1;
          box-shadow: 0 6px 15px rgba(0,0,0,0.04);
          overflow: hidden;
          margin-bottom: 40px; /* Cerrahi boşluk */
        }
        
        .page-image-container img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
        }
        
        .page-text { 
          font-family: 'EB Garamond', serif;
          font-size: 20px; /* Çocuk kitabı standartlarında daha okunaklı ve dolgun boyuta getirildi */
          text-align: center; 
          color: #2D3748; 
          margin: 0;
          line-height: 1.65;
        }
        
        .footer-container { 
          position: absolute;
          bottom: 45px;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .page-number-text {
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          color: #7C5C43;
        }

        .page-number-star {
          margin-top: 4px;
        }

        /* Arka Kapak / Kapanış Sayfası */
        .back-cover {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #FCF8F2, #F5ECE3);
          text-align: center;
          box-sizing: border-box;
          padding: 60px 40px;
          page-break-after: avoid;
        }
        
        .back-cover h2 {
          font-family: 'Playfair Display', serif;
          color: #1A365D;
          font-size: 36px;
          font-weight: 900;
          margin: 40px 0 20px 0;
        }
        
        /* Arka kapak görsel stili, ön kapak ile aynı nested yapıyı kullandığı için buradaki özel seçiciler kaldırılmıştır */
        
        .back-cover-footer-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .back-cover-footer {
          font-family: 'EB Garamond', serif;
          color: #7C5C43;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 5px;
        }
      </style>
    </head>
    <body>
      <div class="cover">
        <div class="title-container">
          <div class="title-decoration">
            <svg height="8" width="8" viewBox="0 0 24 24">
              <polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
            </svg>
            <svg height="8" width="8" viewBox="0 0 24 24">
              <polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
            </svg>
            <svg height="8" width="8" viewBox="0 0 24 24">
              <polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
            </svg>
          </div>
          <h1>${title}</h1>
        </div>
        <div class="cover-image-container">
          <div class="cover-image-inner-frame">
            <div class="cover-image-wrapper">
              <img src="${coverImageUrl}" alt="Cover image" />
            </div>
          </div>
        </div>
        <div class="cover-footer-block">
          <p>${subtitleText}</p>
          <div class="cover-author">${authorText}</div>
        </div>
      </div>
      
      ${bookPages.map((p: any, i: number) => `
        <div class="page">
          <div class="page-content-wrapper">
            <div class="page-image-container">
              <img src="${p.image_url || imageUrl}" alt="Page ${i + 1} image" />
            </div>
            <div class="page-text">${p.text}</div>
          </div>
          <div class="footer-container">
            <div class="page-number-text">${i + 1}</div>
            <div class="page-number-star">
              <svg height="8" width="8" viewBox="0 0 24 24">
                <polygon points="12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.62 12,2 9.19,8.62 2,9.24 7.45,13.97 5.82,21" fill="#D69E2E" />
              </svg>
            </div>
          </div>
        </div>
      `).join('')}
      
      <div class="back-cover">
        <h2>${endText}</h2>
        <div class="back-cover-image-container">
          <div class="cover-image-inner-frame">
            <div class="cover-image-wrapper">
              <img src="${backCoverImageUrl}" alt="Back cover image" />
            </div>
          </div>
        </div>
        <div class="back-cover-footer-block">
          <div class="back-cover-footer">${subtitleText}</div>
          <div class="cover-author">${authorText}</div>
        </div>
      </div>
    </body>
    </html>
  `

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(title)}_Resimli_Kitap.html"`,
    },
  })
}
