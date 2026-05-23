import { useState, useEffect } from 'react'
import AuroraBackground from './components/AuroraBackground'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AIAnswer from './components/AIAnswer'
import Contact from './components/Contact'
import ContactForm from './components/ContactForm'
import Experience from './components/Experience'
import Education from './components/Education'
import PhotoWall from './components/PhotoWall'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Skills from './components/Skills'
import Leadership from './components/Leadership'
import FloatingContact from './components/FloatingContact'
import Footer from './components/Footer'
import Intro from './components/Intro'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LanguageProvider>
      <Intro onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <div className="min-h-screen">
          <AuroraBackground />
          <ParticleBackground />
          <Navbar />
          <main>
            <Hero />
            <AIAnswer />
            <Experience />
            <Education />
            <PhotoWall />
            <Projects />
            <Awards />
            <Skills />
            <Leadership />
            <Contact />
            <ContactForm />
          </main>
          <FloatingContact />
          <Footer />
        </div>
      )}
    </LanguageProvider>
  )
}

export default App
