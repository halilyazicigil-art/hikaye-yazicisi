'use client'

import { useState } from 'react'
import { Search, UserPlus, ShieldAlert, CheckCircle2, Ban, UserCheck } from 'lucide-react'
import { addBonusQuotaAction, toggleUserSuspensionAction as toggleUserStatusAction } from '@/app/actions/adminActions'
import { useLanguage } from '@/context/LanguageContext'
import { toast } from 'sonner'

export default function UserManagement({ initialUsers }: { initialUsers: any[] }) {
    const { t } = useLanguage()
    const [users, setUsers] = useState(initialUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const filteredUsers = users.filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleAddQuota = async (userId: string, amount: number) => {
        setLoadingId(userId)
        const res = await addBonusQuotaAction(userId, amount)
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, bonus_quota: u.bonus_quota + amount } : u))
            toast.success(t('admin.messages.quota_success').replace('{amount}', amount.toString()))
        }
        setLoadingId(null)
    }

    const handleToggleStatus = async (userId: string, newStatus: boolean) => {
        setLoadingId(userId)
        const res = await toggleUserStatusAction(userId, newStatus)
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_suspended: newStatus } : u))
            toast.success(newStatus ? t('admin.messages.suspend_success') : t('admin.messages.activate_success'))
        }
        setLoadingId(null)
    }

    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mt-12">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between bg-white gap-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 font-lora">
                        <ShieldAlert className="text-blue-500" />
                        {t('admin.crm.title')}
                    </h2>
                </div>
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder={t('admin.crm.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-blue-300 transition-all"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-8 py-5">{t('admin.tables.user')}</th>
                            <th className="px-8 py-5">{t('admin.crm.bonus_quota')}</th>
                            <th className="px-8 py-5">{t('admin.crm.status')}</th>
                            <th className="px-8 py-5 text-right">{t('admin.crm.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50/30 transition group">
                                <td className="px-8 py-6 font-bold text-gray-900">{user.email}</td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">
                                        {user.bonus_quota} {t('admin.crm.magic_draft')}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    {user.is_suspended ? (
                                        <span className="inline-flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                                            <Ban size={12} /> {t('admin.crm.suspended')}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                            <CheckCircle2 size={12} /> {t('admin.crm.active')}
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => handleAddQuota(user.id, 5)}
                                            disabled={loadingId === user.id}
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-[10px] font-black hover:bg-gray-50 transition active:scale-95 disabled:opacity-50"
                                        >
                                            {t('admin.crm.add_5')}
                                        </button>
                                        <button 
                                            onClick={() => handleAddQuota(user.id, 10)}
                                            disabled={loadingId === user.id}
                                            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black hover:bg-black transition active:scale-95 disabled:opacity-50"
                                        >
                                            {t('admin.crm.add_10')}
                                        </button>
                                        <button 
                                            onClick={() => handleToggleStatus(user.id, !user.is_suspended)}
                                            disabled={loadingId === user.id}
                                            className={`w-10 h-10 flex items-center justify-center rounded-xl transition active:scale-95 disabled:opacity-50 ${
                                                user.is_suspended 
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100' 
                                                : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
                                            }`}
                                            title={user.is_suspended ? t('admin.crm.activate') : t('admin.crm.suspend')}
                                        >
                                            {user.is_suspended ? <UserCheck size={18} /> : <Ban size={18} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-bold">
                                    {t('admin.crm.not_found')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
