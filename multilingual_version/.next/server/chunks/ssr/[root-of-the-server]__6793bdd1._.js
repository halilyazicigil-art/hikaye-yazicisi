module.exports = [
"[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient,
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://anxxcbbfhzwpwarywcbv.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHhjYmJmaHp3cHdhcnl3Y2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODIzNzEsImV4cCI6MjA5Mjk1ODM3MX0.3azrydf3lrWSoxpf-0BJqUNnsZAEXWKDqnSGd3Cpr4s"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Server Component ignore
                }
            }
        }
    });
}
async function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://anxxcbbfhzwpwarywcbv.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        cookies: {
            getAll () {
                return [];
            },
            setAll () {}
        }
    });
}
}),
"[project]/multilingual_version/utils/scenarios.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORY_SCENARIOS",
    ()=>STORY_SCENARIOS
]);
const STORY_SCENARIOS = [
    // --- MEVCUT 10 ---
    {
        characters: [
            'Kaptan Bulut',
            'Martı Gümüş'
        ],
        prompt: 'Kaptan Bulut ve yardımcısı Martı Gümüş, gökyüzündeki gökkuşağının renklerinin neden solduğunu bulmak için renkli bir yolculuğa çıkıyor.',
        voice: 'Alnilam',
        voiceName: 'Yüce Kral',
        genre: 'Macera',
        style: 'Sulu Boya',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Robot Çark',
            'Küçük Mühendis Melis'
        ],
        prompt: 'Robot Çark ve Melis, bozulan bir yıldız haritasını tamir etmek için uzay gemileriyle Samanyolu galaksisinde gizemli bir parçanın peşine düşerler.',
        voice: 'Iapetus',
        voiceName: 'Orman Muhafızı',
        genre: 'Bilim Kurgu',
        style: '3D Pixar Stili',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Sevimli Ayı Pofuduk',
            'Bilge Baykuş'
        ],
        prompt: 'Ayı Pofuduk, kış uykusuna yatmadan önce ormandaki en büyük bal kovanının haritasını bulmak için Bilge Baykuş ile bir maceraya atılır.',
        voice: 'Aoede',
        voiceName: 'Bilge Anne',
        genre: 'Masal',
        style: 'Pastel Düşler',
        age: '2-4',
        language: 'tr'
    },
    {
        characters: [
            'Prenses Ada',
            'Uçan At Kanat'
        ],
        prompt: 'Prenses Ada, krallığın üzerinden hiç eksilmeyen yağmur bulutlarını dağıtmak için Uçan Atı Kanat ile güneşin doğduğu diyara uçar.',
        voice: 'Gacrux',
        voiceName: 'Gizemli Prenses',
        genre: 'Fantastik',
        style: 'Anime',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Minik Tavşan Pamuk',
            'Hızlı Kaplumbağa'
        ],
        prompt: 'Pamuk ve Kaplumbağa, ormanda düzenlenen yıllık büyük piknik için en lezzetli havuçları toplamak üzere gizli bahçeye giderler.',
        voice: 'Algenib',
        voiceName: 'Gezgin Tavşan',
        genre: 'Fabl',
        style: 'Sulu Boya',
        age: '1-2',
        language: 'tr'
    },
    {
        characters: [
            'Cesur İtfaiyeci Kerem',
            'Yavru Kedi Duman'
        ],
        prompt: 'İtfaiyeci Kerem, bir ağacın en tepesinde mahsur kalan Duman\'ı kurtarmaya çalışırken, ikisi birden sihirli bir tünelden başka bir diyara geçerler.',
        voice: 'Algieba',
        voiceName: 'Cesur Şövalye',
        genre: 'Macera',
        style: 'Çizgi Film',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Dedektif Can',
            'Konuşan Köpek Tarçın'
        ],
        prompt: 'Dedektif Can ve Tarçın, müzedeki en değerli elmasın neden sadece geceleri parladığını çözmek için gizemli bir ipucunu takip ederler.',
        voice: 'Callirrhoe',
        voiceName: 'Masalcı Kadın',
        genre: 'Macera',
        style: 'Pop Art',
        age: '10-13',
        language: 'tr'
    },
    {
        characters: [
            'Minik Peri Işıltı',
            'Dev Arı Vızvız'
        ],
        prompt: 'Peri Işıltı, kanatlarındaki tozun azalması üzerine, dünyanın en nadir çiçeğinden polen toplamak için Dev Arı Vızvız\'ın sırtında bir yolculuğa çıkar.',
        voice: 'Fenrir',
        voiceName: 'Sihirli Peri',
        genre: 'Masal',
        style: 'Yağlı Boya',
        age: '2-4',
        language: 'tr'
    },
    {
        characters: [
            'Süper Çocuk Mert',
            'Gölge Adam'
        ],
        prompt: 'Mert, şehri ele geçirmeye çalışan Gölge Adam\'ı iyilik ve neşe ile durdurmak için mahalledeki tüm çocuklarla bir plan yapar.',
        voice: 'Charon',
        voiceName: 'Heyecanlı Baba',
        genre: 'Fantastik',
        style: '3D Pixar Stili',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Mavi Ejderha Alev',
            'Küçük Viking'
        ],
        prompt: 'Alev, ateş püskürtemediği için üzüldüğünde, Küçük Viking ona acı biberlerin ve dostluğun sırrını anlatarak yardım eder.',
        voice: 'Achird',
        voiceName: 'Bilge Dede',
        genre: 'Masal',
        style: 'Vintage Retro',
        age: '4-6',
        language: 'tr'
    },
    // --- YENİ 40 SENARYO ---
    {
        characters: [
            'Uzaylı Zıpzıp',
            'Astronot Kerem'
        ],
        prompt: 'Zıpzıp, Ay üzerinde kaybolan sihirli antenini bulmak için Kerem ile kraterlerin arasında saklambaç oynar.',
        voice: 'Algenib',
        voiceName: 'Gezgin Tavşan',
        genre: 'Bilim Kurgu',
        style: '3D Pixar Stili',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Uçan Araba Vınvın',
            'Tamirci Ece'
        ],
        prompt: 'Vınvın\'ın motoru gökkuşağı yakıtı bittiği için durur, Ece ona en tatlı meyve sularından yeni bir yakıt icat eder.',
        voice: 'Fenrir',
        voiceName: 'Sihirli Peri',
        genre: 'Bilim Kurgu',
        style: 'Pop Art',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Zaman Yolcusu Arda',
            'Dinozor Dino'
        ],
        prompt: 'Arda, yanlışlıkla milyonlarca yıl geriye gidip Dino ile meyve toplama yarışı yapar.',
        voice: 'Charon',
        voiceName: 'Heyecanlı Baba',
        genre: 'Bilim Kurgu',
        style: 'Yağlı Boya',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Akıllı Ev Robi',
            'Küçük Ali'
        ],
        prompt: 'Robi, Ali\'nin ödevlerini yaparken bir hata yapar ve evin tüm eşyaları havada süzülmeye başlar.',
        voice: 'Achird',
        voiceName: 'Bilge Dede',
        genre: 'Bilim Kurgu',
        style: 'Çizgi Film',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Yıldız Gemisi Kaptanı',
            'Işık Hızı'
        ],
        prompt: 'Kaptan, Samanyolu\'nun en uzak köşesindeki dondurma gezegenini bulmak için rota çizer.',
        voice: 'Alnilam',
        voiceName: 'Yüce Kral',
        genre: 'Bilim Kurgu',
        style: 'Anime',
        age: '10-13',
        language: 'tr'
    },
    {
        characters: [
            'Siber Kedi Miya',
            'Bilgisayar Faresi Tık'
        ],
        prompt: 'Miya ve Tık, internet dünyasındaki kayıp bir klasörün içinde saklanan dijital balıkları kurtarırlar.',
        voice: 'Despina',
        voiceName: 'Huzur Perisi',
        genre: 'Bilim Kurgu',
        style: 'Pop Art',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Gezegen Muhafızı',
            'Ay Tozu'
        ],
        prompt: 'Muhafız, Satürn\'ün halkalarından birinin düştüğünü fark eder ve onu yerine takmak için dev bir vinç icat eder.',
        voice: 'Iapetus',
        voiceName: 'Orman Muhafızı',
        genre: 'Bilim Kurgu',
        style: '3D Pixar Stili',
        age: '10-13',
        language: 'tr'
    },
    {
        characters: [
            'Marslı Maviş',
            'Dünyalı Doğa'
        ],
        prompt: 'Maviş, Dünya\'daki çiçeklerin nasıl bu kadar güzel koktuğunu öğrenmek için gizlice bir bahçeye iner.',
        voice: 'Kore',
        voiceName: 'Gökkuşağı Kızı',
        genre: 'Bilim Kurgu',
        style: 'Pastel Düşler',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Geleceğin Çocuğu',
            'Hologram Dostum'
        ],
        prompt: 'Hologram dostum, sadece hayal gücüyle çalışan bir oyun odası tasarlar ve çocuklar orada sınırları zorlar.',
        voice: 'Algieba',
        voiceName: 'Cesur Şövalye',
        genre: 'Bilim Kurgu',
        style: 'Vintage Retro',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Güneş Paneli Panpa',
            'Bulut Can'
        ],
        prompt: 'Panpa, bulutlar güneşi kapattığında üzülür, Bulut Can ona komik şakalar yaparak dağılmasını sağlar.',
        voice: 'Algenib',
        voiceName: 'Gezgin Tavşan',
        genre: 'Bilim Kurgu',
        style: 'Sulu Boya',
        age: '2-4',
        language: 'tr'
    },
    // MASAL (10 Yeni)
    {
        characters: [
            'Uykucu Bulut',
            'Güneş Işığı'
        ],
        prompt: 'Uykucu Bulut, sabah uyandığında her yerin neden parladığını merak eder ve Güneş Işığı ile tanışır.',
        voice: 'Aoede',
        voiceName: 'Bilge Anne',
        genre: 'Masal',
        style: 'Pastel Düşler',
        age: '0-1',
        language: 'tr'
    },
    {
        characters: [
            'Konuşan Ağaç Meşe',
            'Küçük Sincap'
        ],
        prompt: 'Meşe, ormanın en eski sırrını minik sincaba anlatırken rüzgarın şarkısını söyler.',
        voice: 'Achird',
        voiceName: 'Bilge Dede',
        genre: 'Masal',
        style: 'Yağlı Boya',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Kayıp Anahtar',
            'Gizemli Sandık'
        ],
        prompt: 'Sandık, içindeki mutluluk iksirini paylaşmak için doğru anahtarı beklemektedir.',
        voice: 'Despina',
        voiceName: 'Huzur Perisi',
        genre: 'Masal',
        style: 'Sulu Boya',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Gökkuşağı Perisi',
            'Renkler'
        ],
        prompt: 'Peri, yağmurdan sonra renklerin birbirine karıştığını görür ve onları sıraya dizmek için dans eder.',
        voice: 'Fenrir',
        voiceName: 'Sihirli Peri',
        genre: 'Masal',
        style: 'Pastel Düşler',
        age: '2-4',
        language: 'tr'
    },
    {
        characters: [
            'Pamuk Şeker Bulutu',
            'Tatlı Yağmur'
        ],
        prompt: 'Bulut, çocuklara şekerleme yağdırmak ister ama önce bulutlar okulundan izin alması gerekir.',
        voice: 'Kore',
        voiceName: 'Gökkuşağı Kızı',
        genre: 'Masal',
        style: 'Anime',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Ay Dede',
            'Yıldız Çocuklar'
        ],
        prompt: 'Ay Dede, her gece çocuklara masallar anlatırken yıldızlar da gökyüzünde ışık saçarak ona eşlik eder.',
        voice: 'Aoede',
        voiceName: 'Bilge Anne',
        genre: 'Masal',
        style: 'Vintage Retro',
        age: '1-2',
        language: 'tr'
    },
    {
        characters: [
            'Sihirli Pabuçlar',
            'Koşucu Kaya'
        ],
        prompt: 'Pabuçlar, Kaya\'nın çok yavaş olduğunu görünce ona hız kazandırmak için büyü yaparlar.',
        voice: 'Callirrhoe',
        voiceName: 'Masalcı Kadın',
        genre: 'Masal',
        style: 'Çizgi Film',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Kristal Saray Prensi',
            'Buzdan At'
        ],
        prompt: 'Prens, sarayının neden eridiğini bulmak için kuzey ışıklarının peşinden gider.',
        voice: 'Alnilam',
        voiceName: 'Yüce Kral',
        genre: 'Masal',
        style: 'Anime',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Minik Dev',
            'Kocaman Cüce'
        ],
        prompt: 'Dünyanın en tatlı devi ve en güçlü cücesi, arkadaşlığın boyla ilgili olmadığını kanıtlar.',
        voice: 'Charon',
        voiceName: 'Heyecanlı Baba',
        genre: 'Masal',
        style: '3D Pixar Stili',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Dilek Ağacı',
            'Yaprak'
        ],
        prompt: 'Ağaç, üzerinden düşen her yaprağın bir çocuğun dileğini gerçekleştirdiğini fark eder.',
        voice: 'Iapetus',
        voiceName: 'Orman Muhafızı',
        genre: 'Masal',
        style: 'Yağlı Boya',
        age: '6-10',
        language: 'tr'
    },
    // MACERA (10 Yeni)
    {
        characters: [
            'Hazine Avcısı Efe',
            'Harita'
        ],
        prompt: 'Efe, odasında bulduğu eski haritanın aslında mutfağa giden yolu gösterdiğini keşfeder ama yolda engeller vardır.',
        voice: 'Algieba',
        voiceName: 'Cesur Şövalye',
        genre: 'Macera',
        style: 'Çizgi Film',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Denizaltı Kaptanı',
            'Balık Memo'
        ],
        prompt: 'Kaptan ve Memo, okyanusun en derinindeki kayıp şehri bulmak için ışıklı fenerlerini yakarlar.',
        voice: 'Iapetus',
        voiceName: 'Orman Muhafızı',
        genre: 'Macera',
        style: '3D Pixar Stili',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Dağcı Kerem',
            'Zirve Kartalı'
        ],
        prompt: 'Kerem, dünyanın en yüksek dağına tırmanırken kartalın ona verdiği tüylerle uçmayı öğrenir.',
        voice: 'Alnilam',
        voiceName: 'Yüce Kral',
        genre: 'Macera',
        style: 'Yağlı Boya',
        age: '10-13',
        language: 'tr'
    },
    {
        characters: [
            'Orman Kaşifi Aslı',
            'Maymun Muzmuz'
        ],
        prompt: 'Aslı ve Muzmuz, aslan kralın kayıp tacını bulmak için sarmaşıklardan atlarlar.',
        voice: 'Callirrhoe',
        voiceName: 'Masalcı Kadın',
        genre: 'Macera',
        style: 'Anime',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Bisikletli Postacı',
            'Hızlı Rüzgar'
        ],
        prompt: 'Postacı, tüm paketleri vaktinde yetiştirmek için rüzgarla yarışır ve her eve bir gülümseme götürür.',
        voice: 'Charon',
        voiceName: 'Heyecanlı Baba',
        genre: 'Macera',
        style: 'Pop Art',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Kampçı Tayfası',
            'Ateş Böceği'
        ],
        prompt: 'Çocuklar gece kamp yaparken ateş böceklerinin aslında ormanın fenerleri olduğunu öğrenirler.',
        voice: 'Despina',
        voiceName: 'Huzur Perisi',
        genre: 'Macera',
        style: 'Sulu Boya',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Uçurtma Avcısı',
            'Kuyruklu Yıldız'
        ],
        prompt: 'Uçurtma, rüzgara kapılıp gökyüzünün en tepesine çıkar ve bir kuyruklu yıldızla arkadaş olur.',
        voice: 'Kore',
        voiceName: 'Gökkuşağı Kızı',
        genre: 'Macera',
        style: 'Pastel Düşler',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Balonla Seyahat',
            'Bulutlar'
        ],
        prompt: 'Renkli dev balon, dünyanın etrafını bir günde gezmek için rüzgar akıntılarını takip eder.',
        voice: 'Algenib',
        voiceName: 'Gezgin Tavşan',
        genre: 'Macera',
        style: '3D Pixar Stili',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Safari Rehberi',
            'Yavru Fil'
        ],
        prompt: 'Rehber, sürüsünden ayrılan yavru fili annesine kavuşturmak için ormanın derinliklerine dalar.',
        voice: 'Achird',
        voiceName: 'Bilge Dede',
        genre: 'Macera',
        style: 'Vintage Retro',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Yelkenli Kaptanı',
            'Yunus Dostu'
        ],
        prompt: 'Kaptan, fırtınadan kaçarken yunusların ona yol gösterdiğini fark eder ve güvenli bir liman bulur.',
        voice: 'Algieba',
        voiceName: 'Cesur Şövalye',
        genre: 'Macera',
        style: 'Yağlı Boya',
        age: '10-13',
        language: 'tr'
    },
    // FABL & FANTASTİK (10 Yeni)
    {
        characters: [
            'Bilge Kaplumbağa',
            'Tavşan Hızlı'
        ],
        prompt: 'Kaplumbağa, Tavşan\'a hızın değil sabrın kazandırdığını orman olimpiyatlarında bir kez daha gösterir.',
        voice: 'Achird',
        voiceName: 'Bilge Dede',
        genre: 'Fabl',
        style: 'Sulu Boya',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Kibirli Aslan',
            'Minik Fare'
        ],
        prompt: 'Aslan, ağa yakalandığında minik farenin onu kurtarabileceğine asla inanmazdı ama gerçek dostluk kazandı.',
        voice: 'Alnilam',
        voiceName: 'Yüce Kral',
        genre: 'Fabl',
        style: 'Vintage Retro',
        age: '2-4',
        language: 'tr'
    },
    {
        characters: [
            'Şarkıcı Ağustos Böceği',
            'Çalışkan Karınca'
        ],
        prompt: 'Böcek, kış geldiğinde karıncanın hazırlıklarının ne kadar değerli olduğunu bir şarkıyla anlatır.',
        voice: 'Kore',
        voiceName: 'Gökkuşağı Kızı',
        genre: 'Fabl',
        style: 'Çizgi Film',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Yalancı Çoban',
            'Kuzu Dostum'
        ],
        prompt: 'Çoban, dürüstlüğün ne kadar önemli olduğunu kuzu dostuyla yaşadığı küçük bir olayla anlar.',
        voice: 'Charon',
        voiceName: 'Heyecanlı Baba',
        genre: 'Fabl',
        language: 'tr',
        style: 'Yağlı Boya',
        age: '6-10'
    },
    {
        characters: [
            'Sihirli Kütüphaneci',
            'Kitap Canavarı'
        ],
        prompt: 'Kütüphaneci, kitapların içinden fırlayan hikayelerin odaya dağılmasını engellemek için sihirli bir şiir okur.',
        voice: 'Aoede',
        voiceName: 'Bilge Anne',
        genre: 'Fantastik',
        style: 'Anime',
        age: '10-13',
        language: 'tr'
    },
    {
        characters: [
            'Ejderha Yavrusu',
            'Ateş Püskürtemeyen'
        ],
        prompt: 'Yavru ejderha, ateş yerine gökkuşağı püskürttüğünü fark edince tüm köyün neşesi olur.',
        voice: 'Fenrir',
        voiceName: 'Sihirli Peri',
        genre: 'Fantastik',
        style: '3D Pixar Stili',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Görünmez Çocuk',
            'Boya Kovası'
        ],
        prompt: 'Çocuk, bir boya kovasına çarpınca herkes onu görmeye başlar ve en komik saklambaç oyunu yaşanır.',
        voice: 'Callirrhoe',
        voiceName: 'Masalcı Kadın',
        genre: 'Fantastik',
        style: 'Pop Art',
        age: '6-10',
        language: 'tr'
    },
    {
        characters: [
            'Konuşan Kediler Krallığı',
            'Süt Gölü'
        ],
        prompt: 'Kediler, krallıklarındaki süt gölünün neden kuruduğunu bulmak için süt yoluna çıkarlar.',
        voice: 'Despina',
        voiceName: 'Huzur Perisi',
        genre: 'Fantastik',
        style: 'Pastel Düşler',
        age: '4-6',
        language: 'tr'
    },
    {
        characters: [
            'Uçan Ada Sakinleri',
            'Rüzgar Gülü'
        ],
        prompt: 'Ada sakinleri, adalarının rüzgarda çok sallandığını görünce dev bir rüzgar gülü inşa ederler.',
        voice: 'Iapetus',
        voiceName: 'Orman Muhafızı',
        genre: 'Fantastik',
        style: '3D Pixar Stili',
        age: '10-13',
        language: 'tr'
    },
    {
        characters: [
            'Sihirli Değnek',
            'Sakıncalı Büyücü'
        ],
        prompt: 'Değnek, yanlışlıkla her dokunduğunu dondurmaya başlayınca büyücü onu ısıtmak için güneşle anlaşır.',
        voice: 'Algieba',
        voiceName: 'Cesur Şövalye',
        genre: 'Fantastik',
        style: 'Vintage Retro',
        age: '6-10',
        language: 'tr'
    },
    // --- ENGLISH SCENARIOS ---
    {
        characters: [
            'Space Explorer Tom',
            'Robot Buddy'
        ],
        prompt: 'Tom and Robot Buddy discover a planet made entirely of chocolate and must find the Golden Cocoa Bean.',
        voice: 'Algenib',
        voiceName: 'Traveler Rabbit',
        genre: 'Sci-Fi',
        style: '3D Pixar Style',
        age: '6-10',
        language: 'en'
    },
    {
        characters: [
            'Princess Lily',
            'Sparkle the Unicorn'
        ],
        prompt: 'Princess Lily and Sparkle go on a quest to find the lost rainbow crystal to save the Magic Kingdom.',
        voice: 'Gacrux',
        voiceName: 'Mysterious Princess',
        genre: 'Fantasy',
        style: 'Watercolor',
        age: '4-6',
        language: 'en'
    },
    {
        characters: [
            'Detective Max',
            'Whisker the Cat'
        ],
        prompt: 'Max and Whisker solve the mystery of the missing moonlight in the Sleepy Hollow town.',
        voice: 'Callirrhoe',
        voiceName: 'Storyteller Woman',
        genre: 'Adventure',
        style: 'Cartoon',
        age: '10-13',
        language: 'en'
    },
    // --- ADDITIONAL ENGLISH SCENARIOS ---
    {
        characters: [
            'Oliver the Otter',
            'Sparky the Fish'
        ],
        prompt: 'Oliver and Sparky find a sunken pirate ship and search for the legendary Golden Pearl.',
        voice: 'Algenib',
        voiceName: 'Traveler Rabbit',
        genre: 'Adventure',
        style: 'Watercolor',
        age: '4-6',
        language: 'en'
    },
    {
        characters: [
            'Robot Z-4',
            'Maya the Inventor'
        ],
        prompt: 'Maya builds a new wing for Z-4, and they fly to the floating islands of Cloudia.',
        voice: 'Iapetus',
        voiceName: 'Forest Guardian',
        genre: 'Sci-Fi',
        style: '3D Pixar Style',
        age: '6-10',
        language: 'en'
    },
    {
        characters: [
            'Leo the Lion',
            'Tiny Mouse'
        ],
        prompt: 'Leo gets a thorn in his paw, and his tiny friend shows that true bravery comes in all sizes.',
        voice: 'Alnilam',
        voiceName: 'Grand King',
        genre: 'Fable',
        style: 'Oil Painting',
        age: '2-4',
        language: 'en'
    },
    {
        characters: [
            'Sofia the Space Scout',
            'Starry the Comet'
        ],
        prompt: 'Sofia hitches a ride on Starry to see the rings of Saturn up close for her school project.',
        voice: 'Kore',
        voiceName: 'Rainbow Girl',
        genre: 'Sci-Fi',
        style: 'Anime',
        age: '6-10',
        language: 'en'
    },
    {
        characters: [
            'Bento the Bear',
            'Luna the Owl'
        ],
        prompt: 'Bento is afraid of the dark, so Luna teaches him how to follow the constellations home.',
        voice: 'Aoede',
        voiceName: 'Wise Mother',
        genre: 'Tale',
        style: 'Pastel Dreams',
        age: '1-2',
        language: 'en'
    },
    {
        characters: [
            'Captain Barnaby',
            'Polly the Parrot'
        ],
        prompt: 'Captain Barnaby loses his compass and must rely on Polly’s songs to find the way to Treasure Island.',
        voice: 'Algieba',
        voiceName: 'Brave Knight',
        genre: 'Adventure',
        style: 'Vintage Retro',
        age: '4-6',
        language: 'en'
    },
    {
        characters: [
            'Milo the Monkey',
            'Banana the Elephant'
        ],
        prompt: 'Milo and Banana accidentally trigger a magical fruit rain in the middle of the jungle.',
        voice: 'Charon',
        voiceName: 'Excited Dad',
        genre: 'Fantasy',
        style: 'Pop Art',
        age: '2-4',
        language: 'en'
    },
    {
        characters: [
            'Elara the Elf',
            'Willow the Deer'
        ],
        prompt: 'Elara must find the Silver Leaf to heal the Great Tree before the winter frost arrives.',
        voice: 'Despina',
        voiceName: 'Serenity Fairy',
        genre: 'Fantasy',
        style: 'Watercolor',
        age: '6-10',
        language: 'en'
    },
    {
        characters: [
            'Timmy the Turtle',
            'Turbo the Snail'
        ],
        prompt: 'Timmy and Turbo enter the Great Slow Race, learning that the journey is more important than the finish line.',
        voice: 'Achird',
        voiceName: 'Wise Grandpa',
        genre: 'Fable',
        style: 'Cartoon',
        age: '4-6',
        language: 'en'
    },
    {
        characters: [
            'Astra the Alien',
            'Kevin the Human'
        ],
        prompt: 'Astra visits Earth for the first time and thinks that ice cream is a magical power source.',
        voice: 'Fenrir',
        voiceName: 'Magic Fairy',
        genre: 'Sci-Fi',
        style: '3D Pixar Style',
        age: '6-10',
        language: 'en'
    },
    {
        characters: [
            'Sir Galahad',
            'Dragon Flame'
        ],
        prompt: 'Sir Galahad finds out that the dragon isn’t scary—he just has a very bad case of the hiccups.',
        voice: 'Algieba',
        voiceName: 'Brave Knight',
        genre: 'Fantasy',
        style: 'Oil Painting',
        age: '6-10',
        language: 'en'
    },
    {
        characters: [
            'Zoe the Zoologist',
            'Pip the Penguin'
        ],
        prompt: 'Zoe helps Pip find his way back to his family after a giant ice cube carries him out to sea.',
        voice: 'Callirrhoe',
        voiceName: 'Storyteller Woman',
        genre: 'Adventure',
        style: 'Anime',
        age: '4-6',
        language: 'en'
    }
];
}),
"[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"003e5b7c2009b8b248a8835c58aeb41c00eb11b3ad":"getScenariosCacheStatus","40688fce6005dfa0ff3f69640e85feb649eda3c15b":"checkJobStatus"},"",""] */ __turbopack_context__.s([
    "checkJobStatus",
    ()=>checkJobStatus,
    "getScenariosCacheStatus",
    ()=>getScenariosCacheStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$scenarios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/scenarios.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getScenariosCacheStatus() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Get all completed shuffle jobs
    const { data: cachedJobs, error } = await supabase.from('generation_jobs').select('payload').eq('status', 'completed').eq('payload->>isShuffle', 'true');
    if (error) {
        console.error('Error fetching cache status:', error);
        return {
            scenarios: [],
            metrics: {
                total: 0,
                full: 0,
                empty: 0
            }
        };
    }
    const cachedThemes = new Set(cachedJobs?.map((job)=>job.payload?.theme).filter(Boolean));
    // 2. Process scenarios
    const processedScenarios = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$scenarios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STORY_SCENARIOS"].map((s, index)=>{
        const langPrefix = s.language === 'en' ? 'English' : 'Turkish';
        const chars = s.characters.join(', ');
        // Consistent theme format used as cache key
        const theme = `${langPrefix} dilinde. ${s.genre} tarzında. Konu: ${s.prompt}. Çizim Stili: ${s.style}. Ses Seçimi: ${s.voice}. Karakterler: ${chars}.`;
        return {
            ...s,
            id: index,
            theme,
            isCached: cachedThemes.has(theme)
        };
    });
    const total = processedScenarios.length;
    const full = processedScenarios.filter((s)=>s.isCached).length;
    const empty = total - full;
    return {
        scenarios: processedScenarios,
        metrics: {
            total,
            full,
            empty
        }
    };
}
async function checkJobStatus(jobId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('generation_jobs').select('status, error_message, story_id').eq('id', jobId).single();
    if (error) return {
        status: 'error',
        error: error.message
    };
    return data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getScenariosCacheStatus,
    checkJobStatus
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getScenariosCacheStatus, "003e5b7c2009b8b248a8835c58aeb41c00eb11b3ad", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkJobStatus, "40688fce6005dfa0ff3f69640e85feb649eda3c15b", null);
}),
"[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000dca46ce9750bd6f7c7ac28c36360758e4139c17":"migrateLegacyCacheKeys"},"",""] */ __turbopack_context__.s([
    "migrateLegacyCacheKeys",
    ()=>migrateLegacyCacheKeys
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function migrateLegacyCacheKeys() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    // 1. Fetch all completed shuffle jobs that don't have the language prefix
    // We fetch them and update manually to ensure JSON payload integrity
    const { data: jobs, error } = await supabase.from('generation_jobs').select('id, payload').eq('status', 'completed').eq('payload->>isShuffle', 'true');
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    if (!jobs || jobs.length === 0) {
        return {
            success: true,
            message: 'No jobs found to migrate.'
        };
    }
    let updatedCount = 0;
    const errors = [];
    for (const job of jobs){
        const payload = job.payload;
        const currentTheme = payload.theme || '';
        // Skip if already has prefix
        if (currentTheme.startsWith('Turkish dilinde.') || currentTheme.startsWith('English dilinde.')) {
            continue;
        }
        // Apply new prefix (assuming all legacy stories were Turkish)
        const updatedTheme = `Turkish dilinde. ${currentTheme}`;
        const updatedPayload = {
            ...payload,
            theme: updatedTheme,
            language: 'tr'
        };
        const { error: updateErr } = await supabase.from('generation_jobs').update({
            payload: updatedPayload
        }).eq('id', job.id);
        if (updateErr) {
            errors.push(`Job ${job.id}: ${updateErr.message}`);
        } else {
            updatedCount++;
        }
    }
    return {
        success: errors.length === 0,
        updatedCount,
        errorCount: errors.length,
        errors: errors.slice(0, 5) // Show first few errors if any
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    migrateLegacyCacheKeys
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(migrateLegacyCacheKeys, "000dca46ce9750bd6f7c7ac28c36360758e4139c17", null);
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/require-in-the-middle [external] (require-in-the-middle, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("require-in-the-middle", () => require("require-in-the-middle"));

module.exports = mod;
}),
"[externals]/import-in-the-middle [external] (import-in-the-middle, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("import-in-the-middle", () => require("import-in-the-middle"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:http [external] (node:http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http", () => require("node:http"));

module.exports = mod;
}),
"[externals]/node:https [external] (node:https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:https", () => require("node:https"));

