import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function loadEnv() {
  const envPath = path.resolve('.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  const regex = /^([^=#\n]+)=("([^"]*)"|'([^']*)'|([^#\n]*))/gm;
  let m;
  while ((m = regex.exec(envContent)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex++;
    const key = m[1].trim();
    const value = (m[3] || m[4] || m[5] || "").trim();
    env[key] = value;
  }
  return env;
}

async function getVertexToken(env) {
  const clientEmail = env.GOOGLE_SA_CLIENT_EMAIL;
  let privateKey = env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail, aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  };
  const unsignedToken = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url') + "." + Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createSign('RSA-SHA256').update(unsignedToken).sign(privateKey, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${unsignedToken}.${signature}`,
  });
  const data = await res.json();
  return data.access_token;
}

async function runDiagnostic() {
  console.log("🚀 FINAL TANILAMA (Vertex AI - Tam Boru Hattı) Başlatılıyor...");
  try {
    const env = loadEnv();
    const token = await getVertexToken(env);
    
    // 1. Metin (Gemini 3 Flash)
    const textRes = await fetch(`https://aiplatform.googleapis.com/v1/projects/hikayeyazicisi/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: "Ayşe arabaya biniyor." }] }] })
    });
    if (textRes.ok) console.log("✅ 1. FAZ (Metin): OK");

    // 2. Görsel (Nano Banana 2)
    const imgRes = await fetch(`https://aiplatform.googleapis.com/v1/projects/hikayeyazicisi/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: "Small red ball" }] }] })
    });
    if (imgRes.ok) console.log("✅ 2. FAZ (Görsel): OK");

    // 3. Ses (Chirp HD)
    const audioRes = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text: "Merhaba dünya" },
        voice: { languageCode: 'tr-TR', name: 'tr-TR-Chirp3-HD-Aoede' },
        audioConfig: { audioEncoding: 'MP3' }
      })
    });
    const audioData = await audioRes.json();
    if (audioData.audioContent) {
      console.log("✅ 3. FAZ (Ses): OK");
      console.log("\n🎊 TEBRİKLER! TAM BORU HATTI ÇALIŞIYOR.");
    } else {
      console.error("❌ 3. FAZ (Ses): HATA", JSON.stringify(audioData));
    }
  } catch (e) { console.error("❌ HATA:", e.message); }
}

runDiagnostic();
