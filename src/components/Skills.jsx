// src/components/Skills.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'

export default function Skills() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData
  const t = {
    title: language === 'zh' ? '技能' : 'Skills',
    languages: language === 'zh' ? '语言' : 'Languages',
    programming: language === 'zh' ? '编程' : 'Programming',
    frameworks: language === 'zh' ? '框架' : 'Frameworks',
    tools: language === 'zh' ? '工具' : 'Tools',
  }

  return (
    <section id="skills" className="px-6">
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
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <motion.span
                initial={{ rotate: -20, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-2xl"
              >🌍</motion.span> {t.languages}
            </h3>
            <div className="space-y-3">
              {data.skills.languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-slate-300">{lang.name}</span>
                  <span className="text-sm text-aurora-cyan font-mono">{lang.level}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 20 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <motion.span
                initial={{ rotate: -20, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="text-2xl"
              >💻</motion.span> {t.programming}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.programming.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-aurora-purple/20 to-aurora-pink/20 border border-aurora-purple/30 text-sm text-slate-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Libraries */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 20 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <motion.span
                initial={{ rotate: -20, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                className="text-2xl"
              >📦</motion.span> {t.frameworks}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.frameworks.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-aurora-cyan/20 to-aurora-blue/20 border border-aurora-cyan/30 text-sm text-slate-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tools & Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 20 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <motion.span
                initial={{ rotate: -20, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="text-2xl"
              >🛠️</motion.span> {t.tools}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.tools.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.04, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-aurora-orange/20 to-aurora-yellow/20 border border-aurora-orange/30 text-sm text-slate-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
