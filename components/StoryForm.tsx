'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, Shuffle, X, Plus } from 'lucide-react'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { saveStoryMetadata } from '@/app/actions/metadata'
import { uploadReferenceImage } from '@/app/actions/uploadReferenceImage'
import { createClient } from '@/utils/supabase/client'

const AI_VOICES = [
  // — Beyefendi Masalcılar —
  { id: 'Achird',       name: 'Bilge Dede',      desc: 'Tok, bilgece ve güven veren' },
  { id: 'Algenib',      name: 'Gezgin Tavşan',   desc: 'Neşeli ve yerinde duramayan' },
  { id: 'Algieba',      name: 'Cesur Şövalye',   desc: 'Güçlü ve kahramanvari' },
  { id: 'Alnilam',      name: 'Yüce Kral',       desc: 'Otoriter ve onurlu' },
  { id: 'Charon',       name: 'Heyecanlı Baba',  desc: 'Sürprizleri seven ve oyunbaz' },
  { id: 'Iapetus',      name: 'Orman Muhafızı',  desc: 'Derin ve koruyucu bir ses' },
  // — Hanımefendi Masalcılar —
  { id: 'Aoede',        name: 'Bilge Anne',      desc: 'En şefkatli ve huzur veren' },
  { id: 'Callirrhoe',   name: 'Masalcı Kadın',   desc: 'Akıcı ve merak uyandıran' },
  { id: 'Despina',      name: 'Huzur Perisi',    desc: 'Yumuşak ve sakinleştirici' },
  { id: 'Fenrir',       name: 'Sihirli Peri',    desc: 'Genç, taze ve büyülü' },
  { id: 'Gacrux',       name: 'Gizemli Prenses',  desc: 'Zarif, mistik ve asil' },
  { id: 'Kore',         name: 'Gökkuşağı Kızı',   desc: 'Canlı, neşeli ve renkli' },
]

const GENRES = ['Masal', 'Bilim Kurgu', 'Macera', 'Fantastik', 'Fabl']
const IMAGE_STYLES = ['Sulu Boya', '3D Pixar Stili', 'Pastel Düşler', 'Anime', 'Yağlı Boya', 'Pop Art', 'Çizgi Film', 'Vintage Retro']
const AGE_GROUPS = ['0-1', '1-2', '2-4', '4-6', '6-10', '10-13']

