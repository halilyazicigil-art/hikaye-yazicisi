
import { createSign } from 'crypto';

async function getVertexAccessToken() {
  const privateKey = (process.env.GOOGLE_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL || '';
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');
  const signingInput = `${header}.${payload}`;
  const sign = createSign('RSA-SHA256');
  sign.update(signingInput);
  const signature = sign.sign(privateKey, 'base64url');
  const jwt = `${signingInput}.${signature}`;
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function runGemini3Test() {
  const project = 'hikayeyazicisi';
  const location = 'us-central1'; // Model Garden'da bu bölgede aktif
  const model = 'gemini-3-flash-preview'; 
  
  try {
    const token = await getVertexAccessToken();
    // Vertex AI Stream URL formatı
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:streamGenerateContent`;

    console.log(`--- KURAL 4 UYUMLU TEST: ${model} ---`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: '1 sayfalık bir çocuk masalı yaz. Çıktı sadece Türkçe olsun.' }] }],
        generationConfig: { 
            responseMimeType: "application/json",
            // Kurala göre en güncel parametreler
            temperature: 1,
            topP: 0.95
        }
      }),
    });

    const dataRaw = await response.json();
    const data = dataRaw[0] || dataRaw;

    if (data.candidates) {
        console.log("BAŞARILI! Gemini 3 Flash Preview Vertex üzerinden yanıt verdi.");
        console.log("Yanıt Özeti: " + data.candidates[0].content.parts[0].text.substring(0, 100) + "...");
    } else {
        console.error("Hata Detayı:", JSON.stringify(dataRaw, null, 2));
    }
  } catch (error) {
    console.error("Sistem Hatası:", error);
  }
}

runGemini3Test();
