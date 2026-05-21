# 个人简历网页实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个现代风格的个人简历网页，用于求职申请和作品集展示，支持响应式设计和流畅动画。

**Architecture:** 单页应用 (SPA) 采用垂直滚动布局，使用 React 组件化开发，TailwindCSS 实现样式，Framer Motion 添加动画效果。数据与视图分离，简历内容存储在单独的 JSON 文件中。

**Tech Stack:** React 18, Vite 5, TailwindCSS 3, Framer Motion 11

---

## Task 1: 初始化 Vite + React 项目

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Step 1: 创建项目目录结构**

```bash
cd "D:/工作/personal_web"
mkdir -p src/{components,data} public
```

**Step 2: 初始化 package.json**

```bash
npm create vite@latest . -- --template react
```

**Step 3: 安装核心依赖**

```bash
npm install react react-dom
npm install -D tailwindcss postcss autoprefixer framer-motion
npx tailwindcss init -p
```

**Step 4: 配置 TailwindCSS**

创建 `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        dark: '#0f172a',
        darker: '#1e1b4b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

修改 `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gradient-to-br from-dark to-darker text-slate-50 min-h-screen;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10;
  }
}
```

**Step 5: 更新 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/personal-web/', // GitHub Pages subpath
})
```

**Step 6: 验证项目运行**

```bash
npm run dev
```

预期: 浏览器打开 http://localhost:5173 显示 Vite 默认页面

**Step 7: 提交**

```bash
git add .
git commit -m "feat: initialize Vite + React + TailwindCSS project"
```

---

## Task 2: 创建简历数据文件

**Files:**
- Create: `src/data/resume.js`

**Step 1: 创建简历数据结构**

```javascript
// src/data/resume.js
export const resumeData = {
  name: "PAN Jiayun",
  nickname: "Jaslyn",
  tagline: "Full-Stack AI Engineer | CS Master's Student @ HKU",
  contact: {
    phone: "(852) 8495-8638",
    emails: ["j18388168@gmail.com", "u3665530@connect.hku.hk"],
    linkedin: "https://www.linkedin.com/in/jaslyn-pan",
    github: "https://github.com/youzuosED"
  },
  education: [
    {
      school: "University of Hong Kong (HKU)",
      location: "Hong Kong",
      degree: "Master of Computer Science",
      period: "09/2025 - 08/2026",
      gpa: null
    },
    {
      school: "University of Shanghai for Science and Technology (USST)",
      location: "Shanghai",
      degree: "Bachelor of Engineering in Intelligent Science and Technology",
      period: "09/2021 - 07/2025",
      gpa: "4.0/4.5 (90.94/100), Rank: 2/44 (Top 5%)"
    }
  ],
  experience: [
    {
      company: "Docpro Limited",
      location: "Hong Kong",
      position: "Full-Stack AI Engineer Intern",
      period: "12/2025 - Present",
      achievements: [
        "Built the company's brand-new advertising webpage tailored for new users, boosting Google traffic to the company by 6%",
        "Integrated RAG into the company's AI Chatbot, cutting the average token consumption by approximately 60%",
        "Compiled skills for using this platform, installed Openclaw on the host and ensured its successful operation, making the platform more agent-friendly and reducing token consumption by around 80%",
        "Created a new database project with Prisma, enabling administrators to set the release time of new advertisements for automatic publication or removal upon expiration",
        "Switched models via Azure and deployed new webpage URLs"
      ]
    },
    {
      company: "Yanfeng",
      location: "Shanghai",
      position: "Knowledge Management Intern",
      period: "07/2024 - 08/2024",
      achievements: [
        "Developed a file-processing program using Python"
      ]
    },
    {
      company: "Yanfeng",
      location: "Shanghai",
      position: "Costing Intern",
      period: "09/2024 - 08/2025",
      achievements: [
        "Built machine learning models to predict costs based on factors such as manufacturing process, labor force, factory location, and materials",
        "Completed the writing of programmes such as extracting file lists"
      ]
    },
    {
      company: "VEONEER",
      location: "Shanghai",
      position: "System Engineer Intern",
      period: "07/2023 - 08/2023",
      achievements: [
        "Operated and maintained the company's business system",
        "Utilised the API interface provided by the company to compose a Python programme for extracting the project numbers that met the requirements",
        "Wrote a Python programme based on the filtering logic to batch-generate the expert mode codes suitable for the company's system"
      ]
    }
  ],
  projects: [
    {
      title: "TouchSoul – Exclusive AI Companion Butler for the Elderly",
      period: "03/2026",
      description: "Supports chatting, reminders and emergency alerts via three simple gesture controls",
      highlights: [
        "Voice input instead of typing, senior-friendly design",
        "Equipped with heart rate detection on mobile phones and one-touch dialing for preset emergency contacts",
        "Customizable lively/quiet modes; AI tone and chat content can be personalized with basic user information"
      ]
    },
    {
      title: "Climate and Disaster Data Analysis Project",
      period: "05/2024 - 07/2024",
      description: "Collected climate and disaster data from meteorological websites for Brazil",
      highlights: [
        "Trained a disaster binary classification prediction model using disaster and climate data",
        "Predicted soybean planting areas using disaster forecasts and Amazon forest area data"
      ]
    },
    {
      title: "Mathematical Contest in Modeling (MCM) - H Award",
      period: "02/2024",
      description: "Designed a comprehensive disaster prediction model",
      highlights: [
        "Established a risk assessment model with the Softmax function to evaluate disaster probabilities and potential losses",
        "Developed a disaster insurance decision model to help insurance companies formulate precise strategies",
        "Demonstrated the model's application potential through a case study of the Netherlands"
      ]
    },
    {
      title: "Build a Network of Collaborations with Patent Data",
      period: "02/2024 - 04/2024",
      description: "Network Science Research",
      highlights: [
        "Used Python to extract and process patent data to obtain data related to the Greater Bay Area Cooperation Network",
        "Built a patent applicant cooperation network based on processed data (6563 nodes and 192673 edges)",
        "Visualised the cooperation network with Gephi"
      ]
    }
  ],
  leadership: [
    {
      role: "Member of the Postgraduate Student Association",
      organization: "HKU",
      period: "09/2025 - 08/2026"
    },
    {
      role: "Member of the 3rd batch of 21st-grade Academician Class",
      organization: "USST",
      period: "09/2022 - 06/2025"
    },
    {
      role: "Student Leader, Visualization Track",
      organization: "Shanghai Computer Application Ability Competition",
      period: "12/2021 - 04/2022",
      highlights: [
        "Engaged in data processing and data cleaning, and fabricated interactive visualisation charts based on Python",
        "Took part in the design of the interface and collected data from the internet",
        "Managed a 3-person team and drafted partial reports"
      ]
    }
  ]
}
```

