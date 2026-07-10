import { useTheme } from '../../ThemeContext'
import Button from '../ui/Button'

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', active: true },
  { name: 'Projects', active: false },
  { name: 'Insights', active: false },
  { name: 'Automation', active: false },
]

const ACTIVITIES = [
  { avatar: 'SK', avatarBg: 'bg-rose-100 text-[#831843]', user: 'Sarah K.', action: 'completed', target: 'Pricing page copy audit', time: '2m ago', dot: 'bg-emerald-400' },
  { avatar: 'AI', avatarBg: 'bg-[#831843] text-white', user: 'Nova AI', action: 'auto-assigned', target: 'Critical bug #1204 to Priya', time: '34m ago', dot: 'bg-[#831843]' },
  { avatar: 'PS', avatarBg: 'bg-emerald-100 text-emerald-800', user: 'Priya S.', action: 'merged', target: 'feat/new-onboarding into main', time: '1h ago', dot: 'bg-stone-300' },
  { avatar: 'TL', avatarBg: 'bg-amber-100 text-amber-800', user: 'Tom L.', action: 'created workflow', target: 'Weekly Digest Automation', time: '2h ago', dot: 'bg-stone-300' },
]

const PROJECTS = [
  { name: 'Aurora Rebrand', progress: 78, color: '#831843' },
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
            <div className="w-5 h-5 rounded-sm bg-[#831843] shrink-0" />
            <span className="text-xs font-semibold text-stone-800">Nova</span>
          </div>
          {SIDEBAR_ITEMS.map(({ name, active }) => (
            <div
              key={name}
              className={`px-2.5 py-1.5 rounded-sm mb-0.5 text-[11px] font-medium ${
                active ? 'bg-[#831843] text-white' : 'text-stone-400'
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
              <div className="text-[10px] font-medium" style={{ color: '#831843' }}>This week</div>
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

export default function Hero() {
  const { isDark } = useTheme()

  return (
    <section className="relative pt-40 sm:pt-56 pb-10 sm:pb-16 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <h1 className={`text-center text-[36px] sm:text-5xl md:text-[62px] font-bold tracking-tight leading-[1.08] mb-5 transition-colors duration-300 ${isDark ? 'text-white' : 'text-stone-900'}`}>
          Your team's work,{' '}
          <span className={isDark ? 'text-[#BE185D]' : 'text-[#831843]'}>organized before you ask.</span>
        </h1>

        <p className={`text-center text-[15px] sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-colors duration-300 ${isDark ? 'text-white/50' : 'text-stone-600'}`}>
          Nova tracks projects, surfaces blockers, and automates the handoffs — so nothing slips through the cracks and you're never chasing status.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 sm:mb-20">
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

        <ProductMockup />
      </div>
    </section>
  )
}
