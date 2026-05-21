import AuroraBackground from './components/AuroraBackground'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Leadership from './components/Leadership'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <AuroraBackground />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Contact />
        <Experience />
        <Education />
        <Projects />
        <Leadership />
      </main>
      <Footer />
    </div>
  )
}

export default App
