import Button from '../ui/Button'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden px-5 sm:px-6 py-20 sm:py-32 bg-[#080b0e]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-[#1E72FE]/12 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto relative text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-8 text-white/30">
          Get started today
        </p>

        <div className="mb-4">
          <span className="text-[80px] sm:text-[110px] font-bold leading-none tabular-nums text-[#1E72FE]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            12.4h
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-3 text-white">
          lost every week to work about work.
        </h2>

        <p className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-white/35">
          Nova gives it back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="accent" size="lg">
            Start free — no credit card
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button variant="ghost-dark" size="lg">Talk to sales</Button>
        </div>

        <p className="mt-6 text-xs text-white/25">
          Free 14-day trial · No setup required · Cancel anytime
        </p>
      </div>
    </section>
  )
}
