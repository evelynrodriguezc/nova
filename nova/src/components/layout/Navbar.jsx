import { useState } from 'react'
import { useTheme } from '../../ThemeContext'
import Button from '../ui/Button'
import logoSrc from '../../assets/favicon.svg'

const NAV_LINKS = ['Product', 'Features', 'Pricing', 'Changelog', 'Docs']

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="3" />
      <line x1="8" y1="1" x2="8" y2="2.5" />
      <line x1="8" y1="13.5" x2="8" y2="15" />
      <line x1="1" y1="8" x2="2.5" y2="8" />
      <line x1="13.5" y1="8" x2="15" y2="8" />
      <line x1="3.05" y1="3.05" x2="4.1" y2="4.1" />
      <line x1="11.9" y1="11.9" x2="12.95" y2="12.95" />
      <line x1="3.05" y1="12.95" x2="4.1" y2="11.9" />
      <line x1="11.9" y1="4.1" x2="12.95" y2="3.05" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 9.5A5.5 5.5 0 0 1 5.5 2.5a5.5 5.5 0 1 0 7 7z" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isDark, toggle } = useTheme()

  const navBg = isDark ? 'bg-[#080b0e]/80 border-white/10' : 'bg-stone-50/80 border-stone-200/60'
  const linkColor = isDark ? 'text-white/50 hover:text-white hover:bg-white/8' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100/70'
  const logoText = isDark ? 'text-white' : 'text-stone-900'
  const signIn = isDark ? 'text-white/50 hover:text-white' : 'text-stone-500 hover:text-stone-900'
  const toggleColor = isDark ? 'text-white/40 hover:text-white/80' : 'text-stone-400 hover:text-stone-700'
  const mobileDrawerBg = isDark ? 'bg-[#080b0e] border-white/10' : 'bg-stone-50 border-stone-100'
  const mobileLinkColor = isDark ? 'text-white/60 hover:text-white hover:bg-white/8' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
  const hamburgerColor = isDark ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">

        <div className="flex items-center gap-2.5">
          <img src={logoSrc} alt="Nova" className="w-9 h-9 shrink-0" />
          <span className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${logoText}`}>Nova</span>
        </div>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href="#"
              className={`px-3.5 py-1.5 text-sm rounded-md transition-colors duration-150 ${linkColor}`}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          {/* Theme toggle — subtle icon, no label */}
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`hidden md:flex p-1.5 rounded-md transition-colors duration-150 ${toggleColor}`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <a href="#" className={`hidden md:block text-sm font-medium transition-colors duration-150 ${signIn}`}>
            Sign in
          </a>

          <Button variant="accent" size="sm" className="hidden md:inline-flex">
            Get started
          </Button>

          <button
            className={`md:hidden p-1.5 -mr-1 rounded-md transition-colors ${hamburgerColor}`}
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

      {open && (
        <div className={`md:hidden border-t px-5 py-5 transition-colors duration-300 ${mobileDrawerBg}`}>
          {/* Theme toggle in mobile drawer */}
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-3 py-2 mb-2 text-sm rounded-lg transition-colors ${mobileLinkColor}`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <div className="space-y-0.5">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href="#"
                className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${mobileLinkColor}`}
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
