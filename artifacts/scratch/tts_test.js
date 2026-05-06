const fs = require('fs');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

// .env dosyasından manuel okuma (Scratch olduğu için basit tutuyoruz)
const PROJECT_ID = "gen-lang-client-0522567659";
const CLIENT_EMAIL = "hikaye-yazicisi-sa@hikayeyazicisi.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8Ni1zZX3KiOZS\nLuiGwXn30Zw+8EESpndVLDy+B3jAdJPCASQrLLj+IpmYPzmHcpgFwojadcTRqR61\nZryE52OMx4JJQa8t4vDR4RsiVwf4e5boXL0NMRXNPfcpjTbiNxxDNICIC+yUQJjI\n8+NvdogX2iLBUDhymfWrW6VnvkdV2qs9Ye5WHea0eIjVod8B/AgeXMFMx9vjPoa1\nhwp223dGTaIaGi0DxytT1kMRsAwGCteAotTMTecuYebmyR0uf6bsdfFif5yq7Y8i\nFW5vSViw2mhmrijVTqWjgpOv+v4I2H+Nm7bqWPqLOiOD4ZmxgzcP65ABvq7fW8yl\nPWh6XLa9AgMBAAECggEABmIVVd3nT5XSWeSFYQHxelooNmo84BO35bJDt8jWa5CI\nl60k5jdKFDRliShRHIA3xQTn/KC/NW0gQX65KLjAQ5IF9Si+duFE0ZlqK4FQH+Px\nJkhJkRz3uaeUWQW/tW8GYlvG0Cu3W6p6hAuMIcefWKUT8K0hJ6HZFyAF6BLSpd1f\nHId4080+JZnte/S/Y6oOoHtm37rBJoekxiILTKw4TbPpFk/ubiupImmK6MaIZzUM\n/USVyzMROHWnbQDSE+ZWfFDk1ChkgoKRJCedIuD3G/5KOflbXVxJ3ioLOrVvHTwL\nVMvrzavrCJyrTok0i3cft0hASbjn38YzlfquxC1A8QKBgQDlry7CnI0hrZ/xxc1F\nuBjylPZCfNKeb/+C1FPJknnR90rkgERSukf9BN/yCScxHnPTmRgaTB8kENBQ+AdW\n7CxuCcbZbQmUq5qyaNMeXw8tgkWWiAnaaLd+14Ou3HiR22iwcDgnfqfEhGe7rX7I\n+h2sAYjQzp0kLyBdsZHDNZmmDwKBgQDRxpHETYV8+3ks4c9MnC/peh3uZ1fiPFSY\nVINnvUbP7toH03XJTlLhIah1UNprDzJnnGszicIj6yyM34Zy8QoAhuvGciwWZ9ts\n6zxUE4RruWZ+TC9JMm14NpU7MvQB6EYgaOCmbRs/BrPazH+jfWK4PE6GdX0xO5Zr\njXBvf0UCcwKBgBHuBvxyNCI45498HXYf1PK65i5yiA6ON6gC4zeNE61sXJBR4wOC\nPzRlOQYv6LtQ4UHXZaZH4vZxyZFIi2ohraY5ZSh79o+Aheb/f9uTGCA5Vy1VGU/P\ndOOV91WjKFZahmWfnQKYRIh2vZJNDOSrgb13sTJ7rpCwjRpDTlmqyX/JAoGAL0oq\nVix7qT8vg/SrvMOA8Ys78CCP6Upcb7KtpNdAfWOE9zquVOE5QdNKnJfLhVL5s+3J\nJOcrQtmjQ2aocoTwEkpYIHZghfSHvLgS84kq0vYKqvIVvtSFZRI49g14gG2SUYAT\nFLGH8N9b8DkllP+RH6NIuHsH6+9Y64oJDLmOHw0CgYEAz0wZnAyBQcw0WEbuSjmJ\nN/HXi23+LvYuJKlJ0vOYEGsWmXh07m6iHgQxdc0qQ5YCqwiGSyn+FJZklcmrnZaT\n6dijIEL/jUKVbyD2s0SUWmJkjHwCCVnbOn0nYXiKaWkKbUkTyyD5OJ2X6cJyHpMs\n/JRvQw5hpHocrjhOJOCWNJo=\n-----END PRIVATE KEY-----\n";

