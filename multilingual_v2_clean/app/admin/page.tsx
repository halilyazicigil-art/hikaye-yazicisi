import { createClient, createAdminClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { QuotaService } from '@/services/QuotaService'
import { BarChart3, Users, Book, Clock, ChevronRight, AlertTriangle, DollarSign, TrendingUp, Activity, Search, Power } from 'lucide-react'
import Link from 'next/link'
import UserManagement from '@/components/admin/UserManagement'
import SystemSwitches from '@/components/admin/SystemSwitches'
import ScenarioDashboard from '@/components/admin/ScenarioDashboard'
import LogViewer from '@/components/admin/LogViewer'
import VertexCostDashboard from '@/components/admin/VertexCostDashboard'
import { getScenariosCacheStatus } from '@/app/actions/adminCacheActions'
import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'tr'
  const dict = await getDictionary(language as 'tr' | 'en')
  const t = (key: string) => {
    const keys = key.split('.')
    let val: any = dict
    for (const k of keys) {
      val = val?.[k]
    }
    return val || key
  }

  const params = await searchParams;
  const page = Number(params.page) || 1;
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Yetki Kontrolü (Server-Side RBAC)
  const quota = await QuotaService.getUserQuotaStats(supabase, user.id)
  if (quota.role !== 'admin') {
    redirect('/')
  }

  // 2. İstatistikleri Çek (Admin yetkisiyle)
  const adminSupabase = await createAdminClient()
  const [
    { count: totalStories },
    { count: totalUsers },
    { count: activeSubsCount },
    { data: recentStories, count: totalStoriesCount },
    { data: errorLogs },
    { data: paymentsData },
    { data: usersData },
    { data: systemSettings },
    cacheData,
    { data: jobCostsData }
  ] = await Promise.all([
    adminSupabase.from('stories').select('*', { count: 'exact', head: true }),
    adminSupabase.from('users').select('*', { count: 'exact', head: true }),
    adminSupabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    adminSupabase.from('stories')
      .select('id, title, created_at, user_id, users(email)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to),
    adminSupabase.from('error_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
    adminSupabase.from('payments').select('amount'),
    adminSupabase.from('users').select('id, email, bonus_quota, is_suspended').order('created_at', { ascending: false }).limit(100),
    adminSupabase.from('system_settings').select('*').eq('id', 1).maybeSingle(),
    getScenariosCacheStatus(),
    adminSupabase.from('job_costs').select('*').order('created_at', { ascending: false }).limit(200)
  ])

  const totalGrossRevenue = (paymentsData || []).reduce((acc: number, curr: any) => acc + (Number(curr.amount) || 0), 0);
  const totalStripeFees = (paymentsData || []).reduce((acc: number, curr: any) => acc + (Number(curr.amount) * 0.029 + 0.3), 0); // %2.9 + 0.30 USD Sabit
  const netRevenue = Math.max(0, totalGrossRevenue - totalStripeFees);
  const totalPages = Math.ceil((totalStoriesCount || 0) / itemsPerPage);

  const totalVertexCost = (jobCostsData || []).reduce((acc: number, curr: any) => acc + (Number(curr.total_cost) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 font-lora">{t('admin.title')}</h1>
            <p className="text-gray-500 font-medium">{t('admin.subtitle')}</p>
          </div>
          <Link href="/" className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition shadow-sm">
            {t('admin.return_site')}
          </Link>
        </div>

        {/* SaaS Kokpit - Birleştirilmiş İstatistikler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          {/* Brüt Gelir */}
          <div className="bg-gradient-to-br from-gray-900 to-slate-800 p-6 rounded-[2rem] shadow-xl border border-white/5 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400">
                <DollarSign size={20} />
              </div>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest">Revenue</span>
            </div>
            <div>
              <p className="text-2xl font-black text-white">${totalGrossRevenue.toFixed(0)}</p>
              <p className="text-white/40 text-[9px] font-bold mt-1 uppercase tracking-widest">{t('admin.stats.gross_revenue')}</p>
            </div>
          </div>

          {/* Net Gelir */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <TrendingUp size={20} />
              </div>
              <span className="text-[9px] font-black text-blue-600 bg-blue-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Net</span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">${netRevenue.toFixed(0)}</p>
              <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">{t('admin.stats.net_revenue')}</p>
            </div>
          </div>

          {/* Vertex AI Maliyeti */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <BarChart3 size={20} />
              </div>
              <span className="text-[9px] font-black text-amber-600 bg-amber-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Vertex AI</span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">${totalVertexCost.toFixed(3)}</p>
              <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">{t('admin.stats.vertex_cost')}</p>
            </div>
          </div>

          {/* Toplam Masal */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-sky-50 rounded-xl text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Book size={20} />
              </div>
              <span className="text-[9px] font-black text-sky-600 bg-sky-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Stories</span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{totalStories || 0}</p>
              <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">{t('admin.stats.total_stories')}</p>
            </div>
          </div>

          {/* Aktif Abonelik */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Activity size={20} />
              </div>
              <span className="text-[9px] font-black text-purple-600 bg-purple-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Active</span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{activeSubsCount || 0}</p>
              <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">{t('admin.stats.active_subscriptions')}</p>
            </div>
          </div>

          {/* Toplam Kullanıcı */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Users size={20} />
              </div>
              <span className="text-[9px] font-black text-orange-600 bg-orange-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Users</span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{totalUsers || 0}</p>
              <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">{t('admin.stats.total_users')}</p>
            </div>
          </div>
        </div>

        {/* Son İşlemler Tablosu */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <Clock className="text-sky-500" />
              {t('admin.tables.recent_stories')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">{t('admin.tables.user')}</th>
                  <th className="px-8 py-5">{t('admin.tables.story_title')}</th>
                  <th className="px-8 py-5">{t('admin.tables.date')}</th>
                  <th className="px-8 py-5 text-right">{t('admin.tables.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentStories?.map((story: any) => (
                  <tr key={story.id} className="hover:bg-gray-50/30 transition group">
                    <td className="px-8 py-6 font-medium text-gray-500 text-sm">
                      {story.users?.email || t('admin.tables.unknown')}
                    </td>
                    <td className="px-8 py-6 font-black text-gray-900 text-lg">
                      {story.title}
                    </td>
                    <td className="px-8 py-6 text-gray-400 text-xs font-bold">
                      {new Date(story.created_at).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link 
                        href={`/story/${story.id}`} 
                        className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-400 rounded-full group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm"
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
            <div className="text-gray-400 text-xs font-black uppercase tracking-widest">
              {t('admin.tables.page')} {page} / {totalPages || 1}
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/admin?page=${page - 1}`}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${
                  page <= 1 
                    ? 'bg-gray-100 text-gray-300 border-gray-100 pointer-events-none' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95'
                }`}
              >
                {t('admin.tables.prev')}
              </Link>
              <Link 
                href={`/admin?page=${page + 1}`}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${
                  page >= totalPages 
                    ? 'bg-gray-100 text-gray-300 border-gray-100 pointer-events-none' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95'
                }`}
              >
                {t('admin.tables.next')}
              </Link>
            </div>
          </div>
        </div>

        {/* Vertex AI Maliyet Analizi Paneli */}
        <VertexCostDashboard initialCosts={jobCostsData || []} />

        {/* Sihirli Taslaklar (Cache Dashboard) */}
        <ScenarioDashboard initialData={cacheData} />

        {/* Kullanıcı Yönetimi (CRM) */}
        <UserManagement initialUsers={usersData || []} />

        {/* Sistem Şalterleri (Feature Flags) */}
        <SystemSwitches initialSettings={systemSettings || { maintenance_mode: false, voice_cloning_enabled: false }} />

        {/* Sistem Hata Logları (Canlı İzleme Merkezi) */}
        <LogViewer initialLogs={errorLogs || []} dict={dict} />
      </div>
    </div>
  )
}
