import { useState, useEffect, useRef } from 'react'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

function useCountUp(to, started, duration = 1800) {
  const from = Math.round(to * 0.88)
  const [value, setValue] = useState(from)
  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + eased * (to - from)))
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(to)
    }
    requestAnimationFrame(tick)
  }, [started, to])
  return value
}

const LIVE_ACTIVITY = {
  user: 'Ana C.',
  avatar: 'AC',
  avatarBg: 'bg-rose-100 text-rose-800',
  action: 'opened pull request',
  target: 'feat/dashboard-export',
  type: 'code',
  time: 'just now',
}

const ACTIVITIES = [
  {
    user: 'Sarah K.',
    avatar: 'SK',
    avatarBg: 'bg-blue-100 text-[#1E72FE]',
    action: 'completed',
    target: 'Pricing page copy audit',
    type: 'task',
    time: '2 min ago',
  },
  {
    user: 'Marcus R.',
    avatar: 'MR',
    avatarBg: 'bg-stone-200 text-stone-700',
    action: 'commented on',
    target: 'Design system v3 spec',
    type: 'comment',
    time: '18 min ago',
  },
  {
    user: 'Nova AI',
    avatar: 'AI',
    avatarBg: 'bg-[#1E72FE] text-white',
    action: 'auto-assigned',
    target: 'Critical bug #1204 to Priya S.',
    type: 'ai',
    time: '34 min ago',
  },
  {
    user: 'Priya S.',
    avatar: 'PS',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    action: 'merged',
    target: 'feat/new-onboarding into main',
    type: 'code',
    time: '1h ago',
  },
  {
    user: 'Tom L.',
    avatar: 'TL',
    avatarBg: 'bg-amber-100 text-amber-800',
    action: 'created workflow',
    target: 'Weekly Digest Automation',
    type: 'workflow',
    time: '2h ago',
  },
  {
    user: 'Sarah K.',
    avatar: 'SK',
    avatarBg: 'bg-blue-100 text-[#1E72FE]',
    action: 'kicked off',
    target: 'Sprint 12 — Engineering',
    type: 'project',
    time: '3h ago',
  },
]

const TYPE_BADGES = {
  task: { variant: 'green', label: 'Task' },
  comment: { variant: 'default', label: 'Comment' },
  ai: { variant: 'blue', label: 'AI' },
  code: { variant: 'default', label: 'Code' },
  workflow: { variant: 'amber', label: 'Workflow' },
  project: { variant: 'rose', label: 'Project' },
}

const MEMBERS = [
  { name: 'Sarah Kim', role: 'Product Lead', avatar: 'SK', avatarBg: 'bg-blue-100 text-[#1E72FE]', status: 'online', liveStatus: 'offline' },
  { name: 'Marcus Reid', role: 'Design Lead', avatar: 'MR', avatarBg: 'bg-stone-200 text-stone-700', status: 'online' },
  { name: 'Priya Shetty', role: 'Engineering', avatar: 'PS', avatarBg: 'bg-emerald-100 text-emerald-800', status: 'online' },
  { name: 'Tom Liu', role: 'Marketing', avatar: 'TL', avatarBg: 'bg-amber-100 text-amber-800', status: 'away' },
  { name: 'Ana Costa', role: 'Engineering', avatar: 'AC', avatarBg: 'bg-rose-100 text-rose-800', status: 'offline', liveStatus: 'online' },
]

const STATUS_DOT = { online: 'bg-emerald-500', away: 'bg-amber-400', offline: 'bg-stone-300' }
const STATUS_TEXT = { online: 'text-emerald-600', away: 'text-amber-600', offline: 'text-stone-500' }

const COLLAB_STATS = [
  { label: 'Messages this week', value: '1,284', animate: 1284 },
  { label: 'Docs co-edited', value: '37' },
  { label: 'Automation runs', value: '214' },
  { label: 'Avg response time', value: '4.2 min' },
]

const ACTIVITY_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'code', label: 'Code' },
  { key: 'task', label: 'Tasks' },
]

function CollabRow({ stat, started }) {
  const count = useCountUp(stat.animate ?? 0, started && !!stat.animate)
  const display = stat.animate ? count.toLocaleString() : stat.value
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-stone-500">{stat.label}</span>
      <span className="text-xs font-semibold text-stone-900 tabular-nums">{display}</span>
    </div>
  )
}

