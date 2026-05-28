import { useState, useEffect, useRef } from 'react'
import Card from '../ui/Card'
import StatCard from '../ui/StatCard'

const STATS = [
  {
    label: 'Tasks Completed',
    value: '1,247',
    to: 1247,
    format: n => Math.round(n).toLocaleString(),
    change: '21% this week',
    changeType: 'positive',
    sparkline: [44, 52, 48, 61, 67, 78, 91],
    strokeColor: '#1E72FE',
    fillColor: 'rgba(30,114,254,0.08)',
  },
  {
    label: 'Team Velocity',
    value: '94 pts',
    to: 94,
    format: n => `${Math.round(n)} pts`,
    change: '8% vs last sprint',
    changeType: 'positive',
    sparkline: [70, 65, 72, 80, 76, 86, 94],
    strokeColor: '#1c1917',
    fillColor: 'rgba(28,25,23,0.05)',
  },
  {
    label: 'Suggestions Applied',
    value: '342',
    to: 342,
    format: n => Math.round(n).toLocaleString(),
    change: '27% this month',
    changeType: 'positive',
    sparkline: [28, 45, 38, 55, 62, 71, 88],
    strokeColor: '#16a34a',
    fillColor: 'rgba(22,163,74,0.07)',
  },
  {
    label: 'Hours Saved',
    value: '87.4h',
    to: 87.4,
    decimals: 1,
    format: n => `${n.toFixed(1)}h`,
    change: '24% this month',
    changeType: 'positive',
    sparkline: [18, 32, 29, 44, 51, 63, 78],
    strokeColor: '#d97706',
    fillColor: 'rgba(217,119,6,0.07)',
  },
]

const PROJECTS = [
  { name: 'Aurora Rebrand', progress: 78, status: 'On track', dotColor: 'bg-emerald-400', barColor: '#1E72FE' },
  { name: 'Confluence → Notion', progress: 52, status: 'At risk', dotColor: 'bg-amber-400', barColor: '#f59e0b' },
  { name: 'API Rate Limiting', progress: 34, status: 'On track', dotColor: 'bg-emerald-400', barColor: '#10b981' },
  { name: 'Q1 Investor Deck', progress: 91, status: 'Completed', dotColor: 'bg-[#65ACFE]', barColor: '#65ACFE' },
]

const HIGHLIGHTS = [
  { dot: 'bg-[#1E72FE]', title: 'Sprint 12 kicked off', desc: 'Engineering · Jan 18' },
  { dot: 'bg-emerald-500', title: '12.4h saved by automation', desc: 'This week · 8 active workflows' },
  { dot: 'bg-stone-400', title: 'Q1 audit completed on time', desc: 'Finance · All items closed' },
  { dot: 'bg-amber-400', title: 'Velocity at 3-month high', desc: '94 pts · Best sprint yet' },
]

function ProgressBar({ value, color, started }) {
  const from = Math.max(value - 14, 0)
  return (
    <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[1800ms] ease-out"
        style={{ width: started ? `${value}%` : `${from}%`, backgroundColor: color }}
      />
    </div>
  )
}

const PROJECT_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
]

export default function Dashboard() {
  const [projectFilter, setProjectFilter] = useState('all')
  const [animStarted, setAnimStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimStarted(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const visibleProjects = projectFilter === 'active'
    ? PROJECTS.filter(p => p.status !== 'Completed')
    : projectFilter === 'done'
    ? PROJECTS.filter(p => p.status === 'Completed')
    : PROJECTS

  return (
    <section ref={sectionRef} className="py-6 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl shadow-black/20">

          <div className="mb-5 sm:mb-8">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2">Dashboard Overview</p>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Your projects at a glance</h2>
            <p className="text-stone-500 mt-2 max-w-lg text-[15px] leading-relaxed">
              Track progress, velocity, and team health from a single view.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            {STATS.map(stat => (
              <StatCard key={stat.label} {...stat} started={animStarted} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-stone-900">Active Projects</h3>
                <div className="flex items-center gap-1">
                  {PROJECT_FILTERS.map(f => (
                    <button
                      key={f.key}
                      onClick={() => setProjectFilter(f.key)}
                      className={`px-2.5 py-1 rounded-sm text-xs font-medium transition-colors duration-150 ${
                        projectFilter === f.key
                          ? 'bg-stone-100 text-stone-700'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                {visibleProjects.map(project => (
                  <div key={project.name} className="group">
                    <div className="flex items-center justify-between mb-2 -mx-2 px-2 py-0.5 rounded-sm transition-colors duration-150 group-hover:bg-stone-50">
                      <span className="text-sm font-medium text-stone-800">{project.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${project.dotColor}`} />
                        <span className="text-xs text-stone-500">{project.status}</span>
                      </div>
                    </div>
                    <ProgressBar value={project.progress} color={project.barColor} started={animStarted} />
                    <p className="text-xs text-stone-500 tabular-nums mt-1.5">{project.progress}%</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="hidden lg:flex p-6 flex-col">
              <h3 className="text-sm font-semibold text-stone-900 mb-5">This Week</h3>
              <div className="space-y-4 flex-1">
                {HIGHLIGHTS.map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.dot} shrink-0 mt-[10px]`} />
                    <div>
                      <p className="text-sm font-medium text-stone-800 leading-snug">{item.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-medium text-stone-500">Team health</span>
                  <span className="text-xs font-semibold text-[#1E72FE]">Excellent</span>
                </div>
                <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#65ACFE] rounded-full transition-all duration-[1800ms] ease-out"
                    style={{ width: animStarted ? '86%' : '72%' }}
                  />
                </div>
                <p className="text-xs text-stone-500 mt-1.5">86 / 100 · 24 signals</p>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
