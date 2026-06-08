import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const greetings = {
  en: ['Hello', 'Welcome', 'Hi there'],
  zh: ['你好', '欢迎', '很高兴见到你'],
}

export default function Intro({ onComplete }) {
  const { language } = useLanguage()
  const [phase, setPhase] = useState('show')
  const [index, setIndex] = useState(0)
  const words = greetings[language] ?? greetings.en

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const cycleTimer = window.setInterval(() => {
      setIndex((current) => Math.min(current + 1, words.length - 1))
    }, 650)
    const fadeTimer = window.setTimeout(() => setPhase('fade'), 1900)
    const completeTimer = window.setTimeout(onComplete, 2300)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onComplete()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearInterval(cycleTimer)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(completeTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onComplete, words.length])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-aurora-bg"
      >
        <button
          type="button"
          onClick={onComplete}
          className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-purple/60"
        >
          {language === 'zh' ? '跳过' : 'Skip'}
        </button>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.24),transparent_42%)]" />
        <div className="glass-card relative px-12 py-10 text-center shadow-[0_24px_80px_rgba(168,85,247,0.18)] md:px-20 md:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_34%)]"
          />
          <motion.h1
            key={`${language}-${index}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-text relative text-6xl font-bold md:text-8xl"
          >
            {words[index]}
          </motion.h1>
          <p className="relative mt-5 text-sm uppercase tracking-[0.32em] text-slate-400">
            {language === 'zh' ? '正在进入简历' : 'Opening resume'}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
