import Card from '../ui/Card'
import Button from '../ui/Button'

const WORKFLOWS = [
  {
    name: 'Sprint Summary',
    desc: 'Auto-generate sprint summaries and send to Slack every Friday at 5pm.',
    steps: [
      { label: 'Schedule', color: 'bg-stone-100 text-stone-700' },
      { label: 'Generate summary', color: 'bg-blue-50 text-[#1E72FE]' },
      { label: 'Post to #dev-team', color: 'bg-emerald-50 text-emerald-700' },
    ],
    active: true,
    runs: '51 runs',
    saved: '2.4h saved',
  },
  {
    name: 'Task Triage',
    desc: 'When a high-priority issue is created in Linear, assign it and notify the team lead.',
    steps: [
      { label: 'Issue created', color: 'bg-amber-50 text-amber-700' },
      { label: 'AI classify', color: 'bg-stone-100 text-stone-700' },
      { label: 'Assign + notify', color: 'bg-blue-50 text-[#1E72FE]' },
    ],
    active: true,
    runs: '134 runs',
    saved: '6.1h saved',
  },
  {
    name: 'Meeting Prep',
    desc: 'Before every meeting, compile relevant docs, action items, and attendee context.',
    steps: [
      { label: 'Calendar event', color: 'bg-rose-50 text-rose-700' },
      { label: 'Gather context', color: 'bg-stone-100 text-stone-700' },
      { label: 'Create brief', color: 'bg-blue-50 text-[#1E72FE]' },
    ],
    active: false,
    runs: '19 runs',
    saved: '1.8h saved',
  },
]

const INTEGRATIONS = [
  { name: 'Slack', bg: 'bg-stone-100 text-stone-700' },
  { name: 'Linear', bg: 'bg-stone-100 text-stone-700' },
  { name: 'Notion', bg: 'bg-stone-100 text-stone-700' },
  { name: 'GitHub', bg: 'bg-stone-100 text-stone-700' },
  { name: 'Figma', bg: 'bg-stone-100 text-stone-700' },
  { name: '+55 more', bg: 'bg-white text-stone-500 border border-stone-200' },
]

function Toggle({ active }) {
  return (
    <button
      className="relative w-9 h-5 rounded-full transition-colors shrink-0"
      style={{ backgroundColor: active ? '#1E72FE' : undefined }}
      {...(!active && { className: 'relative w-9 h-5 rounded-full transition-colors shrink-0 bg-stone-200' })}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

function FlowArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-stone-300">
      <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WorkflowAutomation() {
  return (
    <section className="py-6 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-black/20">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2">Workflow Automation</p>
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Set up once, runs automatically</h2>
              <p className="text-stone-500 mt-2 max-w-lg text-[15px] leading-relaxed">
                Build workflows in minutes. Nova handles the handoffs, summaries, and notifications so nothing falls through.
              </p>
            </div>
            <Button>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1.5V11.5M1.5 6.5H11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              New workflow
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {WORKFLOWS.map(wf => (
              <Card key={wf.name} className={`p-5 hover:shadow-md hover:-translate-y-px transition-all duration-200 ${!wf.active ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-stone-900 pr-2">{wf.name}</h3>
                  <Toggle active={wf.active} />
                </div>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">{wf.desc}</p>

                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {wf.steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-medium px-2 py-1 rounded-sm ${step.color}`}>{step.label}</span>
                      {i < wf.steps.length - 1 && <FlowArrow />}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-500">{wf.runs}</span>
                  <span className="text-xs font-medium" style={{ color: '#1E72FE' }}>{wf.saved}</span>
                  <button className="ml-auto text-xs text-stone-500 hover:text-stone-700 transition-colors">Edit</button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-stone-50 border-stone-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-900 mb-1">Connect your entire stack</p>
                <p className="text-xs text-stone-500">Nova integrates with 60+ tools your team already uses.</p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap justify-center">
                {INTEGRATIONS.map(tool => (
                  <div key={tool.name} className={`${tool.bg} px-3 py-1.5 rounded-sm text-xs font-medium`}>
                    {tool.name}
                  </div>
                ))}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  )
}
