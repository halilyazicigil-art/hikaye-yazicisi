'use client'

import { useState, useMemo } from 'react'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { checkJobStatus } from '@/app/actions/adminCacheActions'
import { migrateLegacyCacheKeys } from '@/app/actions/migrationActions'
import { Sparkles, CheckCircle, XCircle, Loader2, Search, Database, Zap, Layers, RefreshCw, AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function ScenarioDashboard({ initialData }: { initialData: any }) {
    const { t } = useLanguage()
    const [scenarios, setScenarios] = useState<any[]>(initialData.scenarios || [])
    const [metrics, setMetrics] = useState(initialData.metrics || { total: 0, full: 0, empty: 0 })
    
    const [filter, setFilter] = useState<'all' | 'tr' | 'en'>('all')
    const [statusFilter, setStatusFilter] = useState<'all' | 'ready' | 'missing'>('all')
    const [isGeneratingAll, setIsGeneratingAll] = useState(false)
    const [isMigrating, setIsMigrating] = useState(false)
    const [processingId, setProcessingId] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    
    // Custom Confirmation Modal State
    const [showConfirm, setShowConfirm] = useState(false)
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' | 'error' } | null>(null)

    const filteredScenarios = useMemo(() => {
        return scenarios.filter(s => {
            const langMatch = filter === 'all' || s.language === filter
            const statusMatch = statusFilter === 'all' || (statusFilter === 'ready' ? s.isCached : !s.isCached)
            const searchMatch = s.prompt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                s.characters.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
            return langMatch && statusMatch && searchMatch
        })
    }, [scenarios, filter, statusFilter, searchTerm])

    const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 5000)
    }

    const pollJob = async (jobId: string): Promise<string> => {
        return new Promise((resolve) => {
            const interval = setInterval(async () => {
                try {
                    const res = await checkJobStatus(jobId)
                    if (res.status === 'completed' || res.status === 'failed') {
                        clearInterval(interval)
                        resolve(res.status)
                    }
                } catch (e) {
                    clearInterval(interval)
                    resolve('failed')
                }
            }, 5000)
        })
    }

    const generateSingle = async (scenario: any) => {
        setProcessingId(scenario.id)
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
            })

            if (res.success && res.jobId) {
                const status = await pollJob(res.jobId)
                if (status === 'completed') {
                    setScenarios(prev => prev.map(s => s.id === scenario.id ? { ...s, isCached: true } : s))
                    setMetrics((prev: any) => ({ ...prev, full: prev.full + 1, empty: prev.empty - 1 }))
                } else {
                    showToast(`${t('admin.messages.error')} ${scenario.prompt}`, 'error')
                }
            } else {
                showToast(res.error || t('admin.messages.error'), 'error')
            }
        } catch (err) {
            console.error('Production error:', err)
            showToast(t('admin.messages.error'), 'error')
        } finally {
            setProcessingId(null)
        }
    }

    const startProductionQueue = async () => {
        const missing = scenarios.filter(s => !s.isCached)
        setShowConfirm(false)
        
        if (missing.length === 0) {
            showToast(t('admin.messages.cache_full'), 'success')
            return
        }
        
        setIsGeneratingAll(true)
        showToast(t('admin.messages.queue_started'), 'info')

        for (const s of missing) {
            await generateSingle(s)
            // Safety delay: 10 seconds cooldown between stories to respect Google Cloud Rate Limits
            console.log(`>>> [QUEUE]: Story completed. Cooling down for 10s...`)
            await new Promise(r => setTimeout(r, 10000))
        }
        
        setIsGeneratingAll(false)
        showToast(t('admin.messages.queue_completed'), 'success')
    }

    const handleMigration = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!confirm(t('admin.messages.migration_confirm'))) return
        
        setIsMigrating(true)
        try {
            const res = await migrateLegacyCacheKeys()
            if (res.success) {
                showToast(`${res.updatedCount} ${t('admin.messages.migration_success')}`, 'success')
                setTimeout(() => window.location.reload(), 2000)
            } else {
                showToast(`${t('admin.messages.error')} ${res.error}`, 'error')
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsMigrating(false)
        }
    }

    const openConfirmModal = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowConfirm(true)
    }

    return (
        <div className="space-y-8 mt-12 relative">
            {/* Custom Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={`fixed top-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm border max-w-[90vw] md:max-w-md break-words whitespace-normal ${
                            toast.type === 'success' ? 'bg-emerald-600 text-white border-emerald-400' : 
                            toast.type === 'error' ? 'bg-red-600 text-white border-red-400' : 
                            'bg-gray-900 text-white border-gray-700'
                        }`}
                    >
                        <div className="shrink-0">
                            {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <span className="flex-1">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConfirm(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-gray-100 p-10 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-yellow-400" />
                            <h3 className="text-2xl font-black text-gray-900 mb-4 font-lora">{t('admin.messages.confirm_title')}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {t('admin.messages.confirm_desc').replace('{count}', metrics.empty.toString())}
                            </p>
                            
                            <div className="mt-8 flex flex-col gap-3">
                                <button 
                                    onClick={startProductionQueue}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                                >
                                    <Zap size={18} className="text-yellow-400" />
                                    {t('admin.messages.confirm_start')}
                                </button>
                                <button 
                                    onClick={() => setShowConfirm(false)}
                                    className="w-full py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    {t('admin.messages.confirm_cancel')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-sky-50 text-sky-600 rounded-2xl">
                        <Layers size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-gray-900">{metrics.total}</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('admin.stats.cache_total')}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-100 flex items-center gap-5">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-emerald-600">{metrics.full}</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('admin.stats.cache_full')}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-100 flex items-center gap-5">
                    <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
                        <Database size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-orange-600">{metrics.empty}</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('admin.stats.cache_empty')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between bg-white gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 font-lora">
                            <Sparkles className="text-orange-500" />
                            {t('admin.cache.title')}
                        </h2>
                        <p className="text-gray-500 text-sm font-medium mt-1">{t('admin.cache.desc')}</p>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            type="button"
                            onClick={handleMigration}
                            disabled={isMigrating || isGeneratingAll}
                            className="px-5 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 active:scale-95"
                            title={t('admin.cache.optimize')}
                        >
                            <RefreshCw className={isMigrating ? 'animate-spin' : ''} size={18} />
                            {isMigrating ? t('admin.cache.fixing') : t('admin.cache.optimize')}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={openConfirmModal}
                            disabled={isGeneratingAll || metrics.empty === 0 || isMigrating}
                            className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {isGeneratingAll ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} className="text-yellow-400" />}
                            {t('admin.cache.fill_missing')}
                        </button>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="p-6 border-b border-gray-50 flex flex-wrap items-center gap-4 bg-gray-50/30">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder={t('admin.cache.search_placeholder')} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-sky-300 transition-all"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                        <button type="button" onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'all' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('admin.cache.filter_all')}</button>
                        <button type="button" onClick={() => setFilter('tr')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'tr' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('admin.cache.filter_tr')}</button>
                        <button type="button" onClick={() => setFilter('en')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'en' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('admin.cache.filter_en')}</button>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                        <button type="button" onClick={() => setStatusFilter('all')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${statusFilter === 'all' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('admin.cache.status_all')}</button>
                        <button type="button" onClick={() => setStatusFilter('ready')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${statusFilter === 'ready' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('admin.cache.status_full')}</button>
                        <button type="button" onClick={() => setStatusFilter('missing')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${statusFilter === 'missing' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('admin.cache.status_missing')}</button>
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5">{t('admin.cache.table_theme')}</th>
                                <th className="px-8 py-5">{t('admin.cache.table_genre')}</th>
                                <th className="px-8 py-5">{t('admin.cache.table_lang')}</th>
                                <th className="px-8 py-5 text-right">{t('admin.cache.table_status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredScenarios.map((s) => (
                                <tr key={s.theme} className="hover:bg-gray-50/30 transition group">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-gray-900 line-clamp-1 max-w-md">{s.prompt}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 font-medium">{s.characters.join(', ')}</p>
                                    </td>
                                    <td className="px-8 py-6 text-xs font-bold text-gray-500 uppercase">{s.genre}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-gray-500">{s.language === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}</td>
                                    <td className="px-8 py-5 text-right">
                                        {s.isCached ? (
                                            <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                                <CheckCircle size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{t('admin.cache.status_ready')}</span>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 text-orange-500 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                                                {processingId === s.id ? (
                                                    <><Loader2 size={16} className="animate-spin" /><span className="text-[10px] font-black uppercase tracking-widest">{t('admin.cache.status_generating')}</span></>
                                                ) : (
                                                    <><XCircle size={16} /><span className="text-[10px] font-black uppercase tracking-widest">{t('admin.cache.status_missing_label')}</span></>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
