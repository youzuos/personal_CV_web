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
