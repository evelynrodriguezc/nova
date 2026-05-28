import { useState, useEffect } from 'react'
import Card from './Card'

function useCountUp(to, started, duration = 1800, decimals = 0) {
  const from = to * 0.88
  const [value, setValue] = useState(from)
  useEffect(() => {
    if (!started || to == null) return
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = parseFloat((from + eased * (to - from)).toFixed(decimals))
      setValue(current)
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(to)
    }
    requestAnimationFrame(tick)
  }, [started, to, duration, decimals])
  return value
}

function Sparkline({ data, strokeColor, fillColor, started }) {
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
    <svg
      width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none"
      className="shrink-0 transition-opacity duration-1000"
      style={{ opacity: started ? 1 : 0 }}
    >
      <path d={area} fill={fillColor} />
      <path d={line} stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function StatCard({
  label,
  value,
  to,
  decimals = 0,
  format,
  change,
  changeType = 'positive',
  sparkline,
  strokeColor = '#1c1917',
  fillColor = 'rgba(28,25,23,0.05)',
  started = false,
}) {
  const count = useCountUp(to, started, 1400, decimals)
  const displayValue = to != null && started
    ? (format ? format(count) : String(count))
    : value

  return (
    <Card className="p-4 sm:p-5">
      <p className="text-xs font-medium text-stone-500 mb-3">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-stone-900 tracking-tight leading-none tabular-nums">
            {displayValue}
          </p>
          {change && (
            <p
              className={`text-xs mt-2 font-medium transition-opacity duration-500 ${changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'} ${started ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.8s' }}
            >
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {sparkline && (
          <Sparkline
            data={sparkline}
            strokeColor={strokeColor}
            fillColor={fillColor}
            started={started}
          />
        )}
      </div>
    </Card>
  )
}
