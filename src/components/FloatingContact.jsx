// src/components/FloatingContact.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData

  const contacts = [
    {
      icon: '📧',
      label: language === 'zh' ? '邮箱' : 'Email',
      value: data.contact.emails[0],
      href: `mailto:${data.contact.emails[0]}`
    },
    {
      icon: '📱',
      label: language === 'zh' ? '电话' : 'Phone',
      value: data.contact.phone,
      href: `tel:${data.contact.phone}`
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'LinkedIn',
      href: data.contact.linkedin
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'GitHub',
      href: data.contact.github
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute bottom-20 right-0 w-64"
          >
            <div className="glass-card p-4 gradient-border">
              <div className="space-y-2">
                {contacts.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                    onMouseEnter={() => {}}
                  >
                    <span className="text-2xl">{contact.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400">{contact.label}</p>
                      <p className="text-sm text-white truncate">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full glass-card flex items-center justify-center shadow-lg shadow-aurora-purple/30 hover:shadow-aurora-purple/50 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.span
          animate={isExpanded ? { rotate: -45 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-2xl"
        >
          {isExpanded ? '✕' : '💬'}
        </motion.span>
      </motion.button>
    </div>
  )
}
