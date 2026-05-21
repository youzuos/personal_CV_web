// src/components/Experience.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line" />

          {resumeData.experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-pink border-4 border-aurora-bg shadow-lg shadow-aurora-purple/50" />

              <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <motion.div
                  className="glass-card p-6 gradient-border"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{job.icon}</span>
                    <div>
                      <p className="text-sm text-aurora-cyan font-semibold">{job.period}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{job.position}</h3>
                  <p className="text-slate-400 mb-4">{job.company} · {job.location}</p>

                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-aurora-pink mt-0.5">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
