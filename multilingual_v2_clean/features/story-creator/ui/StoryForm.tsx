'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, Shuffle, X, Plus, Clock, Loader2, CheckCircle2, Activity, RotateCcw, Lock } from 'lucide-react'
import { STORY_SCENARIOS } from '@/utils/scenarios'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { createClient } from '@/utils/supabase/client'
import { QuotaService } from '@/services/QuotaService'
import { buildStoryThemePrompt } from '@/constants/prompts'
import { toast } from 'sonner'
import { useJobTracker } from '@/hooks/useJobTracker'

import { useLanguage } from '@/context/LanguageContext'

function StoryFormInner({ isPro = false, isPremium = false }: { isPro?: boolean, isPremium?: boolean }) {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()

  const AI_VOICES = [
    { id: 'Achird',       name: t('voices.achird.name'),      desc: t('voices.achird.desc') },
    { id: 'Algenib',      name: t('voices.algenib.name'),     desc: t('voices.algenib.desc') },
    { id: 'Algieba',      name: t('voices.algieba.name'),     desc: t('voices.algieba.desc') },
    { id: 'Alnilam',      name: t('voices.alnilam.name'),     desc: t('voices.alnilam.desc') },
    { id: 'Charon',       name: t('voices.charon.name'),      desc: t('voices.charon.desc') },
    { id: 'Iapetus',      name: t('voices.iapetus.name'),     desc: t('voices.iapetus.desc') },
    { id: 'Aoede',        name: t('voices.aoede.name'),       desc: t('voices.aoede.desc') },
    { id: 'Callirrhoe',   name: t('voices.callirrhoe.name'),  desc: t('voices.callirrhoe.desc') },
    { id: 'Despina',      name: t('voices.despina.name'),     desc: t('voices.despina.desc') },
    { id: 'Fenrir',       name: t('voices.fenrir.name'),      desc: t('voices.fenrir.desc') },
    { id: 'Gacrux',       name: t('voices.gacrux.name'),      desc: t('voices.gacrux.desc') },
    { id: 'Kore',         name: t('voices.kore.name'),        desc: t('voices.kore.desc') },
  ]

  const GENRES = [
    { key: 'tale',      label: t('library.genres.tale') },
    { key: 'sci_fi',    label: t('library.genres.sci_fi') },
    { key: 'adventure', label: t('library.genres.adventure') },
    { key: 'fantasy',   label: t('library.genres.fantasy') },
    { key: 'fable',     label: t('library.genres.fable') }
  ]
  
  const IMAGE_STYLES = [
    { key: 'watercolor', label: t('styles.watercolor') },
    { key: 'pixar',      label: t('styles.pixar') },
    { key: 'pastel',     label: t('styles.pastel') },
    { key: 'anime',      label: t('styles.anime') },
    { key: 'oil',        label: t('styles.oil') },
    { key: 'pop_art',    label: t('styles.pop_art') },
    { key: 'cartoon',    label: t('styles.cartoon') },
    { key: 'retro',      label: t('styles.retro') }
  ]

  const AGE_GROUPS = ['0-1', '1-2', '2-4', '4-6', '6-10', '10-13']

  const continueFromParam = searchParams.get('continue_from')
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici' | 'devam' | 'kisa'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Form Data
  const [voice, setVoice] = useState<string>('') 
  const [clonedVoices, setClonedVoices] = useState<any[]>([])
  const [isUploadingVoice, setIsUploadingVoice] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const [genre, setGenre] = useState<string>('')
  const [imageStyle, setImageStyle] = useState<string>('')
  const [ageGroup, setAgeGroup] = useState<string>('')
  const [characters, setCharacters] = useState<string[]>([''])
  const [educationalValue, setEducationalValue] = useState<string>('')
  const [continueFromId, setContinueFromId] = useState<string | null>(null)
  const [continueStory, setContinueStory] = useState<any | null>(null)
  const [pinnedStories, setPinnedStories] = useState<any[]>([])
  const [recentStories, setRecentStories] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShuffle, setIsShuffle] = useState(false)
  const [storyLanguage, setStoryLanguage] = useState<string>(language === 'tr' ? 'tr' : 'en')
  const [isVoiceCloningEnabled, setIsVoiceCloningEnabled] = useState(false)

  const displayVoiceName = (() => {
    if (!voice) return t('form.buttons.select_voice')
    if (voice === 'Sessiz') return language === 'tr' ? 'Sessiz' : 'Silent'
    const aiVoice = AI_VOICES.find(v => v.id === voice)
    if (aiVoice) return aiVoice.name
    const clonedVoice = clonedVoices.find(v => v.eleven_voice_id === voice)
    if (clonedVoice) return clonedVoice.name
    return voice
  })()

  const supabase = createClient()
  const [jobId, setJobId] = useState<string | null>(null)
  const [jobStatus, setJobStatus] = useState<any>(null)
  const [activeJobs, setActiveJobs] = useState<any[]>([]) // 🚀 CANLI KUYRUK SİSTEMİ
  const [queuePositions, setQueuePositions] = useState<Record<string, number>>({})
  const [dismissedJobIds, setDismissedJobIds] = useState<Set<string>>(new Set())
  const [retryingJobIds, setRetryingJobIds] = useState<Set<string>>(new Set())
  const [quotaStats, setQuotaStats] = useState<any>(null)
  const [remainingStories, setRemainingStories] = useState<number | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const fakeProgressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // 🛡️ CANLI KUYRUK TAKİPÇİSİ (Supabase Realtime)
  useEffect(() => {
    const fetchActiveJobs = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setUser(null); setIsLoadingAuth(false); return; }
      setUser(user)
      setIsLoadingAuth(false)
      
      const { data: jobs } = await supabase
        .from('generation_jobs')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'waiting_in_queue', 'processing_text', 'text_ready', 'generating_master', 'master_ready', 'processing', 'generating_audio', 'audio_ready', 'failed', 'cached_processing'])
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (jobs) {
        setActiveJobs(jobs)
        
        // Eğer tamamlanmamış aktif bir iş varsa, otomatik olarak form kilit state'lerini başlat
        const runningJob = jobs.find(j => j.status !== 'completed' && j.status !== 'failed' && j.status !== 'dismissed');
        if (runningJob && !jobId) {
          setJobId(runningJob.id)
          setJobStatus(runningJob)
          setIsGenerating(true)
        }
        
        // global kuyruk konumlarını al
        const positions: Record<string, number> = {}
        const waitingJobs = jobs.filter(j => j.status === 'waiting_in_queue' || j.status === 'pending')
        for (const wJob of waitingJobs) {
          const { count, error } = await supabase
            .from('generation_jobs')
            .select('id', { count: 'exact', head: true })
            .in('status', ['pending', 'waiting_in_queue', 'processing', 'generating_audio', 'processing_text'])
            .lt('created_at', wJob.created_at)
          if (!error && count !== null) {
            positions[wJob.id] = count + 1
          }
        }
        setQueuePositions(positions)
      }
    }

    fetchActiveJobs()

    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const channel = supabase
        .channel('active_jobs_realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'generation_jobs',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchActiveJobs()
            // Kota istatistiklerini de tazele
            const fetchQuota = async () => {
              const quota = await QuotaService.getUserQuotaStats(supabase, user.id);
              if (quota) setQuotaStats(quota);
            }
            fetchQuota()
          }
        )
        .subscribe()

      return channel
    }

    const channelPromise = setupRealtime()

    return () => {
      channelPromise.then(channel => {
        if (channel) supabase.removeChannel(channel)
      })
    }
  }, [supabase])

  const getJobStatusText = (job: any) => {
    const status = job.status;
    const now = new Date().getTime();
    const scheduledAt = job.scheduled_at ? new Date(job.scheduled_at).getTime() : 0;

    switch (status) {
      case 'pending': 
        const pendingPos = queuePositions[job.id];
        if (pendingPos !== undefined) {
          const pendingRank = Math.ceil(pendingPos / 2);
          return language === 'tr'
            ? `Sıraya Alındı (Sıranız: ${pendingRank})`
            : `Queued (Your Turn: ${pendingRank})`;
        }
        return language === 'tr' ? 'Sıraya Alındı' : 'Queued';
      case 'waiting_in_queue': 
        const globalPos = queuePositions[job.id];
        if (globalPos !== undefined) {
          const laneRank = Math.ceil(globalPos / 2);
          return language === 'tr' 
            ? `Kuyrukta Sıra Bekleniyor (Sıranız: ${laneRank})` 
            : `Waiting in Queue (Your Turn: ${laneRank})`;
        }
        if (scheduledAt > now) {
          const secondsLeft = Math.ceil((scheduledAt - now) / 1000);
          return language === 'tr' ? `Mutfak Temizleniyor... (${secondsLeft}s)` : `Cleaning Kitchen... (${secondsLeft}s)`;
        }
        return language === 'tr' ? 'Sıra Bekleniyor...' : 'Waiting in Queue...';
      case 'cached_processing': return language === 'tr' ? 'Eski Tozlar Temizleniyor (Sihir Hazırlanıyor)...' : 'Clearing Dust (Preparing Magic)...';
      case 'processing_text': return language === 'tr' ? 'Hikaye Yazılıyor...' : 'Writing Story...';
      case 'text_ready': return language === 'tr' ? 'Senaryo Hazır' : 'Story Ready';
      case 'generating_master': return language === 'tr' ? 'Karakterler Çiziliyor...' : 'Drawing Characters...';
      case 'master_ready': return language === 'tr' ? 'Karakterler Hazır' : 'Characters Ready';
      case 'processing': return language === 'tr' ? 'Görseller Hazırlanıyor...' : 'Preparing Visuals...';
      case 'generating_audio': return language === 'tr' ? 'Seslendirme Yapılıyor...' : 'Narrating...';
      case 'audio_ready': return language === 'tr' ? 'Seslendirme Hazır' : 'Audio Ready';
      case 'completed': return language === 'tr' ? 'Tamamlandı ✨' : 'Completed ✨';
      case 'failed': return language === 'tr' ? 'Hata Oluştu (Yeniden Deneyin)' : 'Error (Please Retry)';
      default: return status;
    }
  }

  const handleRetryJob = async (jobId: string) => {
    try {
      setRetryingJobIds(prev => new Set(prev).add(jobId));
      
      // 🔒 Reset job status to pending and clear error message so the worker can resume
      await supabase
        .from('generation_jobs')
        .update({ status: 'pending', error_message: null })
        .eq('id', jobId);

      await fetch('/api/story-worker', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-internal-worker-key': process.env.NEXT_PUBLIC_INTERNAL_WORKER_KEY || 'lumibook_secure_worker_auth_key_2026'
        },
        body: JSON.stringify({ jobId })
      });
    } catch (err) {
      console.error("Retry failed:", err);
    } finally {
      setTimeout(() => {
        setRetryingJobIds(prev => {
          const next = new Set(prev);
          next.delete(jobId);
          return next;
        });
      }, 2000);
    }
  }

  const handleDismissJob = async (jobId: string) => {
    // 🚀 KALICI SİLME: Veritabanında durumunu 'dismissed' yapıyoruz
    await supabase.from('generation_jobs').update({ status: 'dismissed' }).eq('id', jobId);
    setActiveJobs(prev => prev.filter(j => j.id !== jobId));
  }

  useEffect(() => {
    const fetchQuota = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const quota = await QuotaService.getUserQuotaStats(supabase, user.id);
      if (!quota) return

      setQuotaStats({
        shuffleUsed: Number(quota.shuffleUsed) || 0,
        shuffleLimit: Number(quota.shuffleLimit) || 0,
        manualUsed: Number(quota.manualUsed) || 0,
        manualLimit: Number(quota.manualLimit) || 0,
        audioUsed: Number(quota.audioUsed) || 0,
        audioLimit: Number(quota.audioLimit) || 0,
        shuffleAudioUsed: Number(quota.shuffleAudioUsed) || 0,
        totalUsed: Number(quota.totalUsed) || 0,
        totalLimit: Number(quota.totalLimit) || 0,
        continueUsed: Number(quota.continueUsed) || 0,
        continueLimit: Number(quota.continueLimit) || 0,
        shortStoryUsed: Number(quota.shortStoryUsed) || 0,
        shortStoryLimit: Number(quota.shortStoryLimit) || 0
      })
    }

    fetchQuota()

    const fetchSettings = async () => {
      const { data } = await supabase.from('system_settings').select('voice_cloning_enabled').eq('id', 1).maybeSingle()
      if (data) setIsVoiceCloningEnabled(data.voice_cloning_enabled)
    }
    fetchSettings()
    
    const fetchClonedVoices = async () => {
      const { data } = await supabase.from('cloned_voices').select('*')
      if (data) setClonedVoices(data)
    }
    fetchClonedVoices()

    const fetchPinnedAndRecent = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      const { data: allStories } = await supabase
        .from('stories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (allStories) {
        const pinned = allStories.filter(s => s.is_pinned === true)
        const recent = allStories.filter(s => s.is_pinned !== true)
        setPinnedStories(pinned)
        setRecentStories(recent)
      }
    }

    const channel = supabase
      .channel('stories-realtime-form')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'stories' 
      }, (payload) => {
        fetchPinnedAndRecent()
      })
      .subscribe()

    fetchPinnedAndRecent()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    const fetchPinnedAndRecent = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: allStories } = await supabase.from('stories').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20)
      if (allStories) {
        setPinnedStories(allStories.filter(s => s.is_pinned === true))
        setRecentStories(allStories.filter(s => s.is_pinned !== true))
      }
    }

    if (tab === 'devam') {
      fetchPinnedAndRecent()
      interval = setInterval(fetchPinnedAndRecent, 30000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [tab, supabase])

  useEffect(() => {
    if (continueFromParam) {
      const fetchStory = async () => {
        const { data: story } = await supabase
          .from('stories')
          .select('*')
          .eq('id', continueFromParam)
          .single()
        
        if (story) {
          setTab('devam')
          setContinueFromId(story.id)
          setContinueStory(story)
          if (story.metadata?.characters) {
            setCharacters(story.metadata.characters)
          }
          setTimeout(() => {
            const element = document.getElementById('create')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }, 500)
        }
      }
      fetchStory()
    }
  }, [continueFromParam, supabase])

  // 🚀 [KURUMSAL ÇOKLU TAKİP MOTORU - OPTİMİZE]
  const activeJobsRef = useRef(activeJobs);
  useEffect(() => { activeJobsRef.current = activeJobs; }, [activeJobs]);

  // 🛰️ KATMAN 1 & 2: Realtime Takip ve Yedekleme Koruma Kalkanı
  useJobTracker({
    supabase,
    jobId,
    onSuccess: (storyId) => {
      window.location.href = `/story/${storyId}`;
    },
    onFailure: (errorMsg) => {
      setErrorMessage(errorMsg);
      setIsGenerating(false);
      setJobId(null);
    },
    onProgress: (updatedJob) => {
      setActiveJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, ...updatedJob } : job
      ));
    }
  });

  useEffect(() => {
    if (activeJobs.length === 0) return;

    const interval = setInterval(async () => {
      const currentJobs = activeJobsRef.current;
      const now = new Date().getTime();
      let hasProcessing = false;
      let nextJobToStart: any = null;
      let needsUpdate = false;

      // 1. İlerleme Hesaplama ve Durum Kontrolü
      const updatedJobs = currentJobs.map(job => {
        if (['processing', 'processing_text', 'generating_master', 'generating_audio'].includes(job.status)) {
          hasProcessing = true;
        }

        // Taslak Simülasyonu (3 Dakika)
        if (job.status === 'cached_processing' && job.scheduled_at) {
          const startedAt = new Date(job.scheduled_at).getTime();
          const duration = (job.estimated_duration || 180) * 1000;
          const elapsed = now - startedAt;
          const progress = Math.min(99, Math.floor((elapsed / duration) * 100));
          
          if (progress > (job.progress || 0)) {
            needsUpdate = true;
            if (progress >= 99 && !job._readyToComplete) {
              return { ...job, progress: 99, _readyToComplete: true };
            }
            return { ...job, progress };
          }
        }

        // Kuyruktaki İşler
        if (job.status === 'waiting_in_queue' && !hasProcessing && !nextJobToStart) {
          const scheduledAt = job.scheduled_at ? new Date(job.scheduled_at).getTime() : 0;
          if (now >= scheduledAt) {
            nextJobToStart = job;
          }
        }

        return job;
      });

      // 2. Durum Güncelleme
      if (needsUpdate || nextJobToStart) {
        setActiveJobs(updatedJobs);
      }

      // 3. Sıradaki İşi Tetikle
      if (nextJobToStart && !hasProcessing) {
        const newStatus = nextJobToStart.estimated_duration > 0 ? 'cached_processing' : 'pending';
        
        // 🔒 ATOMIC LOCK: Yalnızca durumu hala 'waiting_in_queue' olan işi güncelle
        const { data: updatedRows, error } = await supabase
          .from('generation_jobs')
          .update({ status: newStatus, progress: 1 })
          .eq('id', nextJobToStart.id)
          .eq('status', 'waiting_in_queue')
          .select('id');

        if (!error && updatedRows && updatedRows.length > 0 && newStatus === 'pending') {
          fetch('/api/story-worker', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jobId: nextJobToStart.id }) });
        }
      }

      // 4. Sanal İşleri Tamamla
      const finishedSimulatedJob = updatedJobs.find(j => j._readyToComplete && j.status === 'cached_processing');
      if (finishedSimulatedJob) {
        await supabase.from('generation_jobs').update({ status: 'completed', progress: 100, completed_at: new Date().toISOString() }).eq('id', finishedSimulatedJob.id);
        if (finishedSimulatedJob.id === jobId) window.location.href = `/story/${finishedSimulatedJob.story_id}`;
      }

      // 5. Gerçek İşleri Tamamla
      const finishedRealJob = updatedJobs.find(j => j.status === 'completed' && j.story_id && j.id === jobId);
      if (finishedRealJob) window.location.href = `/story/${finishedRealJob.story_id}`;

    }, 1000);

    return () => clearInterval(interval);
  }, [supabase, displayVoiceName, genre, imageStyle, ageGroup, tab, educationalValue, characters, jobId, activeJobs.length]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleVoiceSelect = (id: string) => {
    setVoice(id)
    setOpenSection(null)
  }

  const handleVoiceUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('audio') as File
    const name = formData.get('name') as string

    if (!file || !name) return
    if (file.size > 10 * 1024 * 1024) {
      toast.error(t('form.messages.file_too_large'))
      return
    }

    setIsUploadingVoice(true)
    try {
      const res = await fetch('/api/voices/clone', {
        method: 'POST',
        body: formData
      })
      const result = await res.json()
      
      if (result.success) {
        setClonedVoices([...clonedVoices, result.voice])
        setVoice(result.voice.eleven_voice_id)
        setShowVoiceModal(false)
        toast.success(t('form.messages.voice_clone_success'))
      } else {
        toast.error(result.error || t('form.messages.cloning_error'))
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsUploadingVoice(false)
    }
  }

  const maxChars = isPremium ? 610 : (isPro ? 400 : 200)

  const handleTabSelect = (selectedTab: 'normal' | 'egitici' | 'devam' | 'kisa') => {
    if ((selectedTab === 'egitici' || selectedTab === 'devam' || selectedTab === 'kisa') && !isPro && !isPremium) {
      setShowUpgradeModal(true)
      return
    }

    if ((selectedTab === 'normal' || selectedTab === 'egitici' || selectedTab === 'devam') && quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit) {
      setErrorMessage(language === 'tr' 
        ? "✨ Özgün hikaye kotanız doldu! Sihirli taslakları (Karıştır) veya Tek Kare Şaheser bölümünü denemeye ne dersiniz?" 
        : "✨ Your original story quota is full! How about trying Magic Drafts (Shuffle) or Single Frame Masterpiece?");
      return;
    }

    if (selectedTab === 'kisa' && quotaStats && quotaStats.shortStoryUsed >= quotaStats.shortStoryLimit) {
      setErrorMessage(language === 'tr' 
        ? "✨ Tek Kare Şaheser kotanız doldu! Sihirli taslakları (Karıştır) veya diğer bölümleri denemeye ne dersiniz?" 
        : "✨ Your Single Frame Masterpiece quota is full! How about trying Magic Drafts (Shuffle) or other sections?");
      return;
    }
    setTab(selectedTab)
    setIsShuffle(false)
    setPrompt('')
    setVoice('')
    setGenre('')
    setImageStyle('')
    setAgeGroup('')
    setCharacters([''])
    setEducationalValue('')
    setErrorMessage(null)
    
    if (selectedTab !== 'devam') {
      setContinueFromId(null)
      setContinueStory(null)
    }
  }

  const handleSectionClick = (section: string) => {
    if (!isPro && !isPremium) {
      setShowUpgradeModal(true);
      return;
    }
    if (!isShuffle) {
      setOpenSection(openSection === section ? null : section)
    }
  }

  const handleRandomize = () => {
    if (quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit) return;
    
    // 🛡️ Kullanıcının zaten ürettiği "Karıştır" (Shuffle) taslaklarını bul
    const allUserStories = [...pinnedStories, ...recentStories];
    const userShuffleStories = allUserStories.filter(s => s.is_shuffle);
    
    // 🛡️ Kullanıcının mevcut taslaklarındaki karakterleri düz bir metin (string) olarak birleştir (Arama kolaylığı için)
    const usedCharactersText = userShuffleStories
      .map(story => (story.metadata?.characters || []).join(', ').toLowerCase())
      .join(' || ');

    // 🛡️ Kullanıcının henüz ÜRETMEDİĞİ senaryoları filtrele (Senaryonun ilk karakteri mevcut hikayelerde geçmiyorsa)
    const availableScenarios = STORY_SCENARIOS.filter(scenario => {
      const primaryChar = scenario.characters[0].toLowerCase();
      return !usedCharactersText.includes(primaryChar);
    });

    // Eğer tüm senaryoları tüketmişse, kısıtlamayı kaldırıp rastgele ver
    const scenarioPool = availableScenarios.length > 0 ? availableScenarios : STORY_SCENARIOS;
    
    const randomScenario = scenarioPool[Math.floor(Math.random() * scenarioPool.length)]

    setVoice(randomScenario.voice || 'Aoede')
    
    // Map scenario keys to translated strings for the form state
    setGenre(randomScenario.genre)
    setImageStyle(randomScenario.style)
    setAgeGroup(randomScenario.age || '2-4')
    
    setPrompt(randomScenario.prompt)
    setCharacters(randomScenario.characters)
    setStoryLanguage(randomScenario.language || 'tr')
    setIsShuffle(true)
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) { setErrorMessage(t('form.messages.empty_prompt')); return; }
    if (!voice) { setErrorMessage(t('form.messages.no_voice')); return; }
    if (!genre) { setErrorMessage(t('form.messages.no_genre')); return; }
    if (!imageStyle) { setErrorMessage(t('form.messages.no_style')); return; }
    if (!ageGroup) { setErrorMessage(t('form.messages.no_age')); return; }
    if (tab === 'egitici' && !educationalValue) { setErrorMessage(t('form.messages.no_educational')); return; }
    if (characters.filter(c => c.trim() !== '').length === 0) { setErrorMessage(t('form.messages.no_characters')); return; }
    if (characters.filter(c => c.trim() !== '').length > 3) { setErrorMessage(t('form.messages.max_characters_error')); return; }

    const ENRICHED_STYLES: Record<string, string> = {
      watercolor: "Hand-painted watercolor illustration, soft wet-on-wet washes, paper texture, ethereal and dreamy",
      pixar: "3D animated feature film style, cinematic volumetric lighting, high-detail textures, big expressive eyes",
      pastel: "Soft chalk pastel drawing, muted powdery colors, hazy dreamlike atmosphere, gentle textures",
      anime: "Modern high-quality anime art style, vibrant cel-shading, detailed backgrounds, emotional cinematic lighting",
      oil: "Classic oil painting, thick impasto brushstrokes, rich canvas texture, dramatic chiaroscuro lighting",
      pop_art: "Vibrant pop art style, bold black outlines, halftone dot patterns, high-contrast CMYK colors",
      cartoon: "Hand-drawn 2D cartoon illustration, clean bold outlines, flat vibrant colors, playful and expressive",
      retro: "1970s vintage film aesthetic, faded colors, warm analog grain, soft vignette, nostalgic texture"
    };

    setIsGenerating(true)
    setErrorMessage(null)
    try {
      const chars = characters.filter(c => c.trim() !== '').join(', ') || 'İsimsiz Kahraman'
      
      const isTR = storyLanguage === 'tr'
      const egitici = tab === 'egitici' ? `${isTR ? ' Eğitici Değer: ' : ' Educational Value: '}${educationalValue}.` : ''
      const continuationContext = tab === 'devam' ? ` ${t('form.prompt_template.continuation')}` : ''
      const richStyle = ENRICHED_STYLES[imageStyle] || imageStyle;
      
      const displayGenre = GENRES.find(g => g.key === genre)?.label || genre;
      const displayStyle = IMAGE_STYLES.find(s => s.key === imageStyle)?.label || imageStyle;
      const displayAge = `${ageGroup} ${isTR ? 'Yaş' : 'Age'}`;
      
      const fullTheme = buildStoryThemePrompt(isTR, displayGenre, prompt, richStyle, chars, egitici, continuationContext);
      
      const response = await backgroundStoryAction({
        hero: chars,
        theme: fullTheme,
        age: displayAge, // AI'ya "4-6 Yaş" olarak gitsin
        voiceOption: voice === 'Sessiz' ? 'Sessiz' : 'AI',
        elevenVoiceId: voice !== 'Sessiz' ? voice : undefined,
        style: richStyle,
        master_ref_story_id: continueFromId,
        isShuffle: isShuffle,
        language: storyLanguage,
        originalPrompt: prompt,
        tab: tab, // 'normal', 'egitici', 'devam', 'kisa'
        metadata: {
          voice_name: voice, // Teknik ID (örn: Achird)
          genre: genre,      // Teknik Key (örn: adventure)
          style: imageStyle, // Teknik Key (örn: watercolor)
          age_group: ageGroup, // Sadece rakam (örn: 4-6)
          language: storyLanguage, // 🌍 Üretim dili (TR/EN)
          educational_value: tab === 'egitici' ? educationalValue : null,
          characters: characters.filter(c => c.trim() !== '')
        }
      })
      
      if (response.success && response.jobId) {
        setJobId(response.jobId)
        const { data } = await supabase.from('generation_jobs').select('*').eq('id', response.jobId).single()
        setJobStatus(data)
      } else {
        toast.error(response.error || t('form.messages.error_generic'))
        setIsGenerating(false)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('form.messages.error_generic')
      toast.error(errorMessage)
      setIsGenerating(false)
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-12 mb-20 border border-sky-50">
      {/* 🔒 AUTH GATE (BUZLU CAM KİLİDİ) */}
      {isLoadingAuth ? (
        <div className="absolute inset-0 z-[100] backdrop-blur-md bg-white/50 flex flex-col items-center justify-center p-8 rounded-3xl">
          <Loader2 className="animate-spin text-sky-500" size={40} />
        </div>
      ) : !user ? (
        <div className="absolute inset-0 z-[100] backdrop-blur-md bg-white/30 flex flex-col items-center justify-center p-8">
          <div className="bg-white/95 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md border border-sky-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
              <span className="text-4xl">🔒</span>
            </div>
            <h3 className="text-3xl font-lora font-black text-[#052159] mb-4">
              {language === 'tr' ? 'Üretim Merkezi' : 'Production Center'}
            </h3>
            <p className="text-gray-600 mb-8 font-medium leading-relaxed">
            {language === 'tr' 
                ? "Sihirli masallar üretmek için Pamuk Bulut ailemize katılmalısın. Kayıt olduğunda hesabına anında 3 Sihirli Taslak hakkı tanımlanacaktır!" 
                : "Join our Cotton Cloud family to create magical tales. 3 Magic Drafts will be instantly added to your account upon registration!"}
            </p>
            <a href="/login" className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-sky-200 w-full hover:scale-105 inline-block">
              {language === 'tr' ? "GİRİŞ YAP VE ÜRET" : "LOGIN AND CREATE"}
            </a>
          </div>
        </div>
      ) : !user.email_confirmed_at ? (
        <div className="absolute inset-0 z-[100] backdrop-blur-md bg-white/30 flex flex-col items-center justify-center p-8">
          <div className="bg-white/95 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md border border-sky-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
              <span className="text-4xl">📧</span>
            </div>
            <h3 className="text-3xl font-lora font-black text-[#052159] mb-4">
              {language === 'tr' ? 'E-posta Onayı Gerekli' : 'Email Verification Required'}
            </h3>
            <p className="text-gray-600 mb-8 font-medium leading-relaxed">
              {language === 'tr' 
                ? "Lütfen e-posta adresinizi onaylayın. Hesabınızı doğrulamadan sihirli masallar üretmeye başlayamazsınız." 
                : "Please confirm your email address. You cannot start creating magical tales without verifying your account."}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-sky-200 w-full hover:scale-105 inline-block"
            >
              {language === 'tr' ? "ONAYLADIM, SAYFAYI YENİLE" : "I VERIFIED, REFRESH PAGE"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex border-b border-gray-100 flex-wrap sm:flex-nowrap">
        <button
          type="button"
          onClick={() => handleTabSelect('normal')}
          className={`w-1/2 sm:w-1/4 px-2 py-4 font-bold text-sm sm:text-lg transition-colors ${
            tab === 'normal' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'
          } ${(quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {t('form.tabs.normal')}
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('kisa')}
          className={`w-1/2 sm:w-1/4 px-2 py-4 font-bold text-sm sm:text-lg transition-all relative flex items-center justify-center gap-2 ${
            tab === 'kisa' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'
          } ${(!isPro && !isPremium) ? 'opacity-70' : ''} ${(quotaStats && quotaStats.shortStoryUsed >= quotaStats.shortStoryLimit) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>{language === 'tr' ? 'Tek Kare Şaheser' : 'Single Frame Masterpiece'}</span>
          {(!isPro && !isPremium) && <Lock size={16} className="text-gray-400" />}
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('egitici')}
          className={`w-1/2 sm:w-1/4 px-2 py-4 font-bold text-sm sm:text-lg transition-colors ${
            tab === 'egitici' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'
          } ${(quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {t('form.tabs.educational')}
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('devam')}
          className={`w-1/2 sm:w-1/4 px-2 py-4 font-bold text-sm sm:text-lg transition-all relative flex items-center justify-center gap-2 ${
            tab === 'devam' 
              ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' 
              : 'text-gray-400 hover:text-gray-600'
          } ${(!isPro && !isPremium) ? 'opacity-70' : ''}`}
        >
          <span>{t('form.tabs.continue')}</span>
          {(!isPro && !isPremium) && <Lock size={16} className="text-gray-400" />}
        </button>
      </div>

      {errorMessage && (
        <div className="mx-8 mt-6 p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-center gap-3 text-sky-800 font-bold animate-in fade-in slide-in-from-top-2">
          <div className="bg-sky-500 text-white p-1 rounded-full">
            <X size={16} />
          </div>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleGenerate} className="p-4 sm:p-8 relative">
        {isGenerating && (
          <div className="absolute inset-0 z-40 backdrop-blur-md bg-white/40 flex flex-col items-center justify-center p-8 rounded-3xl text-center">
            <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-sky-100 max-w-md flex flex-col items-center animate-pulse">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 text-3xl">
                ✨
              </div>
              <h4 className="text-xl font-bold text-[#052159] mb-2">
                {language === 'tr' ? 'Masalın Hazırlanıyor' : 'Your Tale is Preparing'}
              </h4>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                {language === 'tr'
                  ? "Şu anda sihirli mutfakta senin için harika bir masal pişiyor! 🍳 Yeni bir maceraya atılmadan önce, mevcut masalının tamamlanmasını beklemeliyiz. Sihirli tozların dökülmesine çok az kaldı! ✨"
                  : "A wonderful tale is cooking for you in the magic kitchen right now! 🍳 Before embarking on a new adventure, we must wait for the current tale to complete. Almost done! ✨"}
              </p>
            </div>
          </div>
        )}
        {tab === 'devam' && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            {!continueStory ? (
              <div className="bg-sky-50/50 rounded-2xl p-6 border-2 border-dashed border-sky-200">
                <h3 className="text-[#052159] font-black mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Sparkles size={20} className="text-orange-400" />
                  {t('form.placeholders.continue_story_search')}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-h-[300px] overflow-y-auto p-1 custom-scrollbar">
                  {[...pinnedStories, ...recentStories].length === 0 ? (
                    <p className="text-gray-400 text-sm italic col-span-2 py-4 text-center">{t('library.no_stories')}</p>
                  ) : (
                    [...pinnedStories, ...recentStories].slice(0, isPremium ? 10 : (isPro ? 5 : 0)).map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setContinueFromId(s.id);
                          setContinueStory(s);
                          if (s.metadata?.characters) setCharacters(s.metadata.characters);
                        }}
                        className={`flex items-center gap-3 p-3 bg-white rounded-xl border transition-all text-left group ${
                          s.is_pinned ? 'border-orange-200 bg-orange-50/30' : 'border-sky-100'
                        } hover:border-sky-400 hover:shadow-md`}
                      >
                        <div className="relative">
                          <img 
                            src={s.metadata?.master_image_url || s.image_url} 
                            className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100" 
                            alt={s.title} 
                          />
                          {s.is_pinned && (
                            <div className="absolute -top-1 -right-1 bg-orange-500 text-white p-0.5 rounded-full shadow-sm">
                              <Sparkles size={8} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className={`text-sm font-bold truncate ${s.is_pinned ? 'text-orange-900' : 'text-sky-900'}`}>{s.title}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <div className="text-center pt-2 border-t border-sky-100">
                  <a href="/parent" className="text-sky-600 text-[10px] sm:text-xs font-bold hover:underline">
                    {t('parent.library_link')}
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-orange-50 to-sky-50 rounded-2xl p-4 border border-orange-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={continueStory.metadata?.master_image_url || continueStory.image_url} 
                      className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md" 
                      alt="Karakter Paftası" 
                    />
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white p-1 rounded-full shadow-lg">
                      <Sparkles size={12} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-sm font-black text-[#052159] uppercase tracking-tight">{t('form.sections.heroes_connected')}</h4>
                    <p className="text-xs text-orange-700 font-bold truncate max-w-[150px] sm:max-w-none">{continueStory.title}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setContinueFromId(null);
                    setContinueStory(null);
                    setTab('normal');
                  }}
                  className="bg-white/50 hover:bg-white p-2 rounded-full text-gray-400 hover:text-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        )}
        <div className="relative mb-6">
          <textarea
            value={prompt}
            onClick={() => {
              if (!isPro && !isPremium) setShowUpgradeModal(true);
            }}
            onChange={(e) => {
              setPrompt(e.target.value.slice(0, maxChars));
              setIsShuffle(false);
            }}
            placeholder={
              !isPro && !isPremium 
                ? t('form.placeholders.subscribe_to_write') 
                : (quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit 
                    ? t('form.placeholders.manual_limit_reached') 
                    : (quotaStats && quotaStats.audioUsed >= quotaStats.audioLimit
                        ? t('form.placeholders.audio_limit_reached')
                        : (tab === 'normal' ? t('form.placeholders.prompt_normal') : t('form.placeholders.prompt_educational'))))
            }
            readOnly={(!isPro && !isPremium) || isShuffle || (quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit)}
            className={`w-full h-32 resize-none text-xl p-4 focus:outline-none placeholder-gray-400 text-gray-800 ${((!isPro && !isPremium) || isShuffle || (quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit)) ? 'bg-gray-50 cursor-not-allowed opacity-80' : ''}`}
          />
          <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">
            {prompt.length} / {maxChars}
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-4">
            {tab === 'normal' && (
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={handleRandomize}
                  disabled={quotaStats && (quotaStats.shuffleUsed >= quotaStats.shuffleLimit || quotaStats.shuffleAudioUsed >= quotaStats.shuffleLimit)}
                  className={`p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95 group relative ${
                    (quotaStats && (quotaStats.shuffleUsed >= quotaStats.shuffleLimit || quotaStats.shuffleAudioUsed >= quotaStats.shuffleLimit))
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none pulse-none'
                      : (isShuffle 
                          ? 'bg-sky-100 text-sky-700 shadow-sm' 
                          : 'bg-[#BDD9F2] text-sky-700 hover:bg-[#84B1D9] hover:text-white shadow-lg shadow-sky-200/50 animate-pulse')
                  }`}
                  title={
                    quotaStats && quotaStats.shuffleUsed >= quotaStats.shuffleLimit 
                      ? t('form.messages.shuffle_limit') 
                      : (quotaStats && quotaStats.shuffleAudioUsed >= quotaStats.shuffleLimit ? t('form.messages.shuffle_audio_limit') : t('form.buttons.randomize'))
                  }
                >
                  <Shuffle size={22} className={`${isShuffle ? '' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  {!isShuffle && quotaStats && quotaStats.shuffleUsed < quotaStats.shuffleLimit && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
                  )}
                </button>
                
                {!isShuffle && (quotaStats && quotaStats.shuffleUsed < quotaStats.shuffleLimit) && (
                  (!isPro && !isPremium) ? (
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm animate-bounce flex items-center gap-1">
                      🎁 {language === 'tr' ? `${Math.max(0, quotaStats.shuffleLimit - quotaStats.shuffleUsed)} Sürpriz Taslağını Dene!` : `Try ${Math.max(0, quotaStats.shuffleLimit - quotaStats.shuffleUsed)} Surprise Drafts!`}
                    </span>
                  ) : (
                    <span className="text-[11px] font-black text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm animate-bounce">
                      {t('form.messages.try_shuffles')}
                    </span>
                  )
                )}

                {!isShuffle && (quotaStats && (quotaStats.shuffleUsed >= quotaStats.shuffleLimit || quotaStats.shuffleAudioUsed >= quotaStats.shuffleLimit)) && (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                    {quotaStats.shuffleUsed >= quotaStats.shuffleLimit ? t('form.messages.shuffle_limit') : t('form.messages.shuffle_audio_limit')}
                  </span>
                )}
              </div>
            )}

            {isShuffle && (
              <button 
                type="button" 
                onClick={() => {
                  setIsShuffle(false)
                  setPrompt('')
                  setCharacters([''])
                }} 
                className="text-xs font-bold text-sky-500 hover:text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm flex items-center gap-1 transition-all"
              >
                <X size={14} /> {t('form.buttons.edit')}
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-100 border-t border-gray-100">
          <div className="py-2">
            <div onClick={() => handleSectionClick('voice')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.voice')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${!voice ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-[#84B1D9] text-white')}`}>
                  {displayVoiceName}
                </span>
                {openSection === 'voice' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'voice' && (
              <div className="p-4 space-y-6 bg-gray-50/50 rounded-xl mt-2">
                <div 
                  onClick={() => handleVoiceSelect('Sessiz')}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition text-center ${voice === 'Sessiz' ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                >
                  <span className="font-bold">{language === 'tr' ? 'Sessiz (Sadece Metin)' : 'Silent (Text Only)'}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">{language === 'tr' ? 'Sihirli Masalcılar (AI)' : 'Magic Storytellers (AI)'}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {AI_VOICES.map(v => (
                      <div 
                        key={v.id} 
                        onClick={() => handleVoiceSelect(v.id)}
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.id ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                      >
                        <span className="font-bold text-sm text-center">{v.name}</span>
                        <span className="text-[10px] text-gray-400 text-center">{v.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {isVoiceCloningEnabled && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">{language === 'tr' ? 'Kendi Sesim' : 'My Own Voice'}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {clonedVoices.map(v => (
                        <div 
                          key={v.eleven_voice_id} 
                          onClick={() => handleVoiceSelect(v.eleven_voice_id)}
                          className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.eleven_voice_id ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                        >
                          <span className="font-bold text-sm text-center">{v.name}</span>
                          <span className="text-[10px] text-emerald-500">{language === 'tr' ? 'Kendi Sesin' : 'Your Voice'}</span>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={() => {
                          if (clonedVoices.length >= (isPremium ? 6 : 3)) {
                            toast.warning(t('form.messages.voice_limit'))
                          } else {
                            setShowVoiceModal(true)
                          }
                        }}
                        className="p-3 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 transition min-h-[60px]"
                      >
                        <Plus size={20} className="text-gray-400" />
                        <span className="text-xs font-bold text-gray-500">{language === 'tr' ? 'Yeni Ses Ekle' : 'Add New Voice'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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
                  <h3 className="text-2xl font-bold text-gray-900">{language === 'tr' ? 'Kendi Sesini Ekle' : 'Add Your Voice'}</h3>
                  <p className="text-gray-500 mt-2">{language === 'tr' ? 'Masalları senin sesinle okuyalım!' : 'Let us read tales in your voice!'}</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-sky-800 font-bold flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    {language === 'tr' 
                      ? 'Kural: En gerçekçi sonuç için en az 5 dakikalık, arkada gürültü olmayan net bir ses kaydı yüklemelisiniz.'
                      : 'Rule: For the most realistic result, you should upload a clear audio recording of at least 5 minutes with no background noise.'}
                  </p>
                </div>
                <form onSubmit={handleVoiceUpload} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'tr' ? 'Sese Bir İsim Ver' : 'Give the Voice a Name'}</label>
                    <input name="name" type="text" placeholder={language === 'tr' ? 'Örn: Anne Sesi, Canım Babam' : 'E.g.: Mother Voice, Dear Father'} className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-purple-500 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'tr' ? 'Ses Dosyasını Seç (MP3, WAV)' : 'Select Audio File (MP3, WAV)'}</label>
                    <input name="audio" type="file" accept="audio/*" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer" required />
                  </div>
                  <button 
                    disabled={isUploadingVoice}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 transition-all disabled:opacity-50"
                  >
                    {isUploadingVoice ? t('form.buttons.cloning_voice') : t('form.buttons.clone_save')}
                  </button>
                </form>
              </div>
            </div>
          )}

          {tab === 'egitici' && (
            <div className="py-2">
              <div onClick={() => handleSectionClick('educational')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
                <span className="font-bold text-gray-800 text-lg text-emerald-600">{t('form.sections.educational_value')}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${!educationalValue ? 'bg-gray-100 text-gray-400' : 'bg-emerald-100 text-emerald-700'}`}>
                    {educationalValue ? t(`form.sections.educational_values.${educationalValue}`) : t('form.sections.select_value')}
                  </span>
                  {openSection === 'educational' ? <ChevronUp className="text-emerald-700" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>
              {openSection === 'educational' && (
                <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 gap-3">
                  {[
                    { key: 'honesty',        label: t('form.sections.educational_values.honesty') },
                    { key: 'sharing',        label: t('form.sections.educational_values.sharing') },
                    { key: 'courage',        label: t('form.sections.educational_values.courage') },
                    { key: 'patience',       label: t('form.sections.educational_values.patience') },
                    { key: 'responsibility', label: t('form.sections.educational_values.responsibility') },
                    { key: 'nature_love',    label: t('form.sections.educational_values.nature_love') }
                  ].map(val => (
                    <button 
                      type="button" 
                      key={val.key} 
                      onClick={() => setEducationalValue(val.key)} 
                      className={`p-3 rounded-lg font-bold border transition ${educationalValue === val.key ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="py-2">
            <div onClick={() => handleSectionClick('genre')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.genre')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${!genre ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700')}`}>
                  {GENRES.find(g => g.key === genre)?.label || t('form.sections.select_genre')}
                </span>
                {openSection === 'genre' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'genre' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GENRES.map(g => (
                  <button type="button" key={g.key} onClick={() => setGenre(g.key)} className={`p-3 rounded-lg font-bold border transition ${genre === g.key ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="py-2">
            <div onClick={() => handleSectionClick('style')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.style')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${!imageStyle ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700')}`}>
                  {IMAGE_STYLES.find(s => s.key === imageStyle)?.label || t('form.sections.select_style')}
                </span>
                {openSection === 'style' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'style' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {IMAGE_STYLES.map(s => (
                  <button type="button" key={s.key} onClick={() => setImageStyle(s.key)} className={`p-3 rounded-lg font-bold border transition ${imageStyle === s.key ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="py-2">
            <div onClick={() => handleSectionClick('age')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.age')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${!ageGroup ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700')}`}>
                  {ageGroup || t('form.sections.select_age')}
                </span>
                {openSection === 'age' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'age' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-3 sm:grid-cols-6 gap-3">
                {AGE_GROUPS.map(val => (
                  <button type="button" key={val} onClick={() => setAgeGroup(val)} className={`p-3 rounded-lg font-bold border transition ${ageGroup === val ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                    <span className="text-xs">{val}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="py-2">
            <div onClick={() => handleSectionClick('language')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{language === 'tr' ? 'Hikaye Dili' : 'Story Language'}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700'}`}>
                  {storyLanguage === 'tr' ? (language === 'tr' ? 'Türkçe' : 'Turkish') : 'English'}
                </span>
                {openSection === 'language' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'language' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setStoryLanguage('tr')} className={`p-3 rounded-lg font-bold border transition ${storyLanguage === 'tr' ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                  {language === 'tr' ? 'Türkçe' : 'Turkish'}
                </button>
                <button type="button" onClick={() => setStoryLanguage('en')} className={`p-3 rounded-lg font-bold border transition ${storyLanguage === 'en' ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                  English
                </button>
              </div>
            )}
          </div>

          <div className="py-2">
            <div onClick={() => handleSectionClick('characters')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.characters')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${characters.filter(c => c.trim() !== '').length === 0 ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700')}`}>
                  {characters.filter(c => c.trim() !== '').length} {language === 'tr' ? 'Karakter' : 'Characters'}
                </span>
                {openSection === 'characters' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'characters' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 space-y-3">
                {characters.map((char, index) => {
                  const isCharactersLocked = tab === 'devam' && !!continueStory;
                  return (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={char}
                        onChange={(e) => {
                          if (isCharactersLocked) return
                          const newChars = [...characters]
                          newChars[index] = e.target.value
                          setCharacters(newChars)
                        }}
                        readOnly={isCharactersLocked}
                        className={`flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#84B1D9] ${isCharactersLocked ? 'bg-gray-100 cursor-not-allowed opacity-80' : ''}`}
                        placeholder={language === 'tr' ? `Karakter ${index + 1} detayları...` : `Character ${index + 1} details...`}
                      />
                      {!isCharactersLocked && characters.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => setCharacters(characters.filter((_, i) => i !== index))}
                          className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  );
                })}
                {!(tab === 'devam' && !!continueStory) && characters.length < 3 && (
                  <button 
                    type="button" 
                    onClick={() => setCharacters([...characters, ''])}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:bg-white transition flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> {t('form.buttons.add_character')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center pb-4">
          <button
            type="submit"
            disabled={isGenerating || (quotaStats && (quotaStats.totalLimit - quotaStats.totalUsed) <= 0)}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center w-64 ${
              (quotaStats && (quotaStats.totalLimit - quotaStats.totalUsed) <= 0) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-[#84B1D9] hover:bg-[#8FBDD9] text-white'
            } disabled:opacity-70`}
          >
            {isGenerating ? (
              <span className="flex items-center animate-pulse">
                <Sparkles className="animate-spin mr-2" size={20} />
                {language === 'tr' ? 'Sihir Yapılıyor...' : 'Doing Magic...'}
              </span>
            ) : (quotaStats && (quotaStats.totalLimit - quotaStats.totalUsed) <= 0) ? (
              <span className="flex items-center">
                <X className="mr-2" size={20} />
                {language === 'tr' ? 'Limit Doldu' : 'Limit Full'}
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2" size={20} />
                {t('form.buttons.generate')}
              </span>
            )}
          </button>
          
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm w-full justify-center">
            <div className="flex items-center gap-1.5 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 shadow-sm whitespace-nowrap">
              <span className="text-sky-700 font-bold">{language === 'tr' ? 'Taslak:' : 'Template:'}</span>
              <span className="text-sky-900 font-black">{String(Math.max(0, (Number(quotaStats?.shuffleLimit) || 0) - (Number(quotaStats?.shuffleUsed) || 0)))} / {String(Number(quotaStats?.shuffleLimit) || 0)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm whitespace-nowrap">
              <span className="text-emerald-700 font-bold">{language === 'tr' ? 'Tek Kare:' : 'Single Frame:'}</span>
              <span className="text-emerald-900 font-black">{String(Math.max(0, (Number(quotaStats?.shortStoryLimit) || 0) - (Number(quotaStats?.shortStoryUsed) || 0)))} / {String(Number(quotaStats?.shortStoryLimit) || 0)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 shadow-sm whitespace-nowrap">
              <span className="text-indigo-700 font-bold">{language === 'tr' ? 'Özgün:' : 'Custom:'}</span>
              <span className="text-indigo-900 font-black">{String(Math.max(0, (Number(quotaStats?.manualLimit) || 0) - (Number(quotaStats?.manualUsed) || 0)))} / {String(Number(quotaStats?.manualLimit) || 0)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 shadow-sm whitespace-nowrap">
              <span className="text-purple-700 font-bold">{language === 'tr' ? 'Ses:' : 'Audio:'}</span>
              <span className="text-purple-900 font-black">{String(Math.max(0, (Number(quotaStats?.audioLimit) || 0) - (Number(quotaStats?.audioUsed) || 0)))} / {String(Number(quotaStats?.audioLimit) || 0)}</span>
            </div>
            <span className="text-gray-400 font-medium whitespace-nowrap ml-2">
              {language === 'tr' ? 'Kalan:' : 'Left:'} <strong className="text-gray-600 font-black">{String(Math.max(0, (Number(quotaStats?.totalLimit) || 0) - (Number(quotaStats?.totalUsed) || 0)))}</strong>
            </span>
          </div>
        </div>
      </form>

      {/* 🚀 CANLI KUYRUK PANELİ (Sihirli Mutfak) */}
      {activeJobs.length > 0 && (
        <div className="px-4 sm:px-8 pb-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border-2 border-[#84B1D9]/30 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#84B1D9] to-transparent animate-pulse" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#84B1D9]/10 rounded-xl text-[#84B1D9]">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-[#052159] font-black text-lg tracking-tight uppercase">
                    {language === 'tr' ? 'Sihirli Mutfak' : 'Magic Kitchen'}
                  </h3>
                  <p className="text-[10px] text-[#84B1D9] font-bold uppercase tracking-widest leading-none">
                    {language === 'tr' ? 'Canlı Üretim Durumu' : 'Live Production Status'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-full border border-sky-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span className="text-[10px] font-black text-sky-700 uppercase">{activeJobs.length} {language === 'tr' ? 'AKTİF İŞ' : 'ACTIVE JOBS'}</span>
              </div>
            </div>

            <div className="space-y-4">
              {activeJobs
                .filter(job => !dismissedJobIds.has(job.id))
                .map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white/80 rounded-2xl p-4 border border-sky-100 hover:border-[#84B1D9]/50 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        job.status === 'waiting_in_queue' ? 'bg-amber-50 text-amber-500' : 
                        job.status === 'completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-sky-50 text-sky-500'
                      }`}>
                        {job.status === 'waiting_in_queue' ? <Clock size={16} /> : 
                         job.status === 'completed' ? <CheckCircle2 size={16} /> : 
                         job.status === 'cached_processing' ? <Sparkles size={16} className="text-amber-400" /> :
                         <Loader2 size={16} className="animate-spin" />}
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#052159] truncate max-w-[200px]">
                          {job.payload?.theme?.split('.')[0] || (language === 'tr' ? 'Yeni Masal' : 'New Tale')}
                        </p>
                        <p className={`text-[10px] font-bold uppercase ${
                          job.status === 'waiting_in_queue' ? 'text-amber-600' : 
                          job.status === 'cached_processing' ? 'text-amber-500' :
                          job.status === 'failed' ? 'text-red-500' : 'text-[#84B1D9]'
                        }`}>
                          {getJobStatusText(job)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-[#052159]">{job.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-1.5 bg-sky-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        job.status === 'waiting_in_queue' ? 'bg-amber-400' : 
                        job.status === 'cached_processing' ? 'bg-amber-400' :
                        job.status === 'failed' ? 'bg-red-400' : 'bg-[#84B1D9]'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>

                  {/* 🛠️ AKSİYON BUTONLARI (Hata durumunda) */}
                  {job.status === 'failed' && (
                    <div className="mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                      <button
                        onClick={() => handleRetryJob(job.id)}
                        disabled={retryingJobIds.has(job.id)}
                        className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-black py-2 rounded-xl transition-colors uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {retryingJobIds.has(job.id) ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <RotateCcw size={12} />
                        )}
                        {language === 'tr' ? 'Tekrar Dene' : 'Retry'}
                      </button>
                      <button
                        onClick={() => handleDismissJob(job.id)}
                        className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-500 text-[10px] font-black py-2 rounded-xl transition-colors uppercase tracking-wider"
                      >
                        {language === 'tr' ? 'Kapat' : 'Dismiss'}
                      </button>
                    </div>
                  )}

                  {/* ✅ TAMAMLANDI BUTONU */}
                  {job.status === 'completed' && (
                    <div className="mt-3">
                      <button
                        onClick={() => handleDismissJob(job.id)}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-[10px] font-black py-2 rounded-xl transition-colors uppercase tracking-wider"
                      >
                        {language === 'tr' ? 'Listeden Kaldır' : 'Clear from List'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🚀 UPGRADE MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[110] backdrop-blur-sm bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl text-center max-w-sm w-full border border-sky-100 relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowUpgradeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#052159] mb-3">
              {language === 'tr' ? 'Paket Yükseltin' : 'Upgrade Plan'}
            </h3>
            <p className="text-gray-500 mb-8 font-medium text-sm leading-relaxed">
              {language === 'tr' 
                ? 'Bu özelliği kullanmak ve kendi hikayelerinizi özgürce yazmak için paketinizi yükseltmeniz gerekir.' 
                : 'To use this feature and freely write your own stories, you need to upgrade your plan.'}
            </p>
            <a href="/pricing" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg w-full block transition-all hover:scale-105">
              {language === 'tr' ? 'Fiyatlandırmayı İncele' : 'View Pricing'}
            </a>
          </div>
        </div>
      )}

    </div>
  )
}

export default function StoryForm(props: any) {
  return (
    <Suspense fallback={<div className="w-full h-64 bg-white/50 animate-pulse rounded-3xl" />}>
      <StoryFormInner {...props} />
    </Suspense>
  )
}
