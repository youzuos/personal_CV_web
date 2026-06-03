// src/components/Hero.jsx
// 极简 hero — 单一 gradient name 作为视觉锚点，其余克制
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'
import avatarImage from '../assets/avatar.jpg'

export default function Hero() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-3xl"
      >
        {/* Eyebrow — small caps mono caption */}
        <motion.p
          variants={item}
          className="text-xs font-mono tracking-[0.3em] uppercase text-slate-300 mb-10"
        >
          {language === 'zh' ? '个人作品集 · 二〇二六' : 'Portfolio · 2026'}
        </motion.p>

        {/* Avatar — small, thin gradient ring, no halo */}
        <motion.div variants={item} className="relative mb-10 mx-auto w-28 h-28">
          <div
            className="absolute inset-0 rounded-full p-[1.5px]"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899, #06b6d4)',
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-aurora-bg">
              <img
                src={avatarImage}
                alt={`Portrait of ${data.name}`}
                width="112"
                height="112"
                fetchpriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name — the single hero gesture */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-5 tracking-tight"
        >
          <span className="gradient-text">{data.name}</span>
        </motion.h1>

        {/* Nickname — quieter */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl font-light text-slate-300 mb-10 tracking-wide"
        >
          {data.nickname}
        </motion.p>

        {/* Tagline — single line, no pill */}
        <motion.p
          variants={item}
          className="text-sm md:text-base text-slate-300 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          {data.tagline}
        </motion.p>

        {/* Actions — one primary gradient, one ghost */}
        <motion.div variants={item} className="flex flex-wrap gap-3 justify-center">
          {data.contact.linkedin && (
            <motion.a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </motion.a>
          )}
          {data.contact.github && (
            <motion.a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.28) inset, 0 6px 24px rgba(34, 211, 238, 0.5), 0 1px 0 rgba(255, 255, 255, 0.25) inset',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z" />
              </svg>
              <span>GitHub</span>
            </motion.a>
          )}
        </motion.div>

        {/* Quiet scroll hint — desktop only; on mobile it collides with the
            wrapped CTAs and adds no value (touch users already know to scroll). */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 6, 0] }}
          transition={{ delay: 1.6, duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-slate-300">
            {language === 'zh' ? '向下滚动' : 'scroll'}
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
