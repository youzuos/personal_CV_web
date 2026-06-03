// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const navItemsEn = [
  { name: 'About', href: '#' },
  { name: 'AI Answer', href: '#ai-answer' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
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
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const wasOpenRef = useRef(false)

  const navItems = language === 'zh' ? navItemsZh : navItemsEn

  useEffect(() => {
    let rafId = null

    const compute = () => {
      rafId = null
      setIsScrolled(window.scrollY > 50)

      // Reset active state near the top of the page
      if (window.scrollY < 100) {
        setActiveSection('')
        return
      }

      // Update active section
      const sections = navItems
        .map(item => item.href.slice(1))
        .filter(Boolean)
      let matched = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            matched = section
            break
          }
        }
      }
      setActiveSection(matched)
    }

    const handleScroll = () => {
      // Throttle to one update per animation frame
      if (rafId !== null) return
      rafId = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [navItems])

  // Close mobile menu when clicking a link
  const scrollToSection = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // Scroll to top when href is '#'
    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Clear hash so the URL stays clean
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Keep deep-linkable URL by updating the hash without triggering jump
      window.history.pushState(null, '', href)
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

  // ESC closes mobile menu — keyboard users need an exit besides tabbing to the close button
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isMobileMenuOpen])

  // Focus management: on open, move focus into the panel; on close, restore to trigger.
  // Without this, screen-reader and keyboard users would be left tab-cycling behind the drawer.
  // The wasOpenRef guard prevents the trigger from grabbing focus on initial mount.
  useEffect(() => {
    if (isMobileMenuOpen) {
      wasOpenRef.current = true
      const t = setTimeout(() => closeRef.current?.focus(), 100)
      return () => clearTimeout(t)
    }
    if (wasOpenRef.current) {
      triggerRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  // Trap Tab inside the open drawer so focus can't escape into the page behind it.
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleTab = (e) => {
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
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
        {/* Left Side - Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <motion.a
            href="#"
            onClick={(e) => scrollToSection(e, '#')}
            className="text-lg sm:text-xl font-display font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Jaslyn
          </motion.a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden xl:flex items-center gap-1 relative z-10">
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
                      : 'text-slate-300 hover:text-white'
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

        {/* Right Side - Language & Mobile Menu */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full glass-card text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={language === 'en' ? 'text-white' : 'text-slate-300'}>EN</span>
            <span className="text-slate-400">/</span>
            <span className={language === 'zh' ? 'text-white' : 'text-slate-300'}>中</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            ref={triggerRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden min-w-[44px] min-h-[44px] p-2 rounded-full glass-card relative z-20 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-purple/60"
            whileTap={{ scale: 0.95 }}
            aria-label={language === 'zh' ? '切换菜单' : 'Toggle menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {!isMobileMenuOpen ? (
                <motion.svg
                  key="menu"
                  aria-hidden="true"
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
                  aria-hidden="true"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Now from Left */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={language === 'zh' ? '主导航' : 'Main navigation'}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm glass-card z-20 xl:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-lg font-bold gradient-text">Menu</span>
                  <button
                    ref={closeRef}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={language === 'zh' ? '关闭菜单' : 'Close menu'}
                    className="min-w-[44px] min-h-[44px] p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-purple/60"
                  >
                    <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
