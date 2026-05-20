import { useState } from 'react'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

const ACTIVITIES = [
  {
    user: 'Sarah K.',
    avatar: 'SK',
    gradient: 'from-blue-400 to-blue-600',
    action: 'completed',
    target: 'Q2 financial report',
    type: 'task',
    time: '2 min ago',
  },
  {
    user: 'Marcus R.',
    avatar: 'MR',
    gradient: 'from-violet-400 to-violet-600',
    action: 'commented on',
    target: 'Design system v3 spec',
    type: 'comment',
    time: '18 min ago',
  },
  {
    user: 'Nova AI',
    avatar: 'AI',
    gradient: 'from-blue-500 to-indigo-600',
    action: 'auto-assigned',
    target: 'Critical bug #1204 to Priya S.',
    type: 'ai',
    time: '34 min ago',
  },
  {
    user: 'Priya S.',
    avatar: 'PS',
    gradient: 'from-emerald-400 to-emerald-600',
    action: 'merged',
    target: 'feat/new-onboarding into main',
    type: 'code',
    time: '1h ago',
  },
  {
    user: 'Tom L.',
    avatar: 'TL',
    gradient: 'from-amber-400 to-amber-600',
    action: 'created workflow',
    target: 'Weekly Digest Automation',
    type: 'workflow',
    time: '2h ago',
  },
  {
    user: 'Sarah K.',
    avatar: 'SK',
    gradient: 'from-blue-400 to-blue-600',
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
  code: { variant: 'purple', label: 'Code' },
  workflow: { variant: 'amber', label: 'Workflow' },
  project: { variant: 'rose', label: 'Project' },
}

const MEMBERS = [
  { name: 'Sarah Kim', role: 'Product Lead', avatar: 'SK', gradient: 'from-blue-400 to-blue-600', status: 'online' },
  { name: 'Marcus Reid', role: 'Design Lead', avatar: 'MR', gradient: 'from-violet-400 to-violet-600', status: 'online' },
  { name: 'Priya Shetty', role: 'Engineering', avatar: 'PS', gradient: 'from-emerald-400 to-emerald-600', status: 'online' },
  { name: 'Tom Liu', role: 'Marketing', avatar: 'TL', gradient: 'from-amber-400 to-amber-600', status: 'away' },
  { name: 'Ana Costa', role: 'Engineering', avatar: 'AC', gradient: 'from-rose-400 to-rose-600', status: 'offline' },
]

const STATUS_DOT = {
  online: 'bg-emerald-500',
  away: 'bg-amber-400',
  offline: 'bg-slate-300',
}

const STATUS_TEXT = {
  online: 'text-emerald-600',
  away: 'text-amber-600',
  offline: 'text-slate-400',
}

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
    <section className="py-16 sm:py-20 px-5 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <Badge variant="green" className="mb-3">Team Activity</Badge>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Everything your team shipped today</h2>
          <p className="text-slate-500 mt-2 max-w-lg text-[15px] leading-relaxed">
            See what's shipped, what's blocked, and what Nova handled — without asking anyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity feed */}
          <Card className="lg:col-span-2 overflow-hidden divide-y divide-slate-100">
            <div className="px-6 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 shrink-0">Recent Activity</h3>
                <div className="flex items-center gap-0.5">
                  {ACTIVITY_FILTERS.map(f => (
                    <button
                      key={f.key}
                      onClick={() => setActivityFilter(f.key)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
                        activityFilter === f.key
                          ? 'bg-slate-100 text-slate-700'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors shrink-0">View all →</button>
            </div>
            {visibleActivities.map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-start gap-3 hover:bg-slate-50/80 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">{activity.user}</span>
                    {' '}
                    <span className="text-slate-500">{activity.action}</span>
                    {' '}
                    <span className="font-medium text-slate-900">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                </div>
                <Badge variant={TYPE_BADGES[activity.type].variant}>
                  {TYPE_BADGES[activity.type].label}
                </Badge>
              </div>
            ))}
          </Card>

          {/* Right column */}
          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Team Members</h3>
              <div className="space-y-3.5">
                {MEMBERS.map(member => (
                  <div key={member.name} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                        {member.avatar}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${STATUS_DOT[member.status]} border-2 border-white`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.role}</p>
                    </div>
                    <span className={`text-xs font-medium capitalize ${STATUS_TEXT[member.status]}`}>{member.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Team Collaboration</h3>
              <div className="space-y-3">
                {COLLAB_STATS.map(stat => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{stat.label}</span>
                    <span className="text-xs font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
