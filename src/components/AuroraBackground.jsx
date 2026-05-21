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
