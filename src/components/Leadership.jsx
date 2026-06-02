// src/components/Leadership.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'

export default function Leadership() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData
  const t = {
    title: language === 'zh' ? '校园经历' : 'Leadership',
  }

  return (
    <section id="leadership" className="px-6 pb-48">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">{t.title}</span>
        </motion.h2>

        <div className="space-y-4">
          {data.leadership.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -80, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 80, damping: 20 }}
              whileHover={{ x: 8, scale: 1.01 }}
            >
              <div className="glass-card p-6 gradient-border">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 150 }}
                    aria-hidden="true"
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aurora-orange to-aurora-yellow flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-aurora-orange/30"
                  >
                    {item.icon}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{item.role}</h3>
                      <span className="text-sm text-aurora-orange font-mono">{item.period}</span>
                    </div>
                    <p className="text-slate-400 mb-3">{item.organization}</p>

                    {item.highlights && (
                      <ul className="space-y-1">
                        {item.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 + i * 0.1 }}
                            className="text-sm text-slate-300 flex items-start gap-2"
                          >
                            <span className="text-aurora-yellow">▹</span>
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
