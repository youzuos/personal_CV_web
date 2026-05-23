// src/components/PhotoWall.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

export default function PhotoWall() {
  const { language } = useLanguage()
  const t = {
    title: language === 'zh' ? '照片墙' : 'Photo Wall',
    subtitle: language === 'zh' ? '工作瞬间 · 项目记录' : 'Work Moments · Project Records',
  }

  // Placeholder photos - user can replace with real images
  const photos = [
    { id: 1, gradient: 'from-aurora-purple to-aurora-pink', icon: '💻' },
    { id: 2, gradient: 'from-aurora-cyan to-aurora-blue', icon: '🤖' },
    { id: 3, gradient: 'from-aurora-orange to-aurora-yellow', icon: '📊' },
    { id: 4, gradient: 'from-aurora-pink to-aurora-cyan', icon: '🚀' },
    { id: 5, gradient: 'from-aurora-blue to-aurora-purple', icon: '⚡' },
    { id: 6, gradient: 'from-aurora-yellow to-aurora-orange', icon: '🎯' },
  ]

  return (
    <section id="photo-wall" className="px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          <span className="gradient-text">{t.title}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-center mb-16"
        >
          {t.subtitle}
        </motion.p>

        {/* Masonry-style Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 80, damping: 20 }}
              className={index % 5 === 0 ? 'md:row-span-2' : ''}
            >
              <motion.div
                className="glass-card p-6 h-full gradient-border relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

                {/* Content */}
                <div className="relative h-full min-h-[180px] flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-6xl mb-4"
                  >
                    {photo.icon}
                  </motion.div>
                  <p className="text-sm text-slate-400 text-center">
                    {language === 'zh' ? '待添加照片' : 'Photo Coming Soon'}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    #{index + 1}
                  </p>
                </div>

                {/* Glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Note for user */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          {language === 'zh'
            ? '💡 提示：将照片放入 public/photos/ 目录，并在 PhotoWall.jsx 中更新路径'
            : '💡 Tip: Add photos to public/photos/ and update paths in PhotoWall.jsx'
          }
        </motion.p>
      </div>
    </section>
  )
}
