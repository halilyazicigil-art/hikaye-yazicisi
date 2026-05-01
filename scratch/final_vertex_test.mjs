
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

async function finalTest() {
  const project = 'hikayeyazicisi';
  const location = 'us-central1';
  const model = 'gemini-1.5-flash-002'; // Vertex typically uses this stable version
  
  try {
    const token = await getVertexAccessToken();
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:streamGenerateContent`;

    console.log(`Final Test: Vertex AI Gemini (${model})`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Merhaba, 1 kelimelik bir yanıt ver.' }] }]
      }),
    });

    const data = await response.json();
    console.log('Status:', response.status);
    if (data[0] && data[0].candidates) {
        console.log('Vertex Gemini OK!');
    } else {
        console.error('Vertex Gemini Error:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Test Error:', error);
  }
}

finalTest();
