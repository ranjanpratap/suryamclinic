import A from '../../assets/images'

export function ButtonPrimary({ children, icon, className = '', href, ...props }) {
  const Component = href ? 'a' : 'button'
  return (
    <Component
      href={href}
      className={`flex items-center gap-2.5 bg-[#77bc52] text-white font-bold px-7 py-3.5 rounded-full
        shadow-[0_4px_34px_rgba(0,0,0,0.25)] hover:scale-105 hover:brightness-110
        transition-all duration-200 text-[17px] whitespace-nowrap ${className}`}
      {...props}
    >
      {icon && <img src={icon} alt="" className="w-5 h-5 object-contain" />}
      {children}
    </Component>
  )
}

export function ButtonOutline({ children, className = '', href, ...props }) {
  const Component = href ? 'a' : 'button'
  return (
    <Component
      href={href}
      className={`border border-white text-white px-5 py-2.5 rounded-full text-[17px]
        hover:bg-white/10 transition-colors duration-200 whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export function ButtonWhite({ children, className = '', href, ...props }) {
  const Component = href ? 'a' : 'button'
  return (
    <Component
      href={href}
      className={`bg-white text-black font-normal px-5 py-2.5 rounded-full text-[17px]
        hover:scale-105 transition-transform duration-200 whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
