import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import AuroraBackground from './components/AuroraBackground'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Skills from './components/Skills'
import Leadership from './components/Leadership'
import Footer from './components/Footer'
import Intro from './components/Intro'
import SectionSkeleton from './components/SectionSkeleton'
import { LanguageProvider } from './contexts/LanguageContext'

// Lazy-load heavy below-the-fold sections to shrink the initial bundle
const AIAnswer = lazy(() => import('./components/AIAnswer'))
const ContactForm = lazy(() => import('./components/ContactForm'))

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    return sessionStorage.getItem('introSeen') === 'true'
  })

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('introSeen', 'true')
    setIntroComplete(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        {!introComplete && <Intro onComplete={handleIntroComplete} />}
        {introComplete && (
          <div className="min-h-screen min-h-dvh">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-aurora-purple focus:text-white focus:shadow-lg"
            >
              Skip to main content
            </a>
            <AuroraBackground />
            <ParticleBackground />
            <Navbar />
            <main id="main">
              <Hero />
              <Suspense fallback={<SectionSkeleton minHeight="650px" label="Loading AI assistant" />}>
                <AIAnswer />
              </Suspense>
              <Experience />
              <Education />
              <Projects />
              <Awards />
              <Skills />
              <Leadership />
              <Contact />
              <Suspense fallback={<SectionSkeleton minHeight="540px" label="Loading contact form" />}>
                <ContactForm />
              </Suspense>
            </main>
            <Footer />
          </div>
        )}
      </LanguageProvider>
    </MotionConfig>
  )
}

export default App
