'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Music, Lock, Download } from 'lucide-react'
import { incrementDownloadAction } from '@/app/actions/downloadAction'
import { useLanguage } from '@/context/LanguageContext'

interface PodcastDownloadButtonProps {
    storyId: string;
    audioUrl: string;
    title: string;
    currentDownloads: number;
    limit: number;
    planId: string;
}

export default function PodcastDownloadButton({ 
    storyId, 
    audioUrl, 
    title, 
    currentDownloads, 
    limit,
    planId
}: PodcastDownloadButtonProps) {
    const { t, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const isFree = planId === 'free' || !planId;
    const remaining = Math.max(0, limit - currentDownloads);

    const handleDownload = async (e: React.MouseEvent) => {
        if (isFree) {
            e.preventDefault();
            toast.warning(t('story.podcast.upgrade_desc'));
            return;
        }

        if (remaining <= 0) {
            e.preventDefault();
            toast.warning(`${t('story.podcast.limit_reached')} (${currentDownloads}/${limit}). ${t('story.podcast.upgrade_desc')}`);
            return;
        }

        setIsLoading(true);
        const res = await incrementDownloadAction(storyId);
        
        if (res.success) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `${title}.mp3`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            const remainingMsg = language === 'tr' ? 'İndirme başlatıldı! Kalan hakkınız: ' : 'Download started! Remaining credits: ';
            toast.success(remainingMsg + (limit - res.newCount!));
            window.location.reload();
        } else {
            toast.error(res.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleDownload}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold shadow-md transition-all text-sm relative ${
                    isFree 
                    ? 'bg-slate-400 text-white cursor-not-allowed' 
                    : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
                }`}
            >
                {isFree ? <Lock size={16} /> : <Music size={16} />}
                {t('story.podcast.download')}
                
                {!isFree && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 text-[10px] px-2 py-0.5 rounded-full border-2 border-white shadow-sm font-black animate-bounce group-hover:animate-none">
                        {remaining} {t('story.podcast.remaining')}
                    </span>
                )}
            </button>
            
            {isLoading && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
