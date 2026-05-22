// src/components/Skills.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🌍</span> Languages
            </h3>
            <div className="space-y-3">
              {resumeData.skills.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-slate-300">{lang.name}</span>
                  <span className="text-sm text-aurora-cyan font-mono">{lang.level}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💻</span> Programming
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.programming.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-aurora-purple/20 to-aurora-pink/20 border border-aurora-purple/30 text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Libraries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📦</span> Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.frameworks.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-aurora-cyan/20 to-aurora-blue/20 border border-aurora-cyan/30 text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tools & Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🛠️</span> Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.tools.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-aurora-orange/20 to-aurora-yellow/20 border border-aurora-orange/30 text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
