import { useState, useEffect } from 'react'
import { useTheme } from '../../ThemeContext'
import Button from '../ui/Button'

function useCountUp(to, decimals = 0, duration = 1200) {
  const from = to * 0.88
  const [value, setValue] = useState(from)
  useEffect(() => {
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((from + eased * (to - from)).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(to)
    }
    const id = setTimeout(() => requestAnimationFrame(tick), 400)
    return () => clearTimeout(id)
  }, [])
  return value
}

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', active: true },
  { name: 'Projects', active: false },
  { name: 'Insights', active: false },
  { name: 'Automation', active: false },
]

const SUGGESTIONS = [
  {
    category: 'Focus',
    categoryColor: 'text-[#1E72FE]',
    title: 'Three writing tasks ready to batch',
    confidence: 94,
    dot: 'bg-[#1E72FE]',
  },
  {
    category: 'Schedule',
    categoryColor: 'text-amber-600',
    title: 'Thursday is overloaded — 6 meetings back to back',
    confidence: 88,
    dot: 'bg-amber-400',
  },
  {
    category: 'Handoff',
    categoryColor: 'text-stone-400',
    title: 'Aurora design review has been idle for 3 days',
    confidence: 81,
    dot: 'bg-stone-400',
  },
]

const ACTIVITIES = [
  { avatar: 'SK', avatarBg: 'bg-blue-100 text-[#1E72FE]', user: 'Sarah K.', action: 'completed', target: 'Pricing page copy audit', time: '2m ago', dot: 'bg-emerald-400' },
  { avatar: 'AI', avatarBg: 'bg-[#1E72FE] text-white', user: 'Nova AI', action: 'auto-assigned', target: 'Critical bug #1204 to Priya', time: '34m ago', dot: 'bg-[#1E72FE]' },
  { avatar: 'PS', avatarBg: 'bg-emerald-100 text-emerald-800', user: 'Priya S.', action: 'merged', target: 'feat/new-onboarding into main', time: '1h ago', dot: 'bg-stone-300' },
  { avatar: 'TL', avatarBg: 'bg-amber-100 text-amber-800', user: 'Tom L.', action: 'created workflow', target: 'Weekly Digest Automation', time: '2h ago', dot: 'bg-stone-300' },
]

const PROJECTS = [
  { name: 'Aurora Rebrand', progress: 78, color: '#1E72FE' },
  { name: 'Confluence → Notion', progress: 52, color: '#f59e0b' },
  { name: 'API rate limiting', progress: 91, color: '#10b981' },
]

