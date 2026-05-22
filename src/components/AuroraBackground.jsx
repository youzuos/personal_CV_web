// src/components/AuroraBackground.jsx
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AuroraBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const gridRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const blobs = [
    { id: 1, color: 'from-aurora-purple via-aurora-pink to-aurora-cyan', size: 600, delay: 0 },
    { id: 2, color: 'from-aurora-cyan via-aurora-blue to-aurora-purple', size: 500, delay: -5 },
    { id: 3, color: 'from-aurora-orange via-aurora-yellow to-aurora-pink', size: 400, delay: -10 },
    { id: 4, color: 'from-aurora-pink via-aurora-purple to-aurora-cyan', size: 550, delay: -15 },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-aurora-bg">
      {/* Animated gradient blobs */}
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute rounded-full hero-glow bg-gradient-to-br ${blob.color}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: `${20 + blob.id * 15}%`,
            left: `${10 + blob.id * 20}%`,
            animationDelay: `${blob.delay}s`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20 + blob.id * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Mouse-following glow */}
      <motion.div
        className="pointer-events-none fixed rounded-full"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Animated Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite',
        }}
      >
        <style>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
        `}</style>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aurora-bg/50 to-aurora-bg" />

      {/* Floating grid dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-aurora-cyan/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Diagonal gradient lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(168, 85, 247, 0.03) 100px, rgba(168, 85, 247, 0.03) 200px)',
          }}
          animate={{ x: [0, 200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  )
}
