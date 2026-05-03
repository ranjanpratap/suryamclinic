export default function SectionHeading({ title, subtitle, color = '#29abe2', textColor = 'inherit', className = '' }) {
  return (
    <div className={`text-center max-w-[940px] mx-auto ${className}`}>
      <h2
        className="font-bold leading-tight"
        style={{ color, fontSize: 'clamp(28px, 3.3vw, 50px)', letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-2"
          style={{ color: textColor, fontSize: 'clamp(15px, 1.5vw, 22px)', letterSpacing: '-0.02em' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
