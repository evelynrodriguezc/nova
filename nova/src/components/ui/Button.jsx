export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 cursor-pointer active:scale-[0.97]'

  const variants = {
    primary: 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm',
    accent: 'bg-[#831843] text-white font-semibold hover:bg-[#6B133C] shadow-sm shadow-[#831843]/20',
    secondary: 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 shadow-sm',
    ghost: 'text-stone-500 hover:text-stone-800 hover:bg-stone-100',
    'ghost-dark': 'bg-white/10 text-white border border-white/15 hover:bg-white/20',
  }

  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-[15px] gap-2',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