const STORY_SCENARIOS = [
  // --- MEVCUT 10 ---
  { characters: ['Kaptan Bulut', 'Martı Gümüş'], prompt: 'Kaptan Bulut ve yardımcısı Martı Gümüş, gökyüzündeki gökkuşağının renklerinin neden solduğunu bulmak için renkli bir yolculuğa çıkıyor.', voice: 'Alnilam', voiceName: 'Yüce Kral', genre: 'Macera', style: 'Sulu Boya', age: '4-6' },
  { characters: ['Robot Çark', 'Küçük Mühendis Melis'], prompt: 'Robot Çark ve Melis, bozulan bir yıldız haritasını tamir etmek için uzay gemileriyle Samanyolu galaksisinde gizemli bir parçanın peşine düşerler.', voice: 'Iapetus', voiceName: 'Orman Muhafızı', genre: 'Bilim Kurgu', style: '3D Pixar Stili', age: '6-10' },
  { characters: ['Sevimli Ayı Pofuduk', 'Bilge Baykuş'], prompt: 'Ayı Pofuduk, kış uykusuna yatmadan önce ormandaki en büyük bal kovanının haritasını bulmak için Bilge Baykuş ile bir maceraya atılır.', voice: 'Aoede', voiceName: 'Bilge Anne', genre: 'Masal', style: 'Pastel Düşler', age: '2-4' },
  { characters: ['Prenses Ada', 'Uçan At Kanat'], prompt: 'Prenses Ada, krallığın üzerinden hiç eksilmeyen yağmur bulutlarını dağıtmak için Uçan Atı Kanat ile güneşin doğduğu diyara uçar.', voice: 'Gacrux', voiceName: 'Gizemli Prenses', genre: 'Fantastik', style: 'Anime', age: '6-10' },
  { characters: ['Minik Tavşan Pamuk', 'Hızlı Kaplumbağa'], prompt: 'Pamuk ve Kaplumbağa, ormanda düzenlenen yıllık büyük piknik için en lezzetli havuçları toplamak üzere gizli bahçeye giderler.', voice: 'Algenib', voiceName: 'Gezgin Tavşan', genre: 'Fabl', style: 'Sulu Boya', age: '1-2' },
  { characters: ['Cesur İtfaiyeci Kerem', 'Yavru Kedi Duman'], prompt: 'İtfaiyeci Kerem, bir ağacın en tepesinde mahsur kalan Duman\'ı kurtarmaya çalışırken, ikisi birden sihirli bir tünelden başka bir diyara geçerler.', voice: 'Algieba', voiceName: 'Cesur Şövalye', genre: 'Macera', style: 'Çizgi Film', age: '4-6' },
  { characters: ['Dedektif Can', 'Konuşan Köpek Tarçın'], prompt: 'Dedektif Can ve Tarçın, müzedeki en değerli elmasın neden sadece geceleri parladığını çözmek için gizemli bir ipucunu takip ederler.', voice: 'Callirrhoe', voiceName: 'Masalcı Kadın', genre: 'Macera', style: 'Pop Art', age: '10-13' },
  { characters: ['Minik Peri Işıltı', 'Dev Arı Vızvız'], prompt: 'Peri Işıltı, kanatlarındaki tozun azalması üzerine, dünyanın en nadir çiçeğinden polen toplamak için Dev Arı Vızvız\'ın sırtında bir yolculuğa çıkar.', voice: 'Fenrir', voiceName: 'Sihirli Peri', genre: 'Masal', style: 'Yağlı Boya', age: '2-4' },
  { characters: ['Süper Çocuk Mert', 'Gölge Adam'], prompt: 'Mert, şehri ele geçirmeye çalışan Gölge Adam\'ı iyilik ve neşe ile durdurmak için mahalledeki tüm çocuklarla bir plan yapar.', voice: 'Charon', voiceName: 'Heyecanlı Baba', genre: 'Fantastik', style: '3D Pixar Stili', age: '6-10' },
  { characters: ['Mavi Ejderha Alev', 'Küçük Viking'], prompt: 'Alev, ateş püskürtemediği için üzüldüğünde, Küçük Viking ona acı biberlerin ve dostluğun sırrını anlatarak yardım eder.', voice: 'Achird', voiceName: 'Bilge Dede', genre: 'Masal', style: 'Vintage Retro', age: '4-6' },

  // --- YENİ 40 SENARYO ---
  { characters: ['Uzaylı Zıpzıp', 'Astronot Kerem'], prompt: 'Zıpzıp, Ay üzerinde kaybolan sihirli antenini bulmak için Kerem ile kraterlerin arasında saklambaç oynar.', voice: 'Algenib', voiceName: 'Gezgin Tavşan', genre: 'Bilim Kurgu', style: '3D Pixar Stili', age: '4-6' },
  { characters: ['Uçan Araba Vınvın', 'Tamirci Ece'], prompt: 'Vınvın\'ın motoru gökkuşağı yakıtı bittiği için durur, Ece ona en tatlı meyve sularından yeni bir yakıt icat eder.', voice: 'Fenrir', voiceName: 'Sihirli Peri', genre: 'Bilim Kurgu', style: 'Pop Art', age: '6-10' },
  { characters: ['Zaman Yolcusu Arda', 'Dinozor Dino'], prompt: 'Arda, yanlışlıkla milyonlarca yıl geriye gidip Dino ile meyve toplama yarışı yapar.', voice: 'Charon', voiceName: 'Heyecanlı Baba', genre: 'Bilim Kurgu', style: 'Yağlı Boya', age: '6-10' },
  { characters: ['Akıllı Ev Robi', 'Küçük Ali'], prompt: 'Robi, Ali\'nin ödevlerini yaparken bir hata yapar ve evin tüm eşyaları havada süzülmeye başlar.', voice: 'Achird', voiceName: 'Bilge Dede', genre: 'Bilim Kurgu', style: 'Çizgi Film', age: '4-6' },
  { characters: ['Yıldız Gemisi Kaptanı', 'Işık Hızı'], prompt: 'Kaptan, Samanyolu\'nun en uzak köşesindeki dondurma gezegenini bulmak için rota çizer.', voice: 'Alnilam', voiceName: 'Yüce Kral', genre: 'Bilim Kurgu', style: 'Anime', age: '10-13' },
  { characters: ['Siber Kedi Miya', 'Bilgisayar Faresi Tık'], prompt: 'Miya ve Tık, internet dünyasındaki kayıp bir klasörün içinde saklanan dijital balıkları kurtarırlar.', voice: 'Despina', voiceName: 'Huzur Perisi', genre: 'Bilim Kurgu', style: 'Pop Art', age: '6-10' },
  { characters: ['Gezegen Muhafızı', 'Ay Tozu'], prompt: 'Muhafız, Satürn\'ün halkalarından birinin düştüğünü fark eder ve onu yerine takmak için dev bir vinç icat eder.', voice: 'Iapetus', voiceName: 'Orman Muhafızı', genre: 'Bilim Kurgu', style: '3D Pixar Stili', age: '10-13' },
  { characters: ['Marslı Maviş', 'Dünyalı Doğa'], prompt: 'Maviş, Dünya\'daki çiçeklerin nasıl bu kadar güzel koktuğunu öğrenmek için gizlice bir bahçeye iner.', voice: 'Kore', voiceName: 'Gökkuşağı Kızı', genre: 'Bilim Kurgu', style: 'Pastel Düşler', age: '4-6' },
  { characters: ['Geleceğin Çocuğu', 'Hologram Dostum'], prompt: 'Hologram dostum, sadece hayal gücüyle çalışan bir oyun odası tasarlar ve çocuklar orada sınırları zorlar.', voice: 'Algieba', voiceName: 'Cesur Şövalye', genre: 'Bilim Kurgu', style: 'Vintage Retro', age: '6-10' },
  { characters: ['Güneş Paneli Panpa', 'Bulut Can'], prompt: 'Panpa, bulutlar güneşi kapattığında üzülür, Bulut Can ona komik şakalar yaparak dağılmasını sağlar.', voice: 'Algenib', voiceName: 'Gezgin Tavşan', genre: 'Bilim Kurgu', style: 'Sulu Boya', age: '2-4' },

  // MASAL (10 Yeni)
  { characters: ['Uykucu Bulut', 'Güneş Işığı'], prompt: 'Uykucu Bulut, sabah uyandığında her yerin neden parladığını merak eder ve Güneş Işığı ile tanışır.', voice: 'Aoede', voiceName: 'Bilge Anne', genre: 'Masal', style: 'Pastel Düşler', age: '0-1' },
  { characters: ['Konuşan Ağaç Meşe', 'Küçük Sincap'], prompt: 'Meşe, ormanın en eski sırrını minik sincaba anlatırken rüzgarın şarkısını söyler.', voice: 'Achird', voiceName: 'Bilge Dede', genre: 'Masal', style: 'Yağlı Boya', age: '4-6' },
  { characters: ['Kayıp Anahtar', 'Gizemli Sandık'], prompt: 'Sandık, içindeki mutluluk iksirini paylaşmak için doğru anahtarı beklemektedir.', voice: 'Despina', voiceName: 'Huzur Perisi', genre: 'Masal', style: 'Sulu Boya', age: '6-10' },
  { characters: ['Gökkuşağı Perisi', 'Renkler'], prompt: 'Peri, yağmurdan sonra renklerin birbirine karıştığını görür ve onları sıraya dizmek için dans eder.', voice: 'Fenrir', voiceName: 'Sihirli Peri', genre: 'Masal', style: 'Pastel Düşler', age: '2-4' },
  { characters: ['Pamuk Şeker Bulutu', 'Tatlı Yağmur'], prompt: 'Bulut, çocuklara şekerleme yağdırmak ister ama önce bulutlar okulundan izin alması gerekir.', voice: 'Kore', voiceName: 'Gökkuşağı Kızı', genre: 'Masal', style: 'Anime', age: '4-6' },
  { characters: ['Ay Dede', 'Yıldız Çocuklar'], prompt: 'Ay Dede, her gece çocuklara masallar anlatırken yıldızlar da gökyüzünde ışık saçarak ona eşlik eder.', voice: 'Aoede', voiceName: 'Bilge Anne', genre: 'Masal', style: 'Vintage Retro', age: '1-2' },
  { characters: ['Sihirli Pabuçlar', 'Koşucu Kaya'], prompt: 'Pabuçlar, Kaya\'nın çok yavaş olduğunu görünce ona hız kazandırmak için büyü yaparlar.', voice: 'Callirrhoe', voiceName: 'Masalcı Kadın', genre: 'Masal', style: 'Çizgi Film', age: '4-6' },
  { characters: ['Kristal Saray Prensi', 'Buzdan At'], prompt: 'Prens, sarayının neden eridiğini bulmak için kuzey ışıklarının peşinden gider.', voice: 'Alnilam', voiceName: 'Yüce Kral', genre: 'Masal', style: 'Anime', age: '6-10' },
  { characters: ['Minik Dev', 'Kocaman Cüce'], prompt: 'Dünyanın en tatlı devi ve en güçlü cücesi, arkadaşlığın boyla ilgili olmadığını kanıtlar.', voice: 'Charon', voiceName: 'Heyecanlı Baba', genre: 'Masal', style: '3D Pixar Stili', age: '4-6' },
  { characters: ['Dilek Ağacı', 'Yaprak'], prompt: 'Ağaç, üzerinden düşen her yaprağın bir çocuğun dileğini gerçekleştirdiğini fark eder.', voice: 'Iapetus', voiceName: 'Orman Muhafızı', genre: 'Masal', style: 'Yağlı Boya', age: '6-10' },

  // MACERA (10 Yeni)
  { characters: ['Hazine Avcısı Efe', 'Harita'], prompt: 'Efe, odasında bulduğu eski haritanın aslında mutfağa giden yolu gösterdiğini keşfeder ama yolda engeller vardır.', voice: 'Algieba', voiceName: 'Cesur Şövalye', genre: 'Macera', style: 'Çizgi Film', age: '6-10' },
  { characters: ['Denizaltı Kaptanı', 'Balık Memo'], prompt: 'Kaptan ve Memo, okyanusun en derinindeki kayıp şehri bulmak için ışıklı fenerlerini yakarlar.', voice: 'Iapetus', voiceName: 'Orman Muhafızı', genre: 'Macera', style: '3D Pixar Stili', age: '6-10' },
  { characters: ['Dağcı Kerem', 'Zirve Kartalı'], prompt: 'Kerem, dünyanın en yüksek dağına tırmanırken kartalın ona verdiği tüylerle uçmayı öğrenir.', voice: 'Alnilam', voiceName: 'Yüce Kral', genre: 'Macera', style: 'Yağlı Boya', age: '10-13' },
  { characters: ['Orman Kaşifi Aslı', 'Maymun Muzmuz'], prompt: 'Aslı ve Muzmuz, aslan kralın kayıp tacını bulmak için sarmaşıklardan atlarlar.', voice: 'Callirrhoe', voiceName: 'Masalcı Kadın', genre: 'Macera', style: 'Anime', age: '4-6' },
  { characters: ['Bisikletli Postacı', 'Hızlı Rüzgar'], prompt: 'Postacı, tüm paketleri vaktinde yetiştirmek için rüzgarla yarışır ve her eve bir gülümseme götürür.', voice: 'Charon', voiceName: 'Heyecanlı Baba', genre: 'Macera', style: 'Pop Art', age: '6-10' },
  { characters: ['Kampçı Tayfası', 'Ateş Böceği'], prompt: 'Çocuklar gece kamp yaparken ateş böceklerinin aslında ormanın fenerleri olduğunu öğrenirler.', voice: 'Despina', voiceName: 'Huzur Perisi', genre: 'Macera', style: 'Sulu Boya', age: '4-6' },
  { characters: ['Uçurtma Avcısı', 'Kuyruklu Yıldız'], prompt: 'Uçurtma, rüzgara kapılıp gökyüzünün en tepesine çıkar ve bir kuyruklu yıldızla arkadaş olur.', voice: 'Kore', voiceName: 'Gökkuşağı Kızı', genre: 'Macera', style: 'Pastel Düşler', age: '6-10' },
  { characters: ['Balonla Seyahat', 'Bulutlar'], prompt: 'Renkli dev balon, dünyanın etrafını bir günde gezmek için rüzgar akıntılarını takip eder.', voice: 'Algenib', voiceName: 'Gezgin Tavşan', genre: 'Macera', style: '3D Pixar Stili', age: '4-6' },
  { characters: ['Safari Rehberi', 'Yavru Fil'], prompt: 'Rehber, sürüsünden ayrılan yavru fili annesine kavuşturmak için ormanın derinliklerine dalar.', voice: 'Achird', voiceName: 'Bilge Dede', genre: 'Macera', style: 'Vintage Retro', age: '6-10' },
  { characters: ['Yelkenli Kaptanı', 'Yunus Dostu'], prompt: 'Kaptan, fırtınadan kaçarken yunusların ona yol gösterdiğini fark eder ve güvenli bir liman bulur.', voice: 'Algieba', voiceName: 'Cesur Şövalye', genre: 'Macera', style: 'Yağlı Boya', age: '10-13' },

  // FABL & FANTASTİK (10 Yeni)
  { characters: ['Bilge Kaplumbağa', 'Tavşan Hızlı'], prompt: 'Kaplumbağa, Tavşan\'a hızın değil sabrın kazandırdığını orman olimpiyatlarında bir kez daha gösterir.', voice: 'Achird', voiceName: 'Bilge Dede', genre: 'Fabl', style: 'Sulu Boya', age: '4-6' },
  { characters: ['Kibirli Aslan', 'Minik Fare'], prompt: 'Aslan, ağa yakalandığında minik farenin onu kurtarabileceğine asla inanmazdı ama gerçek dostluk kazandı.', voice: 'Alnilam', voiceName: 'Yüce Kral', genre: 'Fabl', style: 'Vintage Retro', age: '2-4' },
  { characters: ['Şarkıcı Ağustos Böceği', 'Çalışkan Karınca'], prompt: 'Böcek, kış geldiğinde karıncanın hazırlıklarının ne kadar değerli olduğunu bir şarkıyla anlatır.', voice: 'Kore', voiceName: 'Gökkuşağı Kızı', genre: 'Fabl', style: 'Çizgi Film', age: '4-6' },
  { characters: ['Yalancı Çoban', 'Kuzu Dostum'], prompt: 'Çoban, dürüstlüğün ne kadar önemli olduğunu kuzu dostuyla yaşadığı küçük bir olayla anlar.', voice: 'Charon', voiceName: 'Heyecanlı Baba', genre: 'Fabl', style: 'Yağlı Boya', age: '6-10' },
  { characters: ['Sihirli Kütüphaneci', 'Kitap Canavarı'], prompt: 'Kütüphaneci, kitapların içinden fırlayan hikayelerin odaya dağılmasını engellemek için sihirli bir şiir okur.', voice: 'Aoede', voiceName: 'Bilge Anne', genre: 'Fantastik', style: 'Anime', age: '10-13' },
  { characters: ['Ejderha Yavrusu', 'Ateş Püskürtemeyen'], prompt: 'Yavru ejderha, ateş yerine gökkuşağı püskürttüğünü fark edince tüm köyün neşesi olur.', voice: 'Fenrir', voiceName: 'Sihirli Peri', genre: 'Fantastik', style: '3D Pixar Stili', age: '4-6' },
  { characters: ['Görünmez Çocuk', 'Boya Kovası'], prompt: 'Çocuk, bir boya kovasına çarpınca herkes onu görmeye başlar ve en komik saklambaç oyunu yaşanır.', voice: 'Callirrhoe', voiceName: 'Masalcı Kadın', genre: 'Fantastik', style: 'Pop Art', age: '6-10' },
  { characters: ['Konuşan Kediler Krallığı', 'Süt Gölü'], prompt: 'Kediler, krallıklarındaki süt gölünün neden kuruduğunu bulmak için süt yoluna çıkarlar.', voice: 'Despina', voiceName: 'Huzur Perisi', genre: 'Fantastik', style: 'Pastel Düşler', age: '4-6' },
  { characters: ['Uçan Ada Sakinleri', 'Rüzgar Gülü'], prompt: 'Ada sakinleri, adalarının rüzgarda çok sallandığını görünce dev bir rüzgar gülü inşa ederler.', voice: 'Iapetus', voiceName: 'Orman Muhafızı', genre: 'Fantastik', style: '3D Pixar Stili', age: '10-13' },
  { characters: ['Sihirli Değnek', 'Sakıncalı Büyücü'], prompt: 'Değnek, yanlışlıkla her dokunduğunu dondurmaya başlayınca büyücü onu ısıtmak için güneşle anlaşır.', voice: 'Algieba', voiceName: 'Cesur Şövalye', genre: 'Fantastik', style: 'Vintage Retro', age: '6-10' }
]

