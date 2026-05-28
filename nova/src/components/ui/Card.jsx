export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-white border border-stone-200 rounded-md transition-shadow duration-200 ${className}`} {...props}>
      {children}
    </div>
  )
}
