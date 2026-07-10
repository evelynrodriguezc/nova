import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../ThemeContext'
import Button from '../ui/Button'

function useCountUp(to, started, duration = 900, decimals = 1) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
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
  const { isDark } = useTheme()
  const [animStarted, setAnimStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setAnimStarted(true), 250); observer.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -220px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(12.4, animStarted, 900, 1)

  return (
    <section ref={sectionRef} className={`relative overflow-hidden px-5 sm:px-6 py-20 sm:py-32 transition-colors duration-300 ${isDark ? 'bg-[#141017]' : 'bg-stone-50'}`}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[600px] h-[400px] rounded-full blur-[120px] transition-opacity duration-300 ${isDark ? 'bg-[#BE185D]/12' : 'bg-[#BE185D]/8'}`} />
      </div>

      <div className="max-w-3xl mx-auto relative text-center">
        <p className={`text-xs font-semibold uppercase tracking-widest mb-8 transition-colors duration-300 ${isDark ? 'text-white/50' : 'text-stone-500'}`}>
          Get started today
        </p>

        <div className="mb-4">
          <span
            className={`text-[80px] sm:text-[110px] font-bold leading-none tabular-nums transition-colors duration-300 ${isDark ? 'text-[#BE185D]' : 'text-[#831843]'}`}
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {count.toFixed(1)}h
          </span>
        </div>

        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-3 transition-colors duration-300 ${isDark ? 'text-white' : 'text-stone-900'}`}>
          lost every week to work about work.
        </h2>

        <p className={`text-2xl sm:text-3xl font-bold tracking-tight mb-10 transition-colors duration-300 ${isDark ? 'text-white/50' : 'text-stone-500'}`}>
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
          <Button variant={isDark ? 'ghost-dark' : 'secondary'} size="lg">Talk to sales</Button>
        </div>

        <p className={`mt-6 text-xs transition-colors duration-300 ${isDark ? 'text-white/50' : 'text-stone-500'}`}>
          Free 14-day trial · No setup required · Cancel anytime
        </p>
      </div>
    </section>
  )
}
