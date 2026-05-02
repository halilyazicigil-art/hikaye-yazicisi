'use server'

import { createClient } from '@/utils/supabase/server'

interface TestResults {
  text: { status: 'PENDING' | 'SUCCESS' | 'ERROR', content?: string, error?: string }
  image: { status: 'PENDING' | 'SUCCESS' | 'ERROR', url?: string, error?: string }
  audio: { status: 'PENDING' | 'SUCCESS' | 'ERROR', url?: string, error?: string }
}

/**
 * ZIRHLI PARSER
 */
function armoredParser(text: string) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON bulunamadı.");
    return JSON.parse(jsonMatch[0].trim());
}

export async function testPipelineAction(prompt: string, style: string, voiceId: string) {
  const results: TestResults = {
    text: { status: 'PENDING' },
    image: { status: 'PENDING' },
    audio: { status: 'PENDING' }
  }

  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const vertexToken = process.env.GOOGLE_VERTEX_ACCESS_TOKEN 

    // ---------------------------------------------------------
    // FAZ 1: METİN TESTİ
    // ---------------------------------------------------------
    console.log(">>> [TEST - FAZ 1] Metin üretiliyor...");
    
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Konu: ${prompt}. ÇIKTI: JSON formatında 'text', 'characters' (object) ve 'visualHook' (string) olarak dön.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })

    const aiData = await textResponse.json()
    const rawText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const storyData = armoredParser(rawText);
    results.text.content = JSON.stringify(storyData, null, 2);
    results.text.status = 'SUCCESS';

    console.log(">>> [TEST - FAZ 1 BAŞARILI]");

    // Faz 2 ve 3 PENDING olarak dönecek (Henüz inşa edilmedi)
    return results

  } catch (error: any) {
    results.text.status = 'ERROR';
    results.text.error = error.message;
    return results;
  }
}
