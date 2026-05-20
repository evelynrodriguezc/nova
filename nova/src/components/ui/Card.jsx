export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-xl shadow-sm transition-shadow duration-200 ${className}`} {...props}>
      {children}
    </div>
  )
}