module.exports = mod;
}),
"[externals]/diagnostics_channel [external] (diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("diagnostics_channel", () => require("diagnostics_channel"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/node:readline [external] (node:readline, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:readline", () => require("node:readline"));

module.exports = mod;
}),
"[externals]/node:worker_threads [external] (node:worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:worker_threads", () => require("node:worker_threads"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:zlib [external] (node:zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:zlib", () => require("node:zlib"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:tls [external] (node:tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tls", () => require("node:tls"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/multilingual_version/services/QuotaService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuotaService",
    ()=>QuotaService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@sentry/nextjs/build/cjs/index.server.js [app-rsc] (ecmascript)");
;
class QuotaService {
    /**
   * Kullanıcının abonelik planına göre limitleri belirler
   */ static getPlanLimits(planId, isExpired = false) {
        const isPremium = !isExpired && planId === 'premium';
        const isPro = !isExpired && planId === 'pro';
        const plan = isPremium ? 'premium' : isPro ? 'pro' : 'free';
        return {
            isPremium,
            isPro,
            planId: plan,
            totalLimit: isPremium ? 80 : isPro ? 40 : 3,
            shuffleLimit: isPremium ? 25 : isPro ? 10 : 3,
            manualLimit: isPremium ? 55 : isPro ? 30 : 0,
            audioLimit: isPremium ? 40 : isPro ? 20 : 3,
            continueLimit: isPremium ? 25 : isPro ? 10 : 0,
            podcastLimit: isPremium ? 15 : isPro ? 6 : 0
        };
    }
    /**
   * Mevcut fatura döneminin başlangıç tarihini hesaplar
   */ static calculateStartDate(currentPeriodEnd) {
        let startDate = new Date();
        if (currentPeriodEnd) {
            startDate = new Date(currentPeriodEnd);
            startDate.setMonth(startDate.getMonth() - 1);
        } else {
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
        }
        return startDate;
    }
    /**
   * Veritabanından kullanıcının tüm kullanım verilerini çeker ve hesaplar
   */ static async getUserQuotaStats(supabase, userId) {
        try {
            // 1. Abonelik bilgilerini çek
            const { data: sub } = await supabase.from('subscriptions').select('plan_id, current_period_end').eq('user_id', userId).maybeSingle();
            const now = new Date();
            const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true;
            const limits = this.getPlanLimits(sub?.plan_id, isExpired);
            const startDate = this.calculateStartDate(sub?.current_period_end);
            // 2. Kullanım verilerini çek
            const [{ count: totalUsed }, { count: usedShuffle }, { count: usedManual }, { count: usedShuffleAudio }, { count: usedManualAudio }, { count: usedContinue }, { data: userData }] = await Promise.all([
                supabase.from('stories').select('*', {
                    count: 'exact',
                    head: true
                }).eq('user_id', userId).gte('created_at', startDate.toISOString()),
                supabase.from('stories').select('*', {
                    count: 'exact',
                    head: true
                }).eq('user_id', userId).eq('is_shuffle', true).gte('created_at', startDate.toISOString()),
                supabase.from('stories').select('*', {
                    count: 'exact',
                    head: true
                }).eq('user_id', userId).eq('is_shuffle', false).gte('created_at', startDate.toISOString()),
                supabase.from('stories').select('*', {
                    count: 'exact',
                    head: true
                }).eq('user_id', userId).eq('is_shuffle', true).not('audio_url', 'is', null).gte('created_at', startDate.toISOString()),
                supabase.from('stories').select('*', {
                    count: 'exact',
                    head: true
                }).eq('user_id', userId).eq('is_shuffle', false).not('audio_url', 'is', null).gte('created_at', startDate.toISOString()),
                supabase.from('stories').select('*', {
                    count: 'exact',
                    head: true
                }).eq('user_id', userId).not('master_ref_story_id', 'is', null).gte('created_at', startDate.toISOString()),
                supabase.from('users').select('podcast_downloads, role, bonus_quota, is_suspended').eq('id', userId).maybeSingle()
            ]);
            const manualAudioLimit = limits.audioLimit - limits.shuffleLimit;
            return {
                shuffleUsed: usedShuffle || 0,
                shuffleLimit: limits.shuffleLimit + (userData?.bonus_quota || 0),
                manualUsed: usedManual || 0,
                manualLimit: limits.manualLimit,
                audioUsed: usedManualAudio || 0,
                audioLimit: manualAudioLimit,
                shuffleAudioUsed: usedShuffleAudio || 0,
                totalUsed: totalUsed || 0,
                totalLimit: limits.totalLimit + (userData?.bonus_quota || 0),
                continueUsed: usedContinue || 0,
                continueLimit: limits.continueLimit,
                podcastUsed: userData?.podcast_downloads || 0,
                podcastLimit: limits.podcastLimit,
                isPro: limits.isPro,
                isPremium: limits.isPremium,
                planId: limits.planId,
                role: userData?.role || 'user',
                bonusQuota: userData?.bonus_quota || 0,
                isSuspended: userData?.is_suspended || false
            };
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["captureException"](error);
            // Lokal hata logu (Admin paneli için)
            try {
                const message = error instanceof Error ? error.message : String(error);
                await supabase.from('error_logs').insert({
                    user_id: userId,
                    error_message: message,
                    location: 'QuotaService.getUserQuotaStats'
                });
            } catch (logErr) {
            // Loglama hatası sistemin ana akışını bozmamalı
            }
            // GÜVENLİ FALLBACK (Çökmeyi Engelleyen Varsayılan Değerler)
            return {
                shuffleUsed: 0,
                shuffleLimit: 3,
                manualUsed: 0,
                manualLimit: 0,
                audioUsed: 0,
                audioLimit: 0,
                shuffleAudioUsed: 0,
                totalUsed: 0,
                totalLimit: 3,
                continueUsed: 0,
                continueLimit: 0,
                podcastUsed: 0,
                podcastLimit: 0,
                isPro: false,
                isPremium: false,
                planId: 'free',
                role: 'user',
                bonusQuota: 0,
                isSuspended: false
            };
        }
    }
}
}),
"[project]/multilingual_version/app/actions/adminActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"609ac788c79ff94f27ad792f337b584d44250d8b68":"toggleSystemSettingAction","60abec23a8196e2d35244ae39f5b38614da74c3721":"toggleUserSuspensionAction","60bc3fb31c85a6b9820a1e7b3c58f1550aa45c3cb6":"addBonusQuotaAction"},"",""] */ __turbopack_context__.s([
    "addBonusQuotaAction",
    ()=>addBonusQuotaAction,
    "toggleSystemSettingAction",
    ()=>toggleSystemSettingAction,
    "toggleUserSuspensionAction",
    ()=>toggleUserSuspensionAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$services$2f$QuotaService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/services/QuotaService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
/**
 * Admin Yetki Kontrolü (Güvenlik Katmanı)
 */ async function checkAdmin(supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Oturum açılmadı.');
    const quota = await __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$services$2f$QuotaService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuotaService"].getUserQuotaStats(supabase, user.id);
    if (quota.role !== 'admin') throw new Error('Bu işlem için admin yetkisi gerekiyor.');
    return user;
}
async function addBonusQuotaAction(userId, amount) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        await checkAdmin(supabase);
        // Mevcut bonus_quota değerini al ve üzerine ekle
        const { data: user } = await supabase.from('users').select('bonus_quota').eq('id', userId).single();
        const currentBonus = user?.bonus_quota || 0;
        const { error } = await supabase.from('users').update({
            bonus_quota: currentBonus + amount
        }).eq('id', userId);
        if (error) throw error;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}
