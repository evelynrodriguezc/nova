import logoSrc from '../../assets/favicon.svg'

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Docs', 'API', 'Status', 'Community'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 sm:py-14 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Logo row — full width above the link grid on mobile */}
        <div className="mb-6 md:hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <img src={logoSrc} alt="Nova" className="w-6 h-6 shrink-0" />
            <span className="text-sm font-semibold text-slate-900">Nova</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">The AI-native workspace for modern teams.</p>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-6 md:gap-10 mb-7 md:mb-12">

          {/* Logo — desktop only */}
          <div className="hidden md:block md:col-span-1">
            <div className="flex items-center gap-2 mb-2.5">
              <img src={logoSrc} alt="Nova" className="w-7 h-7 shrink-0" />
              <span className="text-sm font-semibold text-slate-900">Nova</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[160px]">
              The AI-native workspace for modern teams.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-[10px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">{category}</p>
              <ul className="space-y-1.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-5 md:pt-8 border-t border-slate-100 flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-400">© 2025 Nova, Inc. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}
