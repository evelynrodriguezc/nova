import { useState } from 'react'
import Card from '../ui/Card'
import StatCard from '../ui/StatCard'
import Badge from '../ui/Badge'

// Sparkline data: 7 realistic-looking weekly data points per stat
const STATS = [
  {
    label: 'Tasks Completed',
    value: '1,247',
    change: '21% this week',
    changeType: 'positive',
    sparkline: [44, 52, 48, 61, 67, 78, 91],
    strokeColor: '#3b82f6',
    fillColor: 'rgba(59,130,246,0.07)',
  },
  {
    label: 'Team Velocity',
    value: '94 pts',
    change: '8% vs last sprint',
    changeType: 'positive',
    sparkline: [70, 65, 72, 80, 76, 86, 94],
    strokeColor: '#7c3aed',
    fillColor: 'rgba(124,58,237,0.07)',
  },
  {
    label: 'Suggestions Applied',
    value: '342',
    change: '27% this month',
    changeType: 'positive',
    sparkline: [28, 45, 38, 55, 62, 71, 88],
    strokeColor: '#10b981',
    fillColor: 'rgba(16,185,129,0.07)',
  },
  {
    label: 'Hours Saved',
    value: '87.4h',
    change: '24% this month',
    changeType: 'positive',
    sparkline: [18, 32, 29, 44, 51, 63, 78],
    strokeColor: '#f59e0b',
    fillColor: 'rgba(245,158,11,0.07)',
  },
]

// Simplified: status as dot + text, no Badge component, no AvatarGroup
const PROJECTS = [
  { name: 'Nova 2.0 Launch', progress: 78, status: 'On track', dotColor: 'bg-emerald-400', barColor: 'bg-emerald-500' },
  { name: 'Q2 Marketing Campaign', progress: 52, status: 'At risk', dotColor: 'bg-amber-400', barColor: 'bg-amber-400' },
  { name: 'Platform Migration', progress: 34, status: 'On track', dotColor: 'bg-emerald-400', barColor: 'bg-emerald-500' },
  { name: 'Mobile App Redesign', progress: 91, status: 'Completed', dotColor: 'bg-blue-400', barColor: 'bg-blue-500' },
]

const HIGHLIGHTS = [
  { dot: 'bg-blue-500', title: 'Sprint 12 kicked off', desc: 'Engineering · Jan 18' },
  { dot: 'bg-emerald-500', title: '12.4h saved by automation', desc: 'This week · 8 active workflows' },
  { dot: 'bg-violet-400', title: 'Q1 audit completed on time', desc: 'Finance · All items closed' },
  { dot: 'bg-amber-400', title: 'Velocity at 3-month high', desc: '94 pts · Best sprint yet' },
]

function ProgressBar({ value, color }) {
  return (
    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
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

  const visibleProjects = projectFilter === 'active'
    ? PROJECTS.filter(p => p.status !== 'Completed')
    : projectFilter === 'done'
    ? PROJECTS.filter(p => p.status === 'Completed')
    : PROJECTS

  return (
    <section className="py-16 sm:py-20 px-5 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <Badge className="mb-3">Dashboard Overview</Badge>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your projects at a glance</h2>
          <p className="text-slate-500 mt-2 max-w-lg text-[15px] leading-relaxed">
            Track progress, velocity, and team health from a single view.
          </p>
        </div>

        {/* Stat cards with sparklines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {STATS.map(stat => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main content row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Active projects */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-900">Active Projects</h3>
              <div className="flex items-center gap-1">
                {PROJECT_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setProjectFilter(f.key)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
                      projectFilter === f.key
                        ? 'bg-slate-100 text-slate-700'
                        : 'text-slate-400 hover:text-slate-600'
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
                  <div className="flex items-center justify-between mb-2 -mx-2 px-2 py-0.5 rounded-lg transition-colors duration-150 group-hover:bg-slate-50">
                    <span className="text-sm font-medium text-slate-800">{project.name}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${project.dotColor}`} />
                      <span className="text-xs text-slate-400">{project.status}</span>
                    </div>
                  </div>
                  <ProgressBar value={project.progress} color={project.barColor} />
                  <p className="text-xs text-slate-400 tabular-nums mt-1.5">{project.progress}%</p>
                </div>
              ))}
            </div>
          </Card>

          {/* This week + team health */}
          <Card className="p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-900 mb-5">This Week</h3>
            <div className="space-y-4 flex-1">
              {HIGHLIGHTS.map(item => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.dot} shrink-0 mt-[10px]`} />
                  <div>
                    <p className="text-sm font-medium text-slate-800 leading-snug">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-medium text-slate-500">Team health</span>
                <span className="text-xs font-semibold text-emerald-600">Excellent</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '86%' }} />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">86 / 100 · 24 signals</p>
            </div>
          </Card>

        </div>
      </div>
    </section>
  )
}
