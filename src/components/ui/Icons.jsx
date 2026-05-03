import A from '../../assets/images'

export function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={A.star}
          alt="★"
          className="w-5 h-5 object-contain"
          style={{ opacity: i < count ? 1 : 0.3 }}
        />
      ))}
    </div>
  )
}

export function AdmissionBadge() {
  return (
    <div className="flex items-center gap-1 bg-[#f10b16] px-3 py-1 rounded-full w-fit">
      <img src={A.school} alt="" className="w-4 h-4 object-contain" />
      <span className="text-white font-bold text-[10px] tracking-tight">Admission open</span>
    </div>
  )
}

export function Logo({ symClass = 'h-[35px]', txtClass = 'h-[43px]' }) {
  return (
    <div className="flex items-center gap-1.5 py-2 shrink-0">
      <img
        src={A.logoSym}
        alt=""
        className={`${symClass} w-auto object-contain`}
        style={{ aspectRatio: '25 / 35' }}
      />
      <img
        src={A.logoTxt}
        alt="Suryam Child Development Clinic"
        className={`${txtClass} w-auto object-contain`}
        style={{ aspectRatio: '71 / 43' }}
      />
    </div>
  )
}
