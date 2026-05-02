'use server'

import { createClient } from '@/utils/supabase/server'

/**
 * ZIRHLI PARSER (Armored Parser)
 * Gemini'den gelen yanıtı temizleyip saf JSON'a dönüştürür.
 */
function armoredParser(text: string) {
    try {
        console.log(">>> [ZIRHLI PARSER] Gelen Ham Metin Uzunluğu:", text.length);
        
        // JSON bloğunu cımbızla çek (```json ... ``` veya sadece { ... })
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Metin içinde geçerli bir JSON bloğu bulunamadı.");
        
        const cleanedJson = jsonMatch[0].trim();
        console.log(">>> [ZIRHLI PARSER] Temizlenmiş JSON Blok Başı:", cleanedJson.substring(0, 50));
        
        return JSON.parse(cleanedJson);
    } catch (err) {
        console.error(">>> [ZIRHLI PARSER] HATA:", err);
        throw new Error("Üretilen hikaye verisi okunabilir formatta değil (JSON Parse Error).");
    }
}

export async function generateStoryAction(formData: {
    hero: string;
    theme: string;
    voiceOption: string;
    elevenVoiceId?: string;
    childName: string;
    age: string;
}) {
    try {
        const { theme, age, hero } = formData
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Oturum açmanız gerekiyor.")

        const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
        const vertexToken = process.env.GOOGLE_VERTEX_ACCESS_TOKEN 

        // ---------------------------------------------------------
        // FAZ 1: METİN ÜRETİMİ (Zırhlı Metin Motoru)
        // ---------------------------------------------------------
        console.log(">>> [FAZ 1] Masal metni üretiliyor...");

        const textPrompt = `
            Aşağıdaki konuyla ilgili 8-10 sayfalık sürükleyici bir çocuk masalı yaz. 
            ÇIKTI FORMATI SADECE JSON OLMALIDIR. Markdown etiketleri kullanma.
            
            Gereksinimler:
            1. 'title': Masalın başlığı.
            2. 'characters': Masaldaki ana karakterlerin fiziksel tariflerini içeren bir obje. (Örn: {"Aslan": "Sarı yeleli, büyük pençeli sevimli bir aslan"})
            3. 'scenes': 8-10 adet sahne içeren bir dizi. Her sahne şunları içermelidir:
               - 'text': O sayfada okunacak masal metni.
               - 'visualHook': O sahneyi çizecek yapay zekaya yönelik görsel betimleme.
            
            Konu: ${theme}
            Yaş Grubu: ${age}
            Ana Kahraman: ${hero}
        `;

        const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: textPrompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        })

        const aiData = await textResponse.json()
        const rawText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Zırhlı Parser ile JSON'u kurtar
        const storyData = armoredParser(rawText);
        const { title, scenes, characters } = storyData;

        console.log(">>> [FAZ 1 BAŞARILI] Masal Başlığı:", title);

        // ---------------------------------------------------------
        // FAZ 2 & 3: HENÜZ KURULMADI (Placeholder)
        // ---------------------------------------------------------
        const pages = scenes.map((s: any) => ({ text: s.text, image_url: '' }));
        const audioUrl = null;

        // Geçici Kayıt (Test için)
        const { data: savedStory, error: dbErr } = await supabase.from('stories').insert({
            user_id: user.id,
            title: title,
            content: JSON.stringify(storyData),
            pages: pages,
            audio_url: audioUrl,
            image_style: 'Faz 1 Test'
        }).select().single()

        if (dbErr) throw dbErr;

        return { success: true, id: savedStory.id }

    } catch (error: any) {
        console.error(">>> [STORY ACTION HATA]:", error.message);
        return { success: false, error: error.message }
    }
}
