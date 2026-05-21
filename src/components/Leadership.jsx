// src/components/Leadership.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Leadership & Activities
          </span>
        </motion.h2>

        <div className="space-y-4">
          {resumeData.leadership.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card p-6 hover:bg-white/10 transition-colors">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{item.role}</h3>
                  <span className="text-sm text-primary">{item.period}</span>
                </div>
                <p className="text-slate-400 mb-3">{item.organization}</p>

                {item.highlights && (
                  <ul className="space-y-1">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-secondary">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