function ActivityRow({ activity, dim, className = '' }) {
  return (
    <div className={`px-6 py-4 flex items-start gap-3 hover:bg-stone-50/80 transition-colors border-t border-stone-100 ${dim ? 'hidden sm:flex' : ''} ${className}`}>
      <div className={`w-8 h-8 rounded-full ${activity.avatarBg} flex items-center justify-center text-xs font-bold shrink-0`}>
        {activity.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-stone-700">
          <span className="font-semibold text-stone-900">{activity.user}</span>
          {' '}
          <span className="text-stone-500">{activity.action}</span>
          {' '}
          <span className="font-medium text-stone-900">{activity.target}</span>
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {activity.time === 'just now' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          )}
          <p className="text-xs text-stone-500">{activity.time}</p>
        </div>
      </div>
      <Badge variant={TYPE_BADGES[activity.type].variant}>
        {TYPE_BADGES[activity.type].label}
      </Badge>
    </div>
  )
}

export default function TeamActivity() {
  const [activityFilter, setActivityFilter] = useState('all')
  const [liveShown, setLiveShown] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setLiveShown(true), 1400)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const visibleActivities = activityFilter === 'all'
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.type === activityFilter)

  return (
    <section ref={sectionRef} className="py-6 px-5 sm:px-6 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl shadow-black/20">

          <div className="mb-5 sm:mb-8">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2">Team Activity</p>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Everything your team shipped today</h2>
            <p className="text-stone-500 mt-2 max-w-lg text-[15px] leading-relaxed">
              See what's shipped, what's blocked, and what Nova handled — without asking anyone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 overflow-hidden">
              {/* Filter bar */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <h3 className="text-sm font-semibold text-stone-900 shrink-0">Recent Activity</h3>
                  <button className="sm:hidden text-xs font-medium transition-colors shrink-0" style={{ color: '#1E72FE' }}>View all →</button>
                </div>
                <div className="flex items-center justify-between sm:justify-start sm:gap-0.5">
                  <div className="flex items-center gap-0.5">
                    {ACTIVITY_FILTERS.map(f => (
                      <button
                        key={f.key}
                        onClick={() => setActivityFilter(f.key)}
                        className={`px-2.5 py-1 rounded-sm text-xs font-medium transition-colors duration-150 ${
                          activityFilter === f.key
                            ? 'bg-stone-100 text-stone-700'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <button className="hidden sm:block text-xs font-medium transition-colors shrink-0" style={{ color: '#1E72FE' }}>View all →</button>
                </div>
              </div>

              {/* Live activity — slides in on scroll */}
              <div
                style={{
                  maxHeight: liveShown ? '80px' : '0',
                  opacity: liveShown ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
                }}
              >
                <ActivityRow activity={LIVE_ACTIVITY} className="bg-emerald-50/50" />
              </div>

              {/* Existing activities — last one fades out when live item appears */}
              {visibleActivities.map((activity, i) => {
                const isLast = i === visibleActivities.length - 1
                return (
                  <div
                    key={i}
                    style={isLast ? {
                      maxHeight: liveShown ? '0' : '80px',
                      opacity: liveShown ? 0 : 1,
                      overflow: 'hidden',
                      transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                    } : undefined}
                  >
                    <ActivityRow activity={activity} dim={i >= 4} />
                  </div>
                )
              })}
            </Card>

            <div className="hidden lg:flex flex-col space-y-5">
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-stone-900 mb-4">Team Members</h3>
                <div className="space-y-3.5">
                  {MEMBERS.map(member => {
                    const status = liveShown && member.liveStatus ? member.liveStatus : member.status
                    return (
                    <div key={member.name} className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className={`w-9 h-9 rounded-full ${member.avatarBg} flex items-center justify-center text-xs font-bold`}>
                          {member.avatar}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${STATUS_DOT[status]} border-2 border-white transition-colors duration-700`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{member.name}</p>
                        <p className="text-xs text-stone-500">{member.role}</p>
                      </div>
                      <span className={`text-xs font-medium capitalize transition-colors duration-700 ${STATUS_TEXT[status]}`}>{status}</span>
                    </div>
                  )
                  })}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-stone-900 mb-4">Team Collaboration</h3>
                <div className="space-y-3">
                  {COLLAB_STATS.map(stat => (
                    <CollabRow key={stat.label} stat={stat} started={liveShown} />
                  ))}
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
