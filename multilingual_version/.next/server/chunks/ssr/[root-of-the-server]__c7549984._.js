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
"[project]/multilingual_version/app/actions/backgroundStoryAction.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40674eb668f02ebef7ad96023aee6f5f83f55e6cd8":"backgroundStoryAction"},"",""] */ __turbopack_context__.s([
    "backgroundStoryAction",
    ()=>backgroundStoryAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function backgroundStoryAction(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");
        // 1. Abonelik Bilgilerini Çek (KOTA KONTROLÜ İÇİN)
        const { data: sub } = await supabase.from('subscriptions').select('plan_id, current_period_end').eq('user_id', user.id).maybeSingle();
        // 🚨 ABONELİK SÜRE KONTROLÜ
        const now = new Date();
        const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true;
        const isPremium = !isExpired && sub?.plan_id === 'premium';
        const isPro = !isExpired && sub?.plan_id === 'pro';
        // 🚨 KESİN PAKET KURALLARI (TASLAK VS ÖZGÜN)
        const totalLimit = isPremium ? 80 : isPro ? 40 : 3;
        const shuffleLimit = isPremium ? 25 : isPro ? 10 : 3;
        const manualLimit = isPremium ? 55 : isPro ? 30 : 0;
        const audioLimit = isPremium ? 40 : isPro ? 20 : 3;
        const wordLimit = isPremium ? 500 : isPro ? 250 : 300;
        // 2. Mevcut Fatura Dönemi Başlangıcını Hesapla
        const startDate = sub?.current_period_end ? new Date(new Date(sub.current_period_end).setMonth(new Date(sub.current_period_end).getMonth() - 1)) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        // 3. Kullanım Verilerini Tek Sorguda Çek (Optimizasyon)
        const { data: periodStories } = await supabase.from('stories').select('is_shuffle, audio_url').eq('user_id', user.id).gte('created_at', startDate.toISOString());
        const usedStories = periodStories?.length || 0;
        const shuffleUsed = periodStories?.filter((s)=>s.is_shuffle).length || 0;
        const manualUsed = usedStories - shuffleUsed;
        const sAudioUsed = periodStories?.filter((s)=>s.is_shuffle && s.audio_url).length || 0;
        const mAudioUsed = periodStories?.filter((s)=>!s.is_shuffle && s.audio_url).length || 0;
        // 🚨 KOTA ENGELLEME (GÜVENLİK DUVARI)
        if (usedStories >= totalLimit) {
            throw new Error(`Aylık toplam hikaye limitinize ulaştınız (${totalLimit}/${totalLimit}).`);
        }
        if (formData.isShuffle) {
            if (shuffleUsed >= shuffleLimit) {
                throw new Error(`Aylık sihirli taslak (karıştır) limitinize ulaştınız (${shuffleLimit}/${shuffleLimit}).`);
            }
            if (sAudioUsed + mAudioUsed >= audioLimit && formData.voiceOption !== 'Sessiz') {
                throw new Error(`Toplam sesli üretim limitiniz doldu (${audioLimit}/${audioLimit}).`);
            }
        } else {
            if (!isPro && !isPremium) {
                throw new Error("Pamuk Bulut paketi ile sadece sihirli taslakları (karıştır) kullanabilirsiniz. Kendi hikayenizi yazmak için lütfen abone olun.");
            }
            if (manualUsed >= manualLimit) {
                throw new Error(`Aylık özgün hikaye (kendi yazdığınız) limitinize ulaştınız (${manualLimit}/${manualLimit}).`);
            }
            if (sAudioUsed + mAudioUsed >= audioLimit && formData.voiceOption !== 'Sessiz') {
                throw new Error(`Toplam sesli üretim limitiniz doldu (${audioLimit}/${audioLimit}).`);
            }
        }
        // 🏆 CACHING MİMARİSİ
        const { data: existingJob } = await supabase.from('generation_jobs').select('story_id').eq('status', 'completed').eq('payload->>language', formData.language || 'tr').eq('payload->>theme', formData.theme).not('story_id', 'is', null).limit(1).maybeSingle();
        if (!formData.master_ref_story_id && existingJob && existingJob.story_id) {
            const { data: masterStory } = await supabase.from('stories').select('*').eq('id', existingJob.story_id).single();
            if (masterStory) {
                const { data: copiedStory, error: copyErr } = await supabase.from('stories').insert({
                    user_id: user.id,
                    title: masterStory.title,
                    content_json: masterStory.content_json,
                    image_url: masterStory.image_url,
                    audio_url: masterStory.audio_url,
                    is_shuffle: masterStory.is_shuffle
                }).select().single();
                if (copyErr) throw copyErr;
                // UI'da gerçekçi bir bekleme süresi yaratmak için 'cached_processing' durumuyla başlatıyoruz
                const { data: fakeJob } = await supabase.from('generation_jobs').insert({
                    user_id: user.id,
                    status: 'cached_processing',
                    progress: 0,
                    story_id: copiedStory.id,
                    payload: formData
                }).select().single();
                console.log(`>>> [CACHE HIT]: API kullanılmadı! Kopyalanan Story ID: ${copiedStory.id}`);
                return {
                    success: true,
                    jobId: fakeJob.id
                };
            }
        }
        // 3. İş Kuyruğuna Ekle (Sadece Kota Varsa ve Cache'de Yoksa)
        const { data: job, error: jobErr } = await supabase.from('generation_jobs').insert({
            user_id: user.id,
            status: 'pending',
            progress: 0,
            payload: {
                ...formData,
                wordLimit,
                user_id: user.id
            }
        }).select().single();
        if (jobErr) throw jobErr;
        // 2. Worker'ı Tetikle (Fire and Forget)
        // Local'de 127.0.0.1 kullanarak DNS sorunlarını aşıyoruz
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:5353';
        const workerUrl = `${appUrl}/api/story-worker`;
        console.log(`>>> [TRIGGER]: Worker tetikleniyor: ${workerUrl}`);
        fetch(workerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobId: job.id
            })
        }).catch(async (err)=>{
            const errMsg = `Worker'a ulaşılamadı: ${err.message}`;
            console.error(">>> WORKER TETİKLEME HATASI:", errMsg);
            // Hatayı veritabanına yazalım ki UI'da radar görebilsin
            await supabase.from('generation_jobs').update({
                status: 'failed',
                error_message: errMsg
            }).eq('id', job.id);
        });
        return {
            success: true,
            jobId: job.id
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(">>> [BACKGROUND ACTION HATA]:", message);
        return {
            success: false,
            error: message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    backgroundStoryAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(backgroundStoryAction, "40674eb668f02ebef7ad96023aee6f5f83f55e6cd8", null);
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
            message: 'No jobs found to migrate.',
            updatedCount: 0
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
        errors: errors.slice(0, 5)
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    migrateLegacyCacheKeys
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(migrateLegacyCacheKeys, "000dca46ce9750bd6f7c7ac28c36360758e4139c17", null);
}),
"[project]/multilingual_version/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/multilingual_version/app/actions/backgroundStoryAction.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$backgroundStoryAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/backgroundStoryAction.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/multilingual_version/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/multilingual_version/app/actions/backgroundStoryAction.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000dca46ce9750bd6f7c7ac28c36360758e4139c17",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["migrateLegacyCacheKeys"],
    "003e5b7c2009b8b248a8835c58aeb41c00eb11b3ad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getScenariosCacheStatus"],
    "40674eb668f02ebef7ad96023aee6f5f83f55e6cd8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$backgroundStoryAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["backgroundStoryAction"],
    "40688fce6005dfa0ff3f69640e85feb649eda3c15b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkJobStatus"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$backgroundStoryAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/multilingual_version/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/multilingual_version/app/actions/backgroundStoryAction.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$adminCacheActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/adminCacheActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$backgroundStoryAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/backgroundStoryAction.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$migrationActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/migrationActions.ts [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/app/favicon.ico.mjs { IMAGE => \"[project]/multilingual_version/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/multilingual_version/app/favicon.ico.mjs { IMAGE => \"[project]/multilingual_version/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/multilingual_version/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/multilingual_version/app/layout.tsx [app-rsc] (ecmascript)"));
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
"[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/admin/ScenarioDashboard.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx <module evaluation>", "default");
}),
"[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/admin/ScenarioDashboard.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/admin/ScenarioDashboard.tsx", "default");
}),
"[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$ScenarioDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$ScenarioDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/admin/ScenarioDashboard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$ScenarioDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/multilingual_version/locales/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"navbar\":{\"pricing\":\"Pricing\",\"how_it_works\":\"How It Works\",\"library\":\"Magic Library\",\"parent_panel\":\"Parent Panel\",\"logout\":\"Logout\",\"login\":\"Login\",\"return_home\":\"Return Home\",\"admin\":\"Admin\",\"lang_tr\":\"Türkçe\",\"lang_en\":\"English\"},\"hero\":{\"title\":\"Write the Tales of Your Dreams Together\",\"description\":\"Choose your child's name, favorite character, and theme. Let AI handle the rest. Create illustrated, narrated bedtime adventures just for them.\",\"cta_primary\":\"Start Creating Tales\",\"cta_secondary\":\"Subscription Plans\"},\"features\":{\"safe\":\"Safe and Ad-Free\",\"pedagogical\":\"Pedagogical Filters\",\"happy_families\":\"Hundreds of Happy Families\"},\"landing\":{\"form_subtitle\":\"✨ Take the First Step Together\",\"form_title\":\"You Define the Adventure\",\"form_description\":\"Guide your hero with just a few words, leave the rest to us.\",\"features_badge\":\"MyStory Privileges\",\"features_title\":\"Wake Up to a New World Every Night\",\"features_subtitle\":\"The most reliable toolkit that feeds your child's imagination with advanced technologies.\",\"feat1_title\":\"Visual Feast and Narration\",\"feat1_desc\":\"High-quality images created specifically for each page and studio-quality narrations.\",\"feat1_bullet1\":\"Different drawing styles\",\"feat1_bullet2\":\"Professional narrator\",\"feat2_title\":\"From Your Voice to Dreams\",\"feat2_desc\":\"Introduce your own voice to the system and let all stories be read in your voice.\",\"feat2_bullet1\":\"Premium: Voice Cloning\",\"feat2_bullet2\":\"Always make them feel you're there\",\"feat3_title\":\"Infinite Adventure, Same Hero\",\"feat3_desc\":\"Save your own characters to your library and let them play in different tales.\",\"feat3_bullet1\":\"Character library\",\"feat3_bullet2\":\"Visual consistency\",\"feat4_title\":\"Values Education and Safety\",\"feat4_desc\":\"Make lessons like friendship, honesty, or sharing the main idea of the tale.\",\"feat4_bullet1\":\"Educational Mode option\",\"feat4_bullet2\":\"Age-appropriate content\",\"footer\":\"© 2026 MyStory. A world of tales that brightens your child's dreams.\"},\"pricing\":{\"hero_title\":\"Subscribe and Save\",\"hero_subtitle\":\"An overview of MyStory AI subscription plans. Help your children create magic stories with AI.\",\"monthly\":\"/ Month\",\"most_popular\":\"Most Popular\",\"secure_payment\":\"Secure payment via Stripe\",\"cards_accepted\":\"Cards, digital wallets are accepted.\",\"cancel_anytime\":\"You can cancel anytime. No hidden fees.\",\"trust_text\":\"Join over 11,030 happy parents and educators.\",\"stripe_powered\":\"Powered by Stripe.\",\"encryption\":\"256-bit SSL encryption\",\"instant_cancel\":\"Instant Cancel Option\",\"features\":{\"request_limit\":\"Request Limit\",\"chapter_count\":\"Chapter Count\",\"story_length\":\"Story Length\",\"magic_shuffles\":\"Magic Drafts\",\"continue_adventure\":\"Continue Adventure\",\"listening_list\":\"Magic Listening List\",\"character_memory\":\"Hero Memory\",\"smart_transitions\":\"Smart Adventure Transition\",\"magic_library\":\"Magic Library\",\"write_own\":\"Write Your Own Story\",\"story_limit\":\"Story Limit\",\"genre_selection\":\"Genre Selection\",\"archive\":\"Story Archive\",\"library_access\":\"Library Access\",\"parent_panel\":\"Parent Panel\",\"audio_stories\":\"Audio Stories\",\"voice_cloning\":\"Voice Cloning\",\"voice_models\":\"Voice Models\",\"narration\":\"Story Narration\",\"license\":\"Publishing License\",\"podcast_output\":\"Podcast Output\",\"ebook_creation\":\"E-Book Creation\"},\"values\":{\"off\":\"Off\",\"on\":\"Included\",\"none\":\"None\",\"standard\":\"Standard\",\"advanced\":\"Advanced\",\"full\":\"Full Access\",\"text_only\":\"Text Only\",\"audio_text\":\"Audio + Text\",\"unlocked\":\"Unlocked\"},\"plans\":{\"free\":{\"name\":\"Cotton Cloud\",\"desc\":\"For little dreamers just starting out.\",\"button\":\"Start Now\"},\"pro\":{\"name\":\"Silver Sky\",\"desc\":\"For those who want more adventure and voice cloning.\",\"button\":\"Subscribe and Save\"},\"premium\":{\"name\":\"Golden Sun\",\"desc\":\"Infinite imagination and the highest quality.\",\"button\":\"Subscribe Now\"}}},\"library\":{\"title\":\"Magic Library\",\"subtitle\":\"Your special collection of unique adventures created with your imagination.\",\"no_stories\":\"No tales in this category yet.\",\"create_now\":\"Create a new one now!\",\"read_now\":\"Read Now →\",\"default_preview\":\"A magical adventure awaits you...\",\"footer_slogan\":\"A world growing with your imagination\",\"age_suffix\":\"Years\",\"genres\":{\"all\":\"All\",\"tale\":\"Tale\",\"sci_fi\":\"Sci-Fi\",\"adventure\":\"Adventure\",\"fantasy\":\"Fantasy\",\"fable\":\"Fable\"}},\"form\":{\"tabs\":{\"normal\":\"Normal Stories\",\"educational\":\"Educational Tales\",\"continue\":\"Continue Adventure\"},\"placeholders\":{\"subscribe_to_write\":\"Subscribe to write your own tale. For now, you can press the dice icon to produce a surprise story.\",\"manual_limit_reached\":\"Your unique story limit reached! Please try drafts.\",\"audio_limit_reached\":\"Your audio story limit reached! You can only produce 'Silent' tales.\",\"prompt_normal\":\"Write me a story about...\",\"prompt_educational\":\"What would you like to teach your child? E.g.: Ayşe learning to brush her teeth...\",\"continue_story_search\":\"Which Heroes Do You Want to Continue With?\"},\"sections\":{\"voice\":\"Voice\",\"genre\":\"Genre\",\"style\":\"Art Style\",\"age\":\"Age Group\",\"characters\":\"Characters\",\"educational_value\":\"Value to Teach\",\"heroes_connected\":\"Heroes Connected\",\"select_value\":\"Select Value\",\"select_genre\":\"Select Genre\",\"select_style\":\"Select Style\",\"select_age\":\"Select Age\"},\"buttons\":{\"select_voice\":\"Select Voice\",\"generate\":\"Create Tale ✨\",\"randomize\":\"Make a Surprise Choice\",\"edit\":\"Edit\",\"add_character\":\"Add Character\",\"cloning_voice\":\"Cloning Voice...\",\"clone_save\":\"Clone Voice and Save\"},\"messages\":{\"educational_error\":\"You must have a Silver Sky or Golden Sun plan for Educational mode.\",\"shuffle_limit\":\"Draft limit reached\",\"shuffle_audio_limit\":\"Audio limit for drafts reached\",\"try_shuffles\":\"Try the drafts! ✨\",\"empty_prompt\":\"Please do not leave the story topic empty.\",\"no_voice\":\"Please select a voice to narrate the story.\",\"no_genre\":\"Please select a tale genre.\",\"no_style\":\"Please select an art style.\",\"no_age\":\"Please select an age group.\",\"no_educational\":\"Please select a value to teach.\",\"no_characters\":\"Please add at least one character.\",\"error_generic\":\"An unknown error occurred.\",\"voice_limit\":\"You must have a Golden Sun plan to clone your own voice.\",\"voice_clone_success\":\"Voice added successfully! We can now read tales in your voice.\",\"file_too_large\":\"File size too large (Max 10MB)\",\"cloning_error\":\"Voice cloning error\"},\"prompt_template\":{\"in_style\":\"in style\",\"topic\":\"Topic\",\"style\":\"Art Style\",\"voice\":\"Voice Selection\",\"characters\":\"Characters\",\"educational_value\":\"Educational Value\",\"continuation\":\"THIS IS A CONTINUATION STORY. Write a new adventure based on the characters and plot of the previous story.\"}},\"parent\":{\"title\":\"Parent Control Panel\",\"subtitle\":\"Manage your children's world of tales from here.\",\"stats_title\":\"Monthly Statistics\",\"archived_stories\":\"Archived Tales\",\"magic_shuffles\":\"Magic Drafts\",\"custom_stories\":\"Custom Stories\",\"custom_audio\":\"Custom Audio Tales\",\"continue_adventure\":\"Continue Adventure\",\"quick_create_title\":\"Create New Tale!\",\"quick_create_desc\":\"Start now to create a new AI-powered adventure.\",\"library_title\":\"Old Tales Library\",\"no_stories\":\"You haven't created any tales yet.\",\"total_remaining\":\"Total Remaining\",\"library_link\":\"You can select older stories from the library →\",\"upgrade_banner\":{\"title_pro\":\"Upgrade to Golden Sun! 👑\",\"title_free\":\"Go Premium!\",\"desc\":\"Narrate stories yourself by cloning your own voice.\",\"button\":\"Upgrade\"}},\"story\":{\"not_found\":\"Tale not found\",\"back_to_library\":\"Back to Library\",\"back_to_parent\":\"Back to Dashboard\",\"start_new_adventure\":\"Start New Adventure\",\"created_for_you\":\"🌟 This tale was created especially for you · MyStory\",\"audio_banner\":{\"title\":\"Magical Audio Recording Available!\",\"desc\":\"Listen to this tale now with smooth narration.\",\"add_to_queue\":\"Add to Queue\",\"added\":\"Added to Queue\",\"in_queue\":\"In Queue\",\"play_now\":\"Listen Now\",\"playing\":\"Now Playing...\"},\"download_pdf\":{\"button\":\"Download Book\",\"preparing\":\"Preparing PDF...\",\"ready\":\"Preparing...\",\"filename_suffix\":\"Book\"},\"podcast\":{\"download\":\"Download Podcast\",\"remaining\":\"Remaining\",\"limit_reached\":\"Download Limit Reached\",\"upgrade_required\":\"Premium Feature\",\"upgrade_desc\":\"Upgrade your plan to download podcasts.\"}},\"how_it_works\":{\"title\":\"How Does the Magic Happen?\",\"subtitle\":\"In just three steps, let's build together that unique bedtime world where your child is the star.\",\"step1_title\":\"Scatter the Seeds of Imagination\",\"step1_desc\":\"Choose your child's name, favorite characters, and where the adventure will take place. Describe your dream world in just a few words.\",\"step2_title\":\"Touch the Magic Wand\",\"step2_desc\":\"Our AI magic transforms your choices into a unique, pedagogical, and immersive tale adventure in seconds.\",\"step3_title\":\"Wake Up to the World of Tales\",\"step3_desc\":\"Your illustrated and narrated tale is ready! Read it together or let them listen in your own voice. A new discovery awaits you every night.\",\"badge_safe\":\"✨ Magical and Safe\",\"badge_custom\":\"🎨 Customizable\",\"cta_title\":\"Ready for a Magical Adventure?\",\"cta_desc\":\"Let's explore your child's imagination together. Creating your first tale will only take a few seconds.\",\"badge_safe_text\":\"Safe and Ad-Free\",\"badge_custom_text\":\"Pedagogical Filters\",\"cta_button\":\"Create Tale Now\",\"footer_copy\":\"© 2026 MyStory. All rights reserved.\"},\"admin\":{\"title\":\"Command & Control Center\",\"subtitle\":\"Track all system-wide activities from here.\",\"return_site\":\"Return to Site\",\"stats\":{\"gross_revenue\":\"Gross Revenue\",\"net_revenue\":\"Excl. Commission\",\"total_stories\":\"Total Tales\",\"active_subscriptions\":\"Active Subscriptions\",\"total_users\":\"Total Users\",\"cache_total\":\"Total Drafts\",\"cache_full\":\"Full (Cache)\",\"cache_empty\":\"Missing (Empty)\"},\"tables\":{\"recent_stories\":\"Recent Stories\",\"user\":\"User\",\"story_title\":\"Story Title\",\"date\":\"Date\",\"action\":\"Action\",\"unknown\":\"Unknown\",\"page\":\"Page\",\"prev\":\"Previous\",\"next\":\"Next\"},\"logs\":{\"title\":\"System Error Logs (Live)\",\"location\":\"Location\",\"message\":\"Error Message\",\"anonymous\":\"Anonymous\",\"empty\":\"No error records yet. System clean! ✨\"},\"cache\":{\"title\":\"Magic Drafts (Cache) Status\",\"desc\":\"Fill the missing ones sequentially with automatic queue.\",\"optimize\":\"Optimize System\",\"fixing\":\"Fixing...\",\"fill_missing\":\"Auto Fill Missing\",\"search_placeholder\":\"Search in drafts...\",\"filter_all\":\"ALL\",\"filter_tr\":\"TR\",\"filter_en\":\"EN\",\"status_all\":\"ALL\",\"status_full\":\"FULL\",\"status_missing\":\"EMPTY\",\"table_theme\":\"Scenario Topic\",\"table_genre\":\"Genre\",\"table_lang\":\"Lang\",\"table_status\":\"Status\",\"status_ready\":\"READY\",\"status_generating\":\"GENERATING...\",\"status_missing_label\":\"MISSING\"},\"crm\":{\"title\":\"User Management (CRM)\",\"search_placeholder\":\"Search user by email...\",\"bonus_quota\":\"Bonus Quota\",\"status\":\"Status\",\"actions\":\"Actions\",\"magic_draft\":\"Magic Draft\",\"suspended\":\"Suspended\",\"active\":\"Active\",\"add_5\":\"+5 Drafts\",\"add_10\":\"+10 Drafts\",\"activate\":\"Activate\",\"suspend\":\"Suspend\",\"not_found\":\"User not found.\"},\"switches\":{\"title\":\"System Switches (Feature Flags)\",\"maintenance_mode\":\"Maintenance Mode\",\"maintenance_desc\":\"When activated, all users except admins are redirected to the 'Maintenance' page.\",\"system_locked\":\"System Currently Locked\",\"voice_cloning\":\"Voice Cloning Feature\",\"voice_cloning_desc\":\"Enables or disables the feature for users to upload their own voices and have stories read.\",\"feature_disabled\":\"Feature Disabled\"},\"messages\":{\"cache_full\":\"All drafts are already full! ✨\",\"queue_started\":\"Queue started. Please do not close this page until operations are finished.\",\"queue_completed\":\"All productions completed successfully! 🚀\",\"migration_confirm\":\"Stories produced in old format will be made compatible with the new system. Do you confirm?\",\"migration_success\":\"old records successfully updated!\",\"confirm_title\":\"Confirmation Required\",\"confirm_desc\":\"Total {count} missing drafts found. These drafts will be produced sequentially via Google Vertex AI. It is recommended not to close the page during the process.\",\"confirm_start\":\"Yes, Start Queue\",\"confirm_cancel\":\"Cancel\",\"quota_success\":\"Great! +{amount} new 'Magic Draft' ✨ credits successfully assigned to user.\",\"suspend_success\":\"User account suspended. 🚫\",\"activate_success\":\"User account reactivated. ✅\"}},\"settings\":{\"title\":\"Account Settings\",\"back_to_library\":\"Back to Library\",\"subscription_details\":\"Subscription Details\",\"current_plan\":\"Current Plan\",\"status\":\"Subscription Status\",\"status_active\":\"● Active\",\"status_passive\":\"○ Passive\",\"start_date\":\"Start Date\",\"next_renewal\":\"Next Renewal\",\"end_date\":\"End Date\",\"auto_pay_active\":\"Auto-Pay Active\",\"auto_pay_desc\":\"Your subscription will be automatically charged from your card on the renewal date.\",\"manage_payment\":\"Manage Payment Method\",\"loading\":\"Loading...\",\"upgrade_title\":\"Upgrade Your Package\",\"support_title\":\"Need Support?\",\"support_desc\":\"Contact us for any questions regarding subscriptions or payments.\",\"plans\":{\"premium\":\"Golden Sun 👑\",\"pro\":\"Silver Sky ☁️\",\"free\":\"Cotton Cloud (Free) ☁️\"},\"messages\":{\"checkout_error\":\"Could not redirect to payment page.\",\"portal_error\":\"Could not open portal.\",\"portal_unavailable\":\"Subscription management page currently unavailable.\"}},\"auth\":{\"login\":{\"welcome\":\"Welcome\",\"subtitle\":\"Log in to access the parent control panel.\",\"email_label\":\"Email Address\",\"email_placeholder\":\"example@mail.com\",\"password_label\":\"Password\",\"button_loading\":\"Logging in...\",\"button\":\"Log In\",\"no_account\":\"Don't have an account?\",\"register_now\":\"Register Now\"},\"register\":{\"title\":\"Create Account\",\"subtitle\":\"Start creating magical tales for your child.\",\"success_title\":\"Registration Successful!\",\"success_desc\":\"Please click the verification link sent to your email address.\",\"success_button\":\"Log In\",\"email_label\":\"Email Address\",\"email_placeholder\":\"example@mail.com\",\"password_label\":\"Password\",\"password_placeholder\":\"At least 6 characters\",\"button_loading\":\"Registering...\",\"button\":\"Register\",\"has_account\":\"Already have an account?\",\"login_now\":\"Log In\"}},\"checkout\":{\"checking_status\":\"Checking Session\",\"checking_desc\":\"Please wait, we're bringing you to wonderful tales...\",\"redirecting_status\":\"Preparing Payment\",\"redirecting_desc\":\"You are being redirected to the secure payment page. Please do not close the page.\",\"error_title\":\"An Error Occurred\",\"error_desc\":\"Payment session could not be started. Please check your internet connection and try again.\",\"retry\":\"Retry\"},\"player\":{\"queue_title\":\"Story Queue\",\"empty_queue\":\"Your queue is empty. You can ensure continuity by adding tales from the library.\",\"next_track\":\"Next\",\"return_to_player\":\"Return to Player\",\"live_listen\":\"Live Listening\",\"queue_count\":\"{count} TALES IN QUEUE\",\"show_queue\":\"Show Queue\",\"now_playing\":\"NOW PLAYING\",\"status_playing\":\"The story continues at full speed...\",\"status_paused\":\"Play to continue the tale.\",\"page\":\"page\",\"back\":\"Back\",\"forward\":\"Forward\",\"fullscreen\":\"Fullscreen\",\"exit_fullscreen\":\"Exit Fullscreen\",\"loading_image\":\"Loading image...\",\"loading_story\":\"Loading tale...\",\"upgrade_alert\":\"You must have a Silver Sky or Golden Sun plan to listen to audio tales in the Magic Library. Please upgrade your package from the settings page.\"},\"components\":{\"add_to_queue\":{\"added\":\"Added!\",\"in_queue\":\"In Queue\",\"add\":\"Add to Queue\",\"add_to\":\"Add to Queue\"},\"download_book\":{\"preparing\":\"Preparing...\",\"pdf_preparing\":\"Preparing PDF...\",\"download\":\"Download Book\"},\"pin\":{\"unpin\":\"Unpin Heroes\",\"pin\":\"Pin Heroes to Home\",\"error\":\"AN ERROR OCCURRED:\"}}}"));}),
"[project]/multilingual_version/locales/tr.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"navbar\":{\"pricing\":\"Fiyatlandırma\",\"how_it_works\":\"Nasıl Çalışır\",\"library\":\"Sihirli Kitaplık\",\"parent_panel\":\"Panele Dön\",\"logout\":\"Çıkış Yap\",\"login\":\"Giriş Yap\",\"return_home\":\"Ana Sayfaya Dön\",\"admin\":\"Admin\",\"lang_tr\":\"Türkçe\",\"lang_en\":\"English\"},\"hero\":{\"title\":\"Hayallerini Süsleyen Masalları Beraber Yazın\",\"description\":\"Çocuğunuzun ismini, en sevdiği karakteri ve temayı seçin. Geri kalan tüm sihri yapay zeka halletsin. Resimli, sesli ve sadece ona özel uyku öncesi serüvenleri yaratın.\",\"cta_primary\":\"Masal Üretmeye Başla\",\"cta_secondary\":\"Abonelik Planları\"},\"features\":{\"safe\":\"Güvenli ve Reklamsız\",\"pedagogical\":\"Pedagojik Filtreler\",\"happy_families\":\"Yüzlerce Mutlu Aile\"},\"landing\":{\"form_subtitle\":\"✨ İlk Adımı Birlikte Atın\",\"form_title\":\"Macerayı Sen Belirle\",\"form_description\":\"Sadece birkaç kelimeyle kahramanınızı yönlendirin, gerisini bize bırakın.\",\"features_badge\":\"MyStory Ayrıcalıkları\",\"features_title\":\"Her Gece Yeni Bir Dünyaya Uyanın\",\"features_subtitle\":\"Gelişmiş teknolojilerle çocuğunuzun hayal gücünü besleyen en güvenilir araç seti.\",\"feat1_title\":\"Görsel Şölen ve Seslendirme\",\"feat1_desc\":\"Her sayfasına özel üretilen yüksek kaliteli resimler ve stüdyo kalitesindeki seslendirmeler.\",\"feat1_bullet1\":\"Farklı çizim stilleri\",\"feat1_bullet2\":\"Profesyonel okuyucu\",\"feat2_title\":\"Sizin Sesinden Düşlere\",\"feat2_desc\":\"Kendi sesinizi sisteme tanıtın ve tüm hikayeler sizin sesinden okunsun.\",\"feat2_bullet1\":\"Premium: Ses Klonlama\",\"feat2_bullet2\":\"Daima yanında hissettir\",\"feat3_title\":\"Sonsuz Serüven, Aynı Kahraman\",\"feat3_desc\":\"Kendi karakterlerinizi kütüphanenize kaydedin, farklı masallarda oynatın.\",\"feat3_bullet1\":\"Karakter kütüphanesi\",\"feat3_bullet2\":\"Görsel tutarlılık\",\"feat4_title\":\"Değerler Eğitimi ve Güvenlik\",\"feat4_desc\":\"Dostluk, dürüstlük veya paylaşma gibi dersleri masalın ana fikri yapın.\",\"feat4_bullet1\":\"Eğitici Mod seçeneği\",\"feat4_bullet2\":\"Yaşa uygun içerik\",\"footer\":\"© 2026 MyStory. Çocuğunuzun hayallerini pırıldatan masal dünyası.\"},\"pricing\":{\"hero_title\":\"Abone Ol ve Tasarruf Et\",\"hero_subtitle\":\"MyStory AI abonelik planlarına genel bakış. Çocuklarınızın yapay zeka ile sihirli hikayeler yaratmasına yardımcı olun.\",\"monthly\":\"/ Ay\",\"most_popular\":\"En Popüler\",\"secure_payment\":\"Stripe üzerinden güvenli ödeme\",\"cards_accepted\":\"Kartlar, dijital cüzdanlar kabul edilmektedir.\",\"cancel_anytime\":\"İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yok.\",\"trust_text\":\"11.030'dan fazla mutlu ebeveyn ve eğitimciye katılın.\",\"stripe_powered\":\"Stripe tarafından desteklenmektedir.\",\"encryption\":\"256 bit SSL şifreleme\",\"instant_cancel\":\"Anında İptal Seçeneği\",\"features\":{\"request_limit\":\"İstek Sınırı\",\"chapter_count\":\"Bölüm Sayısı\",\"story_length\":\"Hikaye Uzunluğu\",\"magic_shuffles\":\"Sihirli Taslaklar\",\"continue_adventure\":\"Serüvene Devam\",\"listening_list\":\"Sihirli Dinleme Listesi\",\"character_memory\":\"Kahraman Hafızası\",\"smart_transitions\":\"Akıllı Serüven Geçişi\",\"magic_library\":\"Sihirli Kitaplık\",\"write_own\":\"Kendi Hikayeni Yazma\",\"story_limit\":\"Hikaye Limiti\",\"genre_selection\":\"Tür Seçimi\",\"archive\":\"Hikaye Arşivi\",\"library_access\":\"Kütüphaneye Erişim\",\"parent_panel\":\"Ebeveyn Paneli\",\"audio_stories\":\"Sesli Hikayeler\",\"voice_cloning\":\"Ses Klonlama\",\"voice_models\":\"Ses Modelleri\",\"narration\":\"Hikaye Anlatımı\",\"license\":\"Yayın Lisansı\",\"podcast_output\":\"Podcast Çıkışı\",\"ebook_creation\":\"E-Kitap Oluşturma\"},\"values\":{\"off\":\"Kapalı\",\"on\":\"Dahil\",\"none\":\"Yok\",\"standard\":\"Standart\",\"advanced\":\"Gelişmiş\",\"full\":\"Tam Erişim\",\"text_only\":\"Sadece Metin\",\"audio_text\":\"Ses + Metin\",\"unlocked\":\"Kilidi Açıldı\"},\"plans\":{\"free\":{\"name\":\"Pamuk Bulut\",\"desc\":\"Yeni başlayan minik hayalperestler için.\",\"button\":\"Hemen Başla\"},\"pro\":{\"name\":\"Gümüş Gökyüzü\",\"desc\":\"Daha fazla macera ve ses klonlama isteyenlere.\",\"button\":\"Abone Ol ve Tasarruf Et\"},\"premium\":{\"name\":\"Altın Güneş\",\"desc\":\"Sınırsız hayal gücü ve en yüksek kalite.\",\"button\":\"Hemen Abone Ol\"}}},\"library\":{\"title\":\"Sihirli Kitaplık\",\"subtitle\":\"Hayal gücünüzle yarattığınız benzersiz maceraların toplandığı özel koleksiyonunuz.\",\"no_stories\":\"Bu kategoride henüz masal bulunmuyor.\",\"create_now\":\"Hemen yeni bir tane yarat!\",\"read_now\":\"Şimdi Oku →\",\"default_preview\":\"Büyülü bir macera seni bekliyor...\",\"footer_slogan\":\"Senin hayal gücünle büyüyen bir world\",\"age_suffix\":\"Yaş\",\"genres\":{\"all\":\"Tümü\",\"tale\":\"Masal\",\"sci_fi\":\"Bilim Kurgu\",\"adventure\":\"Macera\",\"fantasy\":\"Fantastik\",\"fable\":\"Fabl\"}},\"form\":{\"tabs\":{\"normal\":\"Normal Hikayeler\",\"educational\":\"Eğitici Masallar\",\"continue\":\"Serüvene Devam\"},\"placeholders\":{\"subscribe_to_write\":\"Kendi masalınızı yazmak için abone olun. Şimdilik zar simgesine basıp sürpriz hikaye üretebilirsiniz.\",\"manual_limit_reached\":\"Özgün masal (kendi yazma) limitiniz doldu! Lütfen taslakları deneyin.\",\"audio_limit_reached\":\"Sesli masal limitiniz doldu! Sadece 'Sessiz' masallar üretebilirsiniz.\",\"prompt_normal\":\"Bana şu konu hakkında bir hikaye yaz...\",\"prompt_educational\":\"Çocuğunuza ne öğretmek istersiniz? Örn: Ayşe'nin dişlerini fırçalamayı öğrenmesi...\",\"continue_story_search\":\"Hangi Kahramanlarla Devam Etmek İstersin?\"},\"sections\":{\"voice\":\"Ses\",\"genre\":\"Tür\",\"style\":\"Çizim Stili\",\"age\":\"Yaş Grubu\",\"characters\":\"Karakterler\",\"educational_value\":\"Öğretilecek Değer\",\"heroes_connected\":\"Kahramanlar Bağlandı\",\"select_value\":\"Değer Seç\",\"select_genre\":\"Tür Seç\",\"select_style\":\"Stil Seç\",\"select_age\":\"Yaş Seç\"},\"buttons\":{\"select_voice\":\"Ses Seç\",\"generate\":\"Masalı Oluştur ✨\",\"randomize\":\"Sürpriz Seçim Yap\",\"edit\":\"Düzenle\",\"add_character\":\"Karakter Ekle\",\"cloning_voice\":\"Ses Klonlanıyor...\",\"clone_save\":\"Sesi Klonla ve Kaydet\"},\"messages\":{\"educational_error\":\"Eğitici mod için Gümüş Gökyüzü veya Altın Güneş paketine sahip olmalısınız.\",\"shuffle_limit\":\"Taslak limitiniz doldu\",\"shuffle_audio_limit\":\"Taslaklar için ses limitiniz doldu\",\"try_shuffles\":\"Hadi taslakları dene! ✨\",\"empty_prompt\":\"Lütfen hikaye konusunu boş bırakmayın.\",\"no_voice\":\"Lütfen hikayeyi seslendirecek bir ses seçin.\",\"no_genre\":\"Lütfen masal türünü seçin.\",\"no_style\":\"Lütfen çizim stilini seçin.\",\"no_age\":\"Lütfen yaş grubunu seçin.\",\"no_educational\":\"Lütfen öğretilecek bir değer seçin.\",\"no_characters\":\"Lütfen en az bir karakter ekleyin.\",\"error_generic\":\"Bilinmeyen bir hata oluştu.\",\"voice_limit\":\"Kendi sesinizi klonlamak için Altın Güneş paketine sahip olmalısınız.\",\"voice_clone_success\":\"Sesiniz başarıyla eklendi! Artık masalları sizin sesinizle okuyabiliriz.\",\"file_too_large\":\"Dosya boyutu çok büyük (Max 10MB)\",\"cloning_error\":\"Ses klonlama hatası\"},\"prompt_template\":{\"in_style\":\"tarzında\",\"topic\":\"Konu\",\"style\":\"Çizim Stili\",\"voice\":\"Ses Seçimi\",\"characters\":\"Karakterler\",\"educational_value\":\"Eğitici Değer\",\"continuation\":\"BU BİR DEVAM HİKAYESİDİR. Önceki hikayedeki karakterleri ve olay örgüsünü temel alarak yeni bir serüven yaz.\"}},\"parent\":{\"title\":\"Ebeveyn Kontrol Paneli\",\"subtitle\":\"Çocuklarınızın masal dünyasını buradan yönetin.\",\"stats_title\":\"Aylık İstatistikler\",\"archived_stories\":\"Arşivlenen Masallar\",\"magic_shuffles\":\"Sihirli Taslaklar\",\"custom_stories\":\"Özgün Masallar\",\"custom_audio\":\"Özgün Sesli Masallar\",\"continue_adventure\":\"Serüvene Devam\",\"quick_create_title\":\"Yeni Masal Yarat!\",\"quick_create_desc\":\"Yapay zeka destekli yeni bir macera oluşturmak için hemen başlayın.\",\"library_title\":\"Eski Masallar Kütüphanesi\",\"no_stories\":\"Henüz masal oluşturmadınız.\",\"total_remaining\":\"Toplam Kalan\",\"library_link\":\"Daha eski hikayelerini kütüphaneden seçebilirsin →\",\"upgrade_banner\":{\"title_pro\":\"Altın Güneş'e Terfi Edin! 👑\",\"title_free\":\"Premium'a Geçin!\",\"desc\":\"Kendi sesinizi klonlayarak masalları siz okuyun.\",\"button\":\"Yükselt\"}},\"story\":{\"not_found\":\"Masal bulunamadı\",\"back_to_library\":\"Kitaplığa Dön\",\"back_to_parent\":\"Kütüphaneye Dön\",\"start_new_adventure\":\"Yeni Serüven Başlat\",\"created_for_you\":\"🌟 Bu masal sizin için özel oluşturuldu · MyStory\",\"audio_banner\":{\"title\":\"Büyülü Ses Kaydı Mevcut!\",\"desc\":\"Bu masalı pürüzsüz bir seslendirme ile hemen dinleyebilirsiniz.\",\"add_to_queue\":\"Sıraya Ekle\",\"added\":\"Sıraya Eklendi\",\"in_queue\":\"Sırada\",\"play_now\":\"Hemen Dinle\",\"playing\":\"Şu An Çalıyor...\"},\"download_pdf\":{\"button\":\"Kitabı İndir\",\"preparing\":\"PDF Hazırlanıyor...\",\"ready\":\"Hazırlanıyor...\",\"filename_suffix\":\"Kitabi\"},\"podcast\":{\"download\":\"Podcast İndir\",\"remaining\":\"Hak\",\"limit_reached\":\"İndirme Limiti Doldu\",\"upgrade_required\":\"Premium Özellik\",\"upgrade_desc\":\"Podcast indirmek için paketinizi yükseltin.\"}},\"how_it_works\":{\"title\":\"Sihir Nasıl Gerçekleşiyor?\",\"subtitle\":\"Sadece üç adımda, çocuğunuzun başrolünde olduğu o eşsiz uyku öncesi dünyasını beraber inşa edelim.\",\"step1_title\":\"Hayal Tohumlarını Serpin\",\"step1_desc\":\"Çocuğunuzun ismini, en sevdiği karakterleri ve maceranın geçeceği mekanı seçin. Birkaç kelimeyle hayalinizdeki dünyayı tarif edin.\",\"step2_title\":\"Sihirli Değneği Dokundurun\",\"step2_desc\":\"Yapay zeka sihrimiz, seçimlerinizi saniyeler içinde benzersiz, pedagojik ve sürükleyici bir masal serüvenine dönüştürür.\",\"step3_title\":\"Masal Dünyasına Uyanın\",\"step3_desc\":\"Resimli ve sesli masalınız hazır! İster beraber okuyun, ister kendi sesinden dinletin. Her gece yeni bir keşif sizi bekliyor.\",\"badge_safe\":\"✨ Sihirli ve Güvenli\",\"badge_custom\":\"🎨 Özelleştirilebilir\",\"cta_title\":\"Sihirli Serüvene Hazır mısınız?\",\"cta_desc\":\"Çocuğunuzun hayal dünyasını beraber keşfedelim. İlk masalınızı oluşturmak sadece birkaç saniyenizi alacak.\",\"badge_safe_text\":\"Güvenli ve Reklamsız\",\"badge_custom_text\":\"Pedagojik Filtreler\",\"cta_button\":\"Hemen Masal Oluştur\",\"footer_copy\":\"© 2026 MyStory. Tüm hakları saklıdır.\"},\"admin\":{\"title\":\"Komuta Kontrol Merkezi\",\"subtitle\":\"Sistem genelindeki tüm aktiviteleri buradan takip edebilirsiniz.\",\"return_site\":\"Siteye Dön\",\"stats\":{\"gross_revenue\":\"Brüt Gelir\",\"net_revenue\":\"Komisyon Hariç\",\"total_stories\":\"Toplam Masal\",\"active_subscriptions\":\"Aktif Abonelik\",\"total_users\":\"Toplam Kayıt\",\"cache_total\":\"Toplam Taslak\",\"cache_full\":\"Dolu (Cache)\",\"cache_empty\":\"Eksik (Boş)\"},\"tables\":{\"recent_stories\":\"Son Üretilen Hikayeler\",\"user\":\"Kullanıcı\",\"story_title\":\"Masal Başlığı\",\"date\":\"Tarih\",\"action\":\"Aksiyon\",\"unknown\":\"Bilinmiyor\",\"page\":\"Sayfa\",\"prev\":\"Önceki\",\"next\":\"Sonraki\"},\"logs\":{\"title\":\"Sistem Hata Logları (Canlı)\",\"location\":\"Konum\",\"message\":\"Hata Mesajı\",\"anonymous\":\"Anonim\",\"empty\":\"Henüz bir hata kaydı bulunmuyor. Sistem temiz! ✨\"},\"cache\":{\"title\":\"Sihirli Taslaklar (Cache) Durumu\",\"desc\":\"Eksikleri otomatik kuyruk ile sırayla doldurun.\",\"optimize\":\"Sistemi Optimize Et\",\"fixing\":\"Düzeltiliyor...\",\"fill_missing\":\"Eksikleri Otomatik Doldur\",\"search_placeholder\":\"Taslaklarda ara...\",\"filter_all\":\"HEPSİ\",\"filter_tr\":\"TR\",\"filter_en\":\"EN\",\"status_all\":\"TÜMÜ\",\"status_full\":\"DOLU\",\"status_missing\":\"BOŞ\",\"table_theme\":\"Senaryo Konusu\",\"table_genre\":\"Tür\",\"table_lang\":\"Dil\",\"table_status\":\"Durum\",\"status_ready\":\"HAZIR\",\"status_generating\":\"ÜRETİLİYOR...\",\"status_missing_label\":\"EKSİK\"},\"crm\":{\"title\":\"Kullanıcı Yönetimi (CRM)\",\"search_placeholder\":\"E-posta ile kullanıcı ara...\",\"bonus_quota\":\"Bonus Kota\",\"status\":\"Durum\",\"actions\":\"Aksiyonlar\",\"magic_draft\":\"Sihirli Taslak\",\"suspended\":\"Askıda\",\"active\":\"Aktif\",\"add_5\":\"+5 Taslak\",\"add_10\":\"+10 Taslak\",\"activate\":\"Aktif Et\",\"suspend\":\"Askıya Al\",\"not_found\":\"Kullanıcı bulunamadı.\"},\"voices\":{\"select\":\"Ses Seçin\",\"silent\":\"Sessiz\",\"grandpa\":{\"name\":\"Bilge Dede\",\"desc\":\"Tok, bilgece ve güven veren\"},\"rabbit\":{\"name\":\"Gezgin Tavşan\",\"desc\":\"Neşeli ve yerinde duramayan\"},\"knight\":{\"name\":\"Cesur Şövalye\",\"desc\":\"Güçlü ve kahramanvari\"},\"king\":{\"name\":\"Yüce Kral\",\"desc\":\"Otoriter ve onurlu\"},\"dad\":{\"name\":\"Heyecanlı Baba\",\"desc\":\"Sürprizleri seven ve oyunbaz\"},\"guardian\":{\"name\":\"Orman Muhafızı\",\"desc\":\"Derin ve koruyucu bir ses\"},\"mother\":{\"name\":\"Bilge Anne\",\"desc\":\"En şefkatli ve huzur veren\"},\"woman\":{\"name\":\"Masalcı Kadın\",\"desc\":\"Akıcı ve merak uyandıran\"},\"fairy_serenity\":{\"name\":\"Huzur Perisi\",\"desc\":\"Yumuşak ve sakinleştirici\"},\"fairy_magic\":{\"name\":\"Sihirli Peri\",\"desc\":\"Genç, taze ve büyülü\"},\"princess\":{\"name\":\"Gizemli Prenses\",\"desc\":\"Zarif, mistik ve asil\"},\"rainbow_girl\":{\"name\":\"Gökkuşağı Kızı\",\"desc\":\"Canlı, neşeli ve renkli\"}},\"styles\":{\"watercolor\":\"Sulu Boya\",\"pixar\":\"3D Pixar Stili\",\"pastel\":\"Pastel Düşler\",\"anime\":\"Anime\",\"oil\":\"Yağlı Boya\",\"pop_art\":\"Pop Art\",\"cartoon\":\"Çizgi Film\",\"retro\":\"Vintage Retro\"},\"switches\":{\"title\":\"Sistem Şalterleri (Feature Flags)\",\"maintenance_mode\":\"Bakım Modu\",\"maintenance_desc\":\"Aktif edildiğinde, adminler hariç tüm kullanıcılar 'Bakımdayız' sayfasına yönlendirilir.\",\"system_locked\":\"Sistem Şu An Kilitli\",\"voice_cloning\":\"Ses Klonlama Özelliği\",\"voice_cloning_desc\":\"Kullanıcıların kendi seslerini yükleyip masal okutma özelliğini açar veya kapatır.\",\"feature_disabled\":\"Özellik Devre Dışı\"},\"messages\":{\"cache_full\":\"Tüm taslaklar zaten dolu! ✨\",\"queue_started\":\"Kuyruk başlatıldı. Lütfen işlemler bitene kadar bu sayfayı kapatmayın.\",\"queue_completed\":\"Tüm üretimler başarıyla tamamlandı! 🚀\",\"migration_confirm\":\"Eski formatta üretilmiş hikayeler yeni sisteme uygun hale getirilecektir. Onaylıyor musunuz?\",\"migration_success\":\"adet eski kayıt başarıyla güncellendi!\",\"confirm_title\":\"Onay Gerekiyor\",\"confirm_desc\":\"Toplam {count} adet eksik taslak bulundu. Bu taslaklar Google Vertex AI üzerinden sırayla üretilecektir. İşlem sırasında sayfayı kapatmamanız önerilir.\",\"confirm_start\":\"Evet, Kuyruğu Başlat\",\"confirm_cancel\":\"Vazgeç\",\"quota_success\":\"Harika! Kullanıcıya +{amount} adet yeni 'Sihirli Taslak' ✨ hakkı başarıyla tanımlandı.\",\"suspend_success\":\"Kullanıcı hesabı askıya alındı. 🚫\",\"activate_success\":\"Kullanıcı hesabı yeniden aktif edildi. ✅\"}},\"settings\":{\"title\":\"Hesap Ayarları\",\"back_to_library\":\"Kütüphaneye Dön\",\"subscription_details\":\"Abonelik Detayları\",\"current_plan\":\"Mevcut Plan\",\"status\":\"Abonelik Durumu\",\"status_active\":\"● Aktif\",\"status_passive\":\"○ Pasif\",\"start_date\":\"Başlangıç Tarihi\",\"next_renewal\":\"Sıradaki Yenileme\",\"end_date\":\"Bitiş Tarihi\",\"auto_pay_active\":\"Otomatik Ödeme Aktif\",\"auto_pay_desc\":\"Aboneliğiniz yenileme tarihinde kartınızdan otomatik olarak tahsil edilecektir.\",\"manage_payment\":\"Ödeme Yöntemini Yönet\",\"loading\":\"Yükleniyor...\",\"upgrade_title\":\"Paketini Yükselt\",\"support_title\":\"Destek Lazım mı?\",\"support_desc\":\"Abonelik veya ödemelerle ilgili her türlü sorunuz için bize ulaşın.\",\"plans\":{\"premium\":\"Altın Güneş 👑\",\"pro\":\"Gümüş Gökyüzü ☁️\",\"free\":\"Pamuk Bulut (Ücretsiz) ☁️\"},\"messages\":{\"checkout_error\":\"Ödeme sayfasına yönlendirilemedi.\",\"portal_error\":\"Portal açılamadı.\",\"portal_unavailable\":\"Abonelik yönetim sayfasına şu an ulaşılamıyor.\"}},\"auth\":{\"login\":{\"welcome\":\"Hoş Geldiniz\",\"subtitle\":\"Ebeveyn kontrol paneline erişmek için giriş yapın.\",\"email_label\":\"E-posta Adresi\",\"email_placeholder\":\"ornek@mail.com\",\"password_label\":\"Şifre\",\"button_loading\":\"Giriş Yapılıyor...\",\"button\":\"Giriş Yap\",\"no_account\":\"Hesabınız yok mu?\",\"register_now\":\"Hemen Kaydolun\"},\"register\":{\"title\":\"Hesap Oluştur\",\"subtitle\":\"Çocuğunuz için sihirli masallar yaratmaya başlayın.\",\"success_title\":\"Kayıt Başarılı!\",\"success_desc\":\"Lütfen e-posta adresinize gönderilen doğrulama bağlantısına tıklayın.\",\"success_button\":\"Giriş Yap\",\"email_label\":\"E-posta Adresi\",\"email_placeholder\":\"ornek@mail.com\",\"password_label\":\"Şifre\",\"password_placeholder\":\"En az 6 karakter\",\"button_loading\":\"Kaydediliyor...\",\"button\":\"Kayıt Ol\",\"has_account\":\"Zaten hesabınız var mı?\",\"login_now\":\"Giriş Yapın\"}},\"checkout\":{\"checking_status\":\"Oturum Kontrol Ediliyor\",\"checking_desc\":\"Lütfen bekleyin, sizi harika masallara ulaştırıyoruz...\",\"redirecting_status\":\"Ödemeye Hazırlanıyor\",\"redirecting_desc\":\"Güvenli ödeme sayfasına yönlendiriliyorsunuz. Lütfen sayfayı kapatmayın.\",\"error_title\":\"Bir Hata Oluştu\",\"error_desc\":\"Ödeme oturumu başlatılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.\",\"retry\":\"Tekrar Dene\"},\"player\":{\"queue_title\":\"Masal Kuyruğu\",\"empty_queue\":\"Sıranız henüz boş. Kütüphaneden masal ekleyerek devamlılığı sağlayabilirsiniz.\",\"next_track\":\"Sıradaki\",\"return_to_player\":\"Oynatıcıya Dön\",\"live_listen\":\"Canlı Dinletisi\",\"queue_count\":\"SIRADA {count} MASAL\",\"show_queue\":\"Sırayı Göster\",\"now_playing\":\"ŞU AN ÇALIYOR\",\"status_playing\":\"Hikaye tüm hızıyla devam ediyor...\",\"status_paused\":\"Masalın devamı için oynatın.\",\"page\":\"sayfa\",\"back\":\"Geri\",\"forward\":\"İleri\",\"fullscreen\":\"Tam Ekran\",\"exit_fullscreen\":\"Tam Ekrandan Çık\",\"loading_image\":\"Görsel yükleniyor...\",\"loading_story\":\"Masal yükleniyor...\",\"upgrade_alert\":\"Sihirli Kitaplık'taki sesli masalları dinleyebilmek için Gümüş veya Altın paket sahibi olmanız gerekmektedir. Lütfen ayarlar sayfasından paketinizi yükseltin.\"},\"components\":{\"add_to_queue\":{\"added\":\"Eklendi!\",\"in_queue\":\"Sırada\",\"add\":\"Kuyruğa Ekle\",\"add_to\":\"Sıraya Ekle\"},\"download_book\":{\"preparing\":\"Hazırlanıyor...\",\"pdf_preparing\":\"PDF Hazırlanıyor...\",\"download\":\"Kitabı İndir\"},\"pin\":{\"unpin\":\"Kahramanları Sabitten Kaldır\",\"pin\":\"Kahramanları Ana Sayfaya Sabitle\",\"error\":\"BİR SORUN OLUŞTU:\"}}}"));}),
"[project]/multilingual_version/utils/getDictionary.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDictionary",
    ()=>getDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/multilingual_version/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$tr$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/multilingual_version/locales/tr.json (json)");