const TEXT_CHUNKS = [
    "Bir zamanlar, Gümüş Orman'ın derinliklerinde Keloğlan adında saf yürekli bir genç yaşarmış. Bir gün Keloğlan, köyünün en büyük sorunu olan kuraklığı bitirmek için devler ülkesine gitmeye karar vermiş. Yanına sadece bir parça ekmek ve eski bir su kabı almış. Dağları aşmış, dereleri geçmiş ve sonunda devlerin yaşadığı o koca kapıya dayanmış. Kapı o kadar büyükmüş ki, Keloğlan'ın boyu kapının anahtar deliğine bile yetmiyormuş.",
    "Keloğlan kapının önünde beklerken, yer aniden sarsılmaya başlamış. Devlerin en küçüğü, ama insanların en büyüğünden bile daha iri olan Dev Bobo çıkagelmiş. Keloğlan korkmamış, aksine Dev Bobo'ya gülümseyerek selam vermiş. 'Selam dev kardeş! Ben köyümdeki susuzluğu bitirmek için geldim. Senin kalbinin cüssenden daha büyük olduğunu duydum, bize yardım eder misin?' demiş. Dev Bobo bu cesarete şaşırmış ve Keloğlan'ı avucuna alıp saraya götürmüş.",
    "Sarayda devlerin kralı, Keloğlan'ın önüne imkansız bir görev koymuş. 'Eğer sarayın bahçesindeki yedi başlı ejderhanın uyuduğu o kuyuyu temizleyebilirsen, köyüne su vermeyi kabul ederim' demiş. Keloğlan hemen işe koyulmuş. Ejderha uyurken sessizce kuyuya inmiş. Kuyunun dibindeki devasa taşları tek tek ayıklamış. İş bittiğinde kuyu berrak bir suyla dolmaya başlamış. Ejderha uyandığında karşısında tertemiz suyu görünce o da mutlu olmuş.",
    "Keloğlan görevini başarıyla tamamlayınca, devler ona minnettar kalmış. Kral, Keloğlan'a sihirli bir tulum vermiş. 'Bu tulumdan ne kadar su dökersen dök, asla bitmeyecek' demiş. Keloğlan köye döndüğünde tulumu açmış ve tüm tarlalar yemyeşil olmuş. Köylüler Keloğlan'ı omuzlarında taşımışlar. O günden sonra Gümüş Orman'da ne kuraklık ne de üzüntü kalmış. Keloğlan ise zekası ve cesaretiyle herkese örnek olmuş. Masal da burada mutlu sonla bitmiş."
];

async function getToken() {
    const auth = new GoogleAuth({
        credentials: {
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
}

function addWavHeader(pcmData) {
    const numChannels = 1, sampleRate = 24000, bitsPerSample = 16;
    const wavHeader = Buffer.alloc(44);
    wavHeader.write('RIFF', 0);
    wavHeader.writeUInt32LE(36 + pcmData.length, 4);
    wavHeader.write('WAVE', 8);
    wavHeader.write('fmt ', 12);
    wavHeader.writeUInt32LE(16, 16);
    wavHeader.writeUInt16LE(1, 20);
    wavHeader.writeUInt16LE(numChannels, 22);
    wavHeader.writeUInt32LE(sampleRate, 24);
    wavHeader.writeUInt32LE((sampleRate * numChannels * bitsPerSample) / 8, 28);
    wavHeader.writeUInt16LE((numChannels * bitsPerSample) / 8, 32);
    wavHeader.writeUInt16LE(bitsPerSample, 34);
    wavHeader.write('data', 36);
    wavHeader.writeUInt32LE(pcmData.length, 40);
    return Buffer.concat([wavHeader, pcmData]);
}

async function runTest() {
    console.log(">>> [TEST BAŞLADI] 200+ Kelimelik Metin Parçalanıyor...");
    const token = await getToken();
    const allAudioChunks = [];

    for (let i = 0; i < TEXT_CHUNKS.length; i++) {
        console.log(`>>> [SAHNE ${i+1}] Seslendiriliyor...`);
        const ttsUrl = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/gemini-3.1-flash-tts-preview:generateContent`;
        
        const response = await fetch(ttsUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ role: 'user', parts: [{ text: TEXT_CHUNKS[i] }] }], 
                generationConfig: { 
                    responseModalities: ["AUDIO"], 
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } } 
                } 
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(JSON.stringify(data.error));

        const audioPart = data.candidates[0].content.parts.find(p => p.inlineData)?.inlineData?.data;
        if (audioPart) {
            allAudioChunks.push(Buffer.from(audioPart, 'base64'));
        }
    }

    console.log(">>> [BİRLEŞTİRME] Tüm parçalar uç uca ekleniyor...");
    const combinedPcm = Buffer.concat(allAudioChunks);
    const finalWav = addWavHeader(combinedPcm);

    const outputPath = path.join(__dirname, 'test_result_200words.wav');
    fs.writeFileSync(outputPath, finalWav);
    
    console.log(`>>> [TAMAMLANDI] Dosya Oluşturuldu: ${outputPath}`);
    console.log(`>>> Toplam Uzunluk (Bytes): ${finalWav.length}`);
}

runTest().catch(console.error);
