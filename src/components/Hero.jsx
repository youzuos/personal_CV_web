// src/components/Hero.jsx
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
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Enhanced liquid glass effect - morphing blobs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0],
          borderRadius: ['30%', '50%', '70%', '50%', '30%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-aurora-purple/30 to-aurora-pink/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          borderRadius: ['50%', '30%', '50%', '70%', '50%']
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-aurora-cyan/30 to-aurora-blue/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 50, 0],
          borderRadius: ['40%', '60%', '40%'],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-aurora-orange/20 to-aurora-yellow/20 blur-3xl"
      />

      {/* Floating shapes with liquid motion */}
      <motion.div
        animate={{
          rotate: 360,
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
          borderRadius: ['10%', '30%', '10%']
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="floating-shape absolute top-16 right-16 w-24 h-24 border-2 border-aurora-purple/20 backdrop-blur-sm"
      />
      <motion.div
        animate={{
          rotate: -360,
          y: [0, 40, 0],
          borderRadius: ['50%', '30%', '50%']
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="floating-shape absolute bottom-24 right-32 w-12 h-12 bg-gradient-to-br from-aurora-cyan/20 to-aurora-blue/20 backdrop-blur-sm rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0],
          borderRadius: ['20%', '40%', '20%']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="floating-shape absolute top-1/4 left-16 w-6 h-6 bg-gradient-to-br from-aurora-pink/40 to-aurora-purple/40 backdrop-blur-sm rounded-lg"
      />
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -20, 20, 0],
          borderRadius: ['10%', '50%', '10%']
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="floating-shape absolute bottom-1/3 left-20 w-4 h-4 border border-aurora-orange/40 backdrop-blur-sm rotate-45"
      />
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
          borderRadius: ['30%', '70%', '30%']
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="floating-shape absolute top-1/2 right-24 w-8 h-8 border border-aurora-yellow/30 backdrop-blur-sm rounded-full opacity-60"
      />

      {/* Glass overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aurora-bg/50 to-aurora-bg pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-4xl"
      >
        {/* Avatar with enhanced glow */}
        <motion.div variants={item} className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan rounded-full blur-2xl opacity-40 animate-pulse-glow scale-110" />
          <div className="relative w-40 h-40 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-cyan glowing-border" />
            <img
              src={avatarImage}
              alt="Avatar"
              className="relative w-full h-full rounded-full object-cover p-1"
            />
          </div>
        </motion.div>

        {/* Name with enhanced animation */}
        <motion.h1
          variants={item}
          className="text-6xl md:text-8xl font-display font-bold mb-4 leading-tight"
        >
          <span className="gradient-text">{data.name}</span>
        </motion.h1>

        {/* Nickname with subtle animation */}
        <motion.p
          variants={item}
          className="text-2xl md:text-3xl font-light text-slate-400 mb-6 tracking-wide"
        >
          {data.nickname}
        </motion.p>

        {/* Tagline with styled container */}
        <motion.div variants={item} className="mb-12">
          <div className="inline-block glass-card px-6 py-3 rounded-2xl">
            <p className="text-base text-slate-300">
              {data.tagline}
            </p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          {data.contact.linkedin && (
            <motion.a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient px-10"
              whileHover={{ scale: 1.05, y: -2 }}
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
              className="btn-gradient px-10"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>GitHub</span>
            </motion.a>
          )}
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6, y: [0, 12, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
