// Lightweight placeholder used while lazy-loaded sections are downloading.
// Sized to roughly match the real section so the page doesn't reflow when
// the chunk arrives.
export default function SectionSkeleton({ minHeight = '420px', label = 'Loading section' }) {
  return (
    <section className="py-24 px-6" aria-busy="true" aria-label={label}>
      <div className="max-w-4xl mx-auto">
        <div
          className="glass-card p-8 animate-pulse"
          style={{ minHeight }}
        >
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-white/10 rounded-md" />
            <div className="h-3 w-2/3 bg-white/5 rounded-md" />
            <div className="h-3 w-1/2 bg-white/5 rounded-md" />
            <div className="h-3 w-3/5 bg-white/5 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  )
}
