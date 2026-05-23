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
    locationText: language === 'zh' ? '香港 · 上海' : 'Hong Kong',
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
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-purple to-aurora-pink flex items-center justify-center text-2xl shadow-lg shadow-aurora-purple/30 group-hover:shadow-aurora-purple/50 transition-shadow"
            >
              📧
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{t.email}</h3>
            <div className="text-sm text-slate-400 space-y-1">
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
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-cyan to-aurora-blue flex items-center justify-center text-2xl shadow-lg shadow-aurora-cyan/30 group-hover:shadow-aurora-cyan/50 transition-shadow"
            >
              📱
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{t.phone}</h3>
            <p className="text-sm text-slate-400">{data.contact.phone}</p>
          </motion.a>

          {/* Location */}
          <motion.div
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
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aurora-orange to-aurora-yellow flex items-center justify-center text-2xl shadow-lg shadow-aurora-orange/30 group-hover:shadow-aurora-orange/50 transition-shadow"
            >
              📍
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{t.location}</h3>
            <p className="text-sm text-slate-400">{t.locationText}</p>
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
              className="btn-gradient"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>LinkedIn</span>
            </motion.a>
          )}
          {data.contact.github && (
            <motion.a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>GitHub</span>
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
