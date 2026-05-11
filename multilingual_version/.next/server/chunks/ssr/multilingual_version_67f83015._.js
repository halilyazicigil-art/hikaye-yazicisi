module.exports = [
"[project]/multilingual_version/components/AddToQueueButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddToQueueButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$AudioPlayerContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/context/AudioPlayerContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListMusic$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/list-music.mjs [app-ssr] (ecmascript) <export default as ListMusic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AddToQueueButton({ story, className = "", iconOnly = false }) {
    const { addToQueue, queue, currentTrack } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$AudioPlayerContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAudioPlayer"])();
    const [added, setAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!story.audio_url) return null;
    const isInQueue = queue.some((i)=>i.id === story.id);
    const isCurrent = currentTrack?.id === story.id;
    const handleAdd = (e)=>{
        e.preventDefault(); // Link tıklamasını engelle
        e.stopPropagation(); // Link tıklamasını engelle
        if (added || isInQueue || isCurrent) return;
        const track = {
            id: story.id,
            title: story.title,
            audioUrl: story.audio_url,
            imageUrl: story.image_url
        };
        addToQueue(track);
        setAdded(true);
        setTimeout(()=>setAdded(false), 2000);
    };
    if (iconOnly) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleAdd,
            disabled: added || isInQueue || isCurrent,
            className: `p-2 rounded-full transition-all border shadow-sm flex items-center justify-center ${added || isInQueue || isCurrent ? 'bg-sky-500 text-white border-sky-400' : 'bg-white hover:bg-sky-50 text-[#84B1D9] border-sky-100'} ${className}`,
            title: added ? 'Eklendi!' : isInQueue ? 'Sırada' : 'Kuyruğa Ekle',
            children: added || isInQueue || isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/multilingual_version/components/AddToQueueButton.tsx",
                lineNumber: 57,
                columnNumber: 44
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListMusic$3e$__["ListMusic"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/multilingual_version/components/AddToQueueButton.tsx",
                lineNumber: 57,
                columnNumber: 66
            }, this)
        }, void 0, false, {
            fileName: "[project]/multilingual_version/components/AddToQueueButton.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleAdd,
        disabled: added || isInQueue || isCurrent,
        className: `px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border flex items-center gap-1.5 ${added || isInQueue || isCurrent ? 'bg-sky-500 text-white border-sky-400 cursor-default' : 'bg-white hover:bg-sky-50 text-[#84B1D9] border-sky-100 active:scale-95'} ${className}`,
        children: added || isInQueue || isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    size: 12
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/components/AddToQueueButton.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this),
                " ",
                added ? 'Eklendi!' : 'Sırada'
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$music$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListMusic$3e$__["ListMusic"], {
                    size: 12
                }, void 0, false, {
                    fileName: "[project]/multilingual_version/components/AddToQueueButton.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this),
                " Sıraya Ekle"
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/multilingual_version/components/AddToQueueButton.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
"[project]/multilingual_version/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/cloud.mjs [app-ssr] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$AudioPlayerContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/context/AudioPlayerContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/context/LanguageContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const Navbar = ({ user, isLoading = false })=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { viewMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$AudioPlayerContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAudioPlayer"])();
    const { language, setLanguage, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    if (viewMode === 'fullscreen') return null;
    const navLinks = [
        {
            name: t('navbar.pricing'),
            href: '/pricing'
        },
        {
            name: t('navbar.how_it_works'),
            href: '/how-it-works'
        },
        {
            name: t('navbar.library'),
            href: '/library'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-white/10 backdrop-blur-sm border-b border-white/10 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 flex justify-end gap-4 text-xs font-bold text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setLanguage('en'),
                            className: `flex items-center gap-1.5 transition-all hover:scale-110 ${language === 'en' ? 'opacity-100 scale-105 underline underline-offset-4' : 'opacity-60'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base",
                                    children: "🇬🇧"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                t('navbar.lang_en')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/components/Navbar.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-[1px] h-3 bg-white/20 self-center"
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/components/Navbar.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setLanguage('tr'),
                            className: `flex items-center gap-1.5 transition-all hover:scale-110 ${language === 'tr' ? 'opacity-100 scale-105 underline underline-offset-4' : 'opacity-60'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base",
                                    children: "🇹🇷"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                t('navbar.lang_tr')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/components/Navbar.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/multilingual_version/components/Navbar.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "max-w-7xl mx-auto px-6 py-8 w-full flex justify-between items-center relative z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-3 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                                        className: "w-12 h-12 text-white fill-white group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                                        className: "w-8 h-8 text-white fill-white absolute -bottom-1 -right-2 opacity-80 drop-shadow-md group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-4xl md:text-5xl font-lora font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 ml-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
                                children: "MyStory"
                            }, void 0, false, {
                                fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-2 bg-[#D9E8F5] backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg",
                        children: navLinks.map((link)=>{
                            const isActive = pathname === link.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                className: `px-5 py-2 rounded-full transition-all text-sm font-black tracking-wide border duration-300 bg-white text-[#052159] border-white shadow-sm hover:scale-105 hover:bg-sky-50 ${isActive ? 'shadow-md scale-105 ring-2 ring-[#84B1D9]/20' : ''}`,
                                children: link.name
                            }, link.name, false, {
                                fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: isLoading ? // Skeleton loader to prevent layout shift
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-12 bg-white/20 rounded-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-12 bg-white/20 rounded-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/components/Navbar.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                user.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin",
                                    className: "bg-gradient-to-r from-gray-900 to-slate-800 text-white px-7 py-3 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(15,23,42,0.3)] hover:shadow-[0_0_30px_rgba(15,23,42,0.5)] hover:scale-105 border border-white/10 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        t('navbar.admin')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 85,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/parent",
                                    className: "bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-7 py-3 rounded-2xl font-black transition-all shadow-xl hover:scale-105 border border-white/20",
                                    children: t('navbar.parent_panel')
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    action: "/auth/signout",
                                    method: "post",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-7 py-3 rounded-2xl font-black transition-all border border-gray-200 shadow-xl hover:scale-105",
                                        children: t('navbar.logout')
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/components/Navbar.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: "bg-white text-[#84B1D9] px-8 py-3 rounded-2xl font-black hover:bg-sky-50 transition-all shadow-2xl hover:scale-105",
                            children: t('navbar.login')
                        }, void 0, false, {
                            fileName: "[project]/multilingual_version/components/Navbar.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/multilingual_version/components/Navbar.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/multilingual_version/components/Navbar.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/multilingual_version/components/Navbar.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Navbar;
}),
"[project]/multilingual_version/app/actions/data:9562d1 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d8c9e8a5a07748e4a875cbca27593561de8cfada":"togglePinAction"},"multilingual_version/app/actions/pinAction.ts",""] */ __turbopack_context__.s([
    "togglePinAction",
    ()=>togglePinAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var togglePinAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40d8c9e8a5a07748e4a875cbca27593561de8cfada", __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "togglePinAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGluQWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL3V0aWxzL3N1cGFiYXNlL3NlcnZlcidcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZVBpbkFjdGlvbihzdG9yeUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICAgIGNvbnN0IHsgZGF0YTogeyB1c2VyIH0gfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICAgIGlmICghdXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnT3R1cnVtIGHDp8SxbG1hZMSxJyB9O1xuXG4gICAgLy8gMS4gTWV2Y3V0IGR1cnVtdSBhbFxuICAgIGNvbnN0IHsgZGF0YTogc3RvcnkgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ3N0b3JpZXMnKS5zZWxlY3QoJ2lzX3Bpbm5lZCcpLmVxKCdpZCcsIHN0b3J5SWQpLmVxKCd1c2VyX2lkJywgdXNlci5pZCkuc2luZ2xlKCk7XG4gICAgaWYgKCFzdG9yeSkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnSGlrYXllIGJ1bHVuYW1hZMSxIHZleWEgeWV0a2luaXogeW9rLicgfTtcblxuICAgIGNvbnN0IG5ld1N0YXR1cyA9ICFzdG9yeS5pc19waW5uZWQ7XG5cbiAgICAvLyAyLiBQYWtldCBsaW1pdGluaSBrb250cm9sIGV0XG4gICAgY29uc3QgeyBkYXRhOiBzdWIgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ3N1YnNjcmlwdGlvbnMnKS5zZWxlY3QoJ3BsYW5faWQnKS5lcSgndXNlcl9pZCcsIHVzZXIuaWQpLm1heWJlU2luZ2xlKCk7XG4gICAgY29uc3QgaXNQcmVtaXVtID0gc3ViPy5wbGFuX2lkID09PSAncHJlbWl1bSc7XG4gICAgY29uc3QgaXNQcm8gPSBzdWI/LnBsYW5faWQgPT09ICdwcm8nO1xuICAgIGNvbnN0IHBpbkxpbWl0ID0gaXNQcmVtaXVtID8gMTAgOiAoaXNQcm8gPyA1IDogMCk7XG5cbiAgICBpZiAobmV3U3RhdHVzKSB7XG4gICAgICAgIGlmIChwaW5MaW1pdCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnS2FocmFtYW4gSGFmxLF6YXPEsSDDtnplbGxpxJ9pIHNhZGVjZSBHw7xtw7zFnyB2ZSBBbHTEsW4gcGFrZXRsZXJkZSBtZXZjdXR0dXIuJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgnc3RvcmllcycpXG4gICAgICAgICAgICAuc2VsZWN0KCcqJywgeyBjb3VudDogJ2V4YWN0JywgaGVhZDogdHJ1ZSB9KVxuICAgICAgICAgICAgLmVxKCd1c2VyX2lkJywgdXNlci5pZClcbiAgICAgICAgICAgIC5lcSgnaXNfcGlubmVkJywgdHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY291bnQgJiYgY291bnQgPj0gcGluTGltaXQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYCR7aXNQcmVtaXVtID8gJ0FsdMSxbiBHw7xuZcWfJyA6ICdHw7xtw7zFnyBHw7ZrecO8esO8J30gcGFrZXQgbGltaXRpbiBvbGFuICR7cGluTGltaXR9IG1hc2FsIHPEsW7EsXLEsW5hIHVsYcWfdMSxbi4gw5ZuY2UgYmlyaW5pIGthbGTEsXJtYWzEsXPEsW4uYCB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gMy4gR8O8bmNlbGxlXG4gICAgY29uc3QgeyBlcnJvcjogdXBkYXRlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKCdzdG9yaWVzJylcbiAgICAgICAgLnVwZGF0ZSh7IGlzX3Bpbm5lZDogbmV3U3RhdHVzIH0pXG4gICAgICAgIC5lcSgnaWQnLCBzdG9yeUlkKVxuICAgICAgICAuZXEoJ3VzZXJfaWQnLCB1c2VyLmlkKTtcblxuICAgIGlmICh1cGRhdGVFcnJvcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBWZXJpdGFiYW7EsTogJHt1cGRhdGVFcnJvci5tZXNzYWdlfWAgfTtcbiAgICB9XG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3BhcmVudCcpO1xuICAgIHJldmFsaWRhdGVQYXRoKCcvbGlicmFyeScpO1xuICAgIHJldmFsaWRhdGVQYXRoKCcvJyk7XG4gICAgXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgaXNQaW5uZWQ6IG5ld1N0YXR1cyB9O1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wYXJlbnQnKTtcbiAgICByZXZhbGlkYXRlUGF0aCgnL2xpYnJhcnknKTtcbiAgICByZXZhbGlkYXRlUGF0aCgnLycpO1xuICAgIFxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGlzUGlubmVkOiBuZXdTdGF0dXMgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1RBS3NCIn0=
}),
"[project]/multilingual_version/components/PinButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PinButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$data$3a$9562d1__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/data:9562d1 [app-ssr] (ecmascript) <text/javascript>");
'use client';
;
;
;
;
function PinButton({ storyId, initialPinned }) {
    const [isPinned, setIsPinned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPinned);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleToggle = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$data$3a$9562d1__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["togglePinAction"])(storyId);
        if (res.success) {
            setIsPinned(res.isPinned || false);
        } else {
            setTimeout(()=>{
                alert("BİR SORUN OLUŞTU:\n" + res.error);
            }, 100);
        }
        setIsLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleToggle,
        disabled: isLoading,
        title: isPinned ? "Kahramanları Sabitten Kaldır" : "Kahramanları Ana Sayfaya Sabitle",
        className: `p-2.5 rounded-full shadow-lg transition-all duration-300 ${isPinned ? 'bg-orange-500 text-white scale-110' : 'bg-white/80 text-gray-400 hover:text-orange-500 hover:scale-110 backdrop-blur-sm'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
            size: 18,
            fill: isPinned ? "currentColor" : "none"
        }, void 0, false, {
            fileName: "[project]/multilingual_version/components/PinButton.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/multilingual_version/components/PinButton.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=multilingual_version_67f83015._.js.map