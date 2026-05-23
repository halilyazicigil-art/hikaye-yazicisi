import { Construction } from 'lucide-react'
import Link from 'next/link'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-sky-50 rounded-3xl flex items-center justify-center text-sky-500 shadow-inner animate-pulse">
            <Construction size={48} />
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-4 font-lora tracking-tight">
          Sistemi Sizin İçin <span className="text-sky-500">Güzelleştiriyoruz</span>
        </h1>
        
        <p className="text-gray-500 font-medium leading-relaxed mb-10">
          Deneyiminizi iyileştirmek için kısa süreli bir bakım çalışması yapıyoruz. 
          Sihirli masallarımız çok yakında daha güçlü bir şekilde geri dönecek. ✨
        </p>
        
        <div className="space-y-4">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 w-2/3 rounded-full animate-[shimmer_2s_infinite]"></div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Tamamlanıyor... %65
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-100">
          <Link 
            href="/admin" 
            className="text-xs font-bold text-gray-400 hover:text-sky-500 transition-colors uppercase tracking-widest"
          >
            Yönetici Girişi
          </Link>
        </div>
      </div>
    </div>
  )
}
