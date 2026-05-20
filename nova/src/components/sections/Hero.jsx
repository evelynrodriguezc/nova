import Button from '../ui/Button'
import Badge from '../ui/Badge'

// Mirrors the Dashboard section content/patterns so the mockup looks like a real screenshot of the product below.
const MOCKUP_PROJECTS = [
  { name: 'Nova 2.0 Launch', progress: 78, color: 'bg-emerald-500' },
  { name: 'Q2 Marketing Campaign', progress: 52, color: 'bg-amber-400' },
  { name: 'Mobile App Redesign', progress: 91, color: 'bg-blue-500' },
]

const MOCKUP_HIGHLIGHTS = [
  { dot: 'bg-blue-500', title: 'Sprint 12 kicked off', desc: 'Engineering · Jan 18' },
  { dot: 'bg-emerald-500', title: '12.4h saved by automation', desc: 'This week · 8 active workflows' },
  { dot: 'bg-violet-400', title: 'Q1 audit completed on time', desc: 'Finance · All items closed' },
  { dot: 'bg-amber-400', title: 'Velocity at 3-month high', desc: '94 pts · Best sprint yet' },
]

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', active: true },
  { name: 'Projects', active: false },
  { name: 'Insights', active: false },
  { name: 'Automation', active: false },
]

function ProductMockup() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex-1 py-1 px-3 rounded-md bg-white border border-slate-200 text-[11px] text-slate-400">
          app.nova.ai/dashboard
        </div>
      </div>

      <div className="flex sm:h-[370px]">
        {/* Sidebar — hidden on mobile, shown sm+ */}
        <div className="hidden sm:block border-r border-slate-100 py-5 px-2.5 shrink-0 bg-white" style={{ width: '148px' }}>
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-5 h-5 rounded-md bg-blue-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">Nova</span>
          </div>

          {SIDEBAR_ITEMS.map(({ name, active }) => (
            <div
              key={name}
              className={`px-2.5 py-1.5 rounded-md mb-0.5 text-[11px] font-medium transition-colors ${
                active ? 'bg-blue-50 text-blue-700' : 'text-slate-500'
              }`}
            >
              {name}
            </div>
          ))}
        </div>

        {/* Main content — matches Dashboard section structure */}
        <div className="flex-1 bg-slate-50 p-5 flex flex-col gap-3 overflow-hidden">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-900">Overview</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Sprint 12 · Jan 20</div>
            </div>
            <div className="flex items-center">
              {['bg-blue-300', 'bg-violet-300', 'bg-emerald-300'].map((c, i) => (
                <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-slate-50 ${i > 0 ? '-ml-1.5' : ''}`} />
              ))}
              <span className="text-[10px] text-slate-400 ml-1.5">+2</span>
            </div>
          </div>

          {/* Stat cards — 2 wide, matching Dashboard's visual weight */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white rounded-lg p-3 border border-slate-100">
              <div className="text-[10px] text-slate-500 mb-2">Completed this week</div>
              <div className="text-[17px] font-bold text-slate-900 tracking-tight leading-none">24 tasks</div>
              <div className="text-[9px] text-emerald-600 font-medium mt-1.5">↑ 18% vs last week</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-100">
              <div className="text-[10px] text-slate-500 mb-2">Time reclaimed</div>
              <div className="text-[17px] font-bold text-slate-900 tracking-tight leading-none">4.2 hours</div>
              <div className="text-[9px] text-emerald-600 font-medium mt-1.5">↑ 23% vs last week</div>
            </div>
          </div>

          {/* Bottom row — Projects (always) + This Week (sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">

            {/* Active Projects */}
            <div className="bg-white rounded-lg border border-slate-100 p-3 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-slate-700">Active Projects</span>
                <span className="text-[9px] text-blue-600 font-medium">View all</span>
              </div>
              <div className="flex flex-col gap-3">
                {MOCKUP_PROJECTS.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-700 flex-1 truncate">{p.name}</span>
                    <div className="w-20 sm:w-[220px] h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 tabular-nums w-5 text-right shrink-0">{p.progress}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* This Week — hidden on mobile */}
            <div className="hidden sm:flex bg-white rounded-lg border border-slate-100 p-3 flex-col">
              <span className="text-[10px] font-semibold text-slate-700 mb-3">This Week</span>
              <div className="flex flex-col gap-2.5 flex-1">
                {MOCKUP_HIGHLIGHTS.map(item => (
                  <div key={item.title} className="flex items-start gap-1.5">
                    <div className={`w-1 h-1 rounded-full ${item.dot} shrink-0 mt-[4px]`} />
                    <div>
                      <p className="text-[9px] font-medium text-slate-800 leading-tight">{item.title}</p>
                      <p className="text-[8px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 hero-grid" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[900px] h-[500px] bg-gradient-to-br from-blue-50 to-violet-50 rounded-full blur-3xl opacity-80" />

      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="blue" className="py-1 px-4">
            AI-assisted workflow management
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-center text-[36px] sm:text-5xl md:text-[60px] font-bold text-slate-900 tracking-tight leading-[1.1] mb-5">
          The workspace that keeps your{' '}
          <span className="text-blue-600">team one step ahead</span>
        </h1>

        {/* Subtext — concrete, no "intelligent layer" language */}
        <p className="text-center text-[15px] sm:text-lg text-slate-500 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Track projects, automate repetitive work, and keep teams in sync.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-8">
          <Button size="lg">
            Start free trial
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5.5 5L9 7L5.5 9V5Z" fill="currentColor" />
            </svg>
            See it in action
          </Button>
        </div>

        {/* Social proof — plain text, no decorative dividers */}
        <p className="text-center text-xs text-slate-400 mb-10 sm:mb-14">
          Built for modern collaborative teams
        </p>

        {/* Product mockup */}
        <ProductMockup />
      </div>
    </section>
  )
}
