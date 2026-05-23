'use client'

import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  enqueueAdminBatch, 
  pauseAdminBatch, 
  resumeAdminBatch, 
  stopAdminBatch, 
  getAdminBatchJobs 
} from '@/app/actions/adminBatchActions'
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Search, 
  Database, 
  Zap, 
  Layers, 
  AlertCircle, 
  Play, 
  Pause,
  Clock,
  StopCircle,
  Activity
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function ScenarioDashboard({ initialData }: { initialData: any }) {
    const { t, language } = useLanguage()
    const lang = language
    const supabase = createClient()

    const [scenarios, setScenarios] = useState<any[]>(initialData.scenarios || [])
    const [metrics, setMetrics] = useState(initialData.metrics || { total: 0, full: 0, empty: 0 })
    
    const [filter, setFilter] = useState<'all' | 'tr' | 'en'>('all')
    const [statusFilter, setStatusFilter] = useState<'all' | 'ready' | 'missing'>('all')
    const [searchTerm, setSearchTerm] = useState('')
    
    // 🏭 PERSISTENT BATCH PRODUCTION STATE
    const [batchCount, setBatchCount] = useState<number>(5)
    const [activeBatchJobs, setActiveBatchJobs] = useState<any[]>([])
    const [isActionLoading, setIsActionLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' | 'error' } | null>(null)

    // --- UTILS ---
    const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 5000)
    }

    // --- FETCH ACTIVE BATCH JOBS (DB-backed) ---
    const fetchBatchJobs = async () => {
        const res = await getAdminBatchJobs();
        if (res.success && res.jobs) {
            setActiveBatchJobs(res.jobs);
            
            // Check completed jobs and update UI cached statuses dynamically
            const completedScenarioIds = res.jobs
                .filter((j: any) => j.status === 'completed' && j.payload?.scenario_id !== undefined)
                .map((j: any) => j.payload.scenario_id);
            
            if (completedScenarioIds.length > 0) {
                setScenarios(prev => prev.map(s => completedScenarioIds.includes(s.id) ? { ...s, isCached: true } : s));
            }
        }
    };

    // 🛡️ Supabase Realtime Listener + Periodic Poll Backup
    useEffect(() => {
        fetchBatchJobs();

        const channel = supabase
            .channel('admin_batch_jobs_realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'generation_jobs' },
                () => {
                    fetchBatchJobs();
                }
            )
            .subscribe();

        // 10s Polling fallback just in case
        const interval = setInterval(fetchBatchJobs, 10000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(interval);
        };
    }, []);

    // Determine current batch queue metrics
    const batchMetrics = useMemo(() => {
        const total = activeBatchJobs.length;
        const completed = activeBatchJobs.filter(j => j.status === 'completed').length;
        const running = activeBatchJobs.filter(j => 
            ['pending', 'processing_text', 'text_ready', 'generating_master', 'master_ready', 'processing', 'generating_audio', 'audio_ready'].includes(j.status)
        );
        const paused = activeBatchJobs.filter(j => j.status === 'paused');
        
        let status: 'idle' | 'running' | 'paused' = 'idle';
        if (running.length > 0) status = 'running';
        else if (paused.length > 0) status = 'paused';

        const activeJob = running[0] || null;

        return {
            total,
            completed,
            runningCount: running.length,
            pausedCount: paused.length,
            status,
            activeJob
        };
    }, [activeBatchJobs]);

    // Data Filtering
    const filteredScenarios = useMemo(() => {
        return scenarios.filter(s => {
            const langMatch = filter === 'all' || s.language === filter
            const statusMatch = statusFilter === 'all' || (statusFilter === 'ready' ? s.isCached : !s.isCached)
            const searchMatch = s.prompt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                s.characters.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
            return langMatch && statusMatch && searchMatch
        })
    }, [scenarios, filter, statusFilter, searchTerm])

    // --- QUEUE ACTIONS ---
    const handleStartBatch = async () => {
        setIsActionLoading(true);
        try {
            const res = await enqueueAdminBatch(scenarios, batchCount);
            if (res.success) {
                showToast(
                    lang === 'tr' 
                        ? `Toplu üretim sıraya alındı: ${res.count} adet taslak.` 
                        : `Batch production queued: ${res.count} drafts.`, 
                    'success'
                );
                await fetchBatchJobs();
            } else {
                showToast(res.error || 'Hata oluştu', 'error');
            }
        } catch (err: any) {
            showToast(err.message, 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handlePauseBatch = async () => {
        setIsActionLoading(true);
        try {
            const res = await pauseAdminBatch();
            if (res.success) {
                showToast(
                    lang === 'tr' 
                        ? `Sıradaki işler duraklatıldı (${res.count} adet).` 
                        : `Subsequent jobs paused (${res.count} items).`, 
                    'info'
                );
                await fetchBatchJobs();
            } else {
                showToast('Hata oluştu', 'error');
            }
        } catch (err: any) {
            showToast(err.message, 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleResumeBatch = async () => {
        setIsActionLoading(true);
        try {
            const res = await resumeAdminBatch();
            if (res.success) {
                showToast(
                    lang === 'tr' 
                        ? `Toplu üretim devam ettiriliyor (${res.count} iş aktif).` 
                        : `Batch production resumed (${res.count} jobs active).`, 
                    'success'
                );
                await fetchBatchJobs();
            } else {
                showToast('Hata oluştu', 'error');
            }
        } catch (err: any) {
            showToast(err.message, 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleStopBatch = async () => {
        setIsActionLoading(true);
        try {
            const res = await stopAdminBatch();
            if (res.success) {
                showToast(
                    lang === 'tr' 
                        ? `Toplu üretim durduruldu ve sıradaki tüm işler iptal edildi.` 
                        : `Batch production stopped and remaining jobs cancelled.`, 
                    'info'
                );
                await fetchBatchJobs();
            } else {
                showToast('Hata oluştu', 'error');
            }
        } catch (err: any) {
            showToast(err.message, 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    const getJobStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': 
                return <span className="px-2 py-0.5 bg-sky-100 text-sky-700 text-[10px] font-black rounded uppercase">PENDING</span>;
            case 'waiting_in_queue': 
                return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black rounded uppercase">QUEUED</span>;
            case 'paused': 
                return <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] font-black rounded uppercase">PAUSED</span>;
            case 'completed': 
                return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">COMPLETED</span>;
            case 'failed': 
                return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black rounded uppercase">FAILED</span>;
            case 'dismissed': 
                return <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] font-black rounded uppercase">CANCELLED</span>;
            default: 
                return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded uppercase">PROCESSING</span>;
        }
    };

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

            {/* 🏭 BATCH PRODUCTION CONTROL PANEL */}
            <div className="bg-gradient-to-br from-gray-900 to-slate-800 p-8 rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-yellow-400 rounded-xl text-black animate-pulse">
                                <Zap size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white font-lora">
                                {lang === 'tr' ? 'Sihirli Seri Üretim' : 'Magic Batch Production'}
                            </h2>
                        </div>
                        <p className="text-white/60 text-sm font-medium max-w-md leading-relaxed">
                            {lang === 'tr' 
                                ? 'Eksik taslakları veritabanı tabanlı kalıcı kuyrukta sırayla üretir. Sayfa yenilense dahi işlemler durmaz, güvenle devam eder.' 
                                : 'Produces missing drafts sequentially in a DB-backed persistent queue. Tasks persist and continue even if page is refreshed.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {batchMetrics.status === 'idle' && (
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                                <Layers size={18} className="text-white/40" />
                                <input 
                                    type="number" 
                                    value={batchCount}
                                    onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 0))}
                                    className="bg-transparent text-white font-black w-16 outline-none text-center"
                                    disabled={isActionLoading}
                                />
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{lang === 'tr' ? 'ADET' : 'PCS'}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {/* Start (or Resume) Button */}
                            {batchMetrics.status === 'idle' ? (
                                <button 
                                    onClick={handleStartBatch}
                                    disabled={isActionLoading || metrics.empty === 0}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-yellow-400 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                                >
                                    {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
                                    {lang === 'tr' ? 'BAŞLAT' : 'START'}
                                </button>
                            ) : batchMetrics.status === 'paused' ? (
                                <button 
                                    onClick={handleResumeBatch}
                                    disabled={isActionLoading}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                                >
                                    {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
                                    {lang === 'tr' ? 'DEVAM ET' : 'RESUME'}
                                </button>
                            ) : (
                                <button 
                                    onClick={handlePauseBatch}
                                    disabled={isActionLoading}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-black hover:bg-amber-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                                >
                                    {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <Pause size={18} />}
                                    {lang === 'tr' ? 'DURAKLAT' : 'PAUSE'}
                                </button>
                            )}

                            {/* Stop Button */}
                            {batchMetrics.status !== 'idle' && (
                                <button 
                                    onClick={handleStopBatch}
                                    disabled={isActionLoading}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white hover:bg-red-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                                >
                                    {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <StopCircle size={18} />}
                                    {lang === 'tr' ? 'DURDUR' : 'STOP'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🔄 LIVE BATCH PROGRESS BAR */}
                <AnimatePresence>
                    {batchMetrics.status !== 'idle' && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6"
                        >
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                                        {lang === 'tr' ? 'Kuyruk İlerleme Durumu' : 'Persistent Queue Progress'}
                                    </p>
                                    <h3 className="text-3xl font-black text-white flex items-center gap-3">
                                        {batchMetrics.completed} <span className="text-white/20">/</span> {batchMetrics.total}
                                        {batchMetrics.status === 'paused' && (
                                            <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full font-black uppercase tracking-wider">{lang === 'tr' ? 'DURAKLATILDI' : 'PAUSED'}</span>
                                        )}
                                    </h3>
                                </div>

                                {batchMetrics.activeJob && (
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                                            <Activity size={14} className="animate-pulse" />
                                            <span>{batchMetrics.activeJob.progress}%</span>
                                        </div>
                                        <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">
                                            {lang === 'tr' ? 'AKTİF İŞ TAMAMLANIYOR' : 'PROCESSING CURRENT JOB'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Global Progress Bar */}
                            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div 
                                    className={`h-full ${batchMetrics.status === 'paused' ? 'bg-gray-500' : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(batchMetrics.completed / batchMetrics.total) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 📋 PERSISTENT QUEUE DETAILS LIST */}
            {activeBatchJobs.length > 0 && (
                <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-gray-900 font-black text-lg mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-sky-600" />
                        {lang === 'tr' ? 'Kuyruk Detayları (Kalıcı Liste)' : 'Queue Details (Persistent List)'}
                    </h3>
                    <div className="max-h-[300px] overflow-y-auto space-y-3 custom-scrollbar">
                        {activeBatchJobs.map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        <Clock size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 line-clamp-1 max-w-[300px]">
                                            {job.payload?.originalPrompt || job.payload?.theme?.split('.')[0] || 'Batch Story'}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">
                                            ID: {job.id.substring(0, 8)}... | {job.payload?.hero?.split(',')[0]}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getJobStatusBadge(job.status)}
                                    <span className="text-xs font-black text-gray-700">{job.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-sky-50 text-sky-600 rounded-2xl"><Layers size={24} /></div>
                    <div>
                        <p className="text-2xl font-black text-gray-900">{metrics.total}</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('admin.stats.cache_total')}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-100 flex items-center gap-5">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle size={24} /></div>
                    <div>
                        <p className="text-2xl font-black text-emerald-600">{metrics.full}</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('admin.stats.cache_full')}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-100 flex items-center gap-5">
                    <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Database size={24} /></div>
                    <div>
                        <p className="text-2xl font-black text-orange-600">{metrics.empty}</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('admin.stats.cache_empty')}</p>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between bg-white gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 font-lora">{t('admin.cache.title')}</h2>
                            <p className="text-gray-500 text-sm font-medium">{t('admin.cache.desc')}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Status Filter */}
                        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner">
                            <button 
                                onClick={() => setStatusFilter('all')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('admin.cache.status_all')}
                            </button>
                            <button 
                                onClick={() => setStatusFilter('ready')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === 'ready' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('admin.cache.status_full')}
                            </button>
                            <button 
                                onClick={() => setStatusFilter('missing')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === 'missing' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('admin.cache.status_missing')}
                            </button>
                        </div>

                        {/* Language Filter */}
                        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner">
                            <button 
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('admin.cache.filter_all')}
                            </button>
                            <button 
                                onClick={() => setFilter('tr')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'tr' ? 'bg-[#84B1D9] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('admin.cache.filter_tr')}
                            </button>
                            <button 
                                onClick={() => setFilter('en')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'en' ? 'bg-[#84B1D9] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('admin.cache.filter_en')}
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder={t('admin.cache.search_placeholder')} 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-48 pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-orange-200 focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5">TASLAK VE KARAKTERLER</th>
                                <th className="px-8 py-5">TÜR</th>
                                <th className="px-8 py-5">DİL</th>
                                <th className="px-8 py-5 text-right">DURUM</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredScenarios.map((s) => {
                                return (
                                    <tr key={s.id} className="transition group hover:bg-gray-50/30">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-gray-900 line-clamp-1 max-w-md">{s.prompt}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                <p className="text-[10px] text-gray-400 font-medium">{s.characters.join(', ')}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                {t(`library.genres.${s.genre.toLowerCase()}`) === `library.genres.${s.genre.toLowerCase()}` ? s.genre : t(`library.genres.${s.genre.toLowerCase()}`)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-gray-500">
                                            {s.language === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            {s.isCached ? (
                                                <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                                    <CheckCircle size={16} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('admin.cache.status_ready')}</span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-orange-500 bg-orange-50 border-orange-100">
                                                    <XCircle size={16} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('admin.cache.status_missing_label')}</span>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
