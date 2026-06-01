// src/components/ContactForm.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useId } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

// EmailJS configuration - user needs to replace with their own values
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
}

export default function ContactForm() {
  const { language } = useLanguage()
  const formId = useId()
  const fieldId = (name) => `${formId}-${name}`
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const t = {
    title: language === 'zh' ? '与我联系' : 'Get in Touch',
    nameLabel: language === 'zh' ? '姓名' : 'Name',
    emailLabel: language === 'zh' ? '邮箱' : 'Email',
    subjectLabel: language === 'zh' ? '主题' : 'Subject',
    messageLabel: language === 'zh' ? '消息' : 'Message',
    sendButton: language === 'zh' ? '发送' : 'Send',
    sending: language === 'zh' ? '发送中...' : 'Sending...',
    success: language === 'zh' ? '发送成功！感谢您的来信' : 'Thank you for your message!',
    error: language === 'zh' ? '发送失败，请稍后重试' : 'Failed to send. Please try again.',
    placeholders: {
      name: language === 'zh' ? '您的姓名' : 'Your name',
      email: language === 'zh' ? '您的邮箱' : 'your@email.com',
      subject: language === 'zh' ? '邮件主题' : 'How can I help you?',
      message: language === 'zh' ? '请输入您的消息...' : 'Please share your thoughts or inquiries...'
    },
    configNote: language === 'zh'
      ? '需要配置 EmailJS：请在环境变量中设置 VITE_EMAILJS_SERVICE_ID、VITE_EMAILJS_TEMPLATE_ID 和 VITE_EMAILJS_PUBLIC_KEY'
      : 'EmailJS not configured: set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your environment'
  }

  const isEmailJsConfigured = Boolean(
    EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isEmailJsConfigured) {
      alert(t.configNote)
      return
    }

    setStatus('loading')

    try {
      // Import EmailJS dynamically
      const emailjsModule = await import('@emailjs/browser')
      const emailjs = emailjsModule.default || emailjsModule

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_CONFIG.publicKey
      )

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      if (import.meta.env.DEV) console.error('EmailJS error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact-form" className="pb-24 px-6">
      <div className="max-w-2xl mx-auto">
      {/* Configuration Notice */}
      {!isEmailJsConfigured && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 p-4 rounded-xl bg-aurora-orange/20 border border-aurora-orange/30"
        >
          <p className="text-sm text-aurora-orange flex items-start gap-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mt-0.5 shrink-0"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>{t.configNote}</span>
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {language === 'zh'
              ? '1. 注册 '
              : '1. Sign up at '}
            <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-aurora-cyan underline">
              EmailJS.com
            </a>
            {language === 'zh'
              ? ' 获取免费账户\n2. 创建 Email Service\n3. 创建 Email Template\n4. 配置环境变量\n5. 重启开发服务器'
              : ' for a free account\n2. Create an Email Service\n3. Create an Email Template\n4. Add the env variables\n5. Restart the dev server'}
          </p>
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="glass-card p-8 gradient-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.title}</h3>

        {/* Success Message */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-center"
            >
              ✓ {t.success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-center"
            >
              ✗ {t.error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor={fieldId('name')} className="block text-sm text-slate-400 mb-2">{t.nameLabel}</label>
            <input
              id={fieldId('name')}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder={t.placeholders.name}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aurora-purple/50 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor={fieldId('email')} className="block text-sm text-slate-400 mb-2">{t.emailLabel}</label>
            <input
              id={fieldId('email')}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              inputMode="email"
              placeholder={t.placeholders.email}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aurora-purple/50 transition-colors"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor={fieldId('subject')} className="block text-sm text-slate-400 mb-2">{t.subjectLabel}</label>
            <input
              id={fieldId('subject')}
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder={t.placeholders.subject}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aurora-purple/50 transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor={fieldId('message')} className="block text-sm text-slate-400 mb-2">{t.messageLabel}</label>
            <textarea
              id={fieldId('message')}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              autoComplete="off"
              rows={5}
              placeholder={t.placeholders.message}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aurora-purple/50 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-aurora-purple to-aurora-pink text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'loading' ? t.sending : t.sendButton}
          </motion.button>
        </div>
      </motion.form>
    </div>
    </section>
  )
}