;
;
const dictionaries = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$en$2e$json__$28$json$29$__["default"],
    tr: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$tr$2e$json__$28$json$29$__["default"]
};
const getDictionary = (lang)=>{
    return dictionaries[lang] || dictionaries.en;
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$getDictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/getDictionary.ts [app-rsc] (ecmascript)");
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
;
;
async function AdminPage({ searchParams }) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const language = cookieStore.get('language')?.value || 'tr';
    const dict = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$getDictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])(language);
    const t = (key)=>{
        const keys = key.split('.');
        let val = dict;
        for (const k of keys){
            val = val?.[k];
        }
        return val || key;
    };
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
                                    children: t('admin.title')
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-medium",
                                    children: t('admin.subtitle')
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition shadow-sm",
                            children: t('admin.return_site')
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 86,
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
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Revenue"
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
                                            className: "text-2xl font-black text-white",
                                            children: [
                                                "$",
                                                totalGrossRevenue.toFixed(0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/40 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: t('admin.stats.gross_revenue')
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
                                            className: "p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
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
                                            className: "text-[9px] font-black text-blue-600 bg-blue-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Net"
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
                                            children: [
                                                "$",
                                                netRevenue.toFixed(0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: t('admin.stats.net_revenue')
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
                                            className: "p-2.5 bg-sky-50 rounded-xl text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"], {
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
                                            className: "text-[9px] font-black text-sky-600 bg-sky-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Stories"
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
                                            children: totalStories || 0
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: t('admin.stats.total_stories')
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
                                            className: "p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
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
                                            className: "text-[9px] font-black text-purple-600 bg-purple-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Active"
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
                                            children: activeSubsCount || 0
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: t('admin.stats.active_subscriptions')
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
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-black text-orange-600 bg-orange-600/10 px-2 py-1 rounded-full uppercase tracking-widest",
                                            children: "Users"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-black text-gray-900",
                                            children: totalUsers || 0
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest",
                                            children: t('admin.stats.total_users')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 97,
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
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    t('admin.tables.recent_stories')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 171,
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
                                                    children: t('admin.tables.user')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: t('admin.tables.story_title')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: t('admin.tables.date')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5 text-right",
                                                    children: t('admin.tables.action')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-gray-50",
                                        children: recentStories?.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-gray-50/30 transition group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 font-medium text-gray-500 text-sm",
                                                        children: story.users?.email || t('admin.tables.unknown')
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 font-black text-gray-900 text-lg",
                                                        children: story.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-8 py-6 text-gray-400 text-xs font-bold",
                                                        children: new Date(story.created_at).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 196,
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
                                                                lineNumber: 204,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, story.id, true, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-400 text-xs font-black uppercase tracking-widest",
                                    children: [
                                        t('admin.tables.page'),
                                        " ",
                                        page,
                                        " / ",
                                        totalPages || 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/admin?page=${page - 1}`,
                                            className: `px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${page <= 1 ? 'bg-gray-100 text-gray-300 border-gray-100 pointer-events-none' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95'}`,
                                            children: t('admin.tables.prev')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/admin?page=${page + 1}`,
                                            className: `px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${page >= totalPages ? 'bg-gray-100 text-gray-300 border-gray-100 pointer-events-none' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95'}`,
                                            children: t('admin.tables.next')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$ScenarioDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    initialData: cacheData
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$UserManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    initialUsers: usersData || []
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$admin$2f$SystemSwitches$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    initialSettings: systemSettings || {
                        maintenance_mode: false,
                        voice_cloning_enabled: false
                    }
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 250,
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
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this),
                                    t('admin.logs.title')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 254,
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
                                                    children: t('admin.tables.date')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: t('admin.tables.user')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: t('admin.logs.location')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-8 py-5",
                                                    children: t('admin.logs.message')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 262,
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
                                                            children: new Date(log.created_at).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6 font-medium text-gray-500 text-sm",
                                                            children: log.user_email || t('admin.logs.anonymous')
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black tracking-widest border border-gray-200",
                                                                children: log.location
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-8 py-6 text-red-500 text-sm font-medium",
                                                            children: log.error_message
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, log.id, true, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, this)),
                                            (!errorLogs || errorLogs.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 4,
                                                    className: "px-8 py-10 text-center text-gray-400 font-bold",
                                                    children: t('admin.logs.empty')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/app/admin/page.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/app/admin/page.tsx",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/admin/page.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/multilingual_version/app/admin/page.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/multilingual_version/app/admin/page.tsx",
        lineNumber: 84,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c7549984._.js.map