import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

export async function getVertexAccessToken() {
    let clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
    let privateKeyRaw = process.env.GOOGLE_SA_PRIVATE_KEY;

    // 🛡️ YEREL FALLBACK: Eğer env değişkenleri eksikse veya Next.js bunları bozmuşsa direkt dosyadan oku
    if (!clientEmail || !privateKeyRaw || privateKeyRaw.length < 100) {
        try {
            const envPath = path.join(process.cwd(), '.env');
            if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, 'utf8');
                const emailMatch = envContent.match(/GOOGLE_SA_CLIENT_EMAIL=(.*)/);
                const keyMatch = envContent.match(/GOOGLE_SA_PRIVATE_KEY=(.*)/);
                if (emailMatch) clientEmail = emailMatch[1].trim().replace(/^["']|["']$/g, '');
                if (keyMatch) privateKeyRaw = keyMatch[1].trim().replace(/^["']|["']$/g, '');
            }
        } catch (e) {
            console.error(">>> [AUTH] .env dosyası doğrudan okunamadı:", e);
        }
    }

    try {
        const privateKey = privateKeyRaw
            ? privateKeyRaw
                .replace(/^["']|["']$/g, '')
                .replace(/\\\\n/g, '\n')
                .replace(/\\n/g, '\n')
            : undefined;

        if (!privateKey || !clientEmail) {
            throw new Error("Google Service Account bilgileri (.env) bulunamadı.");
        }

        const auth = new GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });

        const client = await auth.getClient();
        const token = await client.getAccessToken();
        return token.token;
    } catch (error) {
        console.error(">>> [AUTH HATA]: Access token alınamadı:", error);
        throw error;
    }
}
