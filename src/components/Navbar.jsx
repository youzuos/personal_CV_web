// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Leadership', href: '#leadership' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          onClick={(e) => scrollToSection(e, '#')}
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          JP
        </motion.a>

        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm text-slate-300 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}
