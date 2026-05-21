// src/components/Projects.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Academic Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="glass-card p-6 h-full hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <span className="text-xs text-primary whitespace-nowrap">{project.period}</span>
                </div>

                <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
