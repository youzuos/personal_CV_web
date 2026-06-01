// src/components/AuroraBackground.jsx
// 极简极光 — 仅保留两道柔光，让色彩成为氛围而非主角
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-aurora-bg">
      {/* 右上柔和紫色光边 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(168,85,247,0.20),transparent_55%)]" />
      {/* 左下柔和粉色光边 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_88%,rgba(236,72,153,0.15),transparent_55%)]" />
    </div>
  )
}
