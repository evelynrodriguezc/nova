import Card from './Card'

function Sparkline({ data, strokeColor, fillColor }) {
  const W = 76
  const H = 35
  const n = data.length
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min === 0 ? 1 : max - min
  const pad = 3

  const pts = data.map((v, i) => [
    (i / (n - 1)) * W,
    H - pad - ((v - min) / range) * (H - pad * 2),
  ])

  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H}Z`

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="shrink-0">
      <path d={area} fill={fillColor} />
      <path d={line} stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function StatCard({
  label,
  value,
  change,
  changeType = 'positive',
  sparkline,
  strokeColor = '#3b82f6',
  fillColor = 'rgba(59,130,246,0.07)',
}) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium text-slate-500 mb-3">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{value}</p>
          {change && (
            <p className={`text-xs mt-2 font-medium ${changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {sparkline && (
          <Sparkline data={sparkline} strokeColor={strokeColor} fillColor={fillColor} />
        )}
      </div>
    </Card>
  )
}
