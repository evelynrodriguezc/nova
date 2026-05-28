import { useState, useEffect, useRef } from 'react'

const INSIGHTS = [
  {
    category: 'Focus',
    categoryColor: 'text-[#65ACFE]',
    dot: 'bg-[#1E72FE]',
    title: 'Three writing tasks ready to batch',
    description:
      'The Q2 brief, release notes, and team update share enough context to draft in one session. Switching between them individually costs roughly 40 extra minutes.',
    confidence: 94,
    action: 'Open batch view',
  },
  {
    category: 'Schedule',
    categoryColor: 'text-amber-400',
    dot: 'bg-amber-400',
    title: 'Thursday has six meetings back to back',
    description:
      'Two are marked optional and overlap a deep-work block. Moving the 2pm sync to Friday opens a 3-hour window before the sprint review.',
    confidence: 88,
    action: 'Review schedule',
  },
  {
    category: 'Handoff',
    categoryColor: 'text-stone-400',
    dot: 'bg-stone-500',
    title: 'Design review on Aurora has stalled',
    description:
      "No activity for 3 days. The assigned reviewer has 12 open items ahead of it. Nudging now or reassigning prevents a slip on Friday's deadline.",
    confidence: 81,
    action: 'View handoff',
  },
]

const TREND_DATA = [4, 7, 5, 9, 12, 10, 14]
const TREND_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function TrendLine({ data, width = 188, height = 58, started = false }) {
  const lineRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)

  const W = width
  const H = height
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min === 0 ? 1 : max - min
  const padY = 5

  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - padY - ((v - min) / range) * (H - padY * 2),
  ])

  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H}Z`
  const [lastX, lastY] = pts[pts.length - 1]

  useEffect(() => {
    if (lineRef.current) setPathLength(lineRef.current.getTotalLength())
  }, [])

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" style={{ display: 'block' }}>
      <path
        d={area}
        fill="rgba(101,172,254,0.12)"
        style={{ opacity: started ? 1 : 0, transition: 'opacity 1.8s ease 0.6s' }}
      />
      <path
        ref={lineRef}
        d={line}
        stroke="#65ACFE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength || undefined}
        strokeDashoffset={started ? 0 : pathLength}
        style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1) 0.2s' }}
      />
      <circle
        cx={lastX.toFixed(1)}
        cy={lastY.toFixed(1)}
        r="2.5"
        fill="#65ACFE"
        fillOpacity="0.9"
        style={{ opacity: started ? 1 : 0, transition: 'opacity 0.4s ease 2.2s' }}
      />
    </svg>
  )
}

function ConfidenceDots({ value }) {
  const filled = value >= 90 ? 5 : value >= 80 ? 4 : 3
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`w-1 h-1 rounded-full ${i < filled ? 'bg-stone-500' : 'bg-stone-700'}`} />
      ))}
      <span className="text-[11px] text-stone-600 ml-1 tabular-nums">{value}%</span>
    </div>
  )
}

export default function AIInsights() {
  const [animStarted, setAnimStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimStarted(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-6 px-5 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full bg-[#1E72FE]/6 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="bg-[#0a0f1a] rounded-3xl p-5 sm:p-8 lg:p-12 border border-white/5">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 sm:mb-8">
            <div>
              <p className="text-xs font-semibold text-[#65ACFE] uppercase tracking-widest mb-2">AI Insights</p>
              <h2 className="text-3xl font-bold text-white tracking-tight">Flag what's at risk before it slips</h2>
              <p className="text-white/40 mt-2 max-w-md text-[15px] leading-relaxed">
                Patterns in your team's work surface as clear suggestions — before things fall through the cracks.
              </p>
            </div>
            <button className="text-sm font-medium text-white/30 hover:text-white/80 transition-colors self-start md:self-end whitespace-nowrap">
              View all insights →
            </button>
          </div>

          <div className="rounded-2xl bg-white/4 border border-white/6 p-4 sm:p-7 mb-4 sm:mb-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-10">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Weekly summary</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[11px] text-white/30">Jan 13 – 20</span>
                </div>

                <h3 className="text-xl font-semibold text-white leading-snug mb-3 max-w-lg">
                  Engineering is tracking two days ahead of schedule on Sprint 12
                </h3>

                <p className="text-sm text-white/40 leading-relaxed max-w-lg mb-7">
                  Marketing backlog reached capacity on Thursday — redistributing 3 tasks to the design queue would
                  prevent a Friday bottleneck. Two automations triggered 47 notifications this week; consolidating
                  them could reduce noise by around 60%.
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {[['14', 'Suggestions this week'], ['8.7h', 'Time saved'], ['+18%', 'Output vs last week']].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="text-[22px] font-bold text-white tabular-nums leading-none">{val}</div>
                      <div className="text-[11px] text-white/30 mt-1">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex flex-col gap-3 lg:self-center lg:w-2/5 min-w-0">
                <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Team output · 7 days</span>
                <div className="w-full">
                  <TrendLine data={TREND_DATA} width={320} height={150} started={animStarted} />
                </div>
                <div className="flex items-center justify-between w-full">
                  {TREND_DAYS.map((d, i) => (
                    <span key={i} className="text-[9px] text-white/20 w-4 text-center">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-4">
            {INSIGHTS.map(insight => (
              <div
                key={insight.title}
                className="bg-white/4 rounded-xl border border-white/6 p-5 flex flex-col hover:border-[#1E72FE]/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${insight.dot} shrink-0`} />
                    <span className={`text-[11px] font-semibold uppercase tracking-wide ${insight.categoryColor}`}>
                      {insight.category}
                    </span>
                  </div>
                  <ConfidenceDots value={insight.confidence} />
                </div>

                <h3 className="text-[15px] font-semibold text-white/90 leading-snug mb-2.5">
                  {insight.title}
                </h3>

                <p className="text-[13px] text-white/40 leading-relaxed flex-1 mb-5">
                  {insight.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/6">
                  <button className="text-sm font-medium text-[#65ACFE] hover:text-[#1E72FE] transition-colors">
                    {insight.action}
                  </button>
                  <button className="text-sm text-white/20 hover:text-white/50 transition-colors">
                    Skip
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
