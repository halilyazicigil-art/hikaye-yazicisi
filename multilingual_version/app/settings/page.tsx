import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { QuotaService } from '@/services/QuotaService'
import { ShieldCheck, ArrowLeft, Sparkles, Crown } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton'

export default async function SettingsPage() {
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

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'premium': return t('settings.plans.premium')
      case 'pro': return t('settings.plans.pro')
      default: return t('settings.plans.free')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/parent" className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-sm group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 font-lora">{t('settings.title')}</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Subscription Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <ShieldCheck size={200} />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
              <div className="space-y-6 flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-full border border-sky-100">
                  <Crown size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">{t('settings.subscription_details')}</span>
                </div>

                <div>
                  <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">{t('settings.current_plan')}</h2>
                  <p className="text-4xl font-black text-gray-900 font-lora">{getPlanName(subscription?.plan_id)}</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{t('settings.status')}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${subscription?.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                      {subscription?.status === 'active' ? t('settings.status_active') : t('settings.status_passive')}
                    </span>
                  </div>
                  
                  {subscription?.current_period_start && (
                    <div>
                      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{t('settings.start_date')}</h3>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(subscription.current_period_start).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}

                  {subscription?.current_period_end && (
                    <div className="col-span-2 md:col-span-1">
                      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">
                        {subscription.cancel_at_period_end ? t('settings.end_date') : t('settings.next_renewal')}
                      </h3>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(subscription.current_period_end).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>

                {subscription?.status === 'active' && !subscription.cancel_at_period_end && (
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <div>
                      <p className="text-emerald-900 text-xs font-black">{t('settings.auto_pay_active')}</p>
                      <p className="text-emerald-700/70 text-[10px] font-medium">{t('settings.auto_pay_desc')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto pt-6 md:pt-0">
                {subscription?.status === 'active' ? (
                  <ManageSubscriptionButton label={t('settings.manage_payment')} />
                ) : (
                  <Link href="/pricing" className="w-full md:w-auto px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Sparkles size={18} className="text-yellow-400" />
                    {t('settings.upgrade_title')}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-900 font-lora mb-6">{t('settings.support_title')}</h2>
            <p className="text-gray-500 font-medium mb-8">
              {t('settings.support_desc')}
            </p>
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Email</p>
              <p className="text-lg font-black text-gray-900">destek@mystory.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckCircle2({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}
