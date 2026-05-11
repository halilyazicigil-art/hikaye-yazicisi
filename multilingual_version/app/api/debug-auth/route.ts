import { NextResponse } from 'next/server';
import { getVertexAccessToken } from '@/utils/vertex-auth';

export async function GET() {
    try {
        console.log(">>> [DEBUG AUTH] Test başlatılıyor...");
        const token = await getVertexAccessToken();
        
        if (token) {
            return NextResponse.json({ 
                success: true, 
                message: "Google Auth BAŞARILI! ✅",
                tokenPrefix: token.substring(0, 10) + "...",
                envCheck: {
                    email: process.env.GOOGLE_SA_CLIENT_EMAIL ? "Mevcut ✅" : "EKSİK ❌",
                    keyLength: process.env.GOOGLE_SA_PRIVATE_KEY?.length || 0
                }
            });
        } else {
            return NextResponse.json({ success: false, message: "Token boş döndü! ❌" });
        }
    } catch (error: any) {
        console.error(">>> [DEBUG AUTH] Hata:", error.message);
        return NextResponse.json({ 
            success: false, 
            message: "Hata Alındı! ❌", 
            error: error.message,
            stack: error.stack,
            envCheck: {
                email: process.env.GOOGLE_SA_CLIENT_EMAIL ? "Mevcut ✅" : "EKSİK ❌",
                keyLength: process.env.GOOGLE_SA_PRIVATE_KEY?.length || 0
            }
        }, { status: 500 });
    }
}
