'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'

interface ManageSubscriptionButtonProps {
  label: string
}

export default function ManageSubscriptionButton({ label }: ManageSubscriptionButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleManage = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Portal could not be opened.')
      }
    } catch (e) {
      alert('Subscription management is currently unavailable.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleManage}
      disabled={loading}
      className="w-full md:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm active:scale-95 group disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin text-gray-400" />
      ) : (
        <CreditCard size={18} className="text-gray-400 group-hover:text-gray-900" />
      )}
      {label}
    </button>
  )
}
