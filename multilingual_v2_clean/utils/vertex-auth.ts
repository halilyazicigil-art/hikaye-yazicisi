import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

// ============================================================
// 🔑 API ANAHTAR KONFİGURASYONU
// Yeni bir Service Account eklemek için bu diziye yeni bir nesne ekleyin.
// Sistem otomatik olarak sağlıklı anahtarlar arasında döner.
// ============================================================
export interface ServiceAccountConfig {
    id: string;                  // Tanımlayıcı isim (loglarda görünür)
    clientEmail: string;
    privateKey: string;
    projectId: string;
    isActive: boolean;           // false yaparsanız bu anahtar hiç kullanılmaz
    priority: number;            // Düşük sayı = önce denenecek
}

// ============================================================
// 📦 ANAHTAR HAVUZU — ENV'den otomatik yüklenir
// SA_2_CLIENT_EMAIL / SA_2_PRIVATE_KEY gibi env değişkenleri
// ekleyerek yedek anahtarları sisteme dahil edebilirsiniz.
// ============================================================
function loadServiceAccounts(): ServiceAccountConfig[] {
    const accounts: ServiceAccountConfig[] = [];

    // Birincil hesap (her zaman zorunlu)
    const primaryEmail = getEnvVar('GOOGLE_SA_CLIENT_EMAIL');
    const primaryKey = getEnvVar('GOOGLE_SA_PRIVATE_KEY');
    const primaryProject = getEnvVar('GOOGLE_CLOUD_PROJECT_ID');

    if (primaryEmail && primaryKey && primaryProject) {
        accounts.push({
            id: 'primary',
            clientEmail: primaryEmail,
            privateKey: normalizePrivateKey(primaryKey),
            projectId: primaryProject,
            isActive: true,
            priority: 1
        });
    }

    // Yedek hesaplar — SA_2, SA_3 ... SA_10 olarak ekleyebilirsiniz
    for (let i = 2; i <= 10; i++) {
        const email = getEnvVar(`GOOGLE_SA_${i}_CLIENT_EMAIL`);
        const key = getEnvVar(`GOOGLE_SA_${i}_PRIVATE_KEY`);
        const project = getEnvVar(`GOOGLE_SA_${i}_PROJECT_ID`) || primaryProject;
        const active = getEnvVar(`GOOGLE_SA_${i}_ACTIVE`) !== 'false'; // Default: aktif

        if (email && key && project) {
            accounts.push({
                id: `backup-${i}`,
                clientEmail: email,
                privateKey: normalizePrivateKey(key),
                projectId: project,
                isActive: active,
                priority: i
            });
        }
    }

    return accounts.sort((a, b) => a.priority - b.priority);
}

// ============================================================
// 🔒 ANAHTAR SAĞLIK TAKİPÇİSİ
// 429 alan anahtarı geçici olarak devre dışı bırakır.
// Cooldown süresi dolunca otomatik yeniden aktif eder.
// ============================================================
interface KeyHealth {
    accountId: string;
    isThrottled: boolean;
    throttledUntil: number;      // Unix timestamp (ms)
    requestCount: number;        // Bu oturumda yapılan toplam istek
    errorCount: number;          // 429 sayısı
}

const keyHealthMap = new Map<string, KeyHealth>();

function getKeyHealth(accountId: string): KeyHealth {
    if (!keyHealthMap.has(accountId)) {
        keyHealthMap.set(accountId, {
            accountId,
            isThrottled: false,
            throttledUntil: 0,
            requestCount: 0,
            errorCount: 0
        });
    }
    return keyHealthMap.get(accountId)!;
}

function throttleKey(accountId: string, cooldownMs: number) {
    const health = getKeyHealth(accountId);
    health.isThrottled = true;
    health.throttledUntil = Date.now() + cooldownMs;
    health.errorCount++;
    console.warn(`>>> [KEY ROTATOR] Anahtar '${accountId}' ${Math.round(cooldownMs / 1000)}sn cooldown'a alındı (429 #${health.errorCount})`);
}

function releaseKey(accountId: string) {
    const health = getKeyHealth(accountId);
    if (health.isThrottled && Date.now() >= health.throttledUntil) {
        health.isThrottled = false;
        console.log(`>>> [KEY ROTATOR] Anahtar '${accountId}' cooldown'dan çıktı, tekrar aktif.`);
    }
}

