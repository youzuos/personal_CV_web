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
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Education
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                    {edu.school.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{edu.school}</h3>
                    <p className="text-sm text-slate-400">{edu.location}</p>
                  </div>
                </div>

                <p className="text-white mb-2">{edu.degree}</p>
                <p className="text-sm text-primary mb-4">{edu.period}</p>

                {edu.gpa && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-slate-400">GPA: <span className="text-secondary">{edu.gpa}</span></p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