function ProductMockup() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white overflow-hidden shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100 bg-stone-50">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex-1 py-1 px-3 rounded-sm bg-white border border-stone-200 text-[11px] text-stone-400">
          app.nova.ai/dashboard
        </div>
      </div>

      <div className="flex sm:h-[340px]">
        {/* Sidebar */}
        <div className="hidden sm:block border-r border-stone-100 py-5 px-2.5 shrink-0 bg-white" style={{ width: '140px' }}>
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-5 h-5 rounded-sm bg-[#1E72FE] shrink-0" />
            <span className="text-xs font-semibold text-stone-800">Nova</span>
          </div>
          {SIDEBAR_ITEMS.map(({ name, active }) => (
            <div
              key={name}
              className={`px-2.5 py-1.5 rounded-sm mb-0.5 text-[11px] font-medium ${
                active ? 'bg-[#1E72FE] text-white' : 'text-stone-400'
              }`}
            >
              {name}
            </div>
          ))}

          {/* Mini project list in sidebar */}
          <div className="mt-6 px-2">
            <div className="text-[9px] font-semibold text-stone-400 uppercase tracking-widest mb-3">Projects</div>
            {PROJECTS.map(p => (
              <div key={p.name} className="mb-3">
                <div className="text-[9px] text-stone-600 truncate mb-1">{p.name}</div>
                <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.progress}%`, backgroundColor: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content — activity feed, clean and readable */}
        <div className="flex-1 bg-stone-50 flex flex-col overflow-hidden">
          {/* Content header */}
          <div className="px-5 py-4 bg-white border-b border-stone-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-stone-900">Recent Activity</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Sprint 12 · Jan 20</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-medium text-stone-400">Today</div>
              <div className="text-[10px] font-medium" style={{ color: '#1E72FE' }}>This week</div>
            </div>
          </div>

          {/* Activity rows */}
          <div className="flex-1 divide-y divide-stone-100 overflow-hidden">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="px-5 py-3 flex items-start gap-3 bg-white hover:bg-stone-50 transition-colors">
                <div className={`w-6 h-6 rounded-full ${a.avatarBg} flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5`}>
                  {a.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-stone-700 leading-snug">
                    <span className="font-semibold text-stone-900">{a.user}</span>
                    {' '}<span className="text-stone-500">{a.action}</span>
                    {' '}<span className="font-medium text-stone-800">{a.target}</span>
                  </div>
                  <div className="text-[9px] text-stone-400 mt-0.5">{a.time}</div>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${a.dot} shrink-0 mt-1.5`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroStats({ isDark }) {
  const hours = useCountUp(12.4, 1)

  const stats = [
    { display: `${hours.toFixed(1)}h`, label: 'saved per team, per week' },
    { display: '94%',  label: 'projects delivered on time' },
    { display: '480+', label: 'teams across 18 countries' },
  ]

  return (
    <div className="hidden sm:flex flex-row items-center justify-center gap-12 mb-16">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-12">
          {i > 0 && <div className={`w-px h-8 ${isDark ? 'bg-white/10' : 'bg-stone-200'}`} />}
          <div className="text-center">
            <div className={`text-2xl font-bold tabular-nums transition-colors duration-300 ${isDark ? 'text-white' : 'text-stone-900'}`}>{stat.display}</div>
            <div className={`text-xs mt-0.5 font-medium transition-colors duration-300 ${isDark ? 'text-white/40' : 'text-stone-500'}`}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const { isDark } = useTheme()

  return (
    <section className="relative pt-32 sm:pt-44 pb-10 sm:pb-16 px-5 sm:px-6 overflow-hidden">
      {/* Brand blue glow orbs — animated */}
      <div className={`glow-center absolute top-[-80px] left-1/2 w-[900px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-[#1E72FE]/12' : 'bg-[#1E72FE]/6'}`} />
      <div className={`glow-left absolute top-[10%] left-[-150px] w-[500px] h-[400px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-[#65ACFE]/8' : 'bg-[#65ACFE]/4'}`} />
      <div className={`glow-right absolute top-[20%] right-[-150px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-[#1E72FE]/6' : 'bg-[#1E72FE]/4'}`} />

      <div className="max-w-5xl mx-auto">
        <h1 className={`text-center text-[36px] sm:text-5xl md:text-[62px] font-bold tracking-tight leading-[1.08] mb-5 transition-colors duration-300 ${isDark ? 'text-white' : 'text-stone-900'}`}>
          Your team's work,{' '}
          <span className="text-[#1E72FE]">organized before you ask.</span>
        </h1>

        <p className={`text-center text-[15px] sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-colors duration-300 ${isDark ? 'text-white/50' : 'text-stone-600'}`}>
          Nova tracks projects, surfaces blockers, and automates the handoffs — so nothing slips through the cracks and you're never chasing status.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-16">
          <Button variant="accent" size="lg">
            Start free trial
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          {isDark ? (
            <Button variant="ghost-dark" size="lg">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5.5 5L9 7L5.5 9V5Z" fill="currentColor" />
              </svg>
              See it in action
            </Button>
          ) : (
            <Button variant="secondary" size="lg">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5.5 5L9 7L5.5 9V5Z" fill="currentColor" />
              </svg>
              See it in action
            </Button>
          )}
        </div>

        {/* Stats row */}
        <HeroStats isDark={isDark} />

        <ProductMockup />
      </div>
    </section>
  )
}
