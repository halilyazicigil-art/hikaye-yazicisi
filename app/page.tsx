import StoryForm from '@/components/StoryForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black text-indigo-900 tracking-tight">
            Hikaye Yazıcısı 🐝
          </h1>
          <nav className="flex gap-4">
            <Link 
              href="/login" 
              className="font-semibold text-indigo-600 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all border border-indigo-100"
            >
              Ebeveyn Girişi
            </Link>
          </nav>
        </header>

        <div className="mt-8">
          <StoryForm />
        </div>
      </div>
    </main>
  )
}
