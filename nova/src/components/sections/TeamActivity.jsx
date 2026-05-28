import { useState } from 'react'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

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
  { name: 'Sarah Kim', role: 'Product Lead', avatar: 'SK', avatarBg: 'bg-blue-100 text-[#1E72FE]', status: 'online' },
  { name: 'Marcus Reid', role: 'Design Lead', avatar: 'MR', avatarBg: 'bg-stone-200 text-stone-700', status: 'online' },
  { name: 'Priya Shetty', role: 'Engineering', avatar: 'PS', avatarBg: 'bg-emerald-100 text-emerald-800', status: 'online' },
  { name: 'Tom Liu', role: 'Marketing', avatar: 'TL', avatarBg: 'bg-amber-100 text-amber-800', status: 'away' },
  { name: 'Ana Costa', role: 'Engineering', avatar: 'AC', avatarBg: 'bg-rose-100 text-rose-800', status: 'offline' },
]

const STATUS_DOT = { online: 'bg-emerald-500', away: 'bg-amber-400', offline: 'bg-stone-300' }
const STATUS_TEXT = { online: 'text-emerald-600', away: 'text-amber-600', offline: 'text-stone-500' }

const COLLAB_STATS = [
  { label: 'Messages this week', value: '1,284' },
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

export default function TeamActivity() {
  const [activityFilter, setActivityFilter] = useState('all')

  const visibleActivities = activityFilter === 'all'
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.type === activityFilter)

  return (
    <section className="py-6 px-5 sm:px-6 pb-16 sm:pb-20">
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
            <Card className="lg:col-span-2 overflow-hidden divide-y divide-stone-100">
              <div className="px-6 py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <h3 className="text-sm font-semibold text-stone-900 shrink-0">Recent Activity</h3>
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
                </div>
                <button className="text-xs font-medium transition-colors shrink-0" style={{ color: '#1E72FE' }}>View all →</button>
              </div>
              {visibleActivities.map((activity, i) => (
                <div key={i} className={`px-6 py-4 flex items-start gap-3 hover:bg-stone-50/80 transition-colors ${i >= 4 ? 'hidden sm:flex' : ''}`}>
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
                    <p className="text-xs text-stone-500 mt-0.5">{activity.time}</p>
                  </div>
                  <Badge variant={TYPE_BADGES[activity.type].variant}>
                    {TYPE_BADGES[activity.type].label}
                  </Badge>
                </div>
              ))}
            </Card>

            <div className="hidden lg:flex flex-col space-y-5">
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-stone-900 mb-4">Team Members</h3>
                <div className="space-y-3.5">
                  {MEMBERS.map(member => (
                    <div key={member.name} className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className={`w-9 h-9 rounded-full ${member.avatarBg} flex items-center justify-center text-xs font-bold`}>
                          {member.avatar}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${STATUS_DOT[member.status]} border-2 border-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{member.name}</p>
                        <p className="text-xs text-stone-500">{member.role}</p>
                      </div>
                      <span className={`text-xs font-medium capitalize ${STATUS_TEXT[member.status]}`}>{member.status}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-stone-900 mb-4">Team Collaboration</h3>
                <div className="space-y-3">
                  {COLLAB_STATS.map(stat => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">{stat.label}</span>
                      <span className="text-xs font-semibold text-stone-900 tabular-nums">{stat.value}</span>
                    </div>
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