// ============================================================
// 🔄 TOKEN CACHE — Her SA için ayrı cache, 50dk geçerli
// ============================================================
interface CachedToken {
    token: string;
    expiresAt: number;
}
const tokenCache = new Map<string, CachedToken>();

async function getTokenForAccount(account: ServiceAccountConfig): Promise<string> {
    const cached = tokenCache.get(account.id);
    if (cached && Date.now() < cached.expiresAt) {
        return cached.token;
    }

    const auth = new GoogleAuth({
        credentials: {
            client_email: account.clientEmail,
            private_key: account.privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token!;

    tokenCache.set(account.id, {
        token,
        expiresAt: Date.now() + 50 * 60 * 1000 // 50 dakika
    });

    return token;
}

// ============================================================
// 🌐 KURUMSAL VERTEX AI CALLER
// - Otomatik anahtar rotasyonu
// - 429 exponential backoff
// - Tüm modeller için tek giriş noktası
// ============================================================
export interface VertexCallResult {
    response: any;
    accountId: string;   // Hangi SA ile başarılı oldu
    projectId: string;
}

export async function callVertexAI(
    modelPath: string,           // örn: "models/gemini-3-flash-preview:generateContent"
    body: any,
    options?: {
        maxRetries?: number;
        timeoutMs?: number;
        signal?: AbortSignal;
        preferredSlot?: 'primary' | 'backup';
    }
): Promise<VertexCallResult> {
    let accounts = loadServiceAccounts().filter(a => a.isActive);
    if (accounts.length === 0) {
        throw new Error('Hiçbir aktif Google Service Account bulunamadı.');
    }

    // 🔒 STRICT SLOT ISOLATION: Eğer belirli bir yuva tercih edildiyse, sadece o yuvaya ait hesapları kullan.
    // Bu sayede paralel çalışan işlerin birbirlerinin API kanallarına sızması kesin olarak engellenir.
    if (options?.preferredSlot) {
        accounts = accounts.filter(a => {
            return options.preferredSlot === 'primary' 
                ? a.id === 'primary' 
                : (a.id.startsWith('backup') || a.id !== 'primary');
        });
        if (accounts.length === 0) {
            throw new Error(`Belirtilen yuva (${options.preferredSlot}) için aktif Google Service Account bulunamadı.`);
        }
    }

    const maxRetries = options?.maxRetries ?? 100; // Keep trying persistently
    const timeoutMs = options?.timeoutMs ?? 30_000;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        // Sağlıklı bir anahtar seç
        const account = selectHealthyAccount(accounts);
        if (!account) {
            // Tüm anahtarlar throttled — en kısa cooldown'ı bekle
            const waitMs = getShortestCooldown(accounts);
            console.warn(`>>> [VERTEX CALLER] Tüm anahtarlar throttled. ${Math.round(waitMs/1000)}sn bekleniyor...`);
            await sleep(waitMs);
            attempt--; // Do not consume an attempt count just for waiting
            continue;
        }

        // Cooldown kontrolü
        releaseKey(account.id);
        const health = getKeyHealth(account.id);
        if (health.isThrottled) continue;

        try {
            health.requestCount++;
            const token = await getTokenForAccount(account);
            const url = `https://aiplatform.googleapis.com/v1/projects/${account.projectId}/locations/global/publishers/google/${modelPath}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            let res: Response;
            try {
                res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                    signal: options?.signal ?? controller.signal
                });
            } finally {
                clearTimeout(timeoutId);
            }

            // 429: Rate limit — bu anahtarı throttle et, diğerine geç
            if (res.status === 429) {
                const retryAfterHeader = res.headers.get('Retry-After');
                const cooldownMs = retryAfterHeader
                    ? parseInt(retryAfterHeader) * 1000
                    : Math.min(30_000 * Math.pow(2, attempt), 300_000); // Max 5 dakika

                throttleKey(account.id, cooldownMs);
                lastError = new Error(`429 Rate Limit (${account.id})`);

                // Başka anahtar varsa hemen geç, yoksa bekle
                const hasAlternative = accounts.some(a => {
                    if (a.id === account.id || !a.isActive) return false;
                    releaseKey(a.id);
                    return !getKeyHealth(a.id).isThrottled;
                });

                if (!hasAlternative) {
                    console.warn(`>>> [VERTEX CALLER] Yedek anahtar yok, ${Math.round(cooldownMs/1000)}sn bekleniyor...`);
                    await sleep(Math.min(cooldownMs, 60_000));
                }
                continue;
            }

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const errMsg = (errData as any).error?.message || `HTTP ${res.status}`;
                throw new Error(errMsg);
            }

            const data = await res.json();
            return { response: data, accountId: account.id, projectId: account.projectId };

        } catch (err: any) {
            if (err.name === 'AbortError') {
                lastError = new Error(`Vertex AI timeout (${timeoutMs}ms) — ${account.id}`);
            } else {
                lastError = err;
            }

            // Exponential backoff: non-429 hatalar için
            const backoffMs = 2000 * Math.pow(2, attempt);
            console.warn(`>>> [VERTEX CALLER] Hata (attempt ${attempt + 1}/${maxRetries}): ${err.message}. ${Math.round(backoffMs/1000)}sn sonra retry.`);
            await sleep(Math.min(backoffMs, 30_000));
        }
    }

    throw lastError || new Error('Vertex AI: Maksimum deneme sayısına ulaşıldı.');
}

// ============================================================
// 📊 ANAHTAR SAĞLIK RAPORU (Admin Dashboard için)
// ============================================================
export function getApiKeyHealthReport() {
    const accounts = loadServiceAccounts();
    return accounts.map(account => {
        const health = getKeyHealth(account.id);
        releaseKey(account.id);
        return {
            id: account.id,
            projectId: account.projectId,
            isActive: account.isActive,
            isThrottled: health.isThrottled,
            throttledUntilMs: health.isThrottled ? health.throttledUntil : null,
            requestCount: health.requestCount,
            errorCount: health.errorCount
        };
    });
}

// ============================================================
// ♻️ GERİ UYUMLU FONKSİYON — Eski kodlar bozulmadan çalışır
// ============================================================
export async function getVertexAccessToken(slot?: 'primary' | 'backup'): Promise<string | null> {
    const accounts = loadServiceAccounts().filter(a => a.isActive);
    if (accounts.length === 0) return null;
    
    let account = accounts[0];
    if (slot === 'primary') {
        account = accounts.find(a => a.id === 'primary') || accounts[0];
    } else if (slot === 'backup') {
        account = accounts.find(a => a.id === 'backup-2') || accounts.find(a => a.id.startsWith('backup')) || accounts[0];
    } else {
        account = selectHealthyAccount(accounts) || accounts[0];
    }
    
    return await getTokenForAccount(account);
}

export function getActiveProjectId(slot?: 'primary' | 'backup'): string {
    const accounts = loadServiceAccounts().filter(a => a.isActive);
    if (accounts.length === 0) {
        return process.env.GOOGLE_CLOUD_PROJECT_ID || '';
    }
    
    let account = accounts[0];
    if (slot === 'primary') {
        account = accounts.find(a => a.id === 'primary') || accounts[0];
    } else if (slot === 'backup') {
        account = accounts.find(a => a.id === 'backup-2') || accounts.find(a => a.id.startsWith('backup')) || accounts[0];
    } else {
        account = selectHealthyAccount(accounts) || accounts[0];
    }
    
    return account.projectId;
}

// ============================================================
// 🛠️ YARDIMCI FONKSİYONLAR
// ============================================================
function selectHealthyAccount(accounts: ServiceAccountConfig[]): ServiceAccountConfig | null {
    for (const account of accounts) {
        if (!account.isActive) continue;
        releaseKey(account.id);
        const health = getKeyHealth(account.id);
        if (!health.isThrottled) return account;
    }
    return null;
}

function getShortestCooldown(accounts: ServiceAccountConfig[]): number {
    let shortest = 60_000;
    for (const account of accounts) {
        const health = getKeyHealth(account.id);
        if (health.isThrottled) {
            const remaining = health.throttledUntil - Date.now();
            if (remaining < shortest) shortest = remaining;
        }
    }
    return Math.max(shortest, 1000);
}

function normalizePrivateKey(raw: string): string {
    return raw
        .replace(/^["']|["']$/g, '')
        .replace(/\\\\n/g, '\n')
        .replace(/\\n/g, '\n');
}

function getEnvVar(key: string): string | undefined {
    const val = process.env[key];
    if (val) return val;

    // Yerel fallback: .env dosyasından direkt oku
    try {
        const envPath = path.join(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const match = content.match(new RegExp(`^${key}=(.*)`, 'm'));
            if (match) return match[1].trim().replace(/^["']|["']$/g, '');
        }
    } catch {}
    return undefined;
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
