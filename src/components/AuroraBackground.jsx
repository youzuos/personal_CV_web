// src/components/AuroraBackground.jsx
import { useEffect, useState } from 'react'

export default function AuroraBackground() {
  const [shapes, setShapes] = useState([])

  useEffect(() => {
    // 创建更多样化的背景形状
    const newShapes = [
      // 大型渐变光斑
      { id: 'blob1', type: 'blob', color: 'from-aurora-purple/30 via-aurora-pink/20 to-transparent', size: 700, x: '10%', y: '20%', delay: 0 },
      { id: 'blob2', type: 'blob', color: 'from-aurora-cyan/25 via-aurora-blue/20 to-transparent', size: 600, x: '70%', y: '10%', delay: -5 },
      { id: 'blob3', type: 'blob', color: 'from-aurora-pink/25 via-aurora-purple/15 to-transparent', size: 500, x: '50%', y: '70%', delay: -10 },
      { id: 'blob4', type: 'blob', color: 'from-aurora-orange/20 via-aurora-yellow/15 to-transparent', size: 400, x: '20%', y: '60%', delay: -15 },
      { id: 'blob5', type: 'blob', color: 'from-aurora-blue/25 via-aurora-purple/20 to-transparent', size: 550, x: '80%', y: '50%', delay: -8 },

      // 浮动圆圈
      { id: 'circle1', type: 'circle', size: 300, x: '15%', y: '25%', delay: 0, duration: 25 },
      { id: 'circle2', type: 'circle', size: 200, x: '85%', y: '15%', delay: -5, duration: 20 },
      { id: 'circle3', type: 'circle', size: 150, x: '75%', y: '75%', delay: -10, duration: 30 },
      { id: 'circle4', type: 'circle', size: 250, x: '25%', y: '80%', delay: -15, duration: 22 },

      // 浮动方块
      { id: 'rect1', type: 'rect', size: 80, x: '8%', y: '40%', delay: 0, duration: 18, rotate: true },
      { id: 'rect2', type: 'rect', size: 60, x: '92%', y: '35%', delay: -7, duration: 24, rotate: true },
      { id: 'rect3', type: 'rect', size: 50, x: '5%', y: '70%', delay: -12, duration: 20, rotate: true },
      { id: 'rect4', type: 'rect', size: 70, x: '88%', y: '65%', delay: -18, duration: 28, rotate: true },

      // 浮动线条
      { id: 'line1', type: 'line', length: 150, x: '20%', y: '15%', delay: 0, rotation: 45 },
      { id: 'line2', type: 'line', length: 200, x: '80%', y: '85%', delay: -6, rotation: -30 },
      { id: 'line3', type: 'line', length: 120, x: '10%', y: '90%', delay: -12, rotation: 60 },
      { id: 'line4', type: 'line', length: 180, x: '90%', y: '20%', delay: -18, rotation: -45 },

      // 三角形
      { id: 'triangle1', type: 'triangle', size: 100, x: '12%', y: '55%', delay: 0, duration: 20 },
      { id: 'triangle2', type: 'triangle', size: 80, x: '88%', y: '45%', delay: -8, duration: 25 },

      // 十字
      { id: 'cross1', type: 'cross', size: 40, x: '30%', y: '8%', delay: 0 },
      { id: 'cross2', type: 'cross', size: 30, x: '70%', y: '92%', delay: -10 },
    ]
    setShapes(newShapes)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-aurora-bg">
      {/* 径向渐变底色 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(168,85,247,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(6,182,212,0.06),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(236,72,153,0.06),transparent_40%)]" />

      {/* 渲染所有形状 */}
      {shapes.map((shape) => {
        switch (shape.type) {
          case 'blob':
            return (
              <div
                key={shape.id}
                className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
                style={{
                  width: shape.size,
                  height: shape.size,
                  left: shape.x,
                  top: shape.y,
                  animation: `float ${20 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${shape.delay}s`,
                }}
              />
            )

          case 'circle':
            return (
              <div
                key={shape.id}
                className="absolute rounded-full border border-aurora-purple/10"
                style={{
                  width: shape.size,
                  height: shape.size,
                  left: shape.x,
                  top: shape.y,
                  animation: `float ${shape.duration}s ease-in-out infinite`,
                  animationDelay: `${shape.delay}s`,
                }}
              />
            )

          case 'rect':
            return (
              <div
                key={shape.id}
                className="absolute border border-aurora-cyan/10"
                style={{
                  width: shape.size,
                  height: shape.size,
                  left: shape.x,
                  top: shape.y,
                  animation: `float ${shape.duration}s ease-in-out infinite${shape.rotate ? ', rotate 30s linear infinite' : ''}`,
                  animationDelay: `${shape.delay}s`,
                }}
              />
            )

          case 'line':
            return (
              <div
                key={shape.id}
                className="absolute h-px bg-gradient-to-r from-transparent via-aurora-pink/10 to-transparent"
                style={{
                  width: shape.length,
                  left: shape.x,
                  top: shape.y,
                  transform: `rotate(${shape.rotation}deg)`,
                  animation: `float ${20 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${shape.delay}s`,
                }}
              />
            )

          case 'triangle':
            return (
              <div
                key={shape.id}
                className="absolute"
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size * 0.866}px solid rgba(168, 85, 247, 0.08)`,
                  animation: `float ${shape.duration}s ease-in-out infinite`,
                  animationDelay: `${shape.delay}s`,
                }}
              />
            )

          case 'cross':
            return (
              <div
                key={shape.id}
                className="absolute"
                style={{
                  left: shape.x,
                  top: shape.y,
                  animation: `float ${20 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${shape.delay}s`,
                }}
              >
                <div className="absolute w-px h-full bg-aurora-orange/10 left-1/2 -translate-x-1/2" />
                <div className="absolute h-px w-full bg-aurora-orange/10 top-1/2 -translate-y-1/2" />
              </div>
            )

          default:
            return null
        }
      })}

      {/* 波浪 SVG */}
      <svg className="absolute bottom-0 left-0 right-0 opacity-[0.03]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="currentColor"
          className="text-aurora-purple"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      <svg className="absolute top-0 left-0 right-0 opacity-[0.02]" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
        <path
          fill="currentColor"
          className="text-aurora-cyan"
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* 网格 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 点阵 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}
