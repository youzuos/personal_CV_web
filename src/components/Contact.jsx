// src/components/Contact.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'
import { useLanguage } from '../contexts/LanguageContext'

export default function Contact() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData
  const t = {
    title: language === 'zh' ? '联系方式' : 'Get In Touch',
    email: language === 'zh' ? '邮箱' : 'Email',
    phone: language === 'zh' ? '电话' : 'Phone',
    location: language === 'zh' ? '位置' : 'Location',
    locationText: language === 'zh' ? '香港 · 上海' : 'Hong Kong · Mainland',
  }

  return (
    <section id="contact" className="px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="gradient-text">{t.title}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <motion.a
            href={`mailto:${data.contact.emails[0]}`}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="glass-card p-6 gradient-border text-center group min-w-0"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              aria-hidden="true"
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-purple to-aurora-pink flex items-center justify-center text-2xl shadow-lg shadow-aurora-purple/30 group-hover:shadow-aurora-purple/50 transition-shadow"
            >
              📧
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{t.email}</h3>
            <div className="text-sm text-slate-300 space-y-1">
              <p className="break-all">{data.contact.emails[0]}</p>
              <p className="break-all">{data.contact.emails[1]}</p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${data.contact.phone}`}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 18 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="glass-card p-6 gradient-border text-center group min-w-0"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              aria-hidden="true"
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-cyan to-aurora-blue flex items-center justify-center text-2xl shadow-lg shadow-aurora-cyan/30 group-hover:shadow-aurora-cyan/50 transition-shadow"
            >
              📱
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{t.phone}</h3>
            <p className="text-sm text-slate-300">{data.contact.phone}</p>
          </motion.a>

          {/* Location — non-interactive card; no hover lift to avoid suggesting it's clickable */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="glass-card p-6 gradient-border text-center min-w-0"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              aria-hidden="true"
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-orange to-aurora-yellow flex items-center justify-center text-2xl shadow-lg shadow-aurora-orange/30"
            >
              📍
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{t.location}</h3>
            <p className="text-sm text-slate-300">{t.locationText}</p>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          {data.contact.linkedin && (
            <motion.a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </motion.a>
          )}
          {data.contact.github && (
            <motion.a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.28) inset, 0 6px 24px rgba(34, 211, 238, 0.5), 0 1px 0 rgba(255, 255, 255, 0.25) inset',
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z" />
              </svg>
              <span>GitHub</span>
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
