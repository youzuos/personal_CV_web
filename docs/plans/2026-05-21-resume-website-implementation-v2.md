# Aurora 简历网页实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建 Aurora 动态渐变风格的个人简历网页，包含流动光晕背景、3D 浮动卡片、粒子效果和高饱和度配色。

**Architecture:** 单页应用，组件化设计，使用 Framer Motion 实现复杂动画，原生 CSS 实现流动渐变，轻量级 Canvas 粒子系统。

**Tech Stack:** React 18, Vite 5, TailwindCSS 3, Framer Motion 11

---

## Task 1: 初始化项目

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `tailwind.config.js`

**Step 1: 创建项目结构**

```bash
cd "D:/工作/personal_web"
npm create vite@latest . -- --template react
npm install
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
mkdir -p src/{components,data,hooks,utils} public
```

**Step 2: 配置 TailwindCSS**

创建 `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aurora: {
          bg: '#030014',
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          orange: '#f97316',
          yellow: '#eab308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'aurora-float': 'auroraFloat 20s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        auroraFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, -50px) scale(1.1)' },
          '50%': { transform: 'translate(-50px, 50px) scale(0.9)' },
          '75%': { transform: 'translate(-30px, -30px) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(80px)' },
          '50%': { opacity: '0.8', filter: 'blur(100px)' },
        },
      },
    },
  },
  plugins: [],
}
```

创建 `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-aurora-bg text-white antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer components {
  .glass-card {
    @apply relative overflow-hidden rounded-3xl;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .glass-card::before {
    content: '';
    @apply absolute inset-0 opacity-0 transition-opacity duration-500;
    background: linear-gradient(
      135deg,
      rgba(168, 85, 247, 0.1) 0%,
      rgba(6, 182, 212, 0.1) 100%
    );
  }

  .glass-card:hover::before {
    @apply opacity-100;
  }

  .gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(
      135deg,
      #a855f7 0%,
      #ec4899 50%,
      #06b6d4 100%
    );
  }

  .gradient-border {
    @apply relative;
  }

  .gradient-border::after {
    content: '';
    @apply absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300;
    background: linear-gradient(135deg, #a855f7, #ec4899, #06b6d4);
    z-index: -1;
    filter: blur(20px);
  }

  .gradient-border:hover::after {
    @apply opacity-60;
  }

  .hero-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: auroraFloat 20s ease-in-out infinite;
  }

  .btn-gradient {
    @apply relative overflow-hidden rounded-full px-8 py-3 font-semibold transition-all duration-300;
    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
    box-shadow:
      0 4px 15px rgba(168, 85, 247, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .btn-gradient:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 25px rgba(168, 85, 247, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .timeline-line {
    @apply absolute left-0 md:left-1/2 top-0 bottom-0 w-px;
    background: linear-gradient(
      to bottom,
      transparent,
      #a855f7,
      #ec4899,
      #06b6d4,
      transparent
    );
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #030014;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #ec4899, #06b6d4);
}
```

**Step 3: 更新 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/personal-web/',
})
```

**Step 4: 验证项目运行**

```bash
npm run dev
```

**Step 5: 提交**

```bash
git add .
git commit -m "feat: initialize Aurora-style project with TailwindCSS"
```

---

## Task 2: 创建 Aurora 背景组件

**Files:**
- Create: `src/components/AuroraBackground.jsx`

**Step 1: 创建流动渐变背景**

```javascript
// src/components/AuroraBackground.jsx
import { useEffect, useState } from 'react'

