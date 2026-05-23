// src/components/Intro.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const greetingsEn = ['Hello', 'Welcome', 'Hi there', 'Let\'s connect']
const greetingsZh = ['你好', '欢迎', '很高兴见到你', '让我们连接']

export default function Intro({ onComplete }) {
  const { language } = useLanguage()
  const [phase, setPhase] = useState('hello') // 'hello' -> 'fadeout' -> 'complete'
  const [greetingIndex, setGreetingIndex] = useState(0)

  const greetings = language === 'zh' ? greetingsZh : greetingsEn

  useEffect(() => {
    // Cycle through greetings every 1 second
    const greetingTimer = setInterval(() => {
      setGreetingIndex(prev => (prev + 1) % greetings.length)
    }, 1000)

    // Start fade out after showing all greetings (3 seconds total)
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout')
      clearInterval(greetingTimer)
    }, 3000)

    // After fade out animation, mark complete
    const completeTimer = setTimeout(() => {
      setPhase('complete')
      onComplete()
    }, 3500)

    return () => {
      clearInterval(greetingTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [greetings.length, onComplete])

  const currentGreeting = greetings[greetingIndex]

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-aurora-bg"
        >
          {/* Liquid glass blobs */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 0],
              borderRadius: ['30%', '50%', '70%', '50%', '30%']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-aurora-purple/40 to-aurora-pink/30 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [0, -180, 0],
              borderRadius: ['50%', '30%', '50%', '70%', '50%']
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-aurora-cyan/40 to-aurora-blue/30 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 80, 40, 0],
              y: [0, -40, 40, 0],
              borderRadius: ['40%', '60%', '40%'],
              scale: [1, 1.4, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-aurora-orange/30 to-aurora-yellow/20 blur-3xl"
          />

          {/* Glass card with Greeting */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: phase === 'fadeout' ? 1.2 : 1,
              opacity: phase === 'fadeout' ? 0 : 1
            }}
            transition={{
              scale: { type: 'spring', stiffness: 100, damping: 15 },
              opacity: { duration: 0.5 }
            }}
            className="relative z-10"
          >
            <div className="glass-card px-12 md:px-20 py-10 md:py-16 rounded-3xl">
              <motion.h1
                key={currentGreeting}
                initial={{ y: 20, opacity: 0, rotate: -5 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                exit={{ y: -20, opacity: 0, rotate: 5 }}
                transition={{
                  y: { type: 'spring', stiffness: 200, damping: 20 },
                  opacity: { type: 'spring', stiffness: 200, damping: 20 },
                  rotate: { type: 'spring', stiffness: 200, damping: 20 },
                  backgroundPosition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-6xl md:text-8xl font-display font-bold gradient-text"
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                {currentGreeting}
              </motion.h1>

              {/* Subtitle that appears */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'fadeout' ? 0 : 0.7 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-slate-400 text-sm md:text-base mt-4 tracking-widest uppercase"
              >
                {language === 'zh' ? '正在加载精彩内容...' : 'Loading amazing content...'}
              </motion.p>

              {/* Loading dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-2 justify-center mt-6"
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-aurora-purple to-aurora-cyan"
                  />
                ))}
              </motion.div>
            </div>

            {/* Pulsing glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-aurora-purple to-aurora-cyan rounded-3xl blur-2xl -z-10"
            />
          </motion.div>

          {/* Floating liquid shapes */}
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ['10%', '40%', '10%']
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-16 h-16 border-2 border-aurora-purple/30 backdrop-blur-md"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 left-24 w-10 h-10 bg-gradient-to-br from-aurora-cyan/30 to-aurora-blue/30 backdrop-blur-md rounded-full"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-8 h-8 border border-aurora-pink/40 backdrop-blur-sm rotate-45"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
