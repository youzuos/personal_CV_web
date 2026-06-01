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
          className="text-xs font-mono tracking-[0.3em] uppercase text-slate-400 mb-10"
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
          className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
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
              className="btn-gradient"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>LinkedIn</span>
            </motion.a>
          )}
          {data.contact.github && (
            <motion.a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-slate-200 border border-white/15 hover:border-white/30 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              GitHub
              <span aria-hidden>↗</span>
            </motion.a>
          )}
        </motion.div>

        {/* Quiet scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 6, 0] }}
          transition={{ delay: 1.6, duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-400">
            {language === 'zh' ? '向下滚动' : 'scroll'}
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
