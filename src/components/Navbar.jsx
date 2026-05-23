// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const navItemsEn = [
  { name: 'About', href: '#' },
  { name: 'AI Answer', href: '#ai-answer' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Photos', href: '#photo-wall' },
  { name: 'Projects', href: '#projects' },
  { name: 'Awards', href: '#awards' },
  { name: 'Skills', href: '#skills' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
]

const navItemsZh = [
  { name: '关于', href: '#' },
  { name: 'AI答案', href: '#ai-answer' },
  { name: '经历', href: '#experience' },
  { name: '教育', href: '#education' },
  { name: '照片', href: '#photo-wall' },
  { name: '项目', href: '#projects' },
  { name: '荣誉', href: '#awards' },
  { name: '技能', href: '#skills' },
  { name: '校园', href: '#leadership' },
  { name: '联系', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const navItems = language === 'zh' ? navItemsZh : navItemsEn

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  // Close mobile menu when clicking a link
  const scrollToSection = (e, href) => {
    e.preventDefault()
    // Scroll to top when href is '#'
    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsMobileMenuOpen(false)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen) {
        const nav = e.target.closest('nav')
        if (!nav) {
          setIsMobileMenuOpen(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      {/* Background blur effect */}
      <div className={`absolute inset-x-2 top-0 bottom-0 rounded-xl transition-all duration-300 sm:inset-x-4 sm:rounded-2xl ${
        isScrolled || isMobileMenuOpen
          ? 'glass-card'
          : 'bg-transparent'
      }`} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Left Side - Mobile Menu Button */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-card relative z-20"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {!isMobileMenuOpen ? (
                <motion.svg
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="close"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-1 relative z-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <li key={item.name}>
                <motion.a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-aurora-purple/20 to-aurora-cyan/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Hover glow */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-aurora-purple/0 to-aurora-cyan/0 hover:from-aurora-purple/10 hover:to-aurora-cyan/10 transition-all duration-300" />
                  )}
                </motion.a>
              </li>
            )
          })}
        </ul>

        {/* Right Side - Logo & Language */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => scrollToSection(e, '#')}
            className="text-lg sm:text-xl font-display font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Jaslyn
          </motion.a>

          {/* Language Toggle - Desktop */}
          <motion.button
            onClick={toggleLanguage}
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={language === 'en' ? 'text-white' : 'text-slate-400'}>EN</span>
            <span className="text-slate-500">/</span>
            <span className={language === 'zh' ? 'text-white' : 'text-slate-400'}>中</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Now from Left */}
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm glass-card z-20 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-lg font-bold gradient-text">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <ul className="flex-1 p-4 space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.slice(1)
                    return (
                      <li key={item.name}>
                        <motion.a
                          href={item.href}
                          onClick={(e) => scrollToSection(e, item.href)}
                          className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-aurora-purple/30 to-aurora-cyan/30 text-white'
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.name}
                        </motion.a>
                      </li>
                    )
                  })}
                </ul>

                {/* Footer - Language Toggle */}
                <div className="p-6 border-t border-white/10">
                  <motion.button
                    onClick={() => {
                      toggleLanguage()
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-card text-base font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={language === 'en' ? 'text-white' : 'text-slate-400'}>English</span>
                    <span className="text-slate-500">/</span>
                    <span className={language === 'zh' ? 'text-white' : 'text-slate-400'}>中文</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
