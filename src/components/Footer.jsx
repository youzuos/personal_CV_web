// src/components/Footer.jsx
import { resumeData } from '../data/resume'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-slate-400 text-sm">
          © {year} {resumeData.name}. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs mt-2">
          Built with React + Vite + TailwindCSS + Framer Motion
        </p>
      </div>
    </footer>
  )
}
