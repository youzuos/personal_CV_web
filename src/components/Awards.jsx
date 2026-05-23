// src/components/Awards.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'

export default function Awards() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData
  const t = {
    title: language === 'zh' ? '荣誉' : 'Awards',
  }

  return (
    <section id="awards" className="px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">{t.title}</span>
        </motion.h2>

        <div className="glass-card p-8">
          <div className="grid md:grid-cols-2 gap-4">
            {data.awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: Math.min(index * 0.03, 0.5), type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: Math.min(index * 0.03, 0.5) + 0.2, type: "spring", stiffness: 200 }}
                  className="text-aurora-yellow text-xl"
                >🏅</motion.span>
                <span className="text-slate-300 text-sm">{award}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