async function toggleUserSuspensionAction(userId, currentStatus) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        await checkAdmin(supabase);
        const { error } = await supabase.from('users').update({
            is_suspended: !currentStatus
        }).eq('id', userId);
        if (error) throw error;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}
async function toggleSystemSettingAction(field, currentValue) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        await checkAdmin(supabase);
        const { error } = await supabase.from('system_settings').update({
            [field]: !currentValue,
            updated_at: new Date().toISOString()
        }).eq('id', 1);
        if (error) throw error;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    addBonusQuotaAction,
    toggleUserSuspensionAction,
    toggleSystemSettingAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addBonusQuotaAction, "60bc3fb31c85a6b9820a1e7b3c58f1550aa45c3cb6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleUserSuspensionAction, "60abec23a8196e2d35244ae39f5b38614da74c3721", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleSystemSettingAction, "609ac788c79ff94f27ad792f337b584d44250d8b68", null);
}),
"[project]/multilingual_version/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/multilingual_version/app/actions/adminActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminActions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/multilingual_version/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/multilingual_version/app/actions/adminActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000dca46ce9750bd6f7c7ac28c36360758e4139c17",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["migrateLegacyCacheKeys"],
    "003e5b7c2009b8b248a8835c58aeb41c00eb11b3ad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getScenariosCacheStatus"],
    "40688fce6005dfa0ff3f69640e85feb649eda3c15b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkJobStatus"],
    "609ac788c79ff94f27ad792f337b584d44250d8b68",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleSystemSettingAction"],
    "60abec23a8196e2d35244ae39f5b38614da74c3721",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleUserSuspensionAction"],
    "60bc3fb31c85a6b9820a1e7b3c58f1550aa45c3cb6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addBonusQuotaAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/multilingual_version/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/multilingual_version/app/actions/adminActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminActions.ts [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/app/favicon.ico.mjs { IMAGE => \"[project]/multilingual_version/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/multilingual_version/app/favicon.ico.mjs { IMAGE => \"[project]/multilingual_version/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/multilingual_version/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/multilingual_version/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/multilingual_version/components/admin/UserManagement.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/admin/UserManagement.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/admin/UserManagement.tsx <module evaluation>", "default");
}),
"[project]/multilingual_version/components/admin/UserManagement.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/admin/UserManagement.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/admin/UserManagement.tsx", "default");
}),
"[project]/multilingual_version/components/admin/UserManagement.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$UserManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/UserManagement.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$UserManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/UserManagement.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$UserManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/multilingual_version/components/admin/SystemSwitches.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/admin/SystemSwitches.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/admin/SystemSwitches.tsx <module evaluation>", "default");
}),
"[project]/multilingual_version/components/admin/SystemSwitches.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/admin/SystemSwitches.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/admin/SystemSwitches.tsx", "default");
}),
"[project]/multilingual_version/components/admin/SystemSwitches.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$SystemSwitches$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/SystemSwitches.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$SystemSwitches$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/SystemSwitches.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$SystemSwitches$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScenarioDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-rsc] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-rsc] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-rsc] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-rsc] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/search.mjs [app-rsc] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/database.mjs [app-rsc] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-rsc] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-rsc] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-rsc] (ecmascript) <export default as RefreshCw>");
;
;
;
;
function ScenarioDashboard({ initialData }) {
    const [scenarios, setScenarios] = useState(initialData.scenarios || []);
    const [metrics, setMetrics] = useState(initialData.metrics || {
        total: 0,
        full: 0,
        empty: 0
    });
    const [filter, setFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isGeneratingAll, setIsGeneratingAll] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);
    const [processingId, setProcessingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    // ... (rest of the component logic)
    const handleMigration = async ()=>{
        if (!confirm('Eski formatta üretilmiş hikayeler yeni sisteme (Turkish dilinde...) uygun hale getirilecektir. Bu işlem sadece bir kez yapılmalıdır. Onaylıyor musunuz?')) return;
        setIsMigrating(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["migrateLegacyCacheKeys"])();
            if (res.success) {
                alert(`${res.updatedCount} adet eski kayıt başarıyla güncellendi! Dashboard güncelleniyor...`);
                // Sayfayı yenilemek en temizi
                window.location.reload();
            } else {
                alert('Hata: ' + res.error);
            }
        } catch (err) {
            console.error(err);
        } finally{
            setIsMigrating(false);
        }
    };
    const filteredScenarios = useMemo(()=>{
        // ... (existing filtering logic)
        return scenarios.filter((s)=>{
            const langMatch = filter === 'all' || s.language === filter;
            const statusMatch = statusFilter === 'all' || (statusFilter === 'ready' ? s.isCached : !s.isCached);
            const searchMatch = s.prompt.toLowerCase().includes(searchTerm.toLowerCase()) || s.characters.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
            return langMatch && statusMatch && searchMatch;
        });
    }, [
        scenarios,
        filter,
        statusFilter,
        searchTerm
    ]);
    const pollJob = async (jobId)=>{
        return new Promise((resolve)=>{
            const interval = setInterval(async ()=>{
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkJobStatus"])(jobId);
                    if (res.status === 'completed' || res.status === 'failed') {
                        clearInterval(interval);
                        resolve(res.status);
                    }
                } catch (e) {
                    clearInterval(interval);
                    resolve('failed');
                }
            }, 5000);
        });
    };
    const generateSingle = async (scenario)=>{
        setProcessingId(scenario.id);
        try {
            const res = await backgroundStoryAction({
                hero: scenario.characters.join(', '),
                theme: scenario.theme,
                voiceOption: 'AI',
                childName: 'Kullanıcı',
                age: scenario.age,
                style: scenario.style,
                elevenVoiceId: scenario.voice,
                isShuffle: true,
                language: scenario.language
            });
            if (res.success && res.jobId) {
                const status = await pollJob(res.jobId);
                if (status === 'completed') {
                    setScenarios((prev)=>prev.map((s)=>s.id === scenario.id ? {
                                ...s,
                                isCached: true
                            } : s));
                    setMetrics((prev)=>({
                            ...prev,
                            full: prev.full + 1,
                            empty: prev.empty - 1
                        }));
                }
            }
        } catch (err) {
            console.error('Production error:', err);
        } finally{
            setProcessingId(null);
        }
    };
    const fillMissing = async ()=>{
        const missing = scenarios.filter((s)=>!s.isCached);
        if (missing.length === 0) return alert('Tüm taslaklar zaten dolu! ✨');
        if (!confirm(`${missing.length} adet eksik taslak sırayla üretilecektir. Onaylıyor musunuz?`)) return;
        setIsGeneratingAll(true);
        for (const s of missing){
            await generateSingle(s);
            await new Promise((r)=>setTimeout(r, 1000));
        }
        setIsGeneratingAll(false);
        alert('Tüm üretimler tamamlandı! 🚀');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-sky-50 text-sky-600 rounded-2xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 116,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-black text-gray-900",
                                        children: metrics.total
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 120,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-[10px] font-black uppercase tracking-widest",
                                        children: "Toplam Taslak"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 121,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 119,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                        lineNumber: 115,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-100 flex items-center gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-emerald-50 text-emerald-600 rounded-2xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-black text-emerald-600",
                                        children: metrics.full
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 130,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-[10px] font-black uppercase tracking-widest",
                                        children: "Dolu (Cache)"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 131,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 129,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                        lineNumber: 125,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-[2rem] shadow-sm border border-orange-100 flex items-center gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-orange-50 text-orange-600 rounded-2xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                    lineNumber: 137,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 136,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-black text-orange-600",
                                        children: metrics.empty
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 140,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-[10px] font-black uppercase tracking-widest",
                                        children: "Eksik (Boş)"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 141,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                        lineNumber: 135,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between bg-white gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-black text-gray-900 flex items-center gap-3 font-lora",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "text-orange-500"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 150,
                                                columnNumber: 29
                                            }, this),
                                            "Sihirli Taslaklar (Cache) Durumu"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 149,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-sm font-medium mt-1",
                                        children: "Eksikleri otomatik kuyruk ile sırayla doldurun."
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 153,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 148,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleMigration,
                                        disabled: isMigrating || isGeneratingAll,
                                        className: "px-5 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 active:scale-95",
                                        title: "Eski Kayıtları Optimize Et",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                className: isMigrating ? 'animate-spin' : '',
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 163,
                                                columnNumber: 29
                                            }, this),
                                            isMigrating ? 'Düzeltiliyor...' : 'Sistemi Optimize Et'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 157,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: fillMissing,
                                        disabled: isGeneratingAll || metrics.empty === 0 || isMigrating,
                                        className: "px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
                                        children: [
                                            isGeneratingAll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "animate-spin",
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 172,
                                                columnNumber: 48
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 18,
                                                className: "text-yellow-400"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 172,
                                                columnNumber: 97
                                            }, this),
                                            "Eksikleri Otomatik Doldur"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 156,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                        lineNumber: 147,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-gray-50 flex flex-wrap items-center gap-4 bg-gray-50/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1 min-w-[200px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 180,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Taslaklarda ara...",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        className: "w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-sky-300 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 181,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 179,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter('all'),
                                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'all' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: "HEPSİ"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 191,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter('tr'),
                                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'tr' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: "TR"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 192,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter('en'),
                                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'en' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: "EN"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 193,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 190,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setStatusFilter('all'),
                                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${statusFilter === 'all' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: "TÜMÜ"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 197,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setStatusFilter('ready'),
                                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${statusFilter === 'ready' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: "DOLU"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 198,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setStatusFilter('missing'),
                                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${statusFilter === 'missing' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: "BOŞ"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 199,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                lineNumber: 196,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                        lineNumber: 178,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto max-h-[600px] overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "sticky top-0 z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-5",
                                                children: "Senaryo Konusu"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 207,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-5",
                                                children: "Tür"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 208,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-5",
                                                children: "Dil"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 209,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-5 text-right",
                                                children: "Durum"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                lineNumber: 210,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                        lineNumber: 206,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                    lineNumber: 205,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-50",
                                    children: filteredScenarios.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-50/30 transition group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-bold text-gray-900 line-clamp-1 max-w-md",
                                                            children: s.prompt
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-gray-400 mt-1 font-medium",
                                                            children: s.characters.join(', ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-6 text-xs font-bold text-gray-500 uppercase",
                                                    children: s.genre
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5 text-sm font-bold text-gray-500",
                                                    children: s.language === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5 text-right",
                                                    children: s.isCached ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-black uppercase tracking-widest",
                                                                children: "HAZIR"
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                                lineNumber: 226,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 45
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 text-orange-500 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100",
                                                        children: processingId === s.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                    size: 16,
                                                                    className: "animate-spin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 55
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black uppercase tracking-widest",
                                                                    children: "ÜRETİLİYOR..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 101
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                                    lineNumber: 233,
                                                                    columnNumber: 55
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black uppercase tracking-widest",
                                                                    children: "EKSİK"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                                    lineNumber: 233,
                                                                    columnNumber: 76
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                        lineNumber: 229,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, s.theme, true, {
                                            fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                            lineNumber: 215,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                                    lineNumber: 213,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                            lineNumber: 204,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                        lineNumber: 203,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
                lineNumber: 146,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx",
        lineNumber: 113,
        columnNumber: 9
    }, this);
}
}),
"[project]/multilingual_version/app/admin/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$services$2f$QuotaService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/services/QuotaService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/users.mjs [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/book.mjs [app-rsc] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-rsc] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-rsc] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-rsc] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-rsc] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-rsc] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$UserManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/UserManagement.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$SystemSwitches$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/SystemSwitches.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$ScenarioDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
async function AdminPage({ searchParams }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/login');
    }
    // 1. Yetki Kontrolü (Server-Side RBAC)
    const quota = await __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$services$2f$QuotaService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuotaService"].getUserQuotaStats(supabase, user.id);
    if (quota.role !== 'admin') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/');
    }
    // 2. İstatistikleri Çek (Admin yetkisiyle)
    const [{ count: totalStories }, { count: totalUsers }, { count: activeSubsCount }, { data: recentStories, count: totalStoriesCount }, { data: errorLogs }, { data: paymentsData }, { data: usersData }, { data: systemSettings }, cacheData] = await Promise.all([
        supabase.from('stories').select('*', {
            count: 'exact',
            head: true
        }),
        supabase.from('users').select('*', {
            count: 'exact',
            head: true
        }),
        supabase.from('subscriptions').select('*', {
            count: 'exact',
            head: true
        }).eq('status', 'active'),
        supabase.from('stories').select('id, title, created_at, user_id, users(email)', {
            count: 'exact'
        }).order('created_at', {
            ascending: false
        }).range(from, to),
        supabase.from('error_logs').select('*').order('created_at', {
            ascending: false
        }).limit(10),
        supabase.from('payments').select('amount'),
        supabase.from('users').select('id, email, bonus_quota, is_suspended').order('created_at', {
            ascending: false
        }).limit(100),
        supabase.from('system_settings').select('*').eq('id', 1).maybeSingle(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getScenariosCacheStatus"])()
    ]);
    const totalGrossRevenue = (paymentsData || []).reduce((acc, curr)=>acc + (Number(curr.amount) || 0), 0);
    const totalStripeFees = (paymentsData || []).reduce((acc, curr)=>acc + (Number(curr.amount) * 0.029 + 0.3), 0);
    const netRevenue = Math.max(0, totalGrossRevenue - totalStripeFees);
    const totalPages = Math.ceil((totalStoriesCount || 0) / itemsPerPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6 md:p-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-black text-gray-900 mb-2 font-lora",
                                    children: "Komuta Kontrol Merkezi"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-medium",
                                    children: "Sistem genelindeki tüm aktiviteleri buradan takip edebilirsiniz."
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition shadow-sm",
                            children: "Siteye Dön"
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-br from-gray-900 to-slate-800 p-6 rounded-[2rem] shadow-xl border border-white/5 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-default",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2.5 bg-white/10 rounded-xl text-emerald-400",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Revenue"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-black text-white",
                                            children: [
                                                "$",
                                                totalGrossRevenue.toFixed(0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/40 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: "Brüt Gelir"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-blue-600 bg-blue-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Net"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-black text-gray-900",
                                            children: [
                                                "$",
                                                netRevenue.toFixed(0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: "Komisyon Hariç"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2.5 bg-sky-50 rounded-xl text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-sky-600 bg-sky-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Stories"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-black text-gray-900",
                                            children: totalStories || 0
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: "Toplam Masal"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-purple-600 bg-purple-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Active"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-black text-gray-900",
                                            children: activeSubsCount || 0
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: "Aktif Abonelik"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2.5 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-orange-600 bg-orange-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Users"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-black text-gray-900",
                                            children: totalUsers || 0
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: "Toplam Kayıt"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 border-b border-gray-50 flex items-center justify-between bg-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-black text-gray-900 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "text-sky-500"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    "Son Üretilen Hikayeler"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-left border-collapse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Kullanıcı"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Masal Başlığı"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Tarih"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5 text-right",
                                                    children: "Aksiyon"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-gray-50",
                                        children: recentStories?.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-gray-50/30 transition group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 font-medium text-gray-500 text-sm",
                                                        children: story.users?.email || 'Bilinmiyor'
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 font-black text-gray-900 text-lg",
                                                        children: story.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 text-gray-400 text-xs font-bold",
                                                        children: new Date(story.created_at).toLocaleString('tr-TR', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/story/${story.id}`,
                                                            className: "inline-flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-400 rounded-full group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, story.id, true, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-400 text-xs font-black uppercase tracking-widest",
                                    children: [
                                        "Sayfa ",
                                        page,
                                        " / ",
                                        totalPages || 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/admin?page=${page - 1}`,
                                            className: `px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${page <= 1 ? 'bg-gray-100 text-gray-300 border-gray-100 pointer-events-none' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95'}`,
                                            children: "Önceki"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/admin?page=${page + 1}`,
                                            className: `px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${page >= totalPages ? 'bg-gray-100 text-gray-300 border-gray-100 pointer-events-none' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95'}`,
                                            children: "Sonraki"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$ScenarioDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    initialData: cacheData
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$UserManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    initialUsers: usersData || []
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$SystemSwitches$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    initialSettings: systemSettings || {
                        maintenance_mode: false,
                        voice_cloning_enabled: false
                    }
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[2.5rem] shadow-sm border border-orange-100 overflow-hidden mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 border-b border-orange-50 flex items-center justify-between bg-orange-50/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-black text-gray-900 flex items-center gap-3 font-lora",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "text-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this),
                                    "Sistem Hata Logları (Canlı)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 241,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-left border-collapse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-orange-50/20 text-orange-400 text-[10px] font-black uppercase tracking-widest",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Tarih"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Kullanıcı"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Konum"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: "Hata Mesajı"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-orange-50",
                                        children: [
                                            errorLogs?.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-orange-50/10 transition group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6 text-gray-400 text-xs font-bold",
                                                            children: new Date(log.created_at).toLocaleString('tr-TR')
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6 font-medium text-gray-500 text-sm",
                                                            children: log.user_email || 'Anonim'
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black tracking-widest border border-gray-200",
                                                                children: log.location
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6 text-red-500 text-sm font-medium",
                                                            children: log.error_message
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, log.id, true, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 19
                                                }, this)),
                                            (!errorLogs || errorLogs.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 4,
                                                    className: "px-8 py-10 text-center text-gray-400 font-bold",
                                                    children: "Henüz bir hata kaydı bulunmuyor. Sistem temiz! ✨"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 239,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/multilingual_version/app/admin/page.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/multilingual_version/app/admin/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/multilingual_version/app/admin/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/multilingual_version/app/admin/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6793bdd1._.js.map