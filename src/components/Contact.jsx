// src/components/Contact.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">Get In Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Email */}
          <motion.a
            href={`mailto:${resumeData.contact.emails[0]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 gradient-border text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-purple to-aurora-pink flex items-center justify-center text-2xl shadow-lg shadow-aurora-purple/30 group-hover:shadow-aurora-purple/50 transition-shadow">
              📧
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Email</h3>
            <p className="text-sm text-slate-400 break-all">{resumeData.contact.emails[0]}</p>
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${resumeData.contact.phone}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 gradient-border text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-cyan to-aurora-blue flex items-center justify-center text-2xl shadow-lg shadow-aurora-cyan/30 group-hover:shadow-aurora-cyan/50 transition-shadow">
              📱
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
            <p className="text-sm text-slate-400">{resumeData.contact.phone}</p>
          </motion.a>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 gradient-border text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-orange to-aurora-yellow flex items-center justify-center text-2xl shadow-lg shadow-aurora-orange/30 group-hover:shadow-aurora-orange/50 transition-shadow">
              📍
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Location</h3>
            <p className="text-sm text-slate-400">Hong Kong</p>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center mt-12"
        >
          {resumeData.contact.linkedin && (
            <motion.a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
          )}
          {resumeData.contact.github && (
            <motion.a
              href={resumeData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
