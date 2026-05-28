import { useTheme } from '../../ThemeContext'
import logoSrc from '../../assets/favicon.svg'

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Docs', 'API', 'Status', 'Community'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function Footer() {
  const { isDark } = useTheme()

  const bg = isDark ? 'bg-[#080b0e] border-white/8' : 'bg-white border-stone-200'
  const logoText = isDark ? 'text-white' : 'text-stone-900'
  const tagline = isDark ? 'text-white/30' : 'text-stone-500'
  const catLabel = isDark ? 'text-white/40' : 'text-stone-600'
  const link = isDark ? 'text-white/25 hover:text-white/60' : 'text-stone-500 hover:text-stone-800'
  const divider = isDark ? 'border-white/8' : 'border-stone-100'
  const copy = isDark ? 'text-white/20' : 'text-stone-500'

  return (
    <footer className={`border-t py-8 sm:py-14 px-5 sm:px-6 transition-colors duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-6 md:hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <img src={logoSrc} alt="Nova" className="w-6 h-6 shrink-0" />
            <span className={`text-sm font-semibold ${logoText}`}>Nova</span>
          </div>
          <p className={`text-xs leading-relaxed ${tagline}`}>The workspace that sees what your team misses.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-6 md:gap-10 mb-7 md:mb-12">

          <div className="hidden md:block md:col-span-1">
            <div className="flex items-center gap-2 mb-2.5">
              <img src={logoSrc} alt="Nova" className="w-7 h-7 shrink-0" />
              <span className={`text-sm font-semibold ${logoText}`}>Nova</span>
            </div>
            <p className={`text-xs leading-relaxed max-w-[160px] ${tagline}`}>
              The workspace that sees what your team misses.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className={`text-[10px] font-semibold mb-2 uppercase tracking-wider ${catLabel}`}>{category}</p>
              <ul className="space-y-1.5">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className={`text-xs transition-colors ${link}`}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`pt-5 md:pt-8 border-t flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-2 md:gap-4 ${divider}`}>
          <div className="flex items-center gap-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
              <a key={social} href="#" className={`text-xs transition-colors ${link}`}>{social}</a>
            ))}
          </div>
          <p className={`text-xs ${copy}`}>© 2025 Nova, Inc. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}