**Step 2: 提交**

```bash
git add src/data/resume.js
git commit -m "feat: add resume data structure"
```

---

## Task 3: 创建 Navbar 组件

**Files:**
- Create: `src/components/Navbar.jsx`

**Step 1: 创建导航栏组件**

```javascript
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
```

**Step 2: 提交**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add Navbar component with smooth scroll"
```

---

## Task 4: 创建 Hero 组件

**Files:**
- Create: `src/components/Hero.jsx`

**Step 1: 创建 Hero 组件**

```javascript
// src/components/Hero.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-6"
      >
        {/* Avatar placeholder */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold"
        >
          {resumeData.name.split(' ').map(n => n[0]).join('')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {resumeData.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-400 mb-8"
        >
          {resumeData.nickname} · {resumeData.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          {resumeData.contact.linkedin && (
            <motion.a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              LinkedIn
            </motion.a>
          )}
          {resumeData.contact.github && (
            <motion.a
              href={resumeData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              GitHub
            </motion.a>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add Hero component with avatar and animations"
```

---

## Task 5: 创建 About 组件

**Files:**
- Create: `src/components/About.jsx`

**Step 1: 创建 About 组件**

```javascript
// src/components/About.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>

          <div className="glass-card p-8 space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                {resumeData.contact.emails.map((email, i) => (
                  <a key={i} href={`mailto:${email}`} className="text-white hover:text-primary transition-colors block">
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <a href={`tel:${resumeData.contact.phone}`} className="text-white hover:text-secondary transition-colors">
                  {resumeData.contact.phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Location</p>
                <p className="text-white">Hong Kong</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/About.jsx
git commit -m "feat: add About component with contact info"
```

---

## Task 6: 创建 Experience 组件

**Files:**
- Create: `src/components/Experience.jsx`

**Step 1: 创建 Experience 组件**

```javascript
// src/components/Experience.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Work Experience
          </span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-secondary" />

          {resumeData.experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-dark" />

              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="glass-card p-6 hover:bg-white/10 transition-colors">
                  <p className="text-sm text-primary mb-1">{job.period}</p>
                  <h3 className="text-xl font-bold text-white mb-1">{job.position}</h3>
                  <p className="text-slate-400 mb-4">{job.company} · {job.location}</p>

                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-secondary mt-1">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/Experience.jsx
git commit -m "feat: add Experience component with timeline layout"
```

---

## Task 7: 创建 Education 组件

**Files:**
- Create: `src/components/Education.jsx`

**Step 1: 创建 Education 组件**

```javascript
// src/components/Education.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Education
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                    {edu.school.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{edu.school}</h3>
                    <p className="text-sm text-slate-400">{edu.location}</p>
                  </div>
                </div>

                <p className="text-white mb-2">{edu.degree}</p>
                <p className="text-sm text-primary mb-4">{edu.period}</p>

                {edu.gpa && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-slate-400">GPA: <span className="text-secondary">{edu.gpa}</span></p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/Education.jsx
git commit -m "feat: add Education component with card layout"
```

---

## Task 8: 创建 Projects 组件

**Files:**
- Create: `src/components/Projects.jsx`

**Step 1: 创建 Projects 组件**

```javascript
// src/components/Projects.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Academic Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="glass-card p-6 h-full hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <span className="text-xs text-primary whitespace-nowrap">{project.period}</span>
                </div>

                <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/Projects.jsx
git commit -m "feat: add Projects component with grid layout"
```

---

## Task 9: 创建 Leadership 组件

**Files:**
- Create: `src/components/Leadership.jsx`

**Step 1: 创建 Leadership 组件**

```javascript
// src/components/Leadership.jsx
import { motion } from 'framer-motion'
import { resumeData } from '../data/resume'

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Leadership & Activities
          </span>
        </motion.h2>

        <div className="space-y-4">
          {resumeData.leadership.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card p-6 hover:bg-white/10 transition-colors">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{item.role}</h3>
                  <span className="text-sm text-primary">{item.period}</span>
                </div>
                <p className="text-slate-400 mb-3">{item.organization}</p>

                {item.highlights && (
                  <ul className="space-y-1">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-secondary">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/Leadership.jsx
git commit -m "feat: add Leadership component"
```

---

## Task 10: 创建 Footer 组件

**Files:**
- Create: `src/components/Footer.jsx`

**Step 1: 创建 Footer 组件**

```javascript
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
```

**Step 2: 提交**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer component"
```

---

## Task 11: 组装 App 组件

**Files:**
- Modify: `src/App.jsx`

**Step 1: 更新 App.jsx**

```javascript
// src/App.jsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Leadership from './components/Leadership'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
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
```

**Step 2: 验证应用运行**

```bash
npm run dev
```

预期: 浏览器显示完整页面，所有组件正常渲染

**Step 3: 提交**

```bash
git add src/App.jsx
git commit -m "feat: assemble App component with all sections"
```

---

## Task 12: 构建生产版本

**Step 1: 构建项目**

```bash
npm run build
```

预期: 生成 `dist/` 目录，包含优化后的静态文件

**Step 2: 验证构建产物**

```bash
npx serve dist
```

预期: 本地预览生产构建版本

**Step 3: 提交**

```bash
git add .
git commit -m "build: production ready"
```

---

## Task 13: 配置 GitHub Pages 部署

**Step 1: 初始化 Git 仓库**

```bash
cd "D:/工作/personal_web"
git init
git add .
git commit -m "initial: personal resume website"
```

**Step 2: 推送到 GitHub**

```bash
# 创建 GitHub 仓库后
git remote add origin https://github.com/youzuosED/personal-web.git
git branch -M main
git push -u origin main
```

**Step 3: 配置 GitHub Pages**

在 GitHub 仓库设置中:
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root) 或使用 gh-pages 分支

**Step 4: 更新 vite.config.js 中的 base 路径**

如果使用自定义域名或子路径，更新 `base` 配置

**Step 5: 提交**

```bash
git add .
git commit -m "deploy: configure GitHub Pages"
git push
```

---

## 验收标准

- [ ] 页面加载正常，所有组件正确渲染
- [ ] 导航栏平滑滚动到对应区块
- [ ] 响应式布局在移动端和桌面端正常显示
- [ ] 动画效果流畅，无卡顿
- [ ] 所有链接可点击且跳转正确
- [ ] 构建后的 dist 目录可正常部署到 GitHub Pages