export default function StoryForm({ isPro = false, isPremium = false }: { isPro?: boolean, isPremium?: boolean }) {
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Form Data
  const [voice, setVoice] = useState<string>('Aoede') 
  const [voiceName, setVoiceName] = useState<string>('Bilge Anne')
  const [clonedVoices, setClonedVoices] = useState<any[]>([])
  const [isUploadingVoice, setIsUploadingVoice] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  
  const [genre, setGenre] = useState<string>('Masal')
  const [imageStyle, setImageStyle] = useState<string>('Sulu Boya')
  const [ageGroup, setAgeGroup] = useState<string>('2-4')
  const [characters, setCharacters] = useState<string[]>(['Sevimli Ayı'])
  const [educationalValue, setEducationalValue] = useState<string>('Dürüstlük')
  const [uploadedRefFile, setUploadedRefFile] = useState<File | null>(null)
  const [isShuffle, setIsShuffle] = useState(false)

  const supabase = createClient()
  const [jobId, setJobId] = useState<string | null>(null)
  const [jobStatus, setJobStatus] = useState<any>(null)
  const [remainingStories, setRemainingStories] = useState<number | null>(null)
  const [quotaStats, setQuotaStats] = useState<any>(null)
  const fakeProgressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchQuota = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: sub }, { data: profiles }] = await Promise.all([
        supabase.from('subscriptions').select('plan_id, current_period_end').eq('user_id', user.id).maybeSingle(),
        supabase.from('profiles').select('id').eq('user_id', user.id)
      ])

      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)
      const profileIds = profiles?.map(p => p.id) || []
      
      const [
        { count: totalUsed },
        { count: usedShuffle },
        { count: usedManual }
      ] = await Promise.all([
        supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).eq('is_shuffle', true).gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).eq('is_shuffle', false).gte('created_at', startDate.toISOString())
      ])

      const isPremiumUser = sub?.plan_id === 'premium'
      const isProUser = sub?.plan_id === 'pro'
      
      const shuffleLimit = isPremiumUser ? 25 : (isProUser ? 10 : 3)
      const manualLimit = isPremiumUser ? 55 : (isProUser ? 30 : 0)
      const totalLimit = isPremiumUser ? 80 : (isProUser ? 40 : 3)

      setQuotaStats({
        shuffleUsed: usedShuffle || 0,
        shuffleLimit,
        manualUsed: usedManual || 0,
        manualLimit,
        totalUsed: totalUsed || 0,
        totalLimit
      })
      setRemainingStories(totalLimit - (totalUsed || 0))
    }

    fetchQuota()
    
    const fetchClonedVoices = async () => {
      const { data } = await supabase.from('cloned_voices').select('*')
      if (data) setClonedVoices(data)
    }
    fetchClonedVoices()
  }, [])

  useEffect(() => {
    if (!jobId) return

    const channel = supabase
      .channel(`job-${jobId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'generation_jobs',
        filter: `id=eq.${jobId}` 
      }, async (payload) => {
        const newStatus = payload.new as any;
        
        setJobStatus(prev => {
          if (prev?._isFaking && newStatus.status === 'cached_processing') {
            return { ...newStatus, progress: prev.progress, _isFaking: true };
          }
          return newStatus;
        });

        if (newStatus.status === 'completed' && newStatus.story_id) {
          setRemainingStories(prev => (prev !== null ? prev - 1 : 0))
          
          await saveStoryMetadata(newStatus.story_id, {
            voice_name: voiceName,
            genre: genre,
            style: imageStyle,
            age_group: ageGroup,
            educational_value: tab === 'egitici' ? educationalValue : null,
            characters: characters.filter(c => c.trim() !== '')
          });
          window.location.href = `/story/${newStatus.story_id}`
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [jobId, voiceName, genre, imageStyle, ageGroup, tab, educationalValue, characters])

  useEffect(() => {
    if (jobStatus?.status === 'cached_processing' && jobStatus.story_id && !jobStatus._isFaking) {
      setJobStatus(prev => prev ? { ...prev, _isFaking: true, progress: 1 } : null);
      if (fakeProgressIntervalRef.current) clearInterval(fakeProgressIntervalRef.current);
      
      let currentProgress = 1;
      fakeProgressIntervalRef.current = setInterval(() => {
        currentProgress += 1;
        
        if (currentProgress >= 100) {
          if (fakeProgressIntervalRef.current) clearInterval(fakeProgressIntervalRef.current);
          fakeProgressIntervalRef.current = null;
          
          setJobStatus(prev => prev ? { ...prev, status: 'completed', progress: 100 } : null);
          setRemainingStories(prev => (prev !== null ? prev - 1 : 0));
          
          if (jobStatus.story_id) {
            saveStoryMetadata(jobStatus.story_id, {
              voice_name: voiceName,
              genre: genre,
              style: imageStyle,
              age_group: ageGroup,
              educational_value: tab === 'egitici' ? educationalValue : null,
              characters: characters.filter(c => c.trim() !== '')
            }).then(() => {
              window.location.href = `/story/${jobStatus.story_id}`
            });
          }
        } else {
          setJobStatus(prev => prev ? { ...prev, progress: currentProgress, _isFaking: true } : null);
        }
      }, 1800);
    }
    return () => {
      if (!jobId && fakeProgressIntervalRef.current) {
        clearInterval(fakeProgressIntervalRef.current);
        fakeProgressIntervalRef.current = null;
      }
    };
  }, [jobStatus?.status, jobStatus?._isFaking, jobStatus?.story_id, jobId, voiceName, genre, imageStyle, ageGroup, tab, educationalValue, characters])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleVoiceSelect = (id: string, name: string) => {
    setVoice(id)
    setVoiceName(name)
  }

  const handleVoiceUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('audio') as File
    const name = formData.get('name') as string

    if (!file || !name) return
    if (file.size > 10 * 1024 * 1024) {
      alert('Dosya boyutu çok büyük (Max 10MB)')
      return
    }

    setIsUploadingVoice(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Giriş yapmalısınız")

      const res = await fetch('/api/voices/clone', {
        method: 'POST',
        body: formData
      })
      const result = await res.json()
      
      if (result.success) {
        setClonedVoices([...clonedVoices, result.voice])
        setVoice(result.voice.eleven_voice_id)
        setVoiceName(result.voice.name)
        setShowVoiceModal(false)
        alert('Sesiniz başarıyla eklendi! Artık masalları sizin sesinizle okuyabiliriz.')
      } else {
        alert(result.error || 'Ses klonlama hatası')
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUploadingVoice(false)
    }
  }

  const maxChars = isPremium ? 610 : (isPro ? 400 : 200)

  const handleTabSelect = (selectedTab: 'normal' | 'egitici') => {
    if (selectedTab === 'egitici' && !isPro && !isPremium) {
      alert('Eğitici mod için Gümüş Gökyüzü veya Altın Güneş paketine sahip olmalısınız.')
      return
    }
    setTab(selectedTab)
  }

  const handleRandomize = () => {
    if (quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit) return;
    const randomScenario = STORY_SCENARIOS[Math.floor(Math.random() * STORY_SCENARIOS.length)]

    setVoice(randomScenario.voice || 'Aoede')
    setVoiceName(randomScenario.voiceName || 'Bilge Anne')
    setGenre(randomScenario.genre || 'Masal')
    setImageStyle(randomScenario.style || 'Sulu Boya')
    setAgeGroup(randomScenario.age || '2-4')
    
    setPrompt(randomScenario.prompt)
    setCharacters(randomScenario.characters)
    setIsShuffle(true)
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt) {
      alert('Lütfen bir hikaye konusu yazın!')
      return
    }
    
    setIsGenerating(true)
    try {
      const chars = characters.filter(c => c.trim() !== '').join(', ') || 'İsimsiz Kahraman'
      const egitici = tab === 'egitici' ? ` Eğitici Değer: ${educationalValue}.` : ''
      const fullTheme = `${genre} tarzında. Konu: ${prompt}. Çizim Stili: ${imageStyle}. Ses Seçimi: ${voice}. Karakterler: ${chars}.${egitici}`
      
      let uploadedMasterRefUrl = undefined;
      if (uploadedRefFile) {
        const formData = new FormData();
        formData.append('file', uploadedRefFile);
        const uploadRes = await uploadReferenceImage(formData);
        if (uploadRes.success) {
          uploadedMasterRefUrl = uploadRes.url;
        } else {
          alert('Karakter referansı yüklenirken bir hata oluştu: ' + uploadRes.error);
          setIsGenerating(false);
          return;
        }
      }

      const response = await backgroundStoryAction({
        childName: 'Kullanıcı',
        hero: chars,
        theme: fullTheme,
        age: ageGroup,
        voiceOption: voice === 'Sessiz' ? 'Sessiz' : 'AI',
        elevenVoiceId: voice !== 'Sessiz' ? voice : undefined,
        style: imageStyle,
        uploaded_master_ref: uploadedMasterRefUrl,
        isShuffle: isShuffle
      })
      
      if (response.success && response.jobId) {
        setJobId(response.jobId)
        const { data } = await supabase.from('generation_jobs').select('*').eq('id', response.jobId).single()
        setJobStatus(data)
      } else {
        alert(response.error || 'Bilinmeyen bir hata oluştu.')
        setIsGenerating(false)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu'
      alert(errorMessage)
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-12 mb-20 border border-sky-50">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          type="button"
          onClick={() => handleTabSelect('normal')}
          className={`w-1/2 px-4 py-4 font-bold text-lg transition-colors ${tab === 'normal' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Normal Hikayeler
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('egitici')}
          className={`w-1/2 px-4 py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${tab === 'egitici' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Eğitici Hikayeler
          {!isPro && !isPremium && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Pro</span>}
        </button>
      </div>

      <form onSubmit={handleGenerate} className="p-6">
        {/* Main Textarea */}
        <div className="relative mb-6">
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value.slice(0, maxChars));
              setIsShuffle(false);
            }}
            placeholder={
              !isPro && !isPremium 
                ? "Kendi masalınızı yazmak için abone olun. Şimdilik zar simgesine basıp sürpriz hikaye üretebilirsiniz." 
                : (quotaStats?.manualUsed >= quotaStats?.manualLimit 
                    ? "Özgün masal (kendi yazma) limitiniz doldu! Lütfen taslakları deneyin." 
                    : (tab === 'normal' ? "Bana şu konu hakkında bir hikaye yaz..." : "Çocuğunuza ne öğretmek istersiniz? Örn: Ayşe'nin dişlerini fırçalamayı öğrenmesi..."))
            }
            readOnly={(!isPro && !isPremium) || isShuffle || (quotaStats?.manualUsed >= quotaStats?.manualLimit)}
            className={`w-full h-32 resize-none text-xl p-4 focus:outline-none placeholder-gray-400 text-gray-800 ${((!isPro && !isPremium) || isShuffle || (quotaStats?.manualUsed >= quotaStats?.manualLimit)) ? 'bg-gray-50 cursor-not-allowed opacity-80' : ''}`}
            required
          />
          <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">
            {prompt.length} / {maxChars}
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-4">
            <label className={`p-2 rounded-lg transition cursor-pointer flex items-center gap-2 ${uploadedRefFile ? 'bg-indigo-100 text-indigo-700' : 'text-sky-700/60 hover:bg-sky-50'}`}>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedRefFile(e.target.files[0])
                  }
                }}
              />
              <ImageIcon size={20} />
              {uploadedRefFile && <span className="text-xs font-bold whitespace-nowrap overflow-hidden max-w-[120px] text-ellipsis">{uploadedRefFile.name}</span>}
            </label>
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={handleRandomize}
                disabled={quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit}
                className={`p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95 group relative ${
                  quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none pulse-none'
                    : (isShuffle 
                        ? 'bg-sky-100 text-sky-700 shadow-sm' 
                        : 'bg-[#BDD9F2] text-sky-700 hover:bg-[#84B1D9] hover:text-white shadow-lg shadow-sky-200/50 animate-pulse')
                }`}
                title={quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit ? "Taslak limitiniz doldu" : "Sürpriz Seçim Yap"}
              >
                <Shuffle size={22} className={`${isShuffle ? '' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                {!isShuffle && quotaStats?.shuffleUsed < quotaStats?.shuffleLimit && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
                )}
              </button>
              
              {!isShuffle && quotaStats?.shuffleUsed < quotaStats?.shuffleLimit && (
                <span className="text-[11px] font-black text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm animate-bounce">
                  Hadi taslakları dene! ✨
                </span>
              )}

              {!isShuffle && quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit && (
                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                  Taslak Limitiniz Doldu
                </span>
              )}
            </div>

            {isShuffle && (
              <button 
                type="button" 
                onClick={() => {
                  setIsShuffle(false)
                  setPrompt('')
                  setCharacters(['Sevimli Ayı'])
                }} 
                className="text-xs font-bold text-sky-500 hover:text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm flex items-center gap-1 transition-all"
              >
                <X size={14} /> Düzenle
              </button>
            )}
            {uploadedRefFile && (
              <button type="button" onClick={() => setUploadedRefFile(null)} className="p-1 text-red-400 hover:text-red-600 transition">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Accordions */}
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          
          {/* SES (AUDIO) */}
          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('voice')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">Ses</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-[#84B1D9] text-white'}`}>{voiceName}</span>
                {openSection === 'voice' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'voice' && (
              <div className="p-4 space-y-6 bg-gray-50/50 rounded-xl mt-2">
                <div 
                  onClick={() => handleVoiceSelect('Sessiz', 'Sessiz')}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition text-center ${voice === 'Sessiz' ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                >
                  <span className="font-bold">Sessiz (Sadece Metin)</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Sihirli Masalcılar (AI)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {AI_VOICES.map(v => (
                      <div 
                        key={v.id} 
                        onClick={() => handleVoiceSelect(v.id, v.name)}
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.id ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                      >
                        <span className="font-bold text-sm text-center">{v.name}</span>
                        <span className="text-[10px] text-gray-400 text-center">{v.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Kendi Sesim</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {clonedVoices.map(v => (
                      <div 
                        key={v.eleven_voice_id} 
                        onClick={() => handleVoiceSelect(v.eleven_voice_id, v.name)}
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.eleven_voice_id ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                      >
                        <span className="font-bold text-sm text-center">{v.name}</span>
                        <span className="text-[10px] text-emerald-500">Kendi Sesin</span>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => {
                        if (!isPremium) {
                          alert('Kendi sesinizi klonlamak için Altın Güneş paketine sahip olmalısınız.')
                        } else {
                          setShowVoiceModal(true)
                        }
                      }}
                      className="p-3 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 transition min-h-[60px]"
                    >
                      <Plus size={20} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-500">Yeni Ses Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Voice Upload Modal */}
          {showVoiceModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
                <button onClick={() => setShowVoiceModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={24} className="text-gray-400" />
                </button>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Plus size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Kendi Sesini Ekle</h3>
                  <p className="text-gray-500 mt-2">Masalları senin sesinle okuyalım!</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-sky-800 font-bold flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    Kural: En gerçekçi sonuç için en az 5 dakikalık, arkada gürültü olmayan net bir ses kaydı yüklemelisiniz.
                  </p>
                </div>
                <form onSubmit={handleVoiceUpload} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sese Bir İsim Ver</label>
                    <input name="name" type="text" placeholder="Örn: Anne Sesi, Canım Babam" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-purple-500 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ses Dosyasını Seç (MP3, WAV)</label>
                    <input name="audio" type="file" accept="audio/*" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer" required />
                  </div>
                  <button 
                    disabled={isUploadingVoice}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 transition-all disabled:opacity-50"
                  >
                    {isUploadingVoice ? 'Ses Klonlanıyor...' : 'Sesi Klonla ve Kaydet'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* EĞİTİCİ */}
          {tab === 'egitici' && (
            <div className="py-2">
              <div onClick={() => toggleSection('educational')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
                <span className="font-bold text-gray-800 text-lg text-emerald-600">Öğretilecek Değer</span>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">{educationalValue}</span>
                  {openSection === 'educational' ? <ChevronUp className="text-emerald-700" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>
              {openSection === 'educational' && (
                <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 gap-3">
                  {['Dürüstlük', 'Paylaşmak', 'Cesaret', 'Sabır', 'Sorumluluk', 'Doğa Sevgisi'].map(val => (
                    <button type="button" key={val} onClick={() => setEducationalValue(val)} className={`p-3 rounded-lg font-bold border transition ${educationalValue === val ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TÜR (GENRE) */}
          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('genre')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">Tür</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-[#84B1D9] text-white'}`}>{genre}</span>
                {openSection === 'genre' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'genre' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 flex flex-wrap gap-2">
                {GENRES.map(g => (
                  <button type="button" key={g} onClick={() => setGenre(g)} className={`px-4 py-2 rounded-full font-bold transition ${genre === g ? 'bg-[#84B1D9] text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GÖRÜNTÜ STİLİ */}
          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('style')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">Görüntü Stili</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-[#84B1D9] text-white'}`}>{imageStyle}</span>
                {openSection === 'style' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'style' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 flex flex-wrap gap-2">
                {IMAGE_STYLES.map(s => (
                  <button type="button" key={s} onClick={() => setImageStyle(s)} className={`px-4 py-2 rounded-full font-bold transition ${imageStyle === s ? 'bg-[#84B1D9] text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* YAŞ GRUBU */}
          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('age')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">Yaş Grubu</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-[#84B1D9] text-white'}`}>{ageGroup} Yaş</span>
                {openSection === 'age' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'age' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2">
                <div className="flex flex-wrap justify-center gap-3">
                  {AGE_GROUPS.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setAgeGroup(range)}
                      className={`px-5 py-3 rounded-xl font-bold transition-all border-2 ${
                        ageGroup === range
                          ? 'bg-[#84B1D9] text-white border-[#84B1D9] shadow-lg scale-105'
                          : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* KARAKTERLER */}
          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('characters')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">Karakterler</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-[#84B1D9] text-white'}`}>{characters.length} Karakter</span>
                {openSection === 'characters' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'characters' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 space-y-3">
                {characters.map((char, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={char}
                      onChange={(e) => {
                        const newChars = [...characters]
                        newChars[index] = e.target.value
                        setCharacters(newChars)
                      }}
                      className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#84B1D9]"
                      placeholder={`Karakter ${index + 1} detayları...`}
                    />
                    {characters.length > 1 && (
                      <button type="button" onClick={() => {
                        setCharacters(characters.filter((_, i) => i !== index))
                      }} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition">
                        <X size={20}/>
                      </button>
                    )}
                  </div>
                ))}
                {characters.length < 3 && (
                  <button type="button" onClick={() => setCharacters([...characters, ''])} className="text-[#84B1D9] font-bold text-sm flex items-center p-2 hover:bg-[#BDD9F2] rounded-lg transition">
                    <Plus size={16} className="mr-1"/> Karakter Ekle
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Submit Button */}
        <div className="mt-8 flex flex-col items-center pb-4">
          <button
            type="submit"
            disabled={isGenerating || (remainingStories !== null && remainingStories <= 0)}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center w-64 ${
              (remainingStories !== null && remainingStories <= 0) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-[#84B1D9] hover:bg-[#8FBDD9] text-white'
            } disabled:opacity-70`}
          >
            {isGenerating ? (
              <span className="flex items-center animate-pulse">
                <Sparkles className="animate-spin mr-2" size={20} />
                Sihir Yapılıyor...
              </span>
            ) : (remainingStories !== null && remainingStories <= 0) ? (
              <span className="flex items-center">
                <X className="mr-2" size={20} />
                Limit Doldu
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2" size={20} />
                Gönder
              </span>
            )}
          </button>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 text-sm w-full justify-center">
            <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm">
              <Shuffle size={14} className="text-sky-600" />
              <span className="text-sky-700 font-bold">Taslak:</span>
              <span className="text-sky-900 font-black">{quotaStats ? Math.max(0, quotaStats.shuffleLimit - quotaStats.shuffleUsed) : 0} / {quotaStats?.shuffleLimit}</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
              <Plus size={14} className="text-indigo-600" />
              <span className="text-indigo-700 font-bold">Özgün:</span>
              <span className="text-indigo-900 font-black">{quotaStats ? Math.max(0, quotaStats.manualLimit - quotaStats.manualUsed) : 0} / {quotaStats?.manualLimit}</span>
            </div>
            {remainingStories !== null && (
              <span className="text-gray-400 font-medium">Toplam Kalan: <strong className="text-gray-600 font-black">{remainingStories}</strong></span>
            )}
          </div>
        </div>
      </form>

      {/* Progress Modal Overlay */}
      {jobId && jobStatus && (
        <div className="fixed inset-0 bg-[#BDD9F2]/95 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl p-8 shadow-2xl border-4 border-[#84B1D9] relative animate-in zoom-in duration-500">
            {jobStatus.status === 'failed' && (
              <button 
                onClick={() => {
                  setJobId(null);
                  setJobStatus(null);
                  setIsGenerating(false);
                }} 
                className="absolute top-6 right-6 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
              >
                <X size={24} />
              </button>
            )}

            <div className="text-center mb-8">
              <h2 className="text-3xl font-lora font-bold text-[#2d2d2d] mb-2">
                Sihirli Masalınız Hazırlanıyor... ✨
              </h2>
              <p className="text-[#84B1D9] font-medium">Lütfen bu sayfayı kapatmayın, süreç 1-2 dakika sürebilir.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Durum: {jobStatus.status}</span>
                    <span className="text-lg font-black text-[#84B1D9]">{jobStatus.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-[#BDD9F2] to-[#84B1D9] h-full transition-all duration-1000 ease-out"
                      style={{ width: `${jobStatus.progress}%` }}
                    />
                  </div>
                </div>
                
                <ul className="space-y-4 bg-sky-50/50 p-6 rounded-2xl border border-sky-100/50">
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 10 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 10 ? '✅' : '⏳'}</span> Senaryo ve Metin Yazımı
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 20 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 20 ? '✅' : '⏳'}</span> Karakterler Çiziliyor
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 80 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 80 ? '✅' : '⏳'}</span> Sahne Resimleniyor
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 100 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 100 ? '✅' : '⏳'}</span> Tamamlanıyor
                  </li>
                </ul>
              </div>

              <div className="bg-[#BDD9F2] rounded-3xl p-6 border-2 border-dashed border-[#BDD9F2] flex flex-col items-center justify-center min-h-[300px]">
                <h4 className="text-sm font-bold text-sky-700 uppercase tracking-widest mb-4">Karakter Referansınız</h4>
                {jobStatus.master_ref_data ? (
                  <img 
                    src={jobStatus.master_ref_data.startsWith('http') ? jobStatus.master_ref_data : `data:image/png;base64,${jobStatus.master_ref_data}`} 
                    className="w-full rounded-2xl shadow-xl border-4 border-white"
                    alt="Master Reference"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-sky-900/40">
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <p className="font-bold">Karakterler oluşturuluyor...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
