import { NextRequest } from 'next/server';
import { EnterpriseQueue } from '@/utils/security/enterprise-queue';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
        return new Response('Missing jobId parameter', { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            // Bağlantının kopmaması için 15 saniyede bir kalp atışı (keep-alive)
            const keepAliveInterval = setInterval(() => {
                try {
                    controller.enqueue(encoder.encode(': keep-alive\n\n'));
                } catch (e) {
                    clearInterval(keepAliveInterval);
                }
            }, 15000);

            // Yeni ilerleme durumlarını SSE formatında paketler ve gönderir
            const progressHandler = (message: any) => {
                try {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
                    
                    // İş bittiyse veya başarısız olduysa yayını kapat
                    if (message.progress === 100 || message.progress === -1) {
                        cleanup();
                    }
                } catch (e) {
                    cleanup();
                }
            };

            const cleanup = () => {
                clearInterval(keepAliveInterval);
                EnterpriseQueue.progressEmitter.off(`progress:${jobId}`, progressHandler);
                try {
                    controller.close();
                } catch (e) {}
            };

            // İlerleme kanalı dinleyicisini ekle
            EnterpriseQueue.progressEmitter.on(`progress:${jobId}`, progressHandler);

            // İstek sonlandırıldığında (Client çıkışı) tüm event listener ve interval'leri temizle
            req.signal.addEventListener('abort', () => {
                cleanup();
            });
        },
        cancel() {
            // Akış iptal edildiğinde yapılacak işlemler
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}
export const dynamic = 'force-dynamic';
