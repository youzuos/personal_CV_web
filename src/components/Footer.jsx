// src/components/Footer.jsx
import { resumeData } from '../data/resume'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan flex items-center justify-center text-2xl font-bold shadow-lg shadow-aurora-purple/30">
            JP
          </div>

          {/* Copyright */}
          <p className="text-slate-400 text-center">
            © {year} {resumeData.name}. All rights reserved.
          </p>

          {/* Tech stack */}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>React</span>
            <span className="text-aurora-purple">•</span>
            <span>Vite</span>
            <span className="text-aurora-pink">•</span>
            <span>TailwindCSS</span>
            <span className="text-aurora-cyan">•</span>
            <span>Framer Motion</span>
          </div>

          {/* Aurora badge */}
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-aurora-purple/20 to-aurora-cyan/20 border border-white/10">
            <span className="text-sm bg-gradient-to-r from-aurora-purple to-aurora-cyan bg-clip-text text-transparent font-medium">
              ✨ Aurora Design
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
