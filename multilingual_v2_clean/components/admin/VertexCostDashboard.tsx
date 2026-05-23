'use client'

import React, { useState } from 'react'
import { Cpu, DollarSign, Layers, Database, Sparkles, TrendingUp, Calendar, ArrowUpRight, Calculator, Plus, Minus } from 'lucide-react'

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const formatDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr)
    const pad = (n: number) => n.toString().padStart(2, '0')
    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
    return `${pad(d.getDate())} ${months[d.getMonth()]} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  } catch (e) {
    return dateStr
  }
}

interface JobCost {
  id: string
  job_id: string
  step_name: string
  model_name: string
  input_tokens: number
  output_tokens: number
  input_cost: number
  output_cost: number
  total_cost: number
  created_at: string
}

interface VertexCostDashboardProps {
  initialCosts: JobCost[]
}

export default function VertexCostDashboard({ initialCosts }: VertexCostDashboardProps) {
  const [filterModel, setFilterModel] = useState<string>('all')
  const [filterStep, setFilterStep] = useState<string>('all')

  // Interactive Simulator States
  const [simBooks, setSimBooks] = useState<number>(1)
  const [simPages, setSimPages] = useState<number>(12)
  const [simImages, setSimImages] = useState<number>(12)
  const [simAudio, setSimAudio] = useState<number>(12)
  const [simText, setSimText] = useState<boolean>(true)

  // Calculate totals
  const totalCost = initialCosts.reduce((acc, curr) => acc + Number(curr.total_cost), 0)
  const totalInputTokens = initialCosts.reduce((acc, curr) => acc + curr.input_tokens, 0)
  const totalOutputTokens = initialCosts.reduce((acc, curr) => acc + curr.output_tokens, 0)
  const totalTokens = totalInputTokens + totalOutputTokens

  // Dynamic averages based on actual logs, strictly computed from database records without static fallbacks
  const textCosts = initialCosts.filter(c => c.step_name === 'text_generation')
  const avgTextCost = textCosts.length > 0 
    ? textCosts.reduce((acc, curr) => acc + Number(curr.total_cost), 0) / textCosts.length 
    : 0

  const pageImageCosts = initialCosts.filter(c => c.step_name.startsWith('page_image_'))
  const avgImageCost = pageImageCosts.length > 0 
    ? pageImageCosts.reduce((acc, curr) => acc + Number(curr.total_cost), 0) / pageImageCosts.length 
    : 0

  const audioCosts = initialCosts.filter(c => c.step_name.startsWith('audio_page_'))
  const avgAudioCost = audioCosts.length > 0 
    ? audioCosts.reduce((acc, curr) => acc + Number(curr.total_cost), 0) / audioCosts.length 
    : 0

  // Interactive Simulator Calculations
  const simTextCost = simText ? simBooks * avgTextCost : 0
  const simImageCost = simBooks * simImages * avgImageCost
  const simAudioCost = simBooks * simAudio * avgAudioCost
  const simTotalCost = simTextCost + simImageCost + simAudioCost

  // Group by model
  const modelBreakdown = initialCosts.reduce((acc: { [key: string]: { cost: number, count: number, tokens: number } }, curr) => {
    if (!acc[curr.model_name]) {
      acc[curr.model_name] = { cost: 0, count: 0, tokens: 0 }
    }
    acc[curr.model_name].cost += Number(curr.total_cost)
    acc[curr.model_name].count += 1
    acc[curr.model_name].tokens += (curr.input_tokens + curr.output_tokens)
    return acc
  }, {})

  // Group by step (category)
  const stepBreakdown = initialCosts.reduce((acc: { [key: string]: { cost: number, tokens: number } }, curr) => {
    let cleanStep = 'Diğer'
    if (curr.step_name === 'text_generation') cleanStep = 'Metin Üretimi'
    else if (curr.step_name === 'master_image') cleanStep = 'Kapak Görseli'
    else if (curr.step_name.startsWith('page_image_')) cleanStep = 'Sayfa Görselleri'
    else if (curr.step_name.startsWith('audio_page_')) cleanStep = 'Seslendirme'

    if (!acc[cleanStep]) {
      acc[cleanStep] = { cost: 0, tokens: 0 }
    }
    acc[cleanStep].cost += Number(curr.total_cost)
    acc[cleanStep].tokens += (curr.input_tokens + curr.output_tokens)
    return acc
  }, {})

  // Distinct values for filters
  const models = ['all', ...Array.from(new Set(initialCosts.map(c => c.model_name)))]
  const steps = ['all', ...Array.from(new Set(initialCosts.map(c => c.step_name)))]

  // Filtered costs
  const filteredCosts = initialCosts.filter(c => {
    const matchModel = filterModel === 'all' || c.model_name === filterModel
    const matchStep = filterStep === 'all' || c.step_name === filterStep
    return matchModel && matchStep
  })

  // Format step name for user display
  const formatStepName = (step: string) => {
    if (step === 'text_generation') return 'Metin Üretimi'
    if (step === 'master_image') return 'Kapak Görseli'
    if (step.startsWith('page_image_')) {
      const pageNum = step.replace('page_image_', '')
      return `Sayfa ${Number(pageNum) + 1} Görseli`
    }
    if (step.startsWith('audio_page_')) {
      const pageNum = step.replace('audio_page_', '')
      return `Sayfa ${Number(pageNum) + 1} Seslendirme`
    }
    return step
  }

  // Get model badge color
  const getModelBadge = (model: string) => {
    if (model.includes('tts')) return 'bg-purple-50 text-purple-600 border-purple-100'
    if (model.includes('image')) return 'bg-sky-50 text-sky-600 border-sky-100'
    return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mt-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-amber-500/5 to-orange-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <Cpu className="text-amber-500 animate-pulse" />
            Vertex AI Maliyet Takip Paneli
          </h2>
          <p className="text-gray-400 text-xs font-semibold mt-1">
            Yapay zeka modellerinin anlık API maliyetleri, token harcamaları ve model dağılımları
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 bg-white hover:border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Tüm Modeller</option>
            {models.filter(m => m !== 'all').map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={filterStep}
            onChange={(e) => setFilterStep(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 bg-white hover:border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Tüm Adımlar</option>
            {steps.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>{formatStepName(s)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Spend Analytics grid */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50/30">
        
        {/* Total Spend KPI */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-3xl shadow-md border border-white/10 text-white flex flex-col justify-between hover:scale-[1.01] transition-all cursor-default">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <DollarSign size={20} />
            </div>
            <span className="text-[9px] font-black text-amber-100 bg-white/15 px-2 py-1 rounded-full uppercase tracking-widest">Total Spend</span>
          </div>
          <div>
            <p className="text-3xl font-black">${totalCost.toFixed(5)}</p>
            <p className="text-amber-100/60 text-[9px] font-bold mt-1 uppercase tracking-widest">Toplam Harcanan Maliyet</p>
          </div>
        </div>

        {/* Total Tokens KPI */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Database size={20} />
            </div>
            <span className="text-[9px] font-black text-blue-600 bg-blue-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Tokens</span>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{formatNumber(totalTokens)}</p>
            <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">
              Toplam Harcanan Token ({formatNumber(totalInputTokens)} G / {formatNumber(totalOutputTokens)} Ç)
            </p>
          </div>
        </div>

        {/* Average Cost per Step */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <TrendingUp size={20} />
            </div>
            <span className="text-[9px] font-black text-purple-600 bg-purple-600/10 px-2 py-1 rounded-full uppercase tracking-widest">Avg Cost</span>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              ${(initialCosts.length > 0 ? totalCost / initialCosts.length : 0).toFixed(5)}
            </p>
            <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">İşlem Başına Ortalama Maliyet</p>
          </div>
        </div>

        {/* Transaction Count */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all cursor-default group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Layers size={20} />
            </div>
            <span className="text-[9px] font-black text-emerald-600 bg-emerald-600/10 px-2 py-1 rounded-full uppercase tracking-widest">APIs</span>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{initialCosts.length}</p>
            <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">Toplam Kayıtlı API Çağrısı</p>
          </div>
        </div>

      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Model Breakdown */}
        <div className="lg:col-span-1 border border-gray-100 p-6 rounded-3xl">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            Model Kırılımları
          </h3>
          
          <div className="space-y-4">
            {Object.keys(modelBreakdown).length === 0 ? (
              <p className="text-gray-400 text-xs font-semibold text-center py-6">Kayıtlı model verisi bulunmuyor.</p>
            ) : (
              Object.entries(modelBreakdown).map(([model, data]) => {
                const percentage = totalCost > 0 ? (data.cost / totalCost) * 100 : 0
                return (
                  <div key={model} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-gray-700">
                      <span className="truncate max-w-[150px]">{model}</span>
                      <span>${data.cost.toFixed(5)} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          model.includes('tts') ? 'bg-purple-500' : model.includes('image') ? 'bg-sky-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      {data.count} istek · {formatNumber(data.tokens)} token
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Step Breakdown */}
        <div className="lg:col-span-1 border border-gray-100 p-6 rounded-3xl">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Layers size={16} className="text-blue-500" />
            İşlem Adımı Kırılımları
          </h3>
          
          <div className="space-y-4">
            {Object.keys(stepBreakdown).length === 0 ? (
              <p className="text-gray-400 text-xs font-semibold text-center py-6">Kayıtlı adım verisi bulunmuyor.</p>
            ) : (
              Object.entries(stepBreakdown).map(([step, data]) => {
                const percentage = totalCost > 0 ? (data.cost / totalCost) * 100 : 0
                return (
                  <div key={step} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-gray-700">
                      <span>{step}</span>
                      <span>${data.cost.toFixed(5)} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      {formatNumber(data.tokens)} token harcandı
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Recent Costs Table (Mini View) & Simulator */}
        <div className="lg:col-span-1 border border-gray-100 p-6 rounded-3xl flex flex-col justify-between bg-white shadow-sm">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Calendar size={16} className="text-purple-500" />
              Maliyet Detayları Özeti
            </h3>
            
            {/* Real averages */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs border-b border-gray-50 pb-2">
                <span className="font-semibold text-gray-500">Ort. Metin Üretimi:</span>
                <span className="font-black text-gray-900">${avgTextCost.toFixed(5)}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-gray-50 pb-2">
                <span className="font-semibold text-gray-500">Ort. Sayfa Görseli:</span>
                <span className="font-black text-gray-900">${avgImageCost.toFixed(5)}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-gray-50 pb-2">
                <span className="font-semibold text-gray-500">Ort. Seslendirme:</span>
                <span className="font-black text-gray-900">${avgAudioCost.toFixed(5)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-500">Kanal Verimliliği:</span>
                <span className="font-black text-emerald-600 flex items-center gap-0.5">
                  %100 Aktif <ArrowUpRight size={14} />
                </span>
              </div>
            </div>

            {/* Interactive Cost Simulator Section */}
            <div className="border-t border-gray-100 my-6 pt-5">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Calculator size={16} className="text-amber-500 animate-bounce" style={{ animationDuration: '3s' }} />
                Maliyet Simülatörü
              </h3>

              <div className="space-y-4">
                {/* Kitap Sayısı (Adet) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Kitap Sayısı</label>
                    <span className="text-xs font-black text-gray-900">{simBooks} Adet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSimBooks(prev => Math.max(1, prev - 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={12} />
                    </button>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={simBooks}
                      onChange={(e) => setSimBooks(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <button 
                      onClick={() => setSimBooks(prev => Math.min(100, prev + 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Kitap Sayfa Sayısı */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Kitap Sayfa Sayısı</label>
                    <span className="text-xs font-black text-gray-900">{simPages} Sayfa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSimPages(prev => Math.max(1, prev - 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={12} />
                    </button>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={simPages}
                      onChange={(e) => setSimPages(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <button 
                      onClick={() => setSimPages(prev => Math.min(50, prev + 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Görsel Sayısı */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Görsel Sayısı</label>
                    <span className="text-xs font-black text-gray-900">{simImages} Adet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSimImages(prev => Math.max(0, prev - 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={12} />
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={simImages}
                      onChange={(e) => setSimImages(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <button 
                      onClick={() => setSimImages(prev => Math.min(50, prev + 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Seslendirme Sayısı */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Seslendirme Sayısı</label>
                    <span className="text-xs font-black text-gray-900">{simAudio} Adet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSimAudio(prev => Math.max(0, prev - 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={12} />
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={simAudio}
                      onChange={(e) => setSimAudio(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <button 
                      onClick={() => setSimAudio(prev => Math.min(50, prev + 1))}
                      className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Metin Dahil Toggle */}
                <div className="flex justify-between items-center py-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Metin Üretimi Dahil</label>
                  <button 
                    onClick={() => setSimText(prev => !prev)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      simText ? 'bg-amber-500' : 'bg-gray-200'
                    }`}
                  >
                    <span 
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        simText ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Simulation Result Box */}
              <div className="mt-5 bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 rounded-2xl space-y-2 border border-gray-100">
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Simüle Metin Maliyeti:</span>
                  <span className="font-black text-gray-700">${simTextCost.toFixed(5)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Simüle Görsel Maliyeti:</span>
                  <span className="font-black text-gray-700">${simImageCost.toFixed(5)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Simüle Ses Maliyeti:</span>
                  <span className="font-black text-gray-700">${simAudioCost.toFixed(5)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-black text-gray-900 border-t border-gray-200/60 pt-2.5 mt-2.5">
                  <span className="uppercase tracking-wider">Tahmini Toplam:</span>
                  <span className="text-base text-amber-600 font-extrabold">${simTotalCost.toFixed(5)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50/50 border border-amber-100/50 p-3 rounded-2xl text-[10px] font-bold text-amber-800 leading-relaxed mt-4">
            💡 Sistem, Vertex AI model fiyat tarifesini (20.05.2026 tarihli güncel fiyatlar ile) baz alarak her işlemi anlık çarpar.
          </div>
        </div>

      </div>

      {/* Main logs table */}
      <div className="overflow-x-auto max-h-[480px] overflow-y-auto border-t border-gray-50 scrollbar-thin">
        <table className="w-full text-left border-collapse relative">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="bg-gray-50/80 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-8 py-4">Tarih</th>
              <th className="px-8 py-4">İşlem Adımı</th>
              <th className="px-8 py-4">Kullanılan Model</th>
              <th className="px-8 py-4 text-center">Giriş / Çıkış Token</th>
              <th className="px-8 py-4 text-right">Birim Maliyet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredCosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-10 text-center font-bold text-gray-400 text-sm">
                  Filtreye uygun maliyet kaydı bulunamadı.
                </td>
              </tr>
            ) : (
              filteredCosts.slice(0, 50).map((cost) => (
                <tr key={cost.id} className="hover:bg-gray-50/30 transition group">
                  <td className="px-8 py-4 text-gray-400 text-xs font-bold">
                    {formatDate(cost.created_at)}
                  </td>
                  <td className="px-8 py-4 font-black text-gray-900 text-sm">
                    {formatStepName(cost.step_name)}
                  </td>
                  <td className="px-8 py-4 text-xs">
                    <span className={`px-2.5 py-1 border rounded-lg font-bold text-[10px] ${getModelBadge(cost.model_name)}`}>
                      {cost.model_name}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center text-xs font-bold text-gray-600">
                    {formatNumber(cost.input_tokens)} <span className="text-gray-300">/</span> {formatNumber(cost.output_tokens)}
                  </td>
                  <td className="px-8 py-4 text-right font-black text-gray-900 text-sm">
                    ${Number(cost.total_cost).toFixed(5)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {filteredCosts.length > 50 && (
        <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Son 50 kayıt listeleniyor. Toplam {filteredCosts.length} kayıt bulunmaktadır.
        </div>
      )}
    </div>
  )
}
