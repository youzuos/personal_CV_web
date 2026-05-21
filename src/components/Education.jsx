// src/components/Education.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">Education</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="glass-card p-8 h-full gradient-border">
                {/* Gradient glow */}
                <div
                  className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${index === 0 ? 'from-aurora-purple to-aurora-pink' : 'from-aurora-cyan to-aurora-blue'} rounded-full opacity-20 blur-3xl`}
                />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aurora-purple to-aurora-cyan flex items-center justify-center text-xl font-bold shadow-lg shadow-aurora-purple/30">
                      {edu.school.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join('').slice(0, 3)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{edu.school}</h3>
                      <p className="text-sm text-slate-400">{edu.location}</p>
                    </div>
                  </div>

                  <p className="text-white mb-2 font-medium">{edu.degree}</p>
                  <p className="text-sm text-aurora-cyan mb-4">{edu.period}</p>

                  {edu.gpa && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-slate-400">GPA: <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-pink to-aurora-purple font-semibold">{edu.gpa}</span></p>
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
