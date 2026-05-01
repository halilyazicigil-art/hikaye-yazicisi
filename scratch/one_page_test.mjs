
async function runOnePageTest() {
  const apiKey = 'AIzaSyBChzUP23a1oMVQgPps85MtUsYSE-LW4xQ';
  console.log("--- TEK SAYFALIK KRİTİK TEST BAŞLADI ---");
  console.log("Kullanılan Anahtar: " + apiKey);

  // 1. GEMINI TEST (v1beta)
  console.log("\n1. Gemini (v1beta) Deneniyor...");
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
  const geminiRes = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Kısa bir cümlelik çocuk masalı yaz." }] }]
    })
  });
  const geminiData = await geminiRes.json();
  if (geminiData.error) {
    console.error("Gemini v1beta Hatası:", geminiData.error.message);
  } else {
    console.log("Gemini v1beta OK! Yanıt: " + geminiData.candidates[0].content.parts[0].text.substring(0, 50) + "...");
  }

  // 2. GEMINI TEST (v1 Stable - Alternatif)
  console.log("\n2. Gemini (v1 Stable) Deneniyor...");
  const geminiUrlV1 = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const geminiResV1 = await fetch(geminiUrlV1, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Merhaba" }] }]
    })
  });
  const geminiDataV1 = await geminiResV1.json();
  if (geminiDataV1.error) {
    console.error("Gemini v1 Hatası:", geminiDataV1.error.message);
  } else {
    console.log("Gemini v1 OK!");
  }

  // 3. TTS TEST
  console.log("\n3. TTS Testi Deneniyor...");
  const ttsUrl = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  const ttsRes = await fetch(ttsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text: "Test mesajı." },
      voice: { languageCode: 'tr-TR', name: 'tr-TR-Standard-A' },
      audioConfig: { audioEncoding: 'MP3' }
    })
  });
  const ttsData = await ttsRes.json();
  if (ttsData.error) {
    console.error("TTS Hatası:", ttsData.error.message);
  } else {
    console.log("TTS OK: Ses üretildi.");
  }

  console.log("\n--- TEST SONU ---");
}

runOnePageTest();
