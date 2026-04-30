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

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        body { font-family: 'Outfit', sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background: #fff; }
        .cover { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #fef3c7, #fde68a); text-align: center; page-break-after: always; }
        h1 { color: #92400e; font-size: 56px; margin: 20px; }
        .page { padding: 40px; display: flex; flex-direction: column; align-items: center; page-break-after: always; }
        .page-image { width: 100%; max-width: 600px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .page-text { font-size: 22px; text-align: center; max-width: 700px; color: #475569; }
        .footer { margin-top: 30px; color: #94a3b8; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="cover"><h1>${title}</h1><p>Özel Resimli Masal Kitabı</p></div>
      ${bookPages.map((p: any, i: number) => `
        <div class="page">
          <img class="page-image" src="${p.image_url || imageUrl}" />
          <div class="page-text">${p.text}</div>
          <div class="footer">Sayfa ${i + 1} / ${bookPages.length}</div>
        </div>
      `).join('')}
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
