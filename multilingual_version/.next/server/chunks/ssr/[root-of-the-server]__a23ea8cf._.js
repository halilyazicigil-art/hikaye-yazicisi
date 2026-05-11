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
"[project]/multilingual_version/app/actions/pinAction.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d8c9e8a5a07748e4a875cbca27593561de8cfada":"togglePinAction"},"",""] */ __turbopack_context__.s([
    "togglePinAction",
    ()=>togglePinAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function togglePinAction(storyId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        success: false,
        error: 'Oturum açılmadı'
    };
    // 1. Mevcut durumu al
    const { data: story } = await supabase.from('stories').select('is_pinned').eq('id', storyId).eq('user_id', user.id).single();
    if (!story) return {
        success: false,
        error: 'Hikaye bulunamadı veya yetkiniz yok.'
    };
    const newStatus = !story.is_pinned;
    // 2. Paket limitini kontrol et
    const { data: sub } = await supabase.from('subscriptions').select('plan_id').eq('user_id', user.id).maybeSingle();
    const isPremium = sub?.plan_id === 'premium';
    const isPro = sub?.plan_id === 'pro';
    const pinLimit = isPremium ? 10 : isPro ? 5 : 0;
    if (newStatus) {
        if (pinLimit === 0) {
            return {
                success: false,
                error: 'Kahraman Hafızası özelliği sadece Gümüş ve Altın paketlerde mevcuttur.'
            };
        }
        const { count } = await supabase.from('stories').select('*', {
            count: 'exact',
            head: true
        }).eq('user_id', user.id).eq('is_pinned', true);
        if (count && count >= pinLimit) {
            return {
                success: false,
                error: `${isPremium ? 'Altın Güneş' : 'Gümüş Gökyüzü'} paket limitin olan ${pinLimit} masal sınırına ulaştın. Önce birini kaldırmalısın.`
            };
        }
    }
    // 3. Güncelle
    const { error: updateError } = await supabase.from('stories').update({
        is_pinned: newStatus
    }).eq('id', storyId).eq('user_id', user.id);
    if (updateError) {
        return {
            success: false,
            error: `Veritabanı: ${updateError.message}`
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/parent');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/library');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    return {
        success: true,
        isPinned: newStatus
    };
    //TURBOPACK unreachable
    ;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    togglePinAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePinAction, "40d8c9e8a5a07748e4a875cbca27593561de8cfada", null);
}),
"[project]/multilingual_version/.next-internal/server/app/parent/page/actions.js { ACTIONS_MODULE0 => \"[project]/multilingual_version/app/actions/pinAction.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$pinAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/pinAction.ts [app-rsc] (ecmascript)");
;
}),
"[project]/multilingual_version/.next-internal/server/app/parent/page/actions.js { ACTIONS_MODULE0 => \"[project]/multilingual_version/app/actions/pinAction.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40d8c9e8a5a07748e4a875cbca27593561de8cfada",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$pinAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePinAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f2e$next$2d$internal$2f$server$2f$app$2f$parent$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$pinAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/multilingual_version/.next-internal/server/app/parent/page/actions.js { ACTIONS_MODULE0 => "[project]/multilingual_version/app/actions/pinAction.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$app$2f$actions$2f$pinAction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/app/actions/pinAction.ts [app-rsc] (ecmascript)");
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
"[project]/multilingual_version/components/AddToQueueButton.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/AddToQueueButton.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/AddToQueueButton.tsx <module evaluation>", "default");
}),
"[project]/multilingual_version/components/AddToQueueButton.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/AddToQueueButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/AddToQueueButton.tsx", "default");
}),
"[project]/multilingual_version/components/AddToQueueButton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$AddToQueueButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/multilingual_version/components/AddToQueueButton.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$AddToQueueButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/AddToQueueButton.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$AddToQueueButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/multilingual_version/components/PinButton.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/PinButton.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/PinButton.tsx <module evaluation>", "default");
}),
"[project]/multilingual_version/components/PinButton.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/components/PinButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/components/PinButton.tsx", "default");
}),
"[project]/multilingual_version/components/PinButton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$PinButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/multilingual_version/components/PinButton.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$PinButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/PinButton.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$PinButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/multilingual_version/locales/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"navbar\":{\"pricing\":\"Pricing\",\"how_it_works\":\"How It Works\",\"library\":\"Magic Library\",\"parent_panel\":\"Parent Panel\",\"logout\":\"Logout\",\"login\":\"Login\",\"return_home\":\"Return Home\",\"admin\":\"Admin\",\"lang_tr\":\"Türkçe\",\"lang_en\":\"English\"},\"hero\":{\"title\":\"Write the Tales of Your Dreams Together\",\"description\":\"Choose your child's name, favorite character, and theme. Let AI handle the rest. Create illustrated, narrated bedtime adventures just for them.\",\"cta_primary\":\"Start Creating Tales\",\"cta_secondary\":\"Subscription Plans\"},\"features\":{\"safe\":\"Safe and Ad-Free\",\"pedagogical\":\"Pedagogical Filters\",\"happy_families\":\"Hundreds of Happy Families\"},\"landing\":{\"form_subtitle\":\"✨ Take the First Step Together\",\"form_title\":\"You Define the Adventure\",\"form_description\":\"Guide your hero with just a few words, leave the rest to us.\",\"features_badge\":\"MyStory Privileges\",\"features_title\":\"Wake Up to a New World Every Night\",\"features_subtitle\":\"The most reliable toolkit that feeds your child's imagination with advanced technologies.\",\"feat1_title\":\"Visual Feast and Narration\",\"feat1_desc\":\"High-quality images created specifically for each page and studio-quality narrations.\",\"feat1_bullet1\":\"Different drawing styles\",\"feat1_bullet2\":\"Professional narrator\",\"feat2_title\":\"From Your Voice to Dreams\",\"feat2_desc\":\"Introduce your own voice to the system and let all stories be read in your voice.\",\"feat2_bullet1\":\"Premium: Voice Cloning\",\"feat2_bullet2\":\"Always make them feel you're there\",\"feat3_title\":\"Infinite Adventure, Same Hero\",\"feat3_desc\":\"Save your own characters to your library and let them play in different tales.\",\"feat3_bullet1\":\"Character library\",\"feat3_bullet2\":\"Visual consistency\",\"feat4_title\":\"Values Education and Safety\",\"feat4_desc\":\"Make lessons like friendship, honesty, or sharing the main idea of the tale.\",\"feat4_bullet1\":\"Educational Mode option\",\"feat4_bullet2\":\"Age-appropriate content\",\"footer\":\"© 2026 MyStory. A world of tales that brightens your child's dreams.\"},\"voices\":{\"select\":\"Select Voice\",\"silent\":\"Silent\",\"grandpa\":{\"name\":\"Wise Grandpa\",\"desc\":\"Deep, wise, and reassuring\"},\"rabbit\":{\"name\":\"Traveler Rabbit\",\"desc\":\"Cheerful and energetic\"},\"knight\":{\"name\":\"Brave Knight\",\"desc\":\"Strong and heroic\"},\"king\":{\"name\":\"Grand King\",\"desc\":\"Authoritative and honorable\"},\"dad\":{\"name\":\"Excited Dad\",\"desc\":\"Loves surprises and playful\"},\"guardian\":{\"name\":\"Forest Guardian\",\"desc\":\"A deep and protective voice\"},\"mother\":{\"name\":\"Wise Mother\",\"desc\":\"Most compassionate and peaceful\"},\"woman\":{\"name\":\"Storyteller Woman\",\"desc\":\"Fluent and intriguing\"},\"fairy_serenity\":{\"name\":\"Serenity Fairy\",\"desc\":\"Soft and calming\"},\"fairy_magic\":{\"name\":\"Magic Fairy\",\"desc\":\"Young, fresh, and magical\"},\"princess\":{\"name\":\"Mysterious Princess\",\"desc\":\"Elegant, mystic, and noble\"},\"rainbow_girl\":{\"name\":\"Rainbow Girl\",\"desc\":\"Vibrant, cheerful, and colorful\"}},\"pricing\":{\"hero_title\":\"Subscribe and Save\",\"hero_subtitle\":\"An overview of MyStory AI subscription plans. Help your children create magic stories with AI.\",\"monthly\":\"/ Month\",\"most_popular\":\"Most Popular\",\"secure_payment\":\"Secure payment via Stripe\",\"cards_accepted\":\"Cards, digital wallets are accepted.\",\"cancel_anytime\":\"You can cancel anytime. No hidden fees.\",\"trust_text\":\"Join over 11,030 happy parents and educators.\",\"stripe_powered\":\"Powered by Stripe.\",\"encryption\":\"256-bit SSL encryption\",\"instant_cancel\":\"Instant Cancel Option\",\"features\":{\"request_limit\":\"Request Limit\",\"chapter_count\":\"Chapter Count\",\"story_length\":\"Story Length\",\"magic_shuffles\":\"Magic Drafts\",\"continue_adventure\":\"Continue Adventure\",\"listening_list\":\"Magic Listening List\",\"character_memory\":\"Hero Memory\",\"smart_transitions\":\"Smart Adventure Transition\",\"magic_library\":\"Magic Library\",\"write_own\":\"Write Your Own Story\",\"story_limit\":\"Story Limit\",\"genre_selection\":\"Genre Selection\",\"archive\":\"Story Archive\",\"library_access\":\"Library Access\",\"parent_panel\":\"Parent Panel\",\"audio_stories\":\"Audio Stories\",\"voice_cloning\":\"Voice Cloning\",\"voice_models\":\"Voice Models\",\"narration\":\"Story Narration\",\"license\":\"Publishing License\",\"podcast_output\":\"Podcast Output\",\"ebook_creation\":\"E-Book Creation\"},\"values\":{\"off\":\"Off\",\"on\":\"Included\",\"none\":\"None\",\"standard\":\"Standard\",\"advanced\":\"Advanced\",\"full\":\"Full Access\",\"text_only\":\"Text Only\",\"audio_text\":\"Audio + Text\",\"unlocked\":\"Unlocked\"},\"plans\":{\"free\":{\"name\":\"Cotton Cloud\",\"desc\":\"For little dreamers just starting out.\",\"button\":\"Start Now\"},\"pro\":{\"name\":\"Silver Sky\",\"desc\":\"For those who want more adventure and voice cloning.\",\"button\":\"Subscribe and Save\"},\"premium\":{\"name\":\"Golden Sun\",\"desc\":\"Infinite imagination and the highest quality.\",\"button\":\"Subscribe Now\"}}},\"library\":{\"title\":\"Magic Library\",\"subtitle\":\"Your special collection of unique adventures created with your imagination.\",\"no_stories\":\"No tales in this category yet.\",\"create_now\":\"Create a new one now!\",\"read_now\":\"Read Now →\",\"default_preview\":\"A magical adventure awaits you...\",\"footer_slogan\":\"A world growing with your imagination\",\"age_suffix\":\"Years\",\"genres\":{\"all\":\"All\",\"tale\":\"Tale\",\"sci_fi\":\"Sci-Fi\",\"adventure\":\"Adventure\",\"fantasy\":\"Fantasy\",\"fable\":\"Fable\"}},\"form\":{\"tabs\":{\"normal\":\"Normal Stories\",\"educational\":\"Educational Tales\",\"continue\":\"Continue Adventure\"},\"placeholders\":{\"subscribe_to_write\":\"Subscribe to write your own tale. For now, you can press the dice icon to produce a surprise story.\",\"manual_limit_reached\":\"Your unique story limit reached! Please try drafts.\",\"audio_limit_reached\":\"Your audio story limit reached! You can only produce 'Silent' tales.\",\"prompt_normal\":\"Write me a story about...\",\"prompt_educational\":\"What would you like to teach your child? E.g.: Ayşe learning to brush her teeth...\",\"continue_story_search\":\"Which Heroes Do You Want to Continue With?\"},\"sections\":{\"voice\":\"Voice\",\"genre\":\"Genre\",\"style\":\"Art Style\",\"age\":\"Age Group\",\"characters\":\"Characters\",\"educational_value\":\"Value to Teach\",\"heroes_connected\":\"Heroes Connected\",\"select_value\":\"Select Value\",\"select_genre\":\"Select Genre\",\"select_style\":\"Select Style\",\"select_age\":\"Select Age\"},\"buttons\":{\"select_voice\":\"Select Voice\",\"generate\":\"Create Tale ✨\",\"randomize\":\"Make a Surprise Choice\",\"edit\":\"Edit\",\"add_character\":\"Add Character\",\"cloning_voice\":\"Cloning Voice...\",\"clone_save\":\"Clone Voice and Save\"},\"messages\":{\"educational_error\":\"You must have a Silver Sky or Golden Sun plan for Educational mode.\",\"shuffle_limit\":\"Draft limit reached\",\"shuffle_audio_limit\":\"Audio limit for drafts reached\",\"try_shuffles\":\"Try the drafts! ✨\",\"empty_prompt\":\"Please do not leave the story topic empty.\",\"no_voice\":\"Please select a voice to narrate the story.\",\"no_genre\":\"Please select a tale genre.\",\"no_style\":\"Please select an art style.\",\"no_age\":\"Please select an age group.\",\"no_educational\":\"Please select a value to teach.\",\"no_characters\":\"Please add at least one character.\",\"max_characters_error\":\"You can add a maximum of 3 characters.\",\"error_generic\":\"An unknown error occurred.\",\"voice_limit\":\"You must have a Golden Sun plan to clone your own voice.\",\"voice_clone_success\":\"Voice added successfully! We can now read tales in your voice.\",\"file_too_large\":\"File size too large (Max 10MB)\",\"cloning_error\":\"Voice cloning error\"},\"prompt_template\":{\"in_style\":\"in style\",\"topic\":\"Topic\",\"style\":\"Art Style\",\"voice\":\"Voice Selection\",\"characters\":\"Characters\",\"educational_value\":\"Educational Value\",\"continuation\":\"THIS IS A CONTINUATION STORY. Write a new adventure based on the characters and plot of the previous story.\"}},\"parent\":{\"title\":\"Parent Control Panel\",\"subtitle\":\"Manage your children's world of tales from here.\",\"stats_title\":\"Monthly Statistics\",\"archived_stories\":\"Archived Tales\",\"magic_shuffles\":\"Magic Drafts\",\"custom_stories\":\"Custom Stories\",\"custom_audio\":\"Custom Audio Tales\",\"continue_adventure\":\"Continue Adventure\",\"quick_create_title\":\"Create New Tale!\",\"quick_create_desc\":\"Start now to create a new AI-powered adventure.\",\"library_title\":\"Old Tales Library\",\"no_stories\":\"You haven't created any tales yet.\",\"total_remaining\":\"Total Remaining\",\"library_link\":\"You can select older stories from the library →\",\"upgrade_banner\":{\"title_pro\":\"Upgrade to Golden Sun! 👑\",\"title_free\":\"Go Premium!\",\"desc\":\"Narrate stories yourself by cloning your own voice.\",\"button\":\"Upgrade\"}},\"story\":{\"not_found\":\"Tale not found\",\"back_to_library\":\"Back to Library\",\"back_to_parent\":\"Back to Dashboard\",\"start_new_adventure\":\"Start New Adventure\",\"created_for_you\":\"🌟 This tale was created especially for you · MyStory\",\"audio_banner\":{\"title\":\"Magical Audio Recording Available!\",\"desc\":\"Listen to this tale now with smooth narration.\",\"add_to_queue\":\"Add to Queue\",\"added\":\"Added to Queue\",\"in_queue\":\"In Queue\",\"play_now\":\"Listen Now\",\"playing\":\"Now Playing...\"},\"download_pdf\":{\"button\":\"Download Book\",\"preparing\":\"Preparing PDF...\",\"ready\":\"Preparing...\",\"filename_suffix\":\"Book\"},\"podcast\":{\"download\":\"Download Podcast\",\"remaining\":\"Remaining\",\"limit_reached\":\"Download Limit Reached\",\"upgrade_required\":\"Premium Feature\",\"upgrade_desc\":\"Upgrade your plan to download podcasts.\"}},\"how_it_works\":{\"title\":\"How Does the Magic Happen?\",\"subtitle\":\"In just three steps, let's build together that unique bedtime world where your child is the star.\",\"step1_title\":\"Scatter the Seeds of Imagination\",\"step1_desc\":\"Choose your child's name, favorite characters, and where the adventure will take place. Describe your dream world in just a few words.\",\"step2_title\":\"Touch the Magic Wand\",\"step2_desc\":\"Our AI magic transforms your choices into a unique, pedagogical, and immersive tale adventure in seconds.\",\"step3_title\":\"Wake Up to the World of Tales\",\"step3_desc\":\"Your illustrated and narrated tale is ready! Read it together or let them listen in your own voice. A new discovery awaits you every night.\",\"badge_safe\":\"✨ Magical and Safe\",\"badge_custom\":\"🎨 Customizable\",\"cta_title\":\"Ready for a Magical Adventure?\",\"cta_desc\":\"Let's explore your child's imagination together. Creating your first tale will only take a few seconds.\",\"badge_safe_text\":\"Safe and Ad-Free\",\"badge_custom_text\":\"Pedagogical Filters\",\"cta_button\":\"Create Tale Now\",\"footer_copy\":\"© 2026 MyStory. All rights reserved.\"},\"admin\":{\"title\":\"Command & Control Center\",\"subtitle\":\"Track all system-wide activities from here.\",\"return_site\":\"Return to Site\",\"stats\":{\"gross_revenue\":\"Gross Revenue\",\"net_revenue\":\"Excl. Commission\",\"total_stories\":\"Total Tales\",\"active_subscriptions\":\"Active Subscriptions\",\"total_users\":\"Total Users\",\"cache_total\":\"Total Drafts\",\"cache_full\":\"Full (Cache)\",\"cache_empty\":\"Missing (Empty)\"},\"tables\":{\"recent_stories\":\"Recent Stories\",\"user\":\"User\",\"story_title\":\"Story Title\",\"date\":\"Date\",\"action\":\"Action\",\"unknown\":\"Unknown\",\"page\":\"Page\",\"prev\":\"Previous\",\"next\":\"Next\"},\"logs\":{\"title\":\"System Error Logs (Live)\",\"location\":\"Location\",\"message\":\"Error Message\",\"anonymous\":\"Anonymous\",\"empty\":\"No error records yet. System clean! ✨\"},\"cache\":{\"title\":\"Magic Drafts (Cache) Status\",\"desc\":\"Fill the missing ones sequentially with automatic queue.\",\"optimize\":\"Optimize System\",\"fixing\":\"Fixing...\",\"fill_missing\":\"Auto Fill Missing\",\"search_placeholder\":\"Search in drafts...\",\"filter_all\":\"ALL\",\"filter_tr\":\"TR\",\"filter_en\":\"EN\",\"status_all\":\"ALL\",\"status_full\":\"FULL\",\"status_missing\":\"EMPTY\",\"table_theme\":\"Scenario Topic\",\"table_genre\":\"Genre\",\"table_lang\":\"Lang\",\"table_status\":\"Status\",\"status_ready\":\"READY\",\"status_generating\":\"GENERATING...\",\"status_missing_label\":\"MISSING\"},\"crm\":{\"title\":\"User Management (CRM)\",\"search_placeholder\":\"Search user by email...\",\"bonus_quota\":\"Bonus Quota\",\"status\":\"Status\",\"actions\":\"Actions\",\"magic_draft\":\"Magic Draft\",\"suspended\":\"Suspended\",\"active\":\"Active\",\"add_5\":\"+5 Drafts\",\"add_10\":\"+10 Drafts\",\"activate\":\"Activate\",\"suspend\":\"Suspend\",\"not_found\":\"User not found.\"},\"switches\":{\"title\":\"System Switches (Feature Flags)\",\"maintenance_mode\":\"Maintenance Mode\",\"maintenance_desc\":\"When activated, all users except admins are redirected to the 'Maintenance' page.\",\"system_locked\":\"System Currently Locked\",\"voice_cloning\":\"Voice Cloning Feature\",\"voice_cloning_desc\":\"Enables or disables the feature for users to upload their own voices and have stories read.\",\"feature_disabled\":\"Feature Disabled\"},\"messages\":{\"cache_full\":\"All drafts are already full! ✨\",\"error\":\"Error:\",\"queue_started\":\"Queue started. Please do not close this page until operations are finished.\",\"queue_completed\":\"All productions completed successfully! 🚀\",\"migration_confirm\":\"Stories produced in old format will be made compatible with the new system. Do you confirm?\",\"migration_success\":\"old records successfully updated!\",\"confirm_title\":\"Confirmation Required\",\"confirm_desc\":\"Total {count} missing drafts found. These drafts will be produced sequentially via Google Vertex AI. It is recommended not to close the page during the process.\",\"confirm_start\":\"Yes, Start Queue\",\"confirm_cancel\":\"Cancel\",\"quota_success\":\"Great! +{amount} new 'Magic Draft' ✨ credits successfully assigned to user.\",\"suspend_success\":\"User account suspended. 🚫\",\"activate_success\":\"User account reactivated. ✅\"}},\"settings\":{\"title\":\"Account Settings\",\"back_to_library\":\"Back to Library\",\"subscription_details\":\"Subscription Details\",\"current_plan\":\"Current Plan\",\"status\":\"Subscription Status\",\"status_active\":\"● Active\",\"status_passive\":\"○ Passive\",\"start_date\":\"Start Date\",\"next_renewal\":\"Next Renewal\",\"end_date\":\"End Date\",\"auto_pay_active\":\"Auto-Pay Active\",\"auto_pay_desc\":\"Your subscription will be automatically charged from your card on the renewal date.\",\"manage_payment\":\"Manage Payment Method\",\"loading\":\"Loading...\",\"upgrade_title\":\"Upgrade Your Package\",\"support_title\":\"Need Support?\",\"support_desc\":\"Contact us for any questions regarding subscriptions or payments.\",\"plans\":{\"premium\":\"Golden Sun 👑\",\"pro\":\"Silver Sky ☁️\",\"free\":\"Cotton Cloud (Free) ☁️\"},\"messages\":{\"checkout_error\":\"Could not redirect to payment page.\",\"portal_error\":\"Could not open portal.\",\"portal_unavailable\":\"Subscription management page currently unavailable.\"}},\"auth\":{\"login\":{\"welcome\":\"Welcome\",\"subtitle\":\"Log in to continue.\",\"google_button\":\"Continue with Google\",\"or\":\"OR\",\"email_label\":\"Email Address\",\"email_placeholder\":\"example@mail.com\",\"password_label\":\"Password\",\"forgot_password\":\"Forgot Password?\",\"button_loading\":\"Logging in...\",\"button\":\"Log In\",\"no_account\":\"Don't have an account?\",\"register_now\":\"Register Now\"},\"register\":{\"title\":\"Create Account\",\"subtitle\":\"Start creating magical tales for your child.\",\"google_button\":\"Continue with Google\",\"or\":\"OR\",\"success_title\":\"Registration Successful!\",\"success_desc\":\"Please click the verification link sent to your email address to activate your account.\",\"success_button\":\"Log In\",\"email_label\":\"Email Address\",\"email_placeholder\":\"example@mail.com\",\"password_label\":\"Password\",\"password_placeholder\":\"At least 6 characters\",\"lang_label\":\"App Language\",\"button_loading\":\"Registering...\",\"button\":\"Register\",\"has_account\":\"Already have an account?\",\"login_now\":\"Log In\"}},\"checkout\":{\"checking_status\":\"Checking Session\",\"checking_desc\":\"Please wait, we're bringing you to wonderful tales...\",\"redirecting_status\":\"Preparing Payment\",\"redirecting_desc\":\"You are being redirected to the secure payment page. Please do not close the page.\",\"error_title\":\"An Error Occurred\",\"error_desc\":\"Payment session could not be started. Please check your internet connection and try again.\",\"retry\":\"Retry\"},\"player\":{\"queue_title\":\"Story Queue\",\"empty_queue\":\"Your queue is empty. You can ensure continuity by adding tales from the library.\",\"next_track\":\"Next\",\"return_to_player\":\"Return to Player\",\"live_listen\":\"Live Listening\",\"queue_count\":\"{count} TALES IN QUEUE\",\"show_queue\":\"Show Queue\",\"now_playing\":\"NOW PLAYING\",\"status_playing\":\"The story continues at full speed...\",\"status_paused\":\"Play to continue the tale.\",\"page_label\":\"page\",\"back\":\"Back\",\"forward\":\"Forward\",\"fullscreen\":\"Fullscreen\",\"exit_fullscreen\":\"Exit Fullscreen\",\"loading_image\":\"Loading image...\",\"loading_story\":\"Loading tale...\",\"locked_message\":\"You must have a Silver Sky or Golden Sun plan to listen to audio tales in the Magic Library. Please upgrade your package from the settings page.\"},\"components\":{\"add_to_queue\":{\"added\":\"Added!\",\"in_queue\":\"In Queue\",\"add\":\"Add to Queue\",\"add_to\":\"Add to Queue\"},\"download_book\":{\"preparing\":\"Preparing...\",\"pdf_preparing\":\"Preparing PDF...\",\"download\":\"Download Book\"},\"pin\":{\"unpin\":\"Unpin Heroes\",\"pin\":\"Pin Heroes to Home\",\"error\":\"AN ERROR OCCURRED:\"}}}"));}),
"[project]/multilingual_version/locales/tr.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"navbar\":{\"pricing\":\"Fiyatlandırma\",\"how_it_works\":\"Nasıl Çalışır?\",\"library\":\"Sihirli Kütüphane\",\"parent_panel\":\"Ebeveyn Paneli\",\"logout\":\"Çıkış Yap\",\"login\":\"Giriş Yap\",\"return_home\":\"Ana Sayfaya Dön\",\"admin\":\"Admin\",\"lang_tr\":\"Türkçe\",\"lang_en\":\"English\"},\"hero\":{\"title\":\"Hayalinizdeki Masalları Birlikte Yazalım\",\"description\":\"Çocuğunuzun ismini, en sevdiği kahramanı ve temayı seçin. Gerisini yapay zekaya bırakın. Onlara özel, resimli ve sesli uyku öncesi maceraları oluşturun.\",\"cta_primary\":\"Masal Oluşturmaya Başla\",\"cta_secondary\":\"Abonelik Paketleri\"},\"features\":{\"safe\":\"Güvenli ve Reklamsız\",\"pedagogical\":\"Pedagojik Filtreler\",\"happy_families\":\"Yüzlerce Mutlu Aile\"},\"landing\":{\"form_subtitle\":\"✨ İlk Adımı Birlikte Atın\",\"form_title\":\"Macerayı Siz Belirleyin\",\"form_description\":\"Kahramanınıza birkaç kelimeyle yol gösterin, gerisini bize bırakın.\",\"features_badge\":\"MyStory Ayrıcalıkları\",\"features_title\":\"Her Gece Yeni Bir Dünyaya Uyanın\",\"features_subtitle\":\"Gelişmiş teknolojilerle çocuğunuzun hayal gücünü besleyen en güvenilir araç seti.\",\"feat1_title\":\"Görsel Şölen ve Seslendirme\",\"feat1_desc\":\"Her sayfa için özel oluşturulan yüksek kaliteli görseller ve stüdyo kalitesinde seslendirmeler.\",\"feat1_bullet1\":\"Farklı çizim stilleri\",\"feat1_bullet2\":\"Profesyonel anlatıcı\",\"feat2_title\":\"Kendi Sesinizden Masallar\",\"feat2_desc\":\"Sisteme kendi sesinizi tanıtın ve tüm masalları sizin sesinizden dinletin.\",\"feat2_bullet1\":\"Premium: Ses Klonlama\",\"feat2_bullet2\":\"Her zaman yanınızda hissetsin\",\"feat3_title\":\"Sonsuz Macera, Aynı Kahraman\",\"feat3_desc\":\"Kendi karakterlerinizi kütüphanenize kaydedin ve farklı masallarda rol almasını sağlayın.\",\"feat3_bullet1\":\"Karakter kütüphanesi\",\"feat3_bullet2\":\"Görsel tutarlılık\",\"feat4_title\":\"Değerler Eğitimi ve Güvenlik\",\"feat4_desc\":\"Arkadaşlık, dürüstlük veya paylaşma gibi dersleri masalın ana fikri yapın.\",\"feat4_bullet1\":\"Eğitici Mod seçeneği\",\"feat4_bullet2\":\"Yaşa uygun içerik\",\"footer\":\"© 2026 MyStory. Çocuğunuzun düşlerini aydınlatan masal dünyası.\"},\"voices\":{\"select\":\"Ses Seçin\",\"silent\":\"Sessiz\",\"grandpa\":{\"name\":\"Bilge Dede\",\"desc\":\"Tok, bilgece ve güven veren\"},\"rabbit\":{\"name\":\"Gezgin Tavşan\",\"desc\":\"Neşeli ve yerinde duramayan\"},\"knight\":{\"name\":\"Cesur Şövalye\",\"desc\":\"Güçlü ve kahramanvari\"},\"king\":{\"name\":\"Yüce Kral\",\"desc\":\"Otoriter ve onurlu\"},\"dad\":{\"name\":\"Heyecanlı Baba\",\"desc\":\"Sürprizleri seven ve oyunbaz\"},\"guardian\":{\"name\":\"Orman Muhafızı\",\"desc\":\"Derin ve koruyucu bir ses\"},\"mother\":{\"name\":\"Bilge Anne\",\"desc\":\"En şefkatli ve huzur veren\"},\"woman\":{\"name\":\"Masalcı Kadın\",\"desc\":\"Akıcı ve merak uyandıran\"},\"fairy_serenity\":{\"name\":\"Huzur Perisi\",\"desc\":\"Yumuşak ve sakinleştirici\"},\"fairy_magic\":{\"name\":\"Sihirli Peri\",\"desc\":\"Genç, taze ve büyülü\"},\"princess\":{\"name\":\"Gizemli Prenses\",\"desc\":\"Zarif, mistik ve asil\"},\"rainbow_girl\":{\"name\":\"Gökkuşağı Kızı\",\"desc\":\"Canlı, neşeli ve renkli\"}},\"pricing\":{\"hero_title\":\"Abone Ol ve Tasarruf Et\",\"hero_subtitle\":\"MyStory AI abonelik planlarına genel bakış. Çocuklarınızın yapay zeka ile sihirli hikayeler oluşturmasına yardımcı olun.\",\"monthly\":\"/ Aylık\",\"most_popular\":\"En Popüler\",\"secure_payment\":\"Stripe üzerinden güvenli ödeme\",\"cards_accepted\":\"Kartlar, dijital cüzdanlar kabul edilir.\",\"cancel_anytime\":\"İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yok.\",\"trust_text\":\"11.030'dan fazla mutlu ebeveyn ve eğitimciye katılın.\",\"stripe_powered\":\"Stripe tarafından desteklenmektedir.\",\"encryption\":\"256-bit SSL şifreleme\",\"instant_cancel\":\"Anında İptal Seçeneği\",\"features\":{\"request_limit\":\"İstek Limiti\",\"chapter_count\":\"Bölüm Sayısı\",\"story_length\":\"Hikaye Uzunluğu\",\"magic_shuffles\":\"Sihirli Taslaklar\",\"continue_adventure\":\"Maceraya Devam Et\",\"listening_list\":\"Sihirli Dinleme Listesi\",\"character_memory\":\"Kahraman Hafızası\",\"smart_transitions\":\"Akıllı Macera Geçişi\",\"magic_library\":\"Sihirli Kütüphane\",\"write_own\":\"Kendi Hikayeni Yaz\",\"story_limit\":\"Hikaye Limiti\",\"genre_selection\":\"Tür Seçimi\",\"archive\":\"Hikaye Arşivi\",\"library_access\":\"Kütüphane Erişimi\",\"parent_panel\":\"Ebeveyn Paneli\",\"audio_stories\":\"Sesli Hikayeler\",\"voice_cloning\":\"Ses Klonlama\",\"voice_models\":\"Ses Modelleri\",\"narration\":\"Hikaye Seslendirme\",\"license\":\"Yayınlama Lisansı\",\"podcast_output\":\"Podcast Çıktısı\",\"ebook_creation\":\"E-Kitap Oluşturma\"},\"values\":{\"off\":\"Kapalı\",\"on\":\"Dahil\",\"none\":\"Yok\",\"standard\":\"Standart\",\"advanced\":\"Gelişmiş\",\"full\":\"Tam Erişim\",\"text_only\":\"Sadece Metin\",\"audio_text\":\"Ses + Metin\",\"unlocked\":\"Kilitsiz\"},\"plans\":{\"free\":{\"name\":\"Pamuk Bulut\",\"desc\":\"Yeni başlayan küçük hayalperestler için.\",\"button\":\"Hemen Başla\"},\"pro\":{\"name\":\"Gümüş Gökyüzü\",\"desc\":\"Daha fazla macera ve ses klonlama isteyenler için.\",\"button\":\"Abone Ol ve Kazan\"},\"premium\":{\"name\":\"Altın Güneş\",\"desc\":\"Sonsuz hayal gücü ve en yüksek kalite.\",\"button\":\"Hemen Abone Ol\"}}},\"library\":{\"title\":\"Sihirli Kütüphane\",\"subtitle\":\"Hayal gücünüzle oluşturduğunuz eşsiz maceraların size özel koleksiyonu.\",\"no_stories\":\"Henüz bu kategoride masal bulunmuyor.\",\"create_now\":\"Hemen bir tane oluşturun!\",\"read_now\":\"Hemen Oku →\",\"default_preview\":\"Sihirli bir macera seni bekliyor...\",\"footer_slogan\":\"Hayal gücünle büyüyen bir dünya\",\"age_suffix\":\"Yaş\",\"genres\":{\"all\":\"Hepsi\",\"tale\":\"Masal\",\"sci_fi\":\"Bilim Kurgu\",\"adventure\":\"Macera\",\"fantasy\":\"Fantastik\",\"fable\":\"Fabl\"}},\"form\":{\"tabs\":{\"normal\":\"Normal Hikayeler\",\"educational\":\"Eğitici Masallar\",\"continue\":\"Maceraya Devam Et\"},\"placeholders\":{\"subscribe_to_write\":\"Kendi masalını yazmak için abone olmalısın. Şimdilik zar ikonuna basarak sürpriz masal üretebilirsin.\",\"manual_limit_reached\":\"Size özel hikaye limitiniz doldu! Lütfen taslakları deneyin.\",\"audio_limit_reached\":\"Sesli hikaye limitiniz doldu! Sadece 'Sessiz' masallar üretebilirsiniz.\",\"prompt_normal\":\"Bana ... hakkında bir masal yaz.\",\"prompt_educational\":\"Çocuğunuza ne öğretmek istersiniz? Örn: Ayşe'nin diş fırçalamayı öğrenmesi...\",\"continue_story_search\":\"Hangi Kahramanlarla Devam Etmek İstersin?\"},\"sections\":{\"voice\":\"Seslendirme\",\"genre\":\"Tür\",\"style\":\"Çizim Stili\",\"age\":\"Yaş Grubu\",\"characters\":\"Karakterler\",\"educational_value\":\"Öğretilecek Değer\",\"heroes_connected\":\"Bağlı Kahramanlar\",\"select_value\":\"Değer Seçin\",\"select_genre\":\"Tür Seçin\",\"select_style\":\"Stil Seçin\",\"select_age\":\"Yaş Seçin\"},\"buttons\":{\"select_voice\":\"Ses Seçin\",\"generate\":\"Masal Oluştur ✨\",\"randomize\":\"Sürpriz Seçim Yap\",\"edit\":\"Düzenle\",\"add_character\":\"Karakter Ekle\",\"cloning_voice\":\"Ses Klonlanıyor...\",\"clone_save\":\"Sesi Klonla ve Kaydet\"},\"messages\":{\"educational_error\":\"Eğitici mod için Gümüş Gökyüzü veya Altın Güneş paketine sahip olmalısınız.\",\"shuffle_limit\":\"Taslak limiti doldu\",\"shuffle_audio_limit\":\"Taslaklar için sesli limit doldu\",\"try_shuffles\":\"Taslakları dene! ✨\",\"empty_prompt\":\"Lütfen masal konusunu boş bırakmayın.\",\"no_voice\":\"Lütfen masalı okuyacak bir ses seçin.\",\"no_genre\":\"Lütfen bir masal türü seçin.\",\"no_style\":\"Lütfen bir çizim stili seçin.\",\"no_age\":\"Lütfen bir yaş grubu seçin.\",\"no_educational\":\"Lütfen öğretilecek değeri seçin.\",\"no_characters\":\"Lütfen en az bir karakter ekleyin.\",\"max_characters_error\":\"En fazla 3 karakter ekleyebilirsiniz.\",\"error_generic\":\"Bilinmeyen bir hata oluştu.\",\"voice_limit\":\"Kendi sesinizi klonlamak için Altın Güneş paketine sahip olmalısınız.\",\"voice_clone_success\":\"Ses başarıyla eklendi! Artık masalları sizin sesinizle okuyabiliriz.\",\"file_too_large\":\"Dosya boyutu çok büyük (Maks 10MB)\",\"cloning_error\":\"Ses klonlama hatası\"},\"prompt_template\":{\"in_style\":\"tarzında\",\"topic\":\"Konu\",\"style\":\"Çizim Stili\",\"voice\":\"Ses Seçimi\",\"characters\":\"Karakterler\",\"educational_value\":\"Eğitici Değer\",\"continuation\":\"BU BİR DEVAM HİKAYESİDİR. Önceki hikayenin karakterlerine ve konusuna sadık kalarak yeni bir macera yaz.\"}},\"parent\":{\"title\":\"Ebeveyn Kontrol Paneli\",\"subtitle\":\"Çocuklarınızın masal dünyasını buradan yönetin.\",\"stats_title\":\"Aylık Kullanım İstatistikleri\",\"archived_stories\":\"Arşivlenen Masallar\",\"magic_shuffles\":\"Sihirli Taslaklar\",\"custom_stories\":\"Özel Hikayeler\",\"custom_audio\":\"Özel Sesli Masallar\",\"continue_adventure\":\"Maceraya Devam Et\",\"quick_create_title\":\"Hemen Yeni Masal Oluştur!\",\"quick_create_desc\":\"Yapay zeka destekli yeni bir maceraya başlamak için tıkla.\",\"library_title\":\"Eski Masallar Kütüphanesi\",\"no_stories\":\"Henüz hiç masal oluşturmadınız.\",\"total_remaining\":\"Kalan Toplam Hak\",\"library_link\":\"Kütüphaneden eski hikayeleri seçebilirsiniz →\",\"upgrade_banner\":{\"title_pro\":\"Altın Güneş'e Yükselt! 👑\",\"title_free\":\"Premium'a Geç!\",\"desc\":\"Kendi sesini klonlayarak masalları sen anlat.\",\"button\":\"Yükselt\"}},\"story\":{\"not_found\":\"Masal bulunamadı\",\"back_to_library\":\"Kütüphaneye Dön\",\"back_to_parent\":\"Panele Dön\",\"start_new_adventure\":\"Yeni Macera Başlat\",\"created_for_you\":\"🌟 Bu masal sana özel oluşturuldu · MyStory\",\"audio_banner\":{\"title\":\"Sihirli Ses Kaydı Hazır!\",\"desc\":\"Bu masalı hemen akıcı bir seslendirme ile dinle.\",\"add_to_queue\":\"Sıraya Ekle\",\"added\":\"Sıraya Eklendi\",\"in_queue\":\"Sırada\",\"play_now\":\"Hemen Dinle\",\"playing\":\"Şu An Oynatılıyor...\"},\"download_pdf\":{\"button\":\"Kitabı İndir\",\"preparing\":\"PDF Hazırlanıyor...\",\"ready\":\"Hazırlanıyor...\",\"filename_suffix\":\"Kitabı\"},\"podcast\":{\"download\":\"Podcast İndir\",\"remaining\":\"Kalan\",\"limit_reached\":\"İndirme Limiti Doldu\",\"upgrade_required\":\"Premium Özellik\",\"upgrade_desc\":\"Podcast indirmek için paketinizi yükseltin.\"}},\"how_it_works\":{\"title\":\"Sihir Nasıl Gerçekleşiyor?\",\"subtitle\":\"Sadece üç adımda, çocuğunuzun başrolde olduğu o eşsiz uyku vakti dünyasını beraber kuralım.\",\"step1_title\":\"Hayal Tohumlarını Serpin\",\"step1_desc\":\"Çocuğunuzun ismini, sevdiği kahramanları ve maceranın nerede geçeceğini seçin. Sadece birkaç kelimeyle hayalinizdeki dünyayı anlatın.\",\"step2_title\":\"Sihirli Değneğe Dokunun\",\"step2_desc\":\"Yapay zeka sihrimiz, seçimlerinizi saniyeler içinde benzersiz, pedagojik ve sürükleyici bir masal macerasına dönüştürür.\",\"step3_title\":\"Masal Dünyasına Uyanın\",\"step3_desc\":\"Resimli ve sesli masalınız hazır! İster beraber okuyun, ister kendi sesinizden dinletin. Her gece yeni bir keşif sizi bekliyor.\",\"badge_safe\":\"✨ Sihirli ve Güvenli\",\"badge_custom\":\"🎨 Özelleştirilebilir\",\"cta_title\":\"Sihirli Bir Maceraya Hazır mısınız?\",\"cta_desc\":\"Çocuğunuzun hayal dünyasını beraber keşfedelim. İlk masalınızı oluşturmak sadece birkaç saniyenizi alacak.\",\"badge_safe_text\":\"Güvenli ve Reklamsız\",\"badge_custom_text\":\"Pedagojik Filtreler\",\"cta_button\":\"Hemen Masal Oluştur\",\"footer_copy\":\"© 2026 MyStory. Tüm hakları saklıdır.\"},\"admin\":{\"title\":\"Komuta Kontrol Merkezi\",\"subtitle\":\"Sistem genelindeki tüm aktiviteleri buradan takip edebilirsiniz.\",\"return_site\":\"Siteye Dön\",\"stats\":{\"gross_revenue\":\"Brüt Gelir\",\"net_revenue\":\"Komisyon Hariç\",\"total_stories\":\"Toplam Masal\",\"active_subscriptions\":\"Aktif Abonelik\",\"total_users\":\"Toplam Kayıt\",\"cache_total\":\"Toplam Taslak\",\"cache_full\":\"Dolu (Cache)\",\"cache_empty\":\"Eksik (Boş)\"},\"tables\":{\"recent_stories\":\"Son Üretilen Hikayeler\",\"user\":\"Kullanıcı\",\"story_title\":\"Masal Başlığı\",\"date\":\"Tarih\",\"action\":\"Aksiyon\",\"unknown\":\"Bilinmiyor\",\"page\":\"Sayfa\",\"prev\":\"Önceki\",\"next\":\"Sonraki\"},\"logs\":{\"title\":\"Sistem Hata Logları (Canlı)\",\"location\":\"Konum\",\"message\":\"Hata Mesajı\",\"anonymous\":\"Anonim\",\"empty\":\"Henüz bir hata kaydı bulunmuyor. Sistem temiz! ✨\"},\"cache\":{\"title\":\"Sihirli Taslaklar (Cache) Durumu\",\"desc\":\"Eksikleri otomatik kuyruk ile sırayla doldurun.\",\"optimize\":\"Sistemi Optimize Et\",\"fixing\":\"Düzeltiliyor...\",\"fill_missing\":\"Eksikleri Otomatik Doldur\",\"search_placeholder\":\"Taslaklarda ara...\",\"filter_all\":\"HEPSİ\",\"filter_tr\":\"TR\",\"filter_en\":\"EN\",\"status_all\":\"TÜMÜ\",\"status_full\":\"DOLU\",\"status_missing\":\"BOŞ\",\"table_theme\":\"Senaryo Konusu\",\"table_genre\":\"Tür\",\"table_lang\":\"Dil\",\"table_status\":\"Durum\",\"status_ready\":\"HAZIR\",\"status_generating\":\"ÜRETİLİYOR...\",\"status_missing_label\":\"EKSİK\"},\"crm\":{\"title\":\"Kullanıcı Yönetimi (CRM)\",\"search_placeholder\":\"E-posta ile kullanıcı ara...\",\"bonus_quota\":\"Bonus Kota\",\"status\":\"Durum\",\"actions\":\"Aksiyonlar\",\"magic_draft\":\"Sihirli Taslak\",\"suspended\":\"Askıda\",\"active\":\"Aktif\",\"add_5\":\"+5 Taslak\",\"add_10\":\"+10 Taslak\",\"activate\":\"Aktif Et\",\"suspend\":\"Askıya Al\",\"not_found\":\"Kullanıcı bulunamadı.\"},\"switches\":{\"title\":\"Sistem Şalterleri (Feature Flags)\",\"maintenance_mode\":\"Bakım Modu\",\"maintenance_desc\":\"Aktif edildiğinde, adminler hariç tüm kullanıcılar 'Bakımdayız' sayfasına yönlendirilir.\",\"system_locked\":\"Sistem Şu An Kilitli\",\"voice_cloning\":\"Ses Klonlama Özelliği\",\"voice_cloning_desc\":\"Kullanıcıların kendi seslerini yükleyip masal okutma özelliğini açar veya kapatır.\",\"feature_disabled\":\"Özellik Devre Dışı\"},\"messages\":{\"cache_full\":\"Tüm taslaklar zaten dolu! ✨\",\"error\":\"Hata:\",\"queue_started\":\"Kuyruk başlatıldı. Lütfen işlemler bitene kadar bu sayfayı kapatmayın.\",\"queue_completed\":\"Tüm üretimler başarıyla tamamlandı! 🚀\",\"migration_confirm\":\"Eski formatta üretilmiş hikayeler yeni sisteme uygun hale getirilecektir. Onaylıyor musunuz?\",\"migration_success\":\"adet eski kayıt başarıyla güncellendi!\",\"confirm_title\":\"Onay Gerekiyor\",\"confirm_desc\":\"Toplam {count} adet eksik taslak bulundu. Bu taslaklar Google Vertex AI üzerinden sırayla üretilecektir. İşlem sırasında sayfayı kapatmamanız önerilir.\",\"confirm_start\":\"Evet, Kuyruğu Başlat\",\"confirm_cancel\":\"Vazgeç\",\"quota_success\":\"Harika! Kullanıcıya +{amount} adet yeni 'Sihirli Taslak' ✨ hakkı başarıyla tanımlandı.\",\"suspend_success\":\"Kullanıcı hesabı askıya alındı. 🚫\",\"activate_success\":\"Kullanıcı hesabı yeniden aktif edildi. ✅\"}},\"settings\":{\"title\":\"Hesap Ayarları\",\"back_to_library\":\"Kütüphaneye Dön\",\"subscription_details\":\"Abonelik Detayları\",\"current_plan\":\"Mevcut Plan\",\"status\":\"Abonelik Durumu\",\"status_active\":\"● Aktif\",\"status_passive\":\"○ Pasif\",\"start_date\":\"Başlangıç Tarihi\",\"next_renewal\":\"Sıradaki Yenileme\",\"end_date\":\"Bitiş Tarihi\",\"auto_pay_active\":\"Otomatik Ödeme Aktif\",\"auto_pay_desc\":\"Aboneliğiniz yenileme tarihinde kartınızdan otomatik olarak tahsil edilecektir.\",\"manage_payment\":\"Ödeme Yöntemini Yönet\",\"loading\":\"Yükleniyor...\",\"upgrade_title\":\"Paketini Yükselt\",\"support_title\":\"Destek Lazım mı?\",\"support_desc\":\"Abonelik veya ödemelerle ilgili her türlü sorunuz için bize ulaşın.\",\"plans\":{\"premium\":\"Altın Güneş 👑\",\"pro\":\"Gümüş Gökyüzü ☁️\",\"free\":\"Pamuk Bulut (Ücretsiz) ☁️\"},\"messages\":{\"checkout_error\":\"Ödeme sayfasına yönlendirilemedi.\",\"portal_error\":\"Portal açılamadı.\",\"portal_unavailable\":\"Abonelik yönetim sayfasına şu an ulaşılamıyor.\"}},\"auth\":{\"login\":{\"welcome\":\"Hoş Geldiniz\",\"subtitle\":\"Devam etmek için giriş yapın.\",\"google_button\":\"Google ile Devam Et\",\"or\":\"VEYA\",\"email_label\":\"E-posta Adresi\",\"email_placeholder\":\"ornek@mail.com\",\"password_label\":\"Şifre\",\"forgot_password\":\"Şifremi Unuttum\",\"button_loading\":\"Giriş Yapılıyor...\",\"button\":\"Giriş Yap\",\"no_account\":\"Hesabınız yok mu?\",\"register_now\":\"Hemen Kaydolun\"},\"register\":{\"title\":\"Hesap Oluştur\",\"subtitle\":\"Çocuğunuz için sihirli masallar yaratmaya başlayın.\",\"google_button\":\"Google ile Devam Et\",\"or\":\"VEYA\",\"success_title\":\"Kayıt Başarılı!\",\"success_desc\":\"Lütfen e-posta adresinize gönderilen doğrulama bağlantısına tıklayarak hesabınızı aktif edin.\",\"success_button\":\"Giriş Yap\",\"email_label\":\"E-posta Adresi\",\"email_placeholder\":\"ornek@mail.com\",\"password_label\":\"Şifre\",\"password_placeholder\":\"En az 6 karakter\",\"lang_label\":\"Uygulama Dili / App Language\",\"button_loading\":\"Kaydediliyor...\",\"button\":\"Kayıt Ol\",\"has_account\":\"Zaten hesabınız var mı?\",\"login_now\":\"Giriş Yapın\"}},\"checkout\":{\"checking_status\":\"Oturum Kontrol Ediliyor\",\"success_title\":\"Harika Bir Başlangıç! ✨\",\"success_desc\":\"Aboneliğiniz başarıyla aktif edildi. Çocuğunuz için ilk sihirli masalı oluşturmaya hemen başlayabilirsiniz.\",\"button_home\":\"Ana Sayfaya Dön\",\"button_library\":\"Kütüphaneye Git\"},\"styles\":{\"watercolor\":\"Sulu Boya\",\"pixar\":\"3D Pixar Stili\",\"pastel\":\"Pastel Düşler\",\"anime\":\"Anime\",\"oil\":\"Yağlı Boya\",\"pop_art\":\"Pop Art\",\"cartoon\":\"Çizgi Film\",\"retro\":\"Vintage Retro\"},\"player\":{\"queue_title\":\"Masal Kuyruğu\",\"empty_queue\":\"Sıranız henüz boş. Kütüphaneden masal ekleyerek devamlılığı sağlayabilirsiniz.\",\"return_to_player\":\"Oynatıcıya Dön\",\"live_listen\":\"Canlı Dinletisi\",\"queue_count\":\"SIRADA {count} MASAL\",\"now_playing\":\"ŞU AN ÇALIYOR\",\"status_playing\":\"Hikaye tüm hızıyla devam ediyor...\",\"status_paused\":\"Masalın devamı için oynatın.\",\"page_label\":\"sayfa\",\"back\":\"Geri\",\"forward\":\"İleri\",\"fullscreen\":\"Tam Ekran\",\"exit_fullscreen\":\"Tam Ekrandan Çık\",\"loading_image\":\"Görsel yükleniyor...\",\"loading_story\":\"Masal yükleniyor...\",\"locked_message\":\"Sihirli Kitaplık'taki sesli masalları dinleyebilmek için Gümüş veya Altın paket sahibi olmanız gerekmektedir. Lütfen ayarlar sayfasından paketinizi yükseltin.\"},\"components\":{\"add_to_queue\":{\"added\":\"Eklendi!\",\"in_queue\":\"Sırada\",\"add\":\"Kuyruğa Ekle\",\"add_to\":\"Sıraya Ekle\"},\"download_book\":{\"preparing\":\"Hazırlanıyor...\",\"pdf_preparing\":\"PDF Hazırlanıyor...\",\"download\":\"Kitabı İndir\"},\"pin\":{\"unpin\":\"Kahramanları Sabitten Kaldır\",\"pin\":\"Kahramanları Ana Sayfaya Sabitle\",\"error\":\"BİR SORUN OLUŞTU:\"}}}"));}),
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
"[project]/multilingual_version/app/parent/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParentDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$heart$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookHeart$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/book-heart.mjs [app-rsc] (ecmascript) <export default as BookHeart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-rsc] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-rsc] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-rsc] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/shuffle.mjs [app-rsc] (ecmascript) <export default as Shuffle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/volume-2.mjs [app-rsc] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$services$2f$QuotaService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/services/QuotaService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$AddToQueueButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/AddToQueueButton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$PinButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/components/PinButton.tsx [app-rsc] (ecmascript)");
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
async function ParentDashboard({ searchParams }) {
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/login');
    }
    // Next.js 15 searchParams resolution
    const params = await searchParams;
    const success = params?.success;
    const plan = params?.plan;
    const GENRES = [
        t('library.genres.all'),
        t('library.genres.tale'),
        t('library.genres.sci_fi'),
        t('library.genres.adventure'),
        t('library.genres.fantasy'),
        t('library.genres.fable')
    ];
    const activeGenre = params?.genre || GENRES[0];
    // WEBHOOK BYPASS: If returning from Stripe Checkout successfully
    if (success === 'true' && typeof plan === 'string') {
        try {
            const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
            if (serviceKey) {
                const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://anxxcbbfhzwpwarywcbv.supabase.co"), serviceKey);
                await supabaseAdmin.from('subscriptions').upsert({
                    user_id: user.id,
                    status: 'active',
                    plan_id: plan,
                    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                }, {
                    onConflict: 'user_id'
                });
            }
        } catch (err) {
            console.error('Subscription sync error:', err);
        // Sayfayı çökertmemek için hatayı yutuyoruz, ancak abonelik geç yansıyabilir
        }
    }
    const quota = await __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$services$2f$QuotaService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QuotaService"].getUserQuotaStats(supabase, user.id);
    const { isPro, isPremium, audioUsed: mAudioUsed, audioLimit: mAudioLimit } = quota;
    // quota objesini UI'ın beklediği mAudio formatına uyumluyoruz
    Object.assign(quota, {
        mAudioUsed,
        mAudioLimit
    });
    const totalStories = quota.totalUsed;
    // Son Masallar (Görsel Liste için) - Zırhlı Sorgu
    let recentStories = [];
    try {
        let storiesQuery = supabase.from('stories').select('id, title, created_at, content_json, metadata, image_url, audio_url, is_pinned').eq('user_id', user.id).order('created_at', {
            ascending: false
        });
        if (activeGenre !== GENRES[0]) {
            storiesQuery = storiesQuery.filter('metadata->>genre', 'eq', activeGenre);
        }
        const { data: stories } = await storiesQuery.limit(20);
        recentStories = stories || [];
    } catch (error) {
        recentStories = [];
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#BDD9F2] font-nunito p-4 sm:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-sky-900/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-lora font-bold text-[#2d2d2d] tracking-tight",
                                    children: t('parent.title')
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1",
                                    children: t('parent.subtitle')
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 items-center",
                            children: [
                                isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold border border-purple-200",
                                    children: [
                                        "👑 ",
                                        t('pricing.plans.premium.name')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 16
                                }, this),
                                isPro && !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline-flex items-center bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-bold border border-sky-200",
                                    children: [
                                        "☁️ ",
                                        t('pricing.plans.pro.name')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 16
                                }, this),
                                quota.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin",
                                    className: "px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-bold shadow-sm",
                                    children: "Admin"
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/settings",
                                    className: "p-3 bg-[#BDD9F2] text-[#84B1D9] rounded-xl hover:bg-[#BDD9F2] transition border border-[#BDD9F2]/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#84B1D9] p-8 rounded-[2rem] text-white shadow-xl shadow-sky-900/20 relative overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8FBDD9] rounded-full mix-blend-screen filter blur-[40px] opacity-40"
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-lora font-bold mb-2 relative z-10",
                                            children: t('parent.quick_create_title')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sky-100 mb-6 relative z-10",
                                            children: t('parent.quick_create_desc')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/#create",
                                            className: "flex items-center justify-center w-full py-4 bg-white text-[#84B1D9] rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-md relative z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    size: 24,
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                t('form.buttons.generate')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white p-6 rounded-3xl shadow-sm border border-sky-900/10 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-gray-900 text-lg border-b border-sky-100 pb-4",
                                            children: t('parent.stats_title')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-4 bg-sky-50 border border-sky-100 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-sky-700 font-bold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$heart$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookHeart$3e$__["BookHeart"], {
                                                                    className: "mr-3 text-sky-500",
                                                                    size: 24
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 154,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " ",
                                                                t('parent.archived_stories')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-black text-sky-800",
                                                            children: totalStories
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-amber-700 font-bold text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"], {
                                                                    className: "mr-3 text-amber-500",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 162,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " ",
                                                                t('parent.magic_shuffles')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-amber-800",
                                                            children: [
                                                                Math.max(0, quota.shuffleLimit - quota.shuffleUsed),
                                                                " / ",
                                                                quota.shuffleLimit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-emerald-800 font-bold text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                    className: "mr-3 text-emerald-500",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " ",
                                                                t('parent.custom_stories')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-emerald-800",
                                                            children: [
                                                                Math.max(0, quota.manualLimit - quota.manualUsed),
                                                                " / ",
                                                                quota.manualLimit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-indigo-800 font-bold text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                                    className: "mr-3 text-indigo-500",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 182,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " ",
                                                                t('parent.custom_audio')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 181,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-indigo-800",
                                                            children: [
                                                                Math.max(0, mAudioLimit - mAudioUsed),
                                                                " / ",
                                                                mAudioLimit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-4 bg-sky-50 border border-sky-100 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-sky-800 font-bold text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    className: "mr-3 text-sky-500",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " ",
                                                                t('parent.continue_adventure')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-sky-800",
                                                            children: [
                                                                Math.max(0, quota.continueLimit - quota.continueUsed),
                                                                " / ",
                                                                quota.continueLimit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-sky-900/10 p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-lora font-bold text-[#2d2d2d]",
                                            children: t('parent.library_title')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2 pb-2",
                                            children: GENRES.map((genre)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/parent${genre === GENRES[0] ? '' : `?genre=${encodeURIComponent(genre)}`}`,
                                                    className: `px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeGenre === genre ? 'bg-[#84B1D9] text-white border-[#84B1D9] shadow-md' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`,
                                                    children: genre
                                                }, genre, false, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                recentStories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-10 text-gray-500",
                                    children: t('parent.no_stories')
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: recentStories.map((story)=>{
                                        const meta = story.metadata || {};
                                        // Karakterleri content_json'dan veya metadata'dan çek
                                        const characters = meta.characters || (Array.isArray(story.content_json) ? [] : []) // Basit bir fallback
                                        ;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/story/${story.id}?source=parent`,
                                            className: "group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-sky-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative aspect-[4/3] overflow-hidden",
                                                    children: [
                                                        story.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-4 right-4 z-20",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$PinButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                storyId: story.id,
                                                                initialPinned: !!story.is_pinned
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 27
                                                        }, this),
                                                        story.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            src: story.image_url,
                                                            alt: story.title,
                                                            fill: true,
                                                            className: "object-cover transition-transform duration-700 group-hover:scale-110"
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-full bg-sky-50 flex items-center justify-center text-sky-200",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$heart$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookHeart$3e$__["BookHeart"], {
                                                                size: 64
                                                            }, void 0, false, {
                                                                fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 27
                                                        }, this),
                                                        story.audio_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-4 right-4 flex gap-2 animate-in fade-in zoom-in duration-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$components$2f$AddToQueueButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                    story: {
                                                                        id: story.id,
                                                                        title: story.title,
                                                                        audio_url: story.audio_url || "",
                                                                        image_url: story.image_url || ""
                                                                    },
                                                                    iconOnly: true,
                                                                    className: "bg-white/90 backdrop-blur-md shadow-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 266,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg text-emerald-500",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                        lineNumber: 277,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 276,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-7 space-y-4 flex-grow flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-xl font-lora font-bold text-gray-800 leading-tight group-hover:text-[#84B1D9] transition-colors line-clamp-2",
                                                                    children: story.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    className: "text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: [
                                                                meta.genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-sky-100/50 text-sky-800 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-sky-200/50 flex items-center gap-1",
                                                                    children: [
                                                                        "📖 ",
                                                                        meta.genre
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 29
                                                                }, this),
                                                                meta.style && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-amber-50 text-amber-700 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-amber-100 flex items-center gap-1",
                                                                    children: [
                                                                        "🎨 ",
                                                                        meta.style
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 300,
                                                                    columnNumber: 29
                                                                }, this),
                                                                meta.voice_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-emerald-100 flex items-center gap-1",
                                                                    children: [
                                                                        "🎙️ ",
                                                                        meta.voice_name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 305,
                                                                    columnNumber: 29
                                                                }, this),
                                                                meta.age_group && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-purple-50 text-purple-700 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-purple-100 flex items-center gap-1",
                                                                    children: [
                                                                        "👶 ",
                                                                        meta.age_group,
                                                                        " ",
                                                                        t('library.age_suffix')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 310,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 25
                                                        }, this),
                                                        Array.isArray(story.content_json) && story.content_json[0]?.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-500 text-[13px] leading-relaxed line-clamp-3",
                                                            children: story.content_json[0].text
                                                        }, void 0, false, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-4 mt-auto border-t border-gray-50 flex justify-between items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 text-[10px] text-gray-400 font-bold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                            lineNumber: 325,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        new Date(story.created_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[11px] font-bold text-[#84B1D9] group-hover:translate-x-1 transition-transform",
                                                                    children: t('library.read_now')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                                    lineNumber: 328,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, story.id, true, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 238,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this),
                                !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `mt-8 ${isPro ? 'bg-purple-50 border-purple-200' : 'bg-[#BDD9F2] border-[#BDD9F2]'} border rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-inner`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: `${isPro ? 'text-purple-800' : 'text-[#84B1D9]'} font-lora font-bold text-lg`,
                                                    children: isPro ? t('parent.upgrade_banner.title_pro') : t('parent.upgrade_banner.title_free')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 mt-1",
                                                    children: t('parent.upgrade_banner.desc')
                                                }, void 0, false, {
                                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 342,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/settings",
                                            className: `mt-4 md:mt-0 px-6 py-3 ${isPro ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-[#BDD9F2] hover:bg-[#BDD9F2] text-amber-950'} rounded-xl font-bold shadow-sm transition-all inline-block text-center`,
                                            children: t('parent.upgrade_banner.button')
                                        }, void 0, false, {
                                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                            lineNumber: 348,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multilingual_version/app/parent/page.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multilingual_version/app/parent/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/multilingual_version/app/parent/page.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/multilingual_version/app/parent/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
}),
"[project]/multilingual_version/app/parent/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/multilingual_version/app/parent/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a23ea8cf._.js.map