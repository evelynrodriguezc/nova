import { useState, useEffect, useRef } from 'react'
import Button from '../ui/Button'

function useCountUp(to, started, duration = 900, decimals = 1) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutQuint — fast start, quick settle
      const eased = 1 - Math.pow(1 - progress, 5)
      setValue(parseFloat((eased * to).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(to)
    }
    requestAnimationFrame(tick)
  }, [started])
  return value
}

export default function CtaBanner() {
  const [animStarted, setAnimStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimStarted(true); observer.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(12.4, animStarted, 900, 1)

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-5 sm:px-6 py-20 sm:py-32 bg-[#080b0e]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-[#1E72FE]/12 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto relative text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-8 text-white/30">
          Get started today
        </p>

        <div className="mb-4">
          <span
            className="text-[80px] sm:text-[110px] font-bold leading-none tabular-nums text-[#1E72FE]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {count.toFixed(1)}h
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-3 text-white">
          lost every week to work about work.
        </h2>

        <p className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-white/35">
          Nova gives it back.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ opacity: animStarted ? 1 : 0, transform: animStarted ? 'none' : 'translateY(6px)', transition: 'opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s' }}
        >
          <Button variant="accent" size="lg">
            Start free — no credit card
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button variant="ghost-dark" size="lg">Talk to sales</Button>
        </div>

        <p className="mt-6 text-xs text-white/25">
          Free 14-day trial · No setup required · Cancel anytime
        </p>
      </div>
    </section>
  )
}
