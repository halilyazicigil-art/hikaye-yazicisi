'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, Shuffle, X, Plus } from 'lucide-react'
import { STORY_SCENARIOS } from '@/utils/scenarios'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { saveStoryMetadata } from '@/app/actions/metadata'
import { createClient } from '@/utils/supabase/client'
import { QuotaService } from '@/services/QuotaService'

import { useLanguage } from '@/context/LanguageContext'

function StoryFormInner({ isPro = false, isPremium = false }: { isPro?: boolean, isPremium?: boolean }) {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()

  const AI_VOICES = [
    { id: 'Achird',       name: t('voices.grandpa.name'),      desc: t('voices.grandpa.desc') },
    { id: 'Algenib',      name: t('voices.rabbit.name'),       desc: t('voices.rabbit.desc') },
    { id: 'Algieba',      name: t('voices.knight.name'),       desc: t('voices.knight.desc') },
    { id: 'Alnilam',      name: t('voices.king.name'),         desc: t('voices.king.desc') },
    { id: 'Charon',       name: t('voices.dad.name'),          desc: t('voices.dad.desc') },
    { id: 'Iapetus',      name: t('voices.guardian.name'),     desc: t('voices.guardian.desc') },
    { id: 'Aoede',        name: t('voices.mother.name'),       desc: t('voices.mother.desc') },
    { id: 'Callirrhoe',   name: t('voices.woman.name'),        desc: t('voices.woman.desc') },
    { id: 'Despina',      name: t('voices.fairy_serenity.name'), desc: t('voices.fairy_serenity.desc') },
    { id: 'Fenrir',       name: t('voices.fairy_magic.name'),    desc: t('voices.fairy_magic.desc') },
    { id: 'Gacrux',       name: t('voices.princess.name'),      desc: t('voices.princess.desc') },
    { id: 'Kore',         name: t('voices.rainbow_girl.name'),  desc: t('voices.rainbow_girl.desc') },
  ]

  const GENRES = [
    t('library.genres.tale'), 
    t('library.genres.sci_fi'), 
    t('library.genres.adventure'), 
    t('library.genres.fantasy'), 
    t('library.genres.fable')
  ]
  
  const IMAGE_STYLES = [
    t('styles.watercolor'),
    t('styles.pixar'),
    t('styles.pastel'),
    t('styles.anime'),
    t('styles.oil'),
    t('styles.pop_art'),
    t('styles.cartoon'),
    t('styles.retro')
  ]

  const AGE_GROUPS = ['0-1', '1-2', '2-4', '4-6', '6-10', '10-13']

  const continueFromParam = searchParams.get('continue_from')
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici' | 'devam'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Form Data
  const [voice, setVoice] = useState<string>('') 
  const [clonedVoices, setClonedVoices] = useState<any[]>([])
  const [isUploadingVoice, setIsUploadingVoice] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  
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
  const [quotaStats, setQuotaStats] = useState<any>(null)
  const [remainingStories, setRemainingStories] = useState<number | null>(null)
  const fakeProgressIntervalRef = useRef<NodeJS.Timeout | null>(null)

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
        continueLimit: Number(quota.continueLimit) || 0
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
        
        setJobStatus((prev: any) => {
          if (prev?._isFaking && newStatus.status === 'cached_processing') {
            return { ...newStatus, progress: prev.progress, _isFaking: true };
          }
          return newStatus;
        });

        if (newStatus.status === 'completed' && newStatus.story_id) {
          await saveStoryMetadata(newStatus.story_id, {
            voice_name: displayVoiceName,
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
  }, [jobId, displayVoiceName, genre, imageStyle, ageGroup, tab, educationalValue, characters, supabase])

  useEffect(() => {
    if (jobStatus?.status === 'cached_processing' && jobStatus.story_id && !jobStatus._isFaking) {
      setJobStatus((prev: any) => prev ? { ...prev, _isFaking: true, progress: 1 } : null);
      if (fakeProgressIntervalRef.current) clearInterval(fakeProgressIntervalRef.current);
      
      let currentProgress = 1;
      fakeProgressIntervalRef.current = setInterval(() => {
        currentProgress += 1;
        
        if (currentProgress >= 100) {
          if (fakeProgressIntervalRef.current) clearInterval(fakeProgressIntervalRef.current);
          fakeProgressIntervalRef.current = null;
          
          setJobStatus((prev: any) => prev ? { ...prev, status: 'completed', progress: 100 } : null);
          
          if (jobStatus.story_id) {
            saveStoryMetadata(jobStatus.story_id, {
              voice_name: displayVoiceName,
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
          setJobStatus((prev: any) => prev ? { ...prev, progress: currentProgress, _isFaking: true } : null);
        }
      }, 1800);
    }
    return () => {
      if (!jobId && fakeProgressIntervalRef.current) {
        clearInterval(fakeProgressIntervalRef.current);
        fakeProgressIntervalRef.current = null;
      }
    };
  }, [jobStatus?.status, jobStatus?._isFaking, jobStatus?.story_id, jobId, displayVoiceName, genre, imageStyle, ageGroup, tab, educationalValue, characters])

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
      alert(t('form.messages.file_too_large'))
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
        alert(t('form.messages.voice_clone_success'))
      } else {
        alert(result.error || t('form.messages.cloning_error'))
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUploadingVoice(false)
    }
  }

  const maxChars = isPremium ? 610 : (isPro ? 400 : 200)

  const handleTabSelect = (selectedTab: 'normal' | 'egitici' | 'devam') => {
    if (selectedTab === 'egitici' && !isPro && !isPremium) {
      alert(t('form.messages.educational_error'))
      return
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

  const handleRandomize = () => {
    if (quotaStats?.shuffleUsed >= quotaStats?.shuffleLimit) return;
    const randomScenario = STORY_SCENARIOS[Math.floor(Math.random() * STORY_SCENARIOS.length)]

    setVoice(randomScenario.voice || 'Aoede')
    
    // Map scenario keys to translated strings for the form state
    const randomGenre = randomScenario.genre ? t(`library.genres.${randomScenario.genre}`) : GENRES[0]
    const randomStyle = randomScenario.style ? t(`styles.${randomScenario.style}`) : IMAGE_STYLES[0]
    
    setGenre(randomGenre)
    setImageStyle(randomStyle)
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

    setIsGenerating(true)
    setErrorMessage(null)
    try {
      const chars = characters.filter(c => c.trim() !== '').join(', ') || 'İsimsiz Kahraman'
      
      const isTR = storyLanguage === 'tr'
      const egitici = tab === 'egitici' ? `${isTR ? ' Eğitici Değer: ' : ' Educational Value: '}${educationalValue}.` : ''
      const continuationContext = tab === 'devam' ? ` ${t('form.prompt_template.continuation')}` : ''
      
      const fullTheme = isTR 
        ? `Turkish dilinde. ${genre} tarzında. Konu: ${prompt}. Çizim Stili: ${imageStyle}. Ses Seçimi: ${voice}. Karakterler: ${chars}.${egitici}${continuationContext}`
        : `Write in English language. Style: ${genre}. Topic: ${prompt}. Art Style: ${imageStyle}. Voice: ${voice}. Characters: ${chars}.${egitici}${continuationContext}`
      
      const response = await backgroundStoryAction({
        childName: 'Kullanıcı',
        hero: chars,
        theme: fullTheme,
        age: ageGroup,
        voiceOption: voice === 'Sessiz' ? 'Sessiz' : 'AI',
        elevenVoiceId: voice !== 'Sessiz' ? voice : undefined,
        style: imageStyle,
        master_ref_story_id: continueFromId,
        isShuffle: isShuffle,
        language: storyLanguage
      })
      
      if (response.success && response.jobId) {
        setJobId(response.jobId)
        const { data } = await supabase.from('generation_jobs').select('*').eq('id', response.jobId).single()
        setJobStatus(data)
      } else {
        alert(response.error || t('form.messages.error_generic'))
        setIsGenerating(false)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('form.messages.error_generic')
      alert(errorMessage)
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-12 mb-20 border border-sky-50">
      <div className="flex border-b border-gray-100">
        <button
          type="button"
          onClick={() => handleTabSelect('normal')}
          className={`w-1/3 px-2 py-4 font-bold text-sm sm:text-lg transition-colors ${tab === 'normal' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          {t('form.tabs.normal')}
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('egitici')}
          className={`w-1/3 px-2 py-4 font-bold text-sm sm:text-lg transition-colors ${tab === 'egitici' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          {t('form.tabs.educational')}
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('devam')}
          disabled={(!isPro && !isPremium) || (quotaStats && quotaStats.continueUsed >= quotaStats.continueLimit) || (quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit)}
          className={`w-1/3 px-2 py-4 font-bold text-sm sm:text-lg transition-all relative ${
            tab === 'devam' 
              ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' 
              : 'text-gray-400 hover:text-gray-600'
          } ${((!isPro && !isPremium) || (quotaStats && quotaStats.continueUsed >= quotaStats.continueLimit) || (quotaStats && quotaStats.manualUsed >= quotaStats.manualLimit)) ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <span>{t('form.tabs.continue')}</span>
          <div className="absolute top-1 right-1 sm:top-2 sm:right-4 pointer-events-none">
            <span className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[9px] font-black border shadow-sm transition-all ${
              (!isPro && !isPremium)
                ? 'bg-gray-100 text-gray-400 border-gray-200'
                : (quotaStats && quotaStats.continueUsed >= quotaStats.continueLimit
                    ? 'bg-red-50 text-red-500 border-red-100'
                    : 'bg-[#052159] text-white border-[#84B1D9]')
            }`}>
              {(!isPro && !isPremium) ? '🔒' : (quotaStats && quotaStats.continueUsed >= quotaStats.continueLimit ? '!' : Math.max(0, (Number(quotaStats?.continueLimit) || 0) - (Number(quotaStats?.continueUsed) || 0)))}
            </span>
          </div>
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

      <form onSubmit={handleGenerate} className="p-4 sm:p-8">
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
                          <img src={s.image_url} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt="" />
                          {s.is_pinned && (
                            <div className="absolute -top-1 -right-1 bg-orange-500 text-white p-0.5 rounded-full shadow-sm">
                              <Sparkles size={8} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className={`text-sm font-bold truncate ${s.is_pinned ? 'text-orange-900' : 'text-sky-900'}`}>{s.title}</p>
                          <p className="text-[10px] text-gray-400" suppressHydrationWarning>
                            {new Date(s.created_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                          </p>
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
                
                {!isShuffle && (quotaStats && quotaStats.shuffleUsed < quotaStats.shuffleLimit && quotaStats.audioUsed < quotaStats.audioLimit) && (
                  <span className="text-[11px] font-black text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm animate-bounce">
                    {t('form.messages.try_shuffles')}
                  </span>
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
            <div onClick={() => !isShuffle && toggleSection('voice')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
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
                          if (!isPremium) {
                            alert(t('form.messages.voice_limit'))
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
              <div onClick={() => toggleSection('educational')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
                <span className="font-bold text-gray-800 text-lg text-emerald-600">{t('form.sections.educational_value')}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${!educationalValue ? 'bg-gray-100 text-gray-400' : 'bg-emerald-100 text-emerald-700'}`}>
                    {educationalValue || t('form.sections.select_value')}
                  </span>
                  {openSection === 'educational' ? <ChevronUp className="text-emerald-700" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>
              {openSection === 'educational' && (
                <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 gap-3">
                  {(language === 'tr' 
                    ? ['Dürüstlük', 'Paylaşmak', 'Cesaret', 'Sabır', 'Sorumluluk', 'Doğa Sevgisi']
                    : ['Honesty', 'Sharing', 'Courage', 'Patience', 'Responsibility', 'Love of Nature']
                  ).map(val => (
                    <button type="button" key={val} onClick={() => setEducationalValue(val)} className={`p-3 rounded-lg font-bold border transition ${educationalValue === val ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('genre')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.genre')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${!genre ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700')}`}>
                  {genre || t('form.sections.select_genre')}
                </span>
                {openSection === 'genre' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'genre' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GENRES.map(val => (
                  <button type="button" key={val} onClick={() => setGenre(val)} className={`p-3 rounded-lg font-bold border transition ${genre === val ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                    {val}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('style')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
              <span className="font-bold text-gray-800 text-lg">{t('form.sections.style')}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${!imageStyle ? 'bg-gray-100 text-gray-400' : (isShuffle ? 'bg-gray-200 text-gray-500' : 'bg-sky-100 text-sky-700')}`}>
                  {imageStyle || t('form.sections.select_style')}
                </span>
                {openSection === 'style' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'style' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {IMAGE_STYLES.map(val => (
                  <button type="button" key={val} onClick={() => setImageStyle(val)} className={`p-3 rounded-lg font-bold border transition ${imageStyle === val ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                    <span className="text-[10px]">{val}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="py-2">
            <div onClick={() => !isShuffle && toggleSection('age')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
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
            <div onClick={() => !isShuffle && toggleSection('language')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
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
            <div onClick={() => !isShuffle && toggleSection('characters')} className={`flex items-center justify-between py-3 transition px-2 rounded-lg ${isShuffle ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50/50 cursor-pointer'}`}>
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
                {characters.map((char, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={char}
                      onChange={(e) => {
                        const newChars = [...characters]
                        newChars[index] = e.target.value
                        setCharacters(newChars)
                      }}
                      className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#84B1D9]"
                      placeholder={language === 'tr' ? `Karakter ${index + 1} detayları...` : `Character ${index + 1} details...`}
                    />
                    {characters.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => setCharacters(characters.filter((_, i) => i !== index))}
                        className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                {characters.length < 3 && (
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
          
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 text-sm w-full justify-center">
            <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm">
              <Shuffle size={14} className="text-sky-600" />
              <span className="text-sky-700 font-bold">{language === 'tr' ? 'Taslak:' : 'Template:'}</span>
              <span className="text-sky-900 font-black">{String(Math.max(0, (Number(quotaStats?.shuffleLimit) || 0) - (Number(quotaStats?.shuffleUsed) || 0)))} / {String(Number(quotaStats?.shuffleLimit) || 0)}</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
              <Plus size={14} className="text-indigo-600" />
              <span className="text-indigo-700 font-bold">{language === 'tr' ? 'Özgün:' : 'Custom:'}</span>
              <span className="text-indigo-900 font-black">{String(Math.max(0, (Number(quotaStats?.manualLimit) || 0) - (Number(quotaStats?.manualUsed) || 0)))} / {String(Number(quotaStats?.manualLimit) || 0)}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 shadow-sm">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-purple-700 font-bold">{language === 'tr' ? 'Özgün Ses:' : 'Custom Audio:'}</span>
              <span className="text-purple-900 font-black">{String(Math.max(0, (Number(quotaStats?.audioLimit) || 0) - (Number(quotaStats?.audioUsed) || 0)))} / {String(Number(quotaStats?.audioLimit) || 0)}</span>
            </div>
            <span className="text-gray-400 font-medium">
              {language === 'tr' ? 'Toplam Kalan:' : 'Total Remaining:'} <strong className="text-gray-600 font-black">{String(Math.max(0, (Number(quotaStats?.totalLimit) || 0) - (Number(quotaStats?.totalUsed) || 0)))}</strong>
            </span>
          </div>
        </div>
      </form>

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
                {language === 'tr' ? 'Sihirli Masalınız Hazırlanıyor... ✨' : 'Your Magic Story is Being Prepared... ✨'}
              </h2>
              <p className="text-[#84B1D9] font-medium">{language === 'tr' ? 'Lütfen bu sayfayı kapatmayın, süreç 1-2 dakika sürebilir.' : 'Please do not close this page, the process may take 1-2 minutes.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{language === 'tr' ? 'Durum:' : 'Status:'} {jobStatus.status}</span>
                    <span className="text-lg font-black text-[#84B1D9]">{Number(jobStatus.progress) || 0}%</span>
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
                    <span className="text-xl">{jobStatus.progress >= 10 ? '✅' : '⏳'}</span> {language === 'tr' ? 'Senaryo ve Metin Yazımı' : 'Script and Story Writing'}
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 20 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 20 ? '✅' : '⏳'}</span> {language === 'tr' ? 'Karakterler Çiziliyor' : 'Drawing Characters'}
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 80 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 80 ? '✅' : '⏳'}</span> {language === 'tr' ? 'Sahne Resimleniyor' : 'Illustrating Scenes'}
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 100 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 100 ? '✅' : '⏳'}</span> {language === 'tr' ? 'Tamamlanıyor' : 'Completing'}
                  </li>
                </ul>
              </div>

              <div className="bg-[#BDD9F2] rounded-3xl p-6 border-2 border-dashed border-[#BDD9F2] flex flex-col items-center justify-center min-h-[300px]">
                <h4 className="text-sm font-bold text-sky-700 uppercase tracking-widest mb-4">{language === 'tr' ? 'Karakter Referansınız' : 'Your Character Reference'}</h4>
                {jobStatus.master_ref_data ? (
                  <img 
                    src={jobStatus.master_ref_data.startsWith('http') ? jobStatus.master_ref_data : `data:image/png;base64,${jobStatus.master_ref_data}`} 
                    className="w-full rounded-2xl shadow-xl border-4 border-white"
                    alt="Master Reference"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-sky-900/40">
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <p className="font-bold">{language === 'tr' ? 'Karakterler oluşturuluyor...' : 'Characters are being created...'}</p>
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

export default function StoryForm(props: any) {
  return (
    <Suspense fallback={<div className="w-full h-64 bg-white/50 animate-pulse rounded-3xl" />}>
      <StoryFormInner {...props} />
    </Suspense>
  )
}
