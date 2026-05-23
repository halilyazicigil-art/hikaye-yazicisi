'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle'
  angle: number
  duration: number
  delay: number
}

const COLORS = [
  '#FFC0CB', '#FF69B4', '#FF1493', // Pinks
  '#FFD700', '#FFA500', '#FF4500', // Yellow/Orange
  '#ADFF2F', '#00FF00', '#32CD32', // Greens
  '#00FFFF', '#1E90FF', '#4169E1', // Blues
  '#DA70D6', '#BA55D3', '#8A2BE2', // Purples
]

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 80 }).map((_, i) => {
      const size = Math.random() * 12 + 6
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle']
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      
      // Random starting point along the bottom/center screen
      const startX = Math.random() * 40 + 30 // 30% to 70% of screen width
      
      // Random horizontal spread and gravity effect
      const endX = startX + (Math.random() * 80 - 40) // offset of -40% to +40%
      const endY = Math.random() * 20 + 90 // falls down to 90%-110% of screen height
      
      const angle = Math.random() * 360
      const duration = Math.random() * 2.5 + 2 // 2 to 4.5 seconds
      const delay = Math.random() * 0.4

      return {
        id: i,
        x: startX,
        y: -10, // starts above screen or at center shoot
        color,
        size,
        shape,
        angle,
        duration,
        delay,
      }
    })

    setParticles(generated)

    // Clear particles after animation completes
    const timer = setTimeout(() => {
      setParticles([])
    }, 5500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
      {particles.map((p) => {
        let borderRadius = '0px'
        let clipPath = 'none'

        if (p.shape === 'circle') {
          borderRadius = '50%'
        } else if (p.shape === 'triangle') {
          clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }

        return (
          <motion.div
            key={p.id}
            initial={{
              left: `${p.x}%`,
              top: '100%', // shoot from bottom
              scale: 0.2,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              left: `${p.x + (Math.random() * 30 - 15)}%`, // drift horizontally
              top: `${Math.random() * 40 + 20}%`, // shoot up to 20-60% of viewport
              scale: [0.2, 1.2, 1.0],
              rotate: p.angle + 360,
              opacity: [1, 1, 0.8],
            }}
            transition={{
              duration: p.duration * 0.4, // speed of launch
              delay: p.delay,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius,
              clipPath,
            }}
          >
            {/* Secondary motion div inside for falling/gravity effect */}
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: '100vh',
                rotate: p.angle * 2,
                opacity: 0,
              }}
              transition={{
                duration: p.duration * 0.8,
                delay: p.delay + p.duration * 0.4, // start falling after peak
                ease: 'easeInOut',
              }}
              className="w-full h-full"
              style={{
                backgroundColor: 'inherit',
                borderRadius: 'inherit',
                clipPath: 'inherit',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
