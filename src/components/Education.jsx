// src/components/Education.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'

export default function Education() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData
  const t = {
    title: language === 'zh' ? '教育' : 'Education',
    gpa: language === 'zh' ? '绩点' : 'GPA',
  }

  return (
    <section id="education" className="px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">{t.title}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {data.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 80, damping: 15 }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <div className="glass-card p-8 h-full gradient-border">
                {/* Gradient glow */}
                <div
                  className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${index === 0 ? 'from-aurora-purple to-aurora-pink' : 'from-aurora-cyan to-aurora-blue'} rounded-full opacity-20 blur-3xl`}
                />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-lg shadow-aurora-purple/30 p-2">
                      <img
                        src={edu.school.includes('HKU') || edu.school.includes('香港')
                          ? '/logos/HKU_logo.png'
                          : '/logos/USST_logo.png'}
                        alt={`${edu.school} logo`}
                        width="64"
                        height="64"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white text-lg leading-tight">{edu.school}</h3>
                      <p className="text-sm text-slate-300">{edu.location}</p>
                    </div>
                  </div>

                  <p className="text-white mb-2 font-medium">{edu.degree}</p>
                  <p className="text-sm text-aurora-cyan mb-4">{edu.period}</p>

                  {edu.gpa && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-slate-300">{t.gpa}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-pink to-aurora-purple font-semibold">{edu.gpa}</span></p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
