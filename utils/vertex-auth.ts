import { GoogleAuth } from 'google-auth-library';

export async function getVertexAccessToken() {
    // Önce env'deki manuel token'ı kontrol et (test için)
    if (process.env.GOOGLE_VERTEX_ACCESS_TOKEN && process.env.GOOGLE_VERTEX_ACCESS_TOKEN.startsWith('AQ.')) {
        return process.env.GOOGLE_VERTEX_ACCESS_TOKEN;
    }

    try {
        const auth = new GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SA_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
