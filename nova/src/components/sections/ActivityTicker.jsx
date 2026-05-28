import { useTheme } from '../../ThemeContext'

const ITEMS = [
  { avatar: 'SK', bg: 'bg-blue-100 text-[#1E72FE]', text: 'Sarah K. completed Pricing page copy audit', time: '2m ago' },
  { avatar: 'AI', bg: 'bg-[#1E72FE] text-white', text: 'Nova AI auto-assigned Critical bug #1204 to Priya', time: '34m ago' },
  { avatar: 'PS', bg: 'bg-emerald-100 text-emerald-800', text: 'Priya S. merged feat/new-onboarding into main', time: '1h ago' },
  { avatar: 'TL', bg: 'bg-amber-100 text-amber-800', text: 'Tom L. created workflow Weekly Digest Automation', time: '2h ago' },
  { avatar: 'MR', bg: 'bg-stone-200 text-stone-700', text: 'Marcus R. commented on Design system v3 spec', time: '3h ago' },
  { avatar: 'AI', bg: 'bg-[#1E72FE] text-white', text: 'Nova AI saved 8.7 hours across Engineering this week', time: '4h ago' },
  { avatar: 'AC', bg: 'bg-rose-100 text-rose-800', text: 'Ana C. shipped API rate limiting to production', time: '5h ago' },
  { avatar: 'SK', bg: 'bg-blue-100 text-[#1E72FE]', text: 'Sarah K. kicked off Sprint 12 — Engineering', time: '6h ago' },
]

const DOUBLED = [...ITEMS, ...ITEMS]

export default function ActivityTicker() {
  const { isDark } = useTheme()

  // Match the exact page background so fades blend seamlessly
  const fadeBg = isDark ? '#080b0e' : '#fafaf9'

  return (
    <div className={`relative overflow-hidden py-3 ${isDark ? 'border-y border-white/6' : 'border-y border-stone-200'}`}>
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${fadeBg}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${fadeBg}, transparent)` }} />

      <div className="marquee-track">
        {DOUBLED.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 px-5 shrink-0">
            <div className={`w-5 h-5 rounded-full ${item.bg} flex items-center justify-center text-[8px] font-bold shrink-0`}>
              {item.avatar}
            </div>
            <span className={`text-[12px] whitespace-nowrap ${isDark ? 'text-white/40' : 'text-stone-500'}`}>
              {item.text}
            </span>
            <span className={`text-[11px] whitespace-nowrap ${isDark ? 'text-white/20' : 'text-stone-500'}`}>
              {item.time}
            </span>
            <div className={`w-px h-3 mx-2 shrink-0 ${isDark ? 'bg-white/10' : 'bg-stone-300'}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
