import { Link } from 'react-router-dom'
import A from '../../assets/images'

const SOCIALS = [
  { icon: A.socialLinkedin,  label: 'LinkedIn',  href: '#' },
  { icon: A.socialFacebook,  label: 'Facebook',  href: '#' },
  { icon: A.socialInstagram, label: 'Instagram', href: '#' },
  { icon: A.socialTwitter,   label: 'X',         href: '#' },
  { icon: A.socialYoutube,   label: 'YouTube',   href: '#' },
]

const LOCATIONS = [
  {
    address: 'B-121, Sector 62, Noida, Uttar Pradesh, 201309',
    phone:   '+91 98765 43210',
    email:   'srayamclinic@gmail.com',
  },
  {
    address: 'C-45, Indirapuram, Ghaziabad, Uttar Pradesh, 201014',
    phone:   '+91 98765 43211',
    email:   'srayamclinic@gmail.com',
  },
]

export default function Footer({ showNewsletter = false }) {
  return (
    <footer className="relative overflow-hidden bg-[#29abe2]">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none"
        style={{
          backgroundImage: `url(${A.footerTexture})`,
          backgroundSize: '2048px 2048px',
          backgroundPosition: 'top left',
        }}
      />

      {/* Newsletter Strip (Optional) */}
      {showNewsletter && (
        <div className="relative z-10 pt-16 sm:pt-20 pb-12 sm:pb-16 px-6 border-b border-white/10">
          <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Stay Updated</p>
            <h3 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(20px, 3vw, 38px)', letterSpacing: '-0.02em' }}>
              Get expert child development tips<br className="hidden sm:block" /> straight to your inbox.
            </h3>
            <p className="text-white/70 text-[15px]">Join thousands of parents and therapists reading our weekly insights.</p>
            <Link
              to="/#contact"
              className="bg-white text-[#29abe2] font-bold px-8 py-3.5 rounded-full text-[15px] hover:scale-105 transition-transform shadow-lg shadow-black/10"
            >
              Book Free Assessment
            </Link>
          </div>
        </div>
      )}

      {/* Top content */}
      <div className={`relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-[90px] ${showNewsletter ? 'pt-12 sm:pt-16' : 'pt-14 sm:pt-[86px]'} pb-[160px] sm:pb-[200px] lg:pb-[220px] flex flex-col sm:flex-row items-start justify-between gap-10 flex-wrap`}>

        {/* Left — Contact info */}
        <div className="flex flex-col gap-6 sm:gap-9">
          <p className="font-semibold text-white" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.03em' }}>
            Contact info
          </p>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-[53px] flex-wrap">
            {LOCATIONS.map((loc, i) => (
              <div key={i} className="flex flex-col gap-4 sm:gap-[30px] text-white/80 font-medium w-full sm:w-auto max-w-[308px]" style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', letterSpacing: '-0.03em' }}>
                <p>{loc.address}</p>
                <p>{loc.phone}</p>
                <p>{loc.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Social icons */}
        <div className="flex flex-wrap gap-2" style={{ maxWidth: '168px' }}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="bg-white flex items-center justify-center p-[6px] rounded-[6px] hover:scale-110 transition-transform duration-200"
            >
              <img src={s.icon} alt={s.label} className="w-6 h-6 object-contain" />
            </a>
          ))}
        </div>
      </div>

      {/* Large brand name — absolute positioned at the bottom */}
      <div className="absolute bottom-[40px] sm:bottom-[52px] left-0 w-full overflow-hidden pointer-events-none select-none z-10">
        <p
          className="text-white text-center font-['Koulen',sans-serif] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(40px, 12.5vw, 193px)', letterSpacing: '-0.03em' }}
        >
          Suryam Child Clinic
        </p>
      </div>

      {/* Copyright */}
      <div className="relative z-20 pb-4 sm:pb-5 text-center">
        <p className="text-white/80 font-medium px-4" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', letterSpacing: '-0.03em' }}>
          @2026 suryam child development clinic. all rights reserved
        </p>
      </div>
    </footer>
  )
}
