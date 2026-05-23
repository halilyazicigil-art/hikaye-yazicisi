'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { AlertTriangle, ChevronDown, ChevronUp, Terminal, User, Clock, Activity, ShieldAlert } from 'lucide-react'

export default function LogViewer({ initialLogs, dict }: { initialLogs: any[], dict: any }) {
  const [logs, setLogs] = useState(initialLogs || [])
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null)
  const supabase = createClient()

  // 📡 GERÇEK ZAMANLI (REALTIME) TAKİP
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'error_logs' }, 
        (payload) => {
          setLogs((prev) => [payload.new, ...prev].slice(0, 50)) // Son 50 logu tut
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  // --- Yardımcılar ---
  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'FATAL': return 'bg-red-500 text-white shadow-red-200'
      case 'ERROR': return 'bg-red-100 text-red-600 border-red-200'
      case 'WARN': return 'bg-orange-100 text-orange-600 border-orange-200'
      default: return 'bg-blue-50 text-blue-600 border-blue-100'
    }
  }

  const getServiceLabel = (service: string) => {
    return service || 'SYSTEM'
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-100 overflow-hidden mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header */}
      <div className="p-8 border-b border-orange-50 flex items-center justify-between bg-orange-50/30">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-200">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 font-lora flex items-center gap-3">
              {dict.admin.logs.title}
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-600 font-black tracking-widest uppercase">Live</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-8 py-5 w-48">Zaman Damgası</th>
              <th className="px-8 py-5 w-32">Seviye</th>
              <th className="px-8 py-5 w-40">Kaynak</th>
              <th className="px-8 py-5">Mesaj</th>
              <th className="px-8 py-5 text-right">Detay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logs.map((log: any) => (
              <React.Fragment key={log.id}>
                <tr 
                  className={`group transition-all cursor-pointer ${expandedLogId === log.id ? 'bg-orange-50/30' : 'hover:bg-gray-50/50'}`}
                  onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm font-bold tracking-tight">
                        {new Date(log.created_at).toLocaleTimeString('tr-TR')}
                      </span>
                      <span className="text-gray-400 text-[10px] font-medium">
                        {new Date(log.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest border transition-all ${getLevelStyles(log.level)}`}>
                      {log.level || 'ERROR'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <span className="text-gray-600 text-xs font-black uppercase tracking-tighter">
                        {getServiceLabel(log.service)}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <p className={`text-sm font-bold ${log.level === 'FATAL' ? 'text-red-600' : 'text-gray-700'} line-clamp-1`}>
                        {log.error_message}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                        <span className="flex items-center gap-1"><Terminal size={12}/> {log.location}</span>
                        {log.user_email && <span className="flex items-center gap-1"><User size={12}/> {log.user_email}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm text-gray-400">
                      {expandedLogId === log.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                    </button>
                  </td>
                </tr>

                {/* Expanded Details */}
                {expandedLogId === log.id && (
                  <tr>
                    <td colSpan={5} className="px-8 py-6 bg-gray-50/50">
                      <div className="bg-[#1e1e1e] rounded-3xl p-8 shadow-inner border border-gray-800 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                          <div className="flex items-center gap-3">
                            <Activity className="text-emerald-400" size={18} />
                            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Teknik Metadata</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <ShieldAlert className="text-amber-400" size={18} />
                             <span className="text-white/40 text-[10px] font-medium italic">Sadece Geliştirici Modu</span>
                          </div>
                        </div>
                        <pre className="text-sky-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {JSON.stringify(log.metadata || {}, null, 2)}
                        </pre>
                        {log.user_id && (
                          <div className="mt-6 pt-4 border-t border-white/5 flex gap-4">
                            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white/60 text-[10px] font-bold">
                              User ID: {log.user_id}
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white/60 text-[10px] font-bold">
                              Timestamp: {log.created_at}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <ShieldAlert size={48} className="text-gray-200" />
                    <p className="text-gray-400 font-bold">{dict.admin.logs.empty}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
