'use server'

import { createClient } from '@/utils/supabase/server'

async function getVertexToken() {
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error("Google Service Account bilgileri .env dosyasında eksik!");
  }

  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  };

  const sHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const sPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const unsignedToken = `${sHeader}.${sPayload}`;

  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  sign.end();
  const signature = sign.sign(privateKey, 'base64url');
  const jwt = `${unsignedToken}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await response.json();
  return data.access_token;
}

export async function testPipeline(testPrompt: string = "Ayşe arabaya biniyor", style: string = "(pastel)") {
  const results = {
    text: { status: 'PENDING', content: '', error: null },
    image: { status: 'PENDING', url: '', error: null },
    audio: { status: 'PENDING', url: '', error: null }
  }

  try {
    const token = await getVertexToken();
    const projectId = "hikayeyazicisi";

    // 1. FAZ: METİN (DOĞRULANMIŞ)
    console.log("1. Faz: Metin üretiliyor...");
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Aşağıdaki masal cümlesini zenginleştirerek yaz ve sonuna stil komutunu ekle: ${testPrompt} Stil: ${style}` }] }]
      })
    });

    const reader = textResponse.body?.getReader();
    let fullText = "";
    if (reader) {
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const cleanedChunk = chunk.replace(/^\[/, '').replace(/,$/, '').replace(/\]$/, '');
            if (cleanedChunk.trim()) {
                try {
                    const json = JSON.parse(cleanedChunk);
                    fullText += json.candidates?.[0]?.content?.parts?.[0]?.text || "";
                } catch(e) {}
            }
        }
    }
    results.text.content = fullText;
    results.text.status = 'SUCCESS';

    // 2. FAZ: GÖRSEL (NANO BANANA 2 - GLOBAL)
    console.log("2. Faz: Görsel üretiliyor (Nano Banana 2)...");
    const imageResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: `Generate a high quality children book illustration based on this scene: ${results.text.content}. Style: ${style}` }]
        }]
      })
    });
    const imageData = await imageResponse.json();
    const base64Image = imageData.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;
    if (base64Image) {
      results.image.url = `data:image/png;base64,${base64Image}`;
      results.image.status = 'SUCCESS';
    } else {
      results.image.status = 'FAILED';
      results.image.error = JSON.stringify(imageData);
    }

    // 3. FAZ: SES (FLASH TTS / CHIRP HD - Vertex AI OAuth)
    console.log("3. Faz: Ses üretiliyor (Chirp HD)...");
    const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        input: { text: results.text.content },
        voice: { 
          languageCode: 'tr-TR', 
          name: 'tr-TR-Chirp3-HD-Aoede' 
        },
        audioConfig: {
          audioEncoding: 'MP3'
        }
      })
    });

    const audioData = await audioResponse.json();
    if (audioData.audioContent) {
      results.audio.url = `data:audio/mp3;base64,${audioData.audioContent}`;
      results.audio.status = 'SUCCESS';
    } else {
      results.audio.status = 'FAILED';
      results.audio.error = JSON.stringify(audioData);
    }

  } catch (error: any) {
    console.error("Pipeline Hatası:", error);
    if (results.text.status === 'PENDING') results.text.status = 'FAILED';
    if (results.image.status === 'PENDING') results.image.status = 'FAILED';
    if (results.audio.status === 'PENDING') results.audio.status = 'FAILED';
  }

  return results;
}
