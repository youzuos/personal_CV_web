import { useState, useEffect, lazy, Suspense } from 'react'
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
import ErrorBoundary from './components/ErrorBoundary'
import SectionSkeleton from './components/SectionSkeleton'
import { LanguageProvider } from './contexts/LanguageContext'

// Lazy-load heavy below-the-fold sections to shrink the initial bundle
const AIAnswer = lazy(() => import('./components/AIAnswer'))
const ContactForm = lazy(() => import('./components/ContactForm'))

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    // Check if intro was already shown
    return localStorage.getItem('introSeen') === 'true'
  })

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleIntroComplete = () => {
    localStorage.setItem('introSeen', 'true')
    setIntroComplete(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <Intro onComplete={handleIntroComplete} />
        {introComplete && (
          <div className="min-h-screen">
            <AuroraBackground />
            <ParticleBackground />
            <Navbar />
            <main>
              <Hero />
              <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton minHeight="540px" label="Loading AI assistant" />}>
                  <AIAnswer />
                </Suspense>
              </ErrorBoundary>
              <Experience />
              <Education />
              <Projects />
              <Awards />
              <Skills />
              <Leadership />
              <Contact />
              <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton minHeight="480px" label="Loading contact form" />}>
                  <ContactForm />
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        )}
      </LanguageProvider>
    </MotionConfig>
  )
}

export default App
