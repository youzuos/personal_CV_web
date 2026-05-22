// src/components/Hero.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import avatarImage from '../assets/avatar.jpg'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating geometric shapes */}
      <motion.div
        animate={{ rotate: 360, y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-20 h-20 border border-aurora-purple/30 rounded-lg"
      />
      <motion.div
        animate={{ rotate: -360, y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-20 w-16 h-16 border border-aurora-cyan/30 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-aurora-pink to-aurora-purple rounded-lg opacity-40"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-6"
      >
        {/* Avatar with glowing ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="relative w-36 h-36 mx-auto mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan rounded-full blur-xl opacity-60 animate-pulse-glow" />
          <img
            src={avatarImage}
            alt="Avatar"
            className="relative w-full h-full rounded-full object-cover border-4 border-transparent bg-gradient-to-br from-aurora-purple to-aurora-pink"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">{resumeData.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-400 mb-4"
        >
          {resumeData.nickname}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto"
        >
          {resumeData.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center"
        >
          {resumeData.contact.linkedin && (
            <motion.a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
          )}
          {resumeData.contact.github && (
            <motion.a
              href={resumeData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
              style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
