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
