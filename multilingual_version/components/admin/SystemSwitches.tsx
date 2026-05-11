'use client'

import { useState } from 'react'
import { ShieldAlert, Mic } from 'lucide-react'
import { toggleSystemSettingAction as updateSystemSettingAction } from '@/app/actions/adminActions'
import { useLanguage } from '@/context/LanguageContext'

export default function SystemSwitches({ initialSettings }: { initialSettings: any }) {
    const { t } = useLanguage()
    const [settings, setSettings] = useState(initialSettings)
    const [loading, setLoading] = useState<string | null>(null)

    const handleToggle = async (key: string, currentValue: boolean) => {
        setLoading(key)
        const res = await updateSystemSettingAction(key as 'maintenance_mode' | 'voice_cloning_enabled', !currentValue)
        if (res.success) {
            setSettings({ ...settings, [key]: !currentValue })
        }
        setLoading(null)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Bakım Modu */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl transition-colors ${settings.maintenance_mode ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>
                        <ShieldAlert size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 font-lora">{t('admin.switches.maintenance_mode')}</h3>
                        <p className="text-gray-400 text-xs font-medium mt-1">{t('admin.switches.maintenance_desc')}</p>
                    </div>
                </div>
                
                <button 
                    type="button"
                    onClick={() => handleToggle('maintenance_mode', settings.maintenance_mode)}
                    disabled={loading === 'maintenance_mode'}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${settings.maintenance_mode ? 'bg-red-500' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.maintenance_mode ? 'translate-x-7' : 'translate-x-1'}`} />
                    {settings.maintenance_mode && <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">{t('admin.switches.system_locked')}</span>}
                </button>
            </div>

            {/* Ses Klonlama Özelliği */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl transition-colors ${settings.voice_cloning_enabled ? 'bg-sky-50 text-sky-600' : 'bg-gray-50 text-gray-400'}`}>
                        <Mic size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 font-lora">{t('admin.switches.voice_cloning')}</h3>
                        <p className="text-gray-400 text-xs font-medium mt-1">{t('admin.switches.voice_cloning_desc')}</p>
                    </div>
                </div>
                
                <button 
                    type="button"
                    onClick={() => handleToggle('voice_cloning_enabled', settings.voice_cloning_enabled)}
                    disabled={loading === 'voice_cloning_enabled'}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${settings.voice_cloning_enabled ? 'bg-sky-500' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.voice_cloning_enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                    {!settings.voice_cloning_enabled && <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">{t('admin.switches.feature_disabled')}</span>}
                </button>
            </div>
        </div>
    )
}