export default function AuroraBackground() {
  const [blobs, setBlobs] = useState([])

  useEffect(() => {
    // 创建多个渐变光斑
    const newBlobs = [
      { id: 1, color: 'from-aurora-purple via-aurora-pink to-aurora-cyan', size: 600, delay: 0 },
      { id: 2, color: 'from-aurora-cyan via-aurora-blue to-aurora-purple', size: 500, delay: -5 },
      { id: 3, color: 'from-aurora-orange via-aurora-yellow to-aurora-pink', size: 400, delay: -10 },
      { id: 4, color: 'from-aurora-pink via-aurora-purple to-aurora-cyan', size: 550, delay: -15 },
    ]
    setBlobs(newBlobs)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-aurora-bg">
      {/* 渐变光斑 */}
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className={`hero-glow bg-gradient-to-br ${blob.color}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: `${20 + blob.id * 15}%`,
            left: `${10 + blob.id * 20}%`,
            animationDelay: `${blob.delay}s`,
          }}
        />
      ))}

      {/* 网格覆盖 */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}
```

**Step 2: 提交**

```bash
git add src/components/AuroraBackground.jsx
git commit -m "feat: add Aurora flowing gradient background"
```

---

## Task 3: 创建粒子背景组件

**Files:**
- Create: `src/components/ParticleBackground.jsx`

**Step 1: 创建轻量级粒子系统**

```javascript
// src/components/ParticleBackground.jsx
import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 粒子配置
    const particleCount = 50
    const particles = []

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = ['#a855f7', '#ec4899', '#06b6d4', '#3b82f6']
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // 鼠标互动
    let mouseX = null
    let mouseY = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // 鼠标避让效果
        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX
          const dy = particle.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const force = (150 - distance) / 150
            particle.x += (dx / distance) * force * 2
            particle.y += (dy / distance) * force * 2
          }
        }

        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 pointer-events-auto"
      style={{ opacity: 0.6 }}
    />
  )
}
```

**Step 2: 提交**

```bash
git add src/components/ParticleBackground.jsx
git commit -m "feat: add interactive particle background"
```

---

## Task 4: 创建 3D 倾斜卡片 Hook

**Files:**
- Create: `src/hooks/useTilt.js`

**Step 1: 创建 3D 倾斜 Hook**

```javascript
// src/hooks/useTilt.js
import { useMotionValue, useSpring } from 'framer-motion'

export const useTilt = () => {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)
  const scaleSpring = useSpring(scale, springConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -5 // 最大旋转 5 度
    const rotateYValue = ((x - centerX) / centerX) * 5

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  const handleMouseEnter = () => {
    scale.set(1.02)
  }

  return {
    rotateX: rotateXSpring,
    rotateY: rotateYSpring,
    scale: scaleSpring,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
  }
}
```

**Step 2: 提交**

```bash
git add src/hooks/useTilt.js
git commit -m "feat: add 3D tilt hook for interactive cards"
```

---

## Task 5: 创建简历数据文件

**Files:**
- Create: `src/data/resume.js`

(与之前相同，包含完整的简历数据)

**Step 1: 创建简历数据**

```javascript
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
      icon: "🤖",
      achievements: [
        "Built the company's brand-new advertising webpage tailored for new users, boosting Google traffic to the company by 6%",
        "Integrated RAG into the company's AI Chatbot, cutting the average token consumption by approximately 60%",
        "Compiled skills for using this platform, installed Openclaw on the host and ensured its successful operation",
        "Created a new database project with Prisma for automatic advertisement publication",
        "Switched models via Azure and deployed new webpage URLs"
      ]
    },
    {
      company: "Yanfeng",
      location: "Shanghai",
      position: "Costing Intern",
      period: "09/2024 - 08/2025",
      icon: "💰",
      achievements: [
        "Built machine learning models to predict costs based on manufacturing process, labor force, and materials",
        "Completed file processing programs for data extraction"
      ]
    },
    {
      company: "Yanfeng",
      location: "Shanghai",
      position: "Knowledge Management Intern",
      period: "07/2024 - 08/2024",
      icon: "📚",
      achievements: [
        "Developed a file-processing program using Python"
      ]
    },
    {
      company: "VEONEER",
      location: "Shanghai",
      position: "System Engineer Intern",
      period: "07/2023 - 08/2023",
      icon: "⚙️",
      achievements: [
        "Operated and maintained the company's business system",
        "Created Python programmes for API data extraction",
        "Batch-generated expert mode codes based on filtering logic"
      ]
    }
  ],
  projects: [
    {
      title: "TouchSoul – AI Companion for Elderly",
      period: "03/2026",
      icon: "👴",
      gradient: "from-aurora-purple to-aurora-pink",
      description: "Exclusive AI companion butler supporting gesture controls, voice input, and emergency alerts",
      highlights: [
        "Voice input with senior-friendly design",
        "Heart rate detection and one-touch emergency dialing",
        "Customizable AI tone and content personalization"
      ]
    },
    {
      title: "Climate & Disaster Data Analysis",
      period: "05/2024 - 07/2024",
      icon: "🌍",
      gradient: "from-aurora-cyan to-aurora-blue",
      description: "Brazil climate data analysis with ML prediction models",
      highlights: [
        "Trained disaster binary classification prediction model",
        "Predicted soybean planting areas using disaster forecasts"
      ]
    },
    {
      title: "MCM - H Award",
      period: "02/2024",
      icon: "🏆",
      gradient: "from-aurora-orange to-aurora-yellow",
      description: "Comprehensive disaster prediction model with risk assessment",
      highlights: [
        "Softmax function risk assessment model",
        "Disaster insurance decision model",
        "Netherlands case study validation"
      ]
    },
    {
      title: "Patent Cooperation Network",
      period: "02/2024 - 04/2024",
      icon: "🔗",
      gradient: "from-aurora-pink to-aurora-cyan",
      description: "Network science research on Greater Bay Area patent data",
      highlights: [
        "Built cooperation network with 6563 nodes and 192673 edges",
        "Python data extraction and Gephi visualization"
      ]
    }
  ],
  leadership: [
    {
      role: "Member of the Postgraduate Student Association",
      organization: "HKU",
      period: "09/2025 - 08/2026",
      icon: "🎓"
    },
    {
      role: "Member of Academician Class",
      organization: "USST",
      period: "09/2022 - 06/2025",
      icon: "📖"
    },
    {
      role: "Student Leader, Visualization Track",
      organization: "Shanghai Computer Competition",
      period: "12/2021 - 04/2022",
      icon: "👥",
      highlights: [
        "Managed 3-person team",
        "Data processing and interactive visualization with Python",
        "Interface design and data collection"
      ]
    }
  ]
}
```

**Step 2: 提交**

```bash
git add src/data/resume.js
git commit -m "feat: add resume data with icons and gradients"
```

---

## Task 6-13: 创建各组件（Aurora 风格）

由于篇幅限制，以下是各组件的关键代码片段：

### Hero 组件特点
- 大尺寸渐变文字名字
- 发光头像环
- 渐变按钮
- 浮动动画元素

### Experience 组件特点
- 3D 时间线布局
- 卡片悬停倾斜效果
- 发光连接线
- 渐变图标

### Projects 组件特点
- Bento 网格布局
- 不同卡片高度
- 渐变边框发光
- 悬停放大效果

---

## 完整实现计划

由于完整代码较长，建议在新会话中使用 `superpowers:executing-plans` 来执行完整实现。

---

## 执行方式

**请在新会话中执行：**

```
/skill superpowers:executing-plans
```

然后执行 `docs/plans/2026-05-21-resume-website-implementation-v2.md`
