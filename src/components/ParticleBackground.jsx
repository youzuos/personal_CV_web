// src/components/ParticleBackground.jsx
import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 粒子配置
    const particleCount = 25
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
        const colors = ['#ffffff', '#e9d5ff', '#f5f3ff']
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

    // 鼠标互动（监听 window，因为 canvas 在 -z-5 层接收不到事件）
    let mouseX = null
    let mouseY = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => p.draw())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
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

    if (prefersReducedMotion) {
      drawStatic()
    } else {
      animate()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-5 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
