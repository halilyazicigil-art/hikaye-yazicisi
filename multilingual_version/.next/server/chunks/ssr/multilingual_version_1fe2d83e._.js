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

//# sourceMappingURL=multilingual_version_1fe2d83e._.js.map