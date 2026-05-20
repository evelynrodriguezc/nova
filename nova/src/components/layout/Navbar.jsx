import { useState } from 'react'
import Button from '../ui/Button'
import logoSrc from '../../assets/favicon.svg'

const NAV_LINKS = ['Product', 'Features', 'Pricing', 'Changelog', 'Docs']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      {/*
        3-column grid: [logo 1fr] [nav auto] [cta 1fr]
        The auto center column stays truly centered regardless of logo/CTA widths.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">

        {/* Left — logo */}
        <div className="flex items-center gap-2.5">
          <img src={logoSrc} alt="Nova" className="w-9 h-9 shrink-0" />
          <span className="text-[15px] font-semibold text-slate-900 tracking-tight">Nova</span>
        </div>

        {/* Center — nav links (desktop only) */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href="#"
              className="px-3.5 py-1.5 text-sm text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100/70 transition-colors duration-150"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right — CTA (desktop) / hamburger (mobile) */}
        <div className="flex items-center justify-end gap-6">
          <a
            href="#"
            className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
          >
            Sign in
          </a>

          <div className="hidden md:block w-px h-4 bg-slate-200" />

          <Button size="sm" className="hidden md:inline-flex">
            Get started
          </Button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-1.5 -mr-1 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4" y2="14" />
                </>
              ) : (
                <>
                  <line x1="2" y1="6" x2="16" y2="6" />
                  <line x1="2" y1="12" x2="16" y2="12" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 py-5">
          <div className="space-y-0.5">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href="#"
                className="block px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
