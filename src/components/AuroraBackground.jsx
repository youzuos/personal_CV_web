// src/components/AuroraBackground.jsx
// Static background layers. Keeping the fixed blurred fields still avoids the
// repaint flicker caused by animating large filtered elements.
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-aurora-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(168,85,247,0.20),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_88%,rgba(236,72,153,0.15),transparent_55%)]" />

      <div
        className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-45 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -bottom-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.30) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-[35%] left-[30%] w-[50vw] h-[50vw] rounded-full opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
