import React from 'react'
import Image from 'next/image'
import { Sparkles, Wand2, BookOpen, Star } from 'lucide-react'

const steps = [
  {
    title: "Hayal Tohumlarını Serpin",
    description: "Çocuğunuzun ismini, en sevdiği karakterleri ve maceranın geçeceği mekanı seçin. Birkaç kelimeyle hayalinizdeki dünyayı tarif edin.",
    image: "/images/steps/step1.png",
    icon: <Star className="text-amber-400" size={24} />,
    color: "bg-blue-50"
  },
  {
    title: "Sihirli Değneği Dokundurun",
    description: "Yapay zeka sihrimiz, seçimlerinizi saniyeler içinde benzersiz, pedagojik ve sürükleyici bir masal serüvenine dönüştürür.",
    image: "/images/steps/step2.png",
    icon: <Wand2 className="text-purple-400" size={24} />,
    color: "bg-purple-50",
    reverse: true
  },
  {
    title: "Masal Dünyasına Uyanın",
    description: "Resimli ve sesli masalınız hazır! İster beraber okuyun, ister kendi sesinizden dinletin. Her gece yeni bir keşif sizi bekliyor.",
    image: "/images/steps/step3.png",
    icon: <BookOpen className="text-sky-400" size={24} />,
    color: "bg-sky-50"
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute top-10 left-10 animate-pulse opacity-30">
        <Sparkles className="text-white" size={48} />
      </div>
      <div className="absolute bottom-10 right-10 animate-bounce opacity-20">
        <Sparkles className="text-white" size={64} />
      </div>

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#052159] mb-4">
          Sihir Nasıl Gerçekleşiyor?
        </h2>
        <p className="text-xl text-[#052159]/70 max-w-2xl mx-auto font-medium">
          Sadece üç adımda, çocuğunuzun başrolünde olduğu o eşsiz uyku öncesi dünyasını beraber inşa edelim.
        </p>
      </div>

      <div className="space-y-24 relative z-10">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
          >
            {/* Image Container with Glow */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-white/30 blur-2xl rounded-[3rem] group-hover:bg-white/50 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-sky-900/10 border-4 border-white/80 transform group-hover:scale-[1.02] transition-transform duration-500">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  width={600} 
                  height={600} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <div className={`inline-flex items-center justify-center w-14 h-14 ${step.color} rounded-2xl shadow-inner border border-white/50 mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-lora font-bold text-[#052159]">
                <span className="text-[#84B1D9] mr-3 font-nunito opacity-50">{index + 1}.</span>
                {step.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {step.description}
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <span className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold text-[#84B1D9] border border-white">
                  ✨ Sihirli ve Güvenli
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold text-[#84B1D9] border border-white">
                  🎨 Özelleştirilebilir
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom CTA Connector */}
      <div className="mt-24 text-center">
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-transparent via-[#84B1D9] to-transparent w-full max-w-lg mb-12 opacity-30"></div>
      </div>
    </section>
  )
}

export default HowItWorks
