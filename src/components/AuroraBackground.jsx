// src/components/AuroraBackground.jsx
// 三层背景:静态主调 radial(锚定色彩位置) + 漂浮极光斑(给整个站呼吸感)。
// 漂浮斑用纯 transform 动画,composited 路径,GPU 友好;prefers-reduced-motion
// 由 index.css 的全局规则统一压成 0.01ms,这里不再重复处理。
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-aurora-bg">
      {/* 静态主调 — 锚定整体色温,即使漂浮层被 reduced-motion 冻住也不失主题 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(168,85,247,0.20),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_88%,rgba(236,72,153,0.15),transparent_55%)]" />

      {/* 漂浮极光带 — mix-blend-screen 让光斑彼此叠加更柔和,而不是平铺覆盖 */}
      <div
        className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-50 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'auroraDrift1 28s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute -bottom-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-45 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.30) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'auroraDrift2 34s ease-in-out infinite',
          animationDelay: '-8s',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute top-[35%] left-[30%] w-[50vw] h-[50vw] rounded-full opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'auroraDrift3 40s ease-in-out infinite',
          animationDelay: '-15s',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
