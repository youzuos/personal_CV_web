// src/components/Awards.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Awards() {
  return (
    <section id="awards" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">Awards</span>
        </motion.h2>

        <div className="glass-card p-8">
          <div className="grid md:grid-cols-2 gap-4">
            {resumeData.awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span className="text-aurora-yellow text-xl">🏅</span>
                <span className="text-slate-300 text-sm">{award}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
