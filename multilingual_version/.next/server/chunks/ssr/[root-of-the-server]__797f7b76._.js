module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/multilingual_version/utils/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://anxxcbbfhzwpwarywcbv.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHhjYmJmaHp3cHdhcnl3Y2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODIzNzEsImV4cCI6MjA5Mjk1ODM3MX0.3azrydf3lrWSoxpf-0BJqUNnsZAEXWKDqnSGd3Cpr4s"));
}
}),
"[project]/multilingual_version/context/AudioPlayerContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioPlayerProvider",
    ()=>AudioPlayerProvider,
    "useAudioPlayer",
    ()=>useAudioPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AudioPlayerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AudioPlayerProvider({ children }) {
    const [currentTrack, setCurrentTrack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPlayerVisible, setIsPlayerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [queue, setQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('background');
    const [userPlan, setUserPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('free');
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchUserPlan = async ()=>{
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: sub } = await supabase.from('subscriptions').select('plan_id').eq('user_id', user.id).maybeSingle();
                setUserPlan(sub?.plan_id || 'free');
            }
        };
        fetchUserPlan();
    }, [
        supabase
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = ()=>{
            setProgress(audio.currentTime);
        };
        const handleLoadedMetadata = ()=>{
            setDuration(audio.duration);
        };
        const handleEnded = ()=>{
            playNext();
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        return ()=>{
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [
        currentTrack,
        queue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch((e)=>{
                    console.warn('Audio play blocked by browser:', e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [
        isPlaying,
        currentTrack
    ]);
    const playTrack = (track)=>{
        if (currentTrack?.id === track.id) {
            setIsPlayerVisible(true);
            setIsPlaying(true);
            return;
        }
        setCurrentTrack(track);
        setIsPlayerVisible(true);
        setIsPlaying(true);
        setProgress(0);
    };
    const addToQueue = (track)=>{
        const limit = userPlan === 'premium' ? 15 : userPlan === 'pro' ? 5 : 0;
        if (limit === 0) {
            alert("Sihirli Dinleme Listesi özelliği sadece Gümüş Gökyüzü ve Altın Güneş paketlerinde mevcuttur. Lütfen paketini yükselt!");
            return;
        }
        if (!currentTrack) {
            playTrack(track);
        } else {
            setQueue((prev)=>{
                if (prev.find((i)=>i.id === track.id)) return prev;
                if (prev.length >= limit) {
                    alert(`Sihirli Dinleme Listesi sınırına ulaştın! ${userPlan === 'pro' ? 'Gümüş' : 'Altın'} paket limitin ${limit} masaldır.`);
                    return prev;
                }
                return [
                    ...prev,
                    track
                ];
            });
        }
    };
    const removeFromQueue = (id)=>{
        setQueue((prev)=>prev.filter((item)=>item.id !== id));
    };
    const playNext = ()=>{
        if (queue.length > 0) {
            const nextTrack = queue[0];
            setQueue((prev)=>prev.slice(1));
            setCurrentTrack(nextTrack);
            setIsPlaying(true);
            setProgress(0);
            // 🚀 OTOMATİK NAVİGASYON (Premium Akış)
            // Eğer kullanıcı kitap okuyucusu veya tam ekrandaysa, yeni kitaba otomatik git
            if (viewMode === 'reader' || viewMode === 'fullscreen') {
                router.push(`/story/${nextTrack.id}`);
            }
        } else {
            setIsPlaying(false);
            setCurrentTrack(null);
            // Kuyruk bittiyse ve okuyucudaysak arka plana dön
            if (viewMode !== 'background') setViewMode('background');
        }
    };
    const togglePlay = ()=>{
        if (currentTrack) {
            setIsPlaying(!isPlaying);
        }
    };
    const seekTo = (percentage)=>{
        if (audioRef.current && duration) {
            const newTime = percentage / 100 * duration;
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        }
    };
    const skipForward = ()=>{
        if (audioRef.current && duration) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
        }
    };
    const skipBackward = ()=>{
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
        }
    };
    const closePlayer = ()=>{
        setIsPlayerVisible(false);
        setIsPlaying(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AudioPlayerContext.Provider, {
        value: {
            currentTrack,
            isPlaying,
            progress,
            duration,
            isPlayerVisible,
            queue,
            playTrack,
            addToQueue,
            removeFromQueue,
            playNext,
            togglePlay,
            seekTo,
            closePlayer,
            skipForward,
            skipBackward,
            audioRef,
            viewMode,
            setViewMode
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef,
                src: currentTrack?.audioUrl,
                preload: "metadata"
            }, void 0, false, {
                fileName: "[project]/multilingual_version/context/AudioPlayerContext.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multilingual_version/context/AudioPlayerContext.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
function useAudioPlayer() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AudioPlayerContext);
    if (context === undefined) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
}
}),
"[project]/multilingual_version/components/GlobalAudioPlayer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalAudioPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$AudioPlayerContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/context/AudioPlayerContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/play.mjs [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/pause.mjs [app-ssr] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rewind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rewind$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/rewind.mjs [app-ssr] (ecmascript) <export default as Rewind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fast$2d$forward$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FastForward$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/fast-forward.mjs [app-ssr] (ecmascript) <export default as FastForward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/music.mjs [app-ssr] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListMusic$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/list-music.mjs [app-ssr] (ecmascript) <export default as ListMusic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/trash-2.mjs [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function GlobalAudioPlayer() {
    const { currentTrack, isPlaying, progress, duration, isPlayerVisible, queue, togglePlay, closePlayer, skipForward, skipBackward, seekTo, playNext, removeFromQueue, setViewMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$AudioPlayerContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAudioPlayer"])();
    const [showQueue, setShowQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!isPlayerVisible || !currentTrack) return null;
    const formatTime = (time)=>{
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    const progressPercentage = duration ? progress / duration * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed bottom-6 right-6 z-50 w-80 bg-[#081826] rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in ${showQueue ? 'h-[30rem]' : 'h-auto'}`,
        children: [
            showQueue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-40 bg-[#081826] flex flex-col animate-in slide-in-from-top-full duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 border-b border-white/5 flex justify-between items-center bg-[#052159]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-white font-bold text-xs flex items-center gap-2 uppercase tracking-widest",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListMusic$3e$__["ListMusic"], {
                                        size: 16,
                                        className: "text-sky-400"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    " Masal Kuyruğu"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowQueue(false),
                                className: "text-white/60 hover:text-white transition p-1 hover:bg-white/10 rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar",
                        children: queue.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full flex flex-col items-center justify-center text-gray-500 text-[11px] p-10 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                        size: 32,
                                        className: "opacity-20"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 46,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this),
                                "Sıranız henüz boş.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 48,
                                    columnNumber: 35
                                }, this),
                                "Kütüphaneden masal ekleyerek devamlılığı sağlayabilirsiniz."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                            lineNumber: 44,
                            columnNumber: 15
                        }, this) : queue.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition group border border-transparent hover:border-sky-500/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.imageUrl,
                                        className: "w-11 h-11 rounded-xl object-cover shadow-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white text-[11px] font-bold truncate leading-tight mb-1",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                                lineNumber: 55,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-sky-400 font-semibold flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-1 bg-sky-400 rounded-full animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 23
                                                    }, this),
                                                    " Sıradaki"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                                lineNumber: 56,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 54,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeFromQueue(item.id),
                                        className: "p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-400/10 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                            lineNumber: 64,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 60,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 52,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[#081826] border-t border-white/5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowQueue(false),
                            className: "w-full py-3 bg-[#052159] hover:bg-[#072a73] text-white text-[11px] font-bold rounded-2xl transition-all border border-white/5 shadow-lg active:scale-[0.98]",
                            children: "Oynatıcıya Dön"
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-52 w-full group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: currentTrack.imageUrl,
                        alt: currentTrack.title,
                        className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-[#081826] via-[#081826]/40 to-black/30"
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 left-4 right-4 flex justify-between items-start z-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#052159]/80 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this),
                                            " Canlı Dinletisi"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    queue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-sky-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-lg animate-bounce w-fit",
                                        children: [
                                            "SIRADA ",
                                            queue.length,
                                            " MASAL"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowQueue(!showQueue),
                                        className: `p-2 ${showQueue ? 'bg-sky-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-xl backdrop-blur-md transition-all border border-white/10 shadow-lg`,
                                        title: "Sırayı Göster",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListMusic$3e$__["ListMusic"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: closePlayer,
                                        className: "p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all border border-white/10 shadow-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center gap-5 pt-4 pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: skipBackward,
                                className: "text-white/60 hover:text-white transition-all active:scale-90 pointer-events-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rewind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rewind$3e$__["Rewind"], {
                                    size: 24,
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: togglePlay,
                                className: "w-14 h-14 bg-sky-500 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all transform hover:scale-110 active:scale-90 border-4 border-[#081826] pointer-events-auto",
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                    size: 28,
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 123,
                                    columnNumber: 26
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    size: 28,
                                    fill: "currentColor",
                                    className: "ml-1"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 123,
                                    columnNumber: 68
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: queue.length > 0 ? playNext : skipForward,
                                className: "text-white/60 hover:text-white transition-all active:scale-90 pointer-events-auto group/skip relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fast$2d$forward$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FastForward$3e$__["FastForward"], {
                                        size: 24,
                                        fill: "currentColor"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    queue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full border-2 border-[#081826] animate-ping"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white text-[10px] font-black z-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-8 text-right tabular-nums",
                                children: formatTime(progress)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 relative h-6 group/slider cursor-pointer flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "0",
                                        max: "100",
                                        value: progressPercentage || 0,
                                        onChange: (e)=>seekTo(Number(e.target.value)),
                                        className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 141,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-gradient-to-r from-sky-400 to-sky-300 rounded-full transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(56,189,248,0.8)]",
                                            style: {
                                                width: `${progressPercentage}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 149,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute w-3 h-3 bg-white rounded-full shadow-lg border-2 border-sky-500 transition-all duration-100 opacity-0 group-hover/slider:opacity-100",
                                        style: {
                                            left: `calc(${progressPercentage}% - 6px)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 156,
                                        columnNumber: 14
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-8 tabular-nums",
                                children: formatTime(duration)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 bg-gradient-to-b from-[#081826] to-[#040d14]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-black text-white text-[14px] line-clamp-1 mb-0.5 tracking-tight",
                                        children: currentTrack.title
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-sky-400/80 font-bold uppercase tracking-widest flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 bg-sky-400 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            " ŞU AN ÇALIYOR"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/story/${currentTrack.id}`,
                                onClick: ()=>setViewMode('reader'),
                                className: "text-white/40 hover:text-sky-400 transition-colors p-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 p-3 rounded-[1rem] border border-white/5 flex items-center gap-3 group/info hover:bg-white/10 transition-all cursor-default",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-12 h-9 shrink-0 overflow-hidden rounded-lg shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: currentTrack.imageUrl,
                                    alt: "Thumbnail",
                                    className: "w-full h-full object-cover transition-transform group-hover/info:scale-110"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 186,
                                    columnNumber: 14
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-gray-400 font-medium leading-tight line-clamp-2",
                                    children: isPlaying ? 'Hikaye tüm hızıyla devam ediyor...' : 'Masalın devamı için oynatın.'
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multilingual_version/components/GlobalAudioPlayer.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/multilingual_version/locales/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"navbar\":{\"pricing\":\"Pricing\",\"how_it_works\":\"How It Works\",\"library\":\"Magic Library\",\"parent_panel\":\"Parent Panel\",\"logout\":\"Logout\",\"login\":\"Login\",\"return_home\":\"Return Home\",\"admin\":\"Admin\",\"lang_tr\":\"Türkçe\",\"lang_en\":\"English\"},\"hero\":{\"title\":\"Write the Tales of Your Dreams Together\",\"description\":\"Choose your child's name, favorite character, and theme. Let AI handle the rest. Create illustrated, narrated bedtime adventures just for them.\",\"cta_primary\":\"Start Creating Tales\",\"cta_secondary\":\"Subscription Plans\"},\"features\":{\"safe\":\"Safe and Ad-Free\",\"pedagogical\":\"Pedagogical Filters\",\"happy_families\":\"Hundreds of Happy Families\"},\"landing\":{\"form_subtitle\":\"✨ Take the First Step Together\",\"form_title\":\"You Define the Adventure\",\"form_description\":\"Guide your hero with just a few words, leave the rest to us.\",\"features_badge\":\"MyStory Privileges\",\"features_title\":\"Wake Up to a New World Every Night\",\"features_subtitle\":\"The most reliable toolkit that feeds your child's imagination with advanced technologies.\",\"feat1_title\":\"Visual Feast and Narration\",\"feat1_desc\":\"High-quality images created specifically for each page and studio-quality narrations.\",\"feat1_bullet1\":\"Different drawing styles\",\"feat1_bullet2\":\"Professional narrator\",\"feat2_title\":\"From Your Voice to Dreams\",\"feat2_desc\":\"Introduce your own voice to the system and let all stories be read in your voice.\",\"feat2_bullet1\":\"Premium: Voice Cloning\",\"feat2_bullet2\":\"Always make them feel you're there\",\"feat3_title\":\"Infinite Adventure, Same Hero\",\"feat3_desc\":\"Save your own characters to your library and let them play in different tales.\",\"feat3_bullet1\":\"Character library\",\"feat3_bullet2\":\"Visual consistency\",\"feat4_title\":\"Values Education and Safety\",\"feat4_desc\":\"Make lessons like friendship, honesty, or sharing the main idea of the tale.\",\"feat4_bullet1\":\"Educational Mode option\",\"feat4_bullet2\":\"Age-appropriate content\",\"footer\":\"© 2026 MyStory. A world of tales that brightens your child's dreams.\"},\"voices\":{\"select\":\"Select Voice\",\"silent\":\"Silent\",\"grandpa\":{\"name\":\"Wise Grandpa\",\"desc\":\"Deep, wise, and reassuring\"},\"rabbit\":{\"name\":\"Traveler Rabbit\",\"desc\":\"Cheerful and energetic\"},\"knight\":{\"name\":\"Brave Knight\",\"desc\":\"Strong and heroic\"},\"king\":{\"name\":\"Grand King\",\"desc\":\"Authoritative and honorable\"},\"dad\":{\"name\":\"Excited Dad\",\"desc\":\"Loves surprises and playful\"},\"guardian\":{\"name\":\"Forest Guardian\",\"desc\":\"A deep and protective voice\"},\"mother\":{\"name\":\"Wise Mother\",\"desc\":\"Most compassionate and peaceful\"},\"woman\":{\"name\":\"Storyteller Woman\",\"desc\":\"Fluent and intriguing\"},\"fairy_serenity\":{\"name\":\"Serenity Fairy\",\"desc\":\"Soft and calming\"},\"fairy_magic\":{\"name\":\"Magic Fairy\",\"desc\":\"Young, fresh, and magical\"},\"princess\":{\"name\":\"Mysterious Princess\",\"desc\":\"Elegant, mystic, and noble\"},\"rainbow_girl\":{\"name\":\"Rainbow Girl\",\"desc\":\"Vibrant, cheerful, and colorful\"}},\"pricing\":{\"hero_title\":\"Subscribe and Save\",\"hero_subtitle\":\"An overview of MyStory AI subscription plans. Help your children create magic stories with AI.\",\"monthly\":\"/ Month\",\"most_popular\":\"Most Popular\",\"secure_payment\":\"Secure payment via Stripe\",\"cards_accepted\":\"Cards, digital wallets are accepted.\",\"cancel_anytime\":\"You can cancel anytime. No hidden fees.\",\"trust_text\":\"Join over 11,030 happy parents and educators.\",\"stripe_powered\":\"Powered by Stripe.\",\"encryption\":\"256-bit SSL encryption\",\"instant_cancel\":\"Instant Cancel Option\",\"features\":{\"request_limit\":\"Request Limit\",\"chapter_count\":\"Chapter Count\",\"story_length\":\"Story Length\",\"magic_shuffles\":\"Magic Drafts\",\"continue_adventure\":\"Continue Adventure\",\"listening_list\":\"Magic Listening List\",\"character_memory\":\"Hero Memory\",\"smart_transitions\":\"Smart Adventure Transition\",\"magic_library\":\"Magic Library\",\"write_own\":\"Write Your Own Story\",\"story_limit\":\"Story Limit\",\"genre_selection\":\"Genre Selection\",\"archive\":\"Story Archive\",\"library_access\":\"Library Access\",\"parent_panel\":\"Parent Panel\",\"audio_stories\":\"Audio Stories\",\"voice_cloning\":\"Voice Cloning\",\"voice_models\":\"Voice Models\",\"narration\":\"Story Narration\",\"license\":\"Publishing License\",\"podcast_output\":\"Podcast Output\",\"ebook_creation\":\"E-Book Creation\"},\"values\":{\"off\":\"Off\",\"on\":\"Included\",\"none\":\"None\",\"standard\":\"Standard\",\"advanced\":\"Advanced\",\"full\":\"Full Access\",\"text_only\":\"Text Only\",\"audio_text\":\"Audio + Text\",\"unlocked\":\"Unlocked\"},\"plans\":{\"free\":{\"name\":\"Cotton Cloud\",\"desc\":\"For little dreamers just starting out.\",\"button\":\"Start Now\"},\"pro\":{\"name\":\"Silver Sky\",\"desc\":\"For those who want more adventure and voice cloning.\",\"button\":\"Subscribe and Save\"},\"premium\":{\"name\":\"Golden Sun\",\"desc\":\"Infinite imagination and the highest quality.\",\"button\":\"Subscribe Now\"}}},\"library\":{\"title\":\"Magic Library\",\"subtitle\":\"Your special collection of unique adventures created with your imagination.\",\"no_stories\":\"No tales in this category yet.\",\"create_now\":\"Create a new one now!\",\"read_now\":\"Read Now →\",\"default_preview\":\"A magical adventure awaits you...\",\"footer_slogan\":\"A world growing with your imagination\",\"age_suffix\":\"Years\",\"genres\":{\"all\":\"All\",\"tale\":\"Tale\",\"sci_fi\":\"Sci-Fi\",\"adventure\":\"Adventure\",\"fantasy\":\"Fantasy\",\"fable\":\"Fable\"}},\"form\":{\"tabs\":{\"normal\":\"Normal Stories\",\"educational\":\"Educational Tales\",\"continue\":\"Continue Adventure\"},\"placeholders\":{\"subscribe_to_write\":\"Subscribe to write your own tale. For now, you can press the dice icon to produce a surprise story.\",\"manual_limit_reached\":\"Your unique story limit reached! Please try drafts.\",\"audio_limit_reached\":\"Your audio story limit reached! You can only produce 'Silent' tales.\",\"prompt_normal\":\"Write me a story about...\",\"prompt_educational\":\"What would you like to teach your child? E.g.: Ayşe learning to brush her teeth...\",\"continue_story_search\":\"Which Heroes Do You Want to Continue With?\"},\"sections\":{\"voice\":\"Voice\",\"genre\":\"Genre\",\"style\":\"Art Style\",\"age\":\"Age Group\",\"characters\":\"Characters\",\"educational_value\":\"Value to Teach\",\"heroes_connected\":\"Heroes Connected\",\"select_value\":\"Select Value\",\"select_genre\":\"Select Genre\",\"select_style\":\"Select Style\",\"select_age\":\"Select Age\"},\"buttons\":{\"select_voice\":\"Select Voice\",\"generate\":\"Create Tale ✨\",\"randomize\":\"Make a Surprise Choice\",\"edit\":\"Edit\",\"add_character\":\"Add Character\",\"cloning_voice\":\"Cloning Voice...\",\"clone_save\":\"Clone Voice and Save\"},\"messages\":{\"educational_error\":\"You must have a Silver Sky or Golden Sun plan for Educational mode.\",\"shuffle_limit\":\"Draft limit reached\",\"shuffle_audio_limit\":\"Audio limit for drafts reached\",\"try_shuffles\":\"Try the drafts! ✨\",\"empty_prompt\":\"Please do not leave the story topic empty.\",\"no_voice\":\"Please select a voice to narrate the story.\",\"no_genre\":\"Please select a tale genre.\",\"no_style\":\"Please select an art style.\",\"no_age\":\"Please select an age group.\",\"no_educational\":\"Please select a value to teach.\",\"no_characters\":\"Please add at least one character.\",\"max_characters_error\":\"You can add a maximum of 3 characters.\",\"error_generic\":\"An unknown error occurred.\",\"voice_limit\":\"You must have a Golden Sun plan to clone your own voice.\",\"voice_clone_success\":\"Voice added successfully! We can now read tales in your voice.\",\"file_too_large\":\"File size too large (Max 10MB)\",\"cloning_error\":\"Voice cloning error\"},\"prompt_template\":{\"in_style\":\"in style\",\"topic\":\"Topic\",\"style\":\"Art Style\",\"voice\":\"Voice Selection\",\"characters\":\"Characters\",\"educational_value\":\"Educational Value\",\"continuation\":\"THIS IS A CONTINUATION STORY. Write a new adventure based on the characters and plot of the previous story.\"}},\"parent\":{\"title\":\"Parent Control Panel\",\"subtitle\":\"Manage your children's world of tales from here.\",\"stats_title\":\"Monthly Statistics\",\"archived_stories\":\"Archived Tales\",\"magic_shuffles\":\"Magic Drafts\",\"custom_stories\":\"Custom Stories\",\"custom_audio\":\"Custom Audio Tales\",\"continue_adventure\":\"Continue Adventure\",\"quick_create_title\":\"Create New Tale!\",\"quick_create_desc\":\"Start now to create a new AI-powered adventure.\",\"library_title\":\"Old Tales Library\",\"no_stories\":\"You haven't created any tales yet.\",\"total_remaining\":\"Total Remaining\",\"library_link\":\"You can select older stories from the library →\",\"upgrade_banner\":{\"title_pro\":\"Upgrade to Golden Sun! 👑\",\"title_free\":\"Go Premium!\",\"desc\":\"Narrate stories yourself by cloning your own voice.\",\"button\":\"Upgrade\"}},\"story\":{\"not_found\":\"Tale not found\",\"back_to_library\":\"Back to Library\",\"back_to_parent\":\"Back to Dashboard\",\"start_new_adventure\":\"Start New Adventure\",\"created_for_you\":\"🌟 This tale was created especially for you · MyStory\",\"audio_banner\":{\"title\":\"Magical Audio Recording Available!\",\"desc\":\"Listen to this tale now with smooth narration.\",\"add_to_queue\":\"Add to Queue\",\"added\":\"Added to Queue\",\"in_queue\":\"In Queue\",\"play_now\":\"Listen Now\",\"playing\":\"Now Playing...\"},\"download_pdf\":{\"button\":\"Download Book\",\"preparing\":\"Preparing PDF...\",\"ready\":\"Preparing...\",\"filename_suffix\":\"Book\"},\"podcast\":{\"download\":\"Download Podcast\",\"remaining\":\"Remaining\",\"limit_reached\":\"Download Limit Reached\",\"upgrade_required\":\"Premium Feature\",\"upgrade_desc\":\"Upgrade your plan to download podcasts.\"}},\"how_it_works\":{\"title\":\"How Does the Magic Happen?\",\"subtitle\":\"In just three steps, let's build together that unique bedtime world where your child is the star.\",\"step1_title\":\"Scatter the Seeds of Imagination\",\"step1_desc\":\"Choose your child's name, favorite characters, and where the adventure will take place. Describe your dream world in just a few words.\",\"step2_title\":\"Touch the Magic Wand\",\"step2_desc\":\"Our AI magic transforms your choices into a unique, pedagogical, and immersive tale adventure in seconds.\",\"step3_title\":\"Wake Up to the World of Tales\",\"step3_desc\":\"Your illustrated and narrated tale is ready! Read it together or let them listen in your own voice. A new discovery awaits you every night.\",\"badge_safe\":\"✨ Magical and Safe\",\"badge_custom\":\"🎨 Customizable\",\"cta_title\":\"Ready for a Magical Adventure?\",\"cta_desc\":\"Let's explore your child's imagination together. Creating your first tale will only take a few seconds.\",\"badge_safe_text\":\"Safe and Ad-Free\",\"badge_custom_text\":\"Pedagogical Filters\",\"cta_button\":\"Create Tale Now\",\"footer_copy\":\"© 2026 MyStory. All rights reserved.\"},\"admin\":{\"title\":\"Command & Control Center\",\"subtitle\":\"Track all system-wide activities from here.\",\"return_site\":\"Return to Site\",\"stats\":{\"gross_revenue\":\"Gross Revenue\",\"net_revenue\":\"Excl. Commission\",\"total_stories\":\"Total Tales\",\"active_subscriptions\":\"Active Subscriptions\",\"total_users\":\"Total Users\",\"cache_total\":\"Total Drafts\",\"cache_full\":\"Full (Cache)\",\"cache_empty\":\"Missing (Empty)\"},\"tables\":{\"recent_stories\":\"Recent Stories\",\"user\":\"User\",\"story_title\":\"Story Title\",\"date\":\"Date\",\"action\":\"Action\",\"unknown\":\"Unknown\",\"page\":\"Page\",\"prev\":\"Previous\",\"next\":\"Next\"},\"logs\":{\"title\":\"System Error Logs (Live)\",\"location\":\"Location\",\"message\":\"Error Message\",\"anonymous\":\"Anonymous\",\"empty\":\"No error records yet. System clean! ✨\"},\"cache\":{\"title\":\"Magic Drafts (Cache) Status\",\"desc\":\"Fill the missing ones sequentially with automatic queue.\",\"optimize\":\"Optimize System\",\"fixing\":\"Fixing...\",\"fill_missing\":\"Auto Fill Missing\",\"search_placeholder\":\"Search in drafts...\",\"filter_all\":\"ALL\",\"filter_tr\":\"TR\",\"filter_en\":\"EN\",\"status_all\":\"ALL\",\"status_full\":\"FULL\",\"status_missing\":\"EMPTY\",\"table_theme\":\"Scenario Topic\",\"table_genre\":\"Genre\",\"table_lang\":\"Lang\",\"table_status\":\"Status\",\"status_ready\":\"READY\",\"status_generating\":\"GENERATING...\",\"status_missing_label\":\"MISSING\"},\"crm\":{\"title\":\"User Management (CRM)\",\"search_placeholder\":\"Search user by email...\",\"bonus_quota\":\"Bonus Quota\",\"status\":\"Status\",\"actions\":\"Actions\",\"magic_draft\":\"Magic Draft\",\"suspended\":\"Suspended\",\"active\":\"Active\",\"add_5\":\"+5 Drafts\",\"add_10\":\"+10 Drafts\",\"activate\":\"Activate\",\"suspend\":\"Suspend\",\"not_found\":\"User not found.\"},\"switches\":{\"title\":\"System Switches (Feature Flags)\",\"maintenance_mode\":\"Maintenance Mode\",\"maintenance_desc\":\"When activated, all users except admins are redirected to the 'Maintenance' page.\",\"system_locked\":\"System Currently Locked\",\"voice_cloning\":\"Voice Cloning Feature\",\"voice_cloning_desc\":\"Enables or disables the feature for users to upload their own voices and have stories read.\",\"feature_disabled\":\"Feature Disabled\"},\"messages\":{\"cache_full\":\"All drafts are already full! ✨\",\"error\":\"Error:\",\"queue_started\":\"Queue started. Please do not close this page until operations are finished.\",\"queue_completed\":\"All productions completed successfully! 🚀\",\"migration_confirm\":\"Stories produced in old format will be made compatible with the new system. Do you confirm?\",\"migration_success\":\"old records successfully updated!\",\"confirm_title\":\"Confirmation Required\",\"confirm_desc\":\"Total {count} missing drafts found. These drafts will be produced sequentially via Google Vertex AI. It is recommended not to close the page during the process.\",\"confirm_start\":\"Yes, Start Queue\",\"confirm_cancel\":\"Cancel\",\"quota_success\":\"Great! +{amount} new 'Magic Draft' ✨ credits successfully assigned to user.\",\"suspend_success\":\"User account suspended. 🚫\",\"activate_success\":\"User account reactivated. ✅\"}},\"settings\":{\"title\":\"Account Settings\",\"back_to_library\":\"Back to Library\",\"subscription_details\":\"Subscription Details\",\"current_plan\":\"Current Plan\",\"status\":\"Subscription Status\",\"status_active\":\"● Active\",\"status_passive\":\"○ Passive\",\"start_date\":\"Start Date\",\"next_renewal\":\"Next Renewal\",\"end_date\":\"End Date\",\"auto_pay_active\":\"Auto-Pay Active\",\"auto_pay_desc\":\"Your subscription will be automatically charged from your card on the renewal date.\",\"manage_payment\":\"Manage Payment Method\",\"loading\":\"Loading...\",\"upgrade_title\":\"Upgrade Your Package\",\"support_title\":\"Need Support?\",\"support_desc\":\"Contact us for any questions regarding subscriptions or payments.\",\"plans\":{\"premium\":\"Golden Sun 👑\",\"pro\":\"Silver Sky ☁️\",\"free\":\"Cotton Cloud (Free) ☁️\"},\"messages\":{\"checkout_error\":\"Could not redirect to payment page.\",\"portal_error\":\"Could not open portal.\",\"portal_unavailable\":\"Subscription management page currently unavailable.\"}},\"auth\":{\"login\":{\"welcome\":\"Welcome\",\"subtitle\":\"Log in to continue.\",\"google_button\":\"Continue with Google\",\"or\":\"OR\",\"email_label\":\"Email Address\",\"email_placeholder\":\"example@mail.com\",\"password_label\":\"Password\",\"forgot_password\":\"Forgot Password?\",\"button_loading\":\"Logging in...\",\"button\":\"Log In\",\"no_account\":\"Don't have an account?\",\"register_now\":\"Register Now\"},\"register\":{\"title\":\"Create Account\",\"subtitle\":\"Start creating magical tales for your child.\",\"google_button\":\"Continue with Google\",\"or\":\"OR\",\"success_title\":\"Registration Successful!\",\"success_desc\":\"Please click the verification link sent to your email address to activate your account.\",\"success_button\":\"Log In\",\"email_label\":\"Email Address\",\"email_placeholder\":\"example@mail.com\",\"password_label\":\"Password\",\"password_placeholder\":\"At least 6 characters\",\"lang_label\":\"App Language\",\"button_loading\":\"Registering...\",\"button\":\"Register\",\"has_account\":\"Already have an account?\",\"login_now\":\"Log In\"}},\"checkout\":{\"checking_status\":\"Checking Session\",\"checking_desc\":\"Please wait, we're bringing you to wonderful tales...\",\"redirecting_status\":\"Preparing Payment\",\"redirecting_desc\":\"You are being redirected to the secure payment page. Please do not close the page.\",\"error_title\":\"An Error Occurred\",\"error_desc\":\"Payment session could not be started. Please check your internet connection and try again.\",\"retry\":\"Retry\"},\"player\":{\"queue_title\":\"Story Queue\",\"empty_queue\":\"Your queue is empty. You can ensure continuity by adding tales from the library.\",\"next_track\":\"Next\",\"return_to_player\":\"Return to Player\",\"live_listen\":\"Live Listening\",\"queue_count\":\"{count} TALES IN QUEUE\",\"show_queue\":\"Show Queue\",\"now_playing\":\"NOW PLAYING\",\"status_playing\":\"The story continues at full speed...\",\"status_paused\":\"Play to continue the tale.\",\"page_label\":\"page\",\"back\":\"Back\",\"forward\":\"Forward\",\"fullscreen\":\"Fullscreen\",\"exit_fullscreen\":\"Exit Fullscreen\",\"loading_image\":\"Loading image...\",\"loading_story\":\"Loading tale...\",\"locked_message\":\"You must have a Silver Sky or Golden Sun plan to listen to audio tales in the Magic Library. Please upgrade your package from the settings page.\"},\"components\":{\"add_to_queue\":{\"added\":\"Added!\",\"in_queue\":\"In Queue\",\"add\":\"Add to Queue\",\"add_to\":\"Add to Queue\"},\"download_book\":{\"preparing\":\"Preparing...\",\"pdf_preparing\":\"Preparing PDF...\",\"download\":\"Download Book\"},\"pin\":{\"unpin\":\"Unpin Heroes\",\"pin\":\"Pin Heroes to Home\",\"error\":\"AN ERROR OCCURRED:\"}}}"));}),
"[project]/multilingual_version/locales/tr.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"navbar\":{\"pricing\":\"Fiyatlandırma\",\"how_it_works\":\"Nasıl Çalışır?\",\"library\":\"Sihirli Kütüphane\",\"parent_panel\":\"Ebeveyn Paneli\",\"logout\":\"Çıkış Yap\",\"login\":\"Giriş Yap\",\"return_home\":\"Ana Sayfaya Dön\",\"admin\":\"Admin\",\"lang_tr\":\"Türkçe\",\"lang_en\":\"English\"},\"hero\":{\"title\":\"Hayalinizdeki Masalları Birlikte Yazalım\",\"description\":\"Çocuğunuzun ismini, en sevdiği kahramanı ve temayı seçin. Gerisini yapay zekaya bırakın. Onlara özel, resimli ve sesli uyku öncesi maceraları oluşturun.\",\"cta_primary\":\"Masal Oluşturmaya Başla\",\"cta_secondary\":\"Abonelik Paketleri\"},\"features\":{\"safe\":\"Güvenli ve Reklamsız\",\"pedagogical\":\"Pedagojik Filtreler\",\"happy_families\":\"Yüzlerce Mutlu Aile\"},\"landing\":{\"form_subtitle\":\"✨ İlk Adımı Birlikte Atın\",\"form_title\":\"Macerayı Siz Belirleyin\",\"form_description\":\"Kahramanınıza birkaç kelimeyle yol gösterin, gerisini bize bırakın.\",\"features_badge\":\"MyStory Ayrıcalıkları\",\"features_title\":\"Her Gece Yeni Bir Dünyaya Uyanın\",\"features_subtitle\":\"Gelişmiş teknolojilerle çocuğunuzun hayal gücünü besleyen en güvenilir araç seti.\",\"feat1_title\":\"Görsel Şölen ve Seslendirme\",\"feat1_desc\":\"Her sayfa için özel oluşturulan yüksek kaliteli görseller ve stüdyo kalitesinde seslendirmeler.\",\"feat1_bullet1\":\"Farklı çizim stilleri\",\"feat1_bullet2\":\"Profesyonel anlatıcı\",\"feat2_title\":\"Kendi Sesinizden Masallar\",\"feat2_desc\":\"Sisteme kendi sesinizi tanıtın ve tüm masalları sizin sesinizden dinletin.\",\"feat2_bullet1\":\"Premium: Ses Klonlama\",\"feat2_bullet2\":\"Her zaman yanınızda hissetsin\",\"feat3_title\":\"Sonsuz Macera, Aynı Kahraman\",\"feat3_desc\":\"Kendi karakterlerinizi kütüphanenize kaydedin ve farklı masallarda rol almasını sağlayın.\",\"feat3_bullet1\":\"Karakter kütüphanesi\",\"feat3_bullet2\":\"Görsel tutarlılık\",\"feat4_title\":\"Değerler Eğitimi ve Güvenlik\",\"feat4_desc\":\"Arkadaşlık, dürüstlük veya paylaşma gibi dersleri masalın ana fikri yapın.\",\"feat4_bullet1\":\"Eğitici Mod seçeneği\",\"feat4_bullet2\":\"Yaşa uygun içerik\",\"footer\":\"© 2026 MyStory. Çocuğunuzun düşlerini aydınlatan masal dünyası.\"},\"voices\":{\"select\":\"Ses Seçin\",\"silent\":\"Sessiz\",\"grandpa\":{\"name\":\"Bilge Dede\",\"desc\":\"Tok, bilgece ve güven veren\"},\"rabbit\":{\"name\":\"Gezgin Tavşan\",\"desc\":\"Neşeli ve yerinde duramayan\"},\"knight\":{\"name\":\"Cesur Şövalye\",\"desc\":\"Güçlü ve kahramanvari\"},\"king\":{\"name\":\"Yüce Kral\",\"desc\":\"Otoriter ve onurlu\"},\"dad\":{\"name\":\"Heyecanlı Baba\",\"desc\":\"Sürprizleri seven ve oyunbaz\"},\"guardian\":{\"name\":\"Orman Muhafızı\",\"desc\":\"Derin ve koruyucu bir ses\"},\"mother\":{\"name\":\"Bilge Anne\",\"desc\":\"En şefkatli ve huzur veren\"},\"woman\":{\"name\":\"Masalcı Kadın\",\"desc\":\"Akıcı ve merak uyandıran\"},\"fairy_serenity\":{\"name\":\"Huzur Perisi\",\"desc\":\"Yumuşak ve sakinleştirici\"},\"fairy_magic\":{\"name\":\"Sihirli Peri\",\"desc\":\"Genç, taze ve büyülü\"},\"princess\":{\"name\":\"Gizemli Prenses\",\"desc\":\"Zarif, mistik ve asil\"},\"rainbow_girl\":{\"name\":\"Gökkuşağı Kızı\",\"desc\":\"Canlı, neşeli ve renkli\"}},\"pricing\":{\"hero_title\":\"Abone Ol ve Tasarruf Et\",\"hero_subtitle\":\"MyStory AI abonelik planlarına genel bakış. Çocuklarınızın yapay zeka ile sihirli hikayeler oluşturmasına yardımcı olun.\",\"monthly\":\"/ Aylık\",\"most_popular\":\"En Popüler\",\"secure_payment\":\"Stripe üzerinden güvenli ödeme\",\"cards_accepted\":\"Kartlar, dijital cüzdanlar kabul edilir.\",\"cancel_anytime\":\"İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yok.\",\"trust_text\":\"11.030'dan fazla mutlu ebeveyn ve eğitimciye katılın.\",\"stripe_powered\":\"Stripe tarafından desteklenmektedir.\",\"encryption\":\"256-bit SSL şifreleme\",\"instant_cancel\":\"Anında İptal Seçeneği\",\"features\":{\"request_limit\":\"İstek Limiti\",\"chapter_count\":\"Bölüm Sayısı\",\"story_length\":\"Hikaye Uzunluğu\",\"magic_shuffles\":\"Sihirli Taslaklar\",\"continue_adventure\":\"Maceraya Devam Et\",\"listening_list\":\"Sihirli Dinleme Listesi\",\"character_memory\":\"Kahraman Hafızası\",\"smart_transitions\":\"Akıllı Macera Geçişi\",\"magic_library\":\"Sihirli Kütüphane\",\"write_own\":\"Kendi Hikayeni Yaz\",\"story_limit\":\"Hikaye Limiti\",\"genre_selection\":\"Tür Seçimi\",\"archive\":\"Hikaye Arşivi\",\"library_access\":\"Kütüphane Erişimi\",\"parent_panel\":\"Ebeveyn Paneli\",\"audio_stories\":\"Sesli Hikayeler\",\"voice_cloning\":\"Ses Klonlama\",\"voice_models\":\"Ses Modelleri\",\"narration\":\"Hikaye Seslendirme\",\"license\":\"Yayınlama Lisansı\",\"podcast_output\":\"Podcast Çıktısı\",\"ebook_creation\":\"E-Kitap Oluşturma\"},\"values\":{\"off\":\"Kapalı\",\"on\":\"Dahil\",\"none\":\"Yok\",\"standard\":\"Standart\",\"advanced\":\"Gelişmiş\",\"full\":\"Tam Erişim\",\"text_only\":\"Sadece Metin\",\"audio_text\":\"Ses + Metin\",\"unlocked\":\"Kilitsiz\"},\"plans\":{\"free\":{\"name\":\"Pamuk Bulut\",\"desc\":\"Yeni başlayan küçük hayalperestler için.\",\"button\":\"Hemen Başla\"},\"pro\":{\"name\":\"Gümüş Gökyüzü\",\"desc\":\"Daha fazla macera ve ses klonlama isteyenler için.\",\"button\":\"Abone Ol ve Kazan\"},\"premium\":{\"name\":\"Altın Güneş\",\"desc\":\"Sonsuz hayal gücü ve en yüksek kalite.\",\"button\":\"Hemen Abone Ol\"}}},\"library\":{\"title\":\"Sihirli Kütüphane\",\"subtitle\":\"Hayal gücünüzle oluşturduğunuz eşsiz maceraların size özel koleksiyonu.\",\"no_stories\":\"Henüz bu kategoride masal bulunmuyor.\",\"create_now\":\"Hemen bir tane oluşturun!\",\"read_now\":\"Hemen Oku →\",\"default_preview\":\"Sihirli bir macera seni bekliyor...\",\"footer_slogan\":\"Hayal gücünle büyüyen bir dünya\",\"age_suffix\":\"Yaş\",\"genres\":{\"all\":\"Hepsi\",\"tale\":\"Masal\",\"sci_fi\":\"Bilim Kurgu\",\"adventure\":\"Macera\",\"fantasy\":\"Fantastik\",\"fable\":\"Fabl\"}},\"form\":{\"tabs\":{\"normal\":\"Normal Hikayeler\",\"educational\":\"Eğitici Masallar\",\"continue\":\"Maceraya Devam Et\"},\"placeholders\":{\"subscribe_to_write\":\"Kendi masalını yazmak için abone olmalısın. Şimdilik zar ikonuna basarak sürpriz masal üretebilirsin.\",\"manual_limit_reached\":\"Size özel hikaye limitiniz doldu! Lütfen taslakları deneyin.\",\"audio_limit_reached\":\"Sesli hikaye limitiniz doldu! Sadece 'Sessiz' masallar üretebilirsiniz.\",\"prompt_normal\":\"Bana ... hakkında bir masal yaz.\",\"prompt_educational\":\"Çocuğunuza ne öğretmek istersiniz? Örn: Ayşe'nin diş fırçalamayı öğrenmesi...\",\"continue_story_search\":\"Hangi Kahramanlarla Devam Etmek İstersin?\"},\"sections\":{\"voice\":\"Seslendirme\",\"genre\":\"Tür\",\"style\":\"Çizim Stili\",\"age\":\"Yaş Grubu\",\"characters\":\"Karakterler\",\"educational_value\":\"Öğretilecek Değer\",\"heroes_connected\":\"Bağlı Kahramanlar\",\"select_value\":\"Değer Seçin\",\"select_genre\":\"Tür Seçin\",\"select_style\":\"Stil Seçin\",\"select_age\":\"Yaş Seçin\"},\"buttons\":{\"select_voice\":\"Ses Seçin\",\"generate\":\"Masal Oluştur ✨\",\"randomize\":\"Sürpriz Seçim Yap\",\"edit\":\"Düzenle\",\"add_character\":\"Karakter Ekle\",\"cloning_voice\":\"Ses Klonlanıyor...\",\"clone_save\":\"Sesi Klonla ve Kaydet\"},\"messages\":{\"educational_error\":\"Eğitici mod için Gümüş Gökyüzü veya Altın Güneş paketine sahip olmalısınız.\",\"shuffle_limit\":\"Taslak limiti doldu\",\"shuffle_audio_limit\":\"Taslaklar için sesli limit doldu\",\"try_shuffles\":\"Taslakları dene! ✨\",\"empty_prompt\":\"Lütfen masal konusunu boş bırakmayın.\",\"no_voice\":\"Lütfen masalı okuyacak bir ses seçin.\",\"no_genre\":\"Lütfen bir masal türü seçin.\",\"no_style\":\"Lütfen bir çizim stili seçin.\",\"no_age\":\"Lütfen bir yaş grubu seçin.\",\"no_educational\":\"Lütfen öğretilecek değeri seçin.\",\"no_characters\":\"Lütfen en az bir karakter ekleyin.\",\"max_characters_error\":\"En fazla 3 karakter ekleyebilirsiniz.\",\"error_generic\":\"Bilinmeyen bir hata oluştu.\",\"voice_limit\":\"Kendi sesinizi klonlamak için Altın Güneş paketine sahip olmalısınız.\",\"voice_clone_success\":\"Ses başarıyla eklendi! Artık masalları sizin sesinizle okuyabiliriz.\",\"file_too_large\":\"Dosya boyutu çok büyük (Maks 10MB)\",\"cloning_error\":\"Ses klonlama hatası\"},\"prompt_template\":{\"in_style\":\"tarzında\",\"topic\":\"Konu\",\"style\":\"Çizim Stili\",\"voice\":\"Ses Seçimi\",\"characters\":\"Karakterler\",\"educational_value\":\"Eğitici Değer\",\"continuation\":\"BU BİR DEVAM HİKAYESİDİR. Önceki hikayenin karakterlerine ve konusuna sadık kalarak yeni bir macera yaz.\"}},\"parent\":{\"title\":\"Ebeveyn Kontrol Paneli\",\"subtitle\":\"Çocuklarınızın masal dünyasını buradan yönetin.\",\"stats_title\":\"Aylık Kullanım İstatistikleri\",\"archived_stories\":\"Arşivlenen Masallar\",\"magic_shuffles\":\"Sihirli Taslaklar\",\"custom_stories\":\"Özel Hikayeler\",\"custom_audio\":\"Özel Sesli Masallar\",\"continue_adventure\":\"Maceraya Devam Et\",\"quick_create_title\":\"Hemen Yeni Masal Oluştur!\",\"quick_create_desc\":\"Yapay zeka destekli yeni bir maceraya başlamak için tıkla.\",\"library_title\":\"Eski Masallar Kütüphanesi\",\"no_stories\":\"Henüz hiç masal oluşturmadınız.\",\"total_remaining\":\"Kalan Toplam Hak\",\"library_link\":\"Kütüphaneden eski hikayeleri seçebilirsiniz →\",\"upgrade_banner\":{\"title_pro\":\"Altın Güneş'e Yükselt! 👑\",\"title_free\":\"Premium'a Geç!\",\"desc\":\"Kendi sesini klonlayarak masalları sen anlat.\",\"button\":\"Yükselt\"}},\"story\":{\"not_found\":\"Masal bulunamadı\",\"back_to_library\":\"Kütüphaneye Dön\",\"back_to_parent\":\"Panele Dön\",\"start_new_adventure\":\"Yeni Macera Başlat\",\"created_for_you\":\"🌟 Bu masal sana özel oluşturuldu · MyStory\",\"audio_banner\":{\"title\":\"Sihirli Ses Kaydı Hazır!\",\"desc\":\"Bu masalı hemen akıcı bir seslendirme ile dinle.\",\"add_to_queue\":\"Sıraya Ekle\",\"added\":\"Sıraya Eklendi\",\"in_queue\":\"Sırada\",\"play_now\":\"Hemen Dinle\",\"playing\":\"Şu An Oynatılıyor...\"},\"download_pdf\":{\"button\":\"Kitabı İndir\",\"preparing\":\"PDF Hazırlanıyor...\",\"ready\":\"Hazırlanıyor...\",\"filename_suffix\":\"Kitabı\"},\"podcast\":{\"download\":\"Podcast İndir\",\"remaining\":\"Kalan\",\"limit_reached\":\"İndirme Limiti Doldu\",\"upgrade_required\":\"Premium Özellik\",\"upgrade_desc\":\"Podcast indirmek için paketinizi yükseltin.\"}},\"how_it_works\":{\"title\":\"Sihir Nasıl Gerçekleşiyor?\",\"subtitle\":\"Sadece üç adımda, çocuğunuzun başrolde olduğu o eşsiz uyku vakti dünyasını beraber kuralım.\",\"step1_title\":\"Hayal Tohumlarını Serpin\",\"step1_desc\":\"Çocuğunuzun ismini, sevdiği kahramanları ve maceranın nerede geçeceğini seçin. Sadece birkaç kelimeyle hayalinizdeki dünyayı anlatın.\",\"step2_title\":\"Sihirli Değneğe Dokunun\",\"step2_desc\":\"Yapay zeka sihrimiz, seçimlerinizi saniyeler içinde benzersiz, pedagojik ve sürükleyici bir masal macerasına dönüştürür.\",\"step3_title\":\"Masal Dünyasına Uyanın\",\"step3_desc\":\"Resimli ve sesli masalınız hazır! İster beraber okuyun, ister kendi sesinizden dinletin. Her gece yeni bir keşif sizi bekliyor.\",\"badge_safe\":\"✨ Sihirli ve Güvenli\",\"badge_custom\":\"🎨 Özelleştirilebilir\",\"cta_title\":\"Sihirli Bir Maceraya Hazır mısınız?\",\"cta_desc\":\"Çocuğunuzun hayal dünyasını beraber keşfedelim. İlk masalınızı oluşturmak sadece birkaç saniyenizi alacak.\",\"badge_safe_text\":\"Güvenli ve Reklamsız\",\"badge_custom_text\":\"Pedagojik Filtreler\",\"cta_button\":\"Hemen Masal Oluştur\",\"footer_copy\":\"© 2026 MyStory. Tüm hakları saklıdır.\"},\"admin\":{\"title\":\"Komuta Kontrol Merkezi\",\"subtitle\":\"Sistem genelindeki tüm aktiviteleri buradan takip edebilirsiniz.\",\"return_site\":\"Siteye Dön\",\"stats\":{\"gross_revenue\":\"Brüt Gelir\",\"net_revenue\":\"Komisyon Hariç\",\"total_stories\":\"Toplam Masal\",\"active_subscriptions\":\"Aktif Abonelik\",\"total_users\":\"Toplam Kayıt\",\"cache_total\":\"Toplam Taslak\",\"cache_full\":\"Dolu (Cache)\",\"cache_empty\":\"Eksik (Boş)\"},\"tables\":{\"recent_stories\":\"Son Üretilen Hikayeler\",\"user\":\"Kullanıcı\",\"story_title\":\"Masal Başlığı\",\"date\":\"Tarih\",\"action\":\"Aksiyon\",\"unknown\":\"Bilinmiyor\",\"page\":\"Sayfa\",\"prev\":\"Önceki\",\"next\":\"Sonraki\"},\"logs\":{\"title\":\"Sistem Hata Logları (Canlı)\",\"location\":\"Konum\",\"message\":\"Hata Mesajı\",\"anonymous\":\"Anonim\",\"empty\":\"Henüz bir hata kaydı bulunmuyor. Sistem temiz! ✨\"},\"cache\":{\"title\":\"Sihirli Taslaklar (Cache) Durumu\",\"desc\":\"Eksikleri otomatik kuyruk ile sırayla doldurun.\",\"optimize\":\"Sistemi Optimize Et\",\"fixing\":\"Düzeltiliyor...\",\"fill_missing\":\"Eksikleri Otomatik Doldur\",\"search_placeholder\":\"Taslaklarda ara...\",\"filter_all\":\"HEPSİ\",\"filter_tr\":\"TR\",\"filter_en\":\"EN\",\"status_all\":\"TÜMÜ\",\"status_full\":\"DOLU\",\"status_missing\":\"BOŞ\",\"table_theme\":\"Senaryo Konusu\",\"table_genre\":\"Tür\",\"table_lang\":\"Dil\",\"table_status\":\"Durum\",\"status_ready\":\"HAZIR\",\"status_generating\":\"ÜRETİLİYOR...\",\"status_missing_label\":\"EKSİK\"},\"crm\":{\"title\":\"Kullanıcı Yönetimi (CRM)\",\"search_placeholder\":\"E-posta ile kullanıcı ara...\",\"bonus_quota\":\"Bonus Kota\",\"status\":\"Durum\",\"actions\":\"Aksiyonlar\",\"magic_draft\":\"Sihirli Taslak\",\"suspended\":\"Askıda\",\"active\":\"Aktif\",\"add_5\":\"+5 Taslak\",\"add_10\":\"+10 Taslak\",\"activate\":\"Aktif Et\",\"suspend\":\"Askıya Al\",\"not_found\":\"Kullanıcı bulunamadı.\"},\"switches\":{\"title\":\"Sistem Şalterleri (Feature Flags)\",\"maintenance_mode\":\"Bakım Modu\",\"maintenance_desc\":\"Aktif edildiğinde, adminler hariç tüm kullanıcılar 'Bakımdayız' sayfasına yönlendirilir.\",\"system_locked\":\"Sistem Şu An Kilitli\",\"voice_cloning\":\"Ses Klonlama Özelliği\",\"voice_cloning_desc\":\"Kullanıcıların kendi seslerini yükleyip masal okutma özelliğini açar veya kapatır.\",\"feature_disabled\":\"Özellik Devre Dışı\"},\"messages\":{\"cache_full\":\"Tüm taslaklar zaten dolu! ✨\",\"error\":\"Hata:\",\"queue_started\":\"Kuyruk başlatıldı. Lütfen işlemler bitene kadar bu sayfayı kapatmayın.\",\"queue_completed\":\"Tüm üretimler başarıyla tamamlandı! 🚀\",\"migration_confirm\":\"Eski formatta üretilmiş hikayeler yeni sisteme uygun hale getirilecektir. Onaylıyor musunuz?\",\"migration_success\":\"adet eski kayıt başarıyla güncellendi!\",\"confirm_title\":\"Onay Gerekiyor\",\"confirm_desc\":\"Toplam {count} adet eksik taslak bulundu. Bu taslaklar Google Vertex AI üzerinden sırayla üretilecektir. İşlem sırasında sayfayı kapatmamanız önerilir.\",\"confirm_start\":\"Evet, Kuyruğu Başlat\",\"confirm_cancel\":\"Vazgeç\",\"quota_success\":\"Harika! Kullanıcıya +{amount} adet yeni 'Sihirli Taslak' ✨ hakkı başarıyla tanımlandı.\",\"suspend_success\":\"Kullanıcı hesabı askıya alındı. 🚫\",\"activate_success\":\"Kullanıcı hesabı yeniden aktif edildi. ✅\"}},\"settings\":{\"title\":\"Hesap Ayarları\",\"back_to_library\":\"Kütüphaneye Dön\",\"subscription_details\":\"Abonelik Detayları\",\"current_plan\":\"Mevcut Plan\",\"status\":\"Abonelik Durumu\",\"status_active\":\"● Aktif\",\"status_passive\":\"○ Pasif\",\"start_date\":\"Başlangıç Tarihi\",\"next_renewal\":\"Sıradaki Yenileme\",\"end_date\":\"Bitiş Tarihi\",\"auto_pay_active\":\"Otomatik Ödeme Aktif\",\"auto_pay_desc\":\"Aboneliğiniz yenileme tarihinde kartınızdan otomatik olarak tahsil edilecektir.\",\"manage_payment\":\"Ödeme Yöntemini Yönet\",\"loading\":\"Yükleniyor...\",\"upgrade_title\":\"Paketini Yükselt\",\"support_title\":\"Destek Lazım mı?\",\"support_desc\":\"Abonelik veya ödemelerle ilgili her türlü sorunuz için bize ulaşın.\",\"plans\":{\"premium\":\"Altın Güneş 👑\",\"pro\":\"Gümüş Gökyüzü ☁️\",\"free\":\"Pamuk Bulut (Ücretsiz) ☁️\"},\"messages\":{\"checkout_error\":\"Ödeme sayfasına yönlendirilemedi.\",\"portal_error\":\"Portal açılamadı.\",\"portal_unavailable\":\"Abonelik yönetim sayfasına şu an ulaşılamıyor.\"}},\"auth\":{\"login\":{\"welcome\":\"Hoş Geldiniz\",\"subtitle\":\"Devam etmek için giriş yapın.\",\"google_button\":\"Google ile Devam Et\",\"or\":\"VEYA\",\"email_label\":\"E-posta Adresi\",\"email_placeholder\":\"ornek@mail.com\",\"password_label\":\"Şifre\",\"forgot_password\":\"Şifremi Unuttum\",\"button_loading\":\"Giriş Yapılıyor...\",\"button\":\"Giriş Yap\",\"no_account\":\"Hesabınız yok mu?\",\"register_now\":\"Hemen Kaydolun\"},\"register\":{\"title\":\"Hesap Oluştur\",\"subtitle\":\"Çocuğunuz için sihirli masallar yaratmaya başlayın.\",\"google_button\":\"Google ile Devam Et\",\"or\":\"VEYA\",\"success_title\":\"Kayıt Başarılı!\",\"success_desc\":\"Lütfen e-posta adresinize gönderilen doğrulama bağlantısına tıklayarak hesabınızı aktif edin.\",\"success_button\":\"Giriş Yap\",\"email_label\":\"E-posta Adresi\",\"email_placeholder\":\"ornek@mail.com\",\"password_label\":\"Şifre\",\"password_placeholder\":\"En az 6 karakter\",\"lang_label\":\"Uygulama Dili / App Language\",\"button_loading\":\"Kaydediliyor...\",\"button\":\"Kayıt Ol\",\"has_account\":\"Zaten hesabınız var mı?\",\"login_now\":\"Giriş Yapın\"}},\"checkout\":{\"checking_status\":\"Oturum Kontrol Ediliyor\",\"success_title\":\"Harika Bir Başlangıç! ✨\",\"success_desc\":\"Aboneliğiniz başarıyla aktif edildi. Çocuğunuz için ilk sihirli masalı oluşturmaya hemen başlayabilirsiniz.\",\"button_home\":\"Ana Sayfaya Dön\",\"button_library\":\"Kütüphaneye Git\"},\"styles\":{\"watercolor\":\"Sulu Boya\",\"pixar\":\"3D Pixar Stili\",\"pastel\":\"Pastel Düşler\",\"anime\":\"Anime\",\"oil\":\"Yağlı Boya\",\"pop_art\":\"Pop Art\",\"cartoon\":\"Çizgi Film\",\"retro\":\"Vintage Retro\"},\"audio_player\":{\"loading\":\"Ses yükleniyor...\",\"error\":\"Ses yüklenemedi.\",\"queue_title\":\"Sihirli Dinleme Listesi\",\"empty_queue\":\"Liste şu an boş. Masallardan ekleyebilirsin!\",\"now_playing\":\"Şu an oynatılıyor\",\"added\":\"Eklendi!\",\"in_queue\":\"Sırada\",\"add\":\"Kuyruğa Ekle\",\"add_to\":\"Sıraya Ekle\"},\"download_book\":{\"preparing\":\"Hazırlanıyor...\",\"pdf_preparing\":\"PDF Hazırlanıyor...\",\"download\":\"Kitabı İndir\"},\"pin\":{\"unpin\":\"Kahramanları Sabitten Kaldır\",\"pin\":\"Kahramanları Ana Sayfaya Sabitle\",\"error\":\"BİR SORUN OLUŞTU:\"}}"));}),
"[project]/multilingual_version/context/LanguageContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/multilingual_version/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$tr$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/multilingual_version/locales/tr.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const dictionaries = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$en$2e$json__$28$json$29$__["default"],
    tr: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$locales$2f$tr$2e$json__$28$json$29$__["default"]
};
;
function LanguageProvider({ children }) {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Sayfa yüklendiğinde tercihi hatırla
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('app-language');
        if (saved && (saved === 'en' || saved === 'tr')) {
            setLanguage(saved);
        }
    }, []);
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem('app-language', lang);
        // Sunucu tarafının (Server Components) dili okuyabilmesi için cookie set ediyoruz
        document.cookie = `language=${lang}; path=/; max-age=31536000; samesite=lax`; // 1 yıl
        router.refresh();
    };
    // Basit bir çeviri fonksiyonu (nested keys desteğiyle: "navbar.home")
    const t = (key)=>{
        const keys = key.split('.');
        let result = dictionaries[language];
        for (const k of keys){
            if (result[k]) {
                result = result[k];
            } else {
                return key // Anahtar bulunamazsa anahtarı döndür
                ;
            }
        }
        return result;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage: handleSetLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/multilingual_version/context/LanguageContext.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__797f7b76._.js.map