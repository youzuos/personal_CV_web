// src/components/Projects.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'

export default function Projects() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData
  const t = {
    title: language === 'zh' ? '项目' : 'Projects',
  }

  return (
    <section id="projects" className="px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">{t.title}</span>
        </motion.h2>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6 auto-rows-auto">
          {data.projects.map((project, index) => {
            const isTall = index === 0 || index === 2
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={isTall ? "md:row-span-2" : ""}
              >
                <div
                  className={`glass-card p-6 h-full gradient-border ${isTall ? 'min-h-[300px]' : 'min-h-[200px]'}`}
                >
                  {/* Gradient background blob */}
                  <div
                    className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full opacity-20 blur-3xl`}
                  />

                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl">{project.icon}</span>
                      <span className="text-xs text-aurora-cyan font-mono">{project.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}>•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
