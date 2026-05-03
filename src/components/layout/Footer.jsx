import { Link } from 'react-router-dom'
import A from '../../assets/images'
import { useSiteData } from '../../context/SiteContext'

const SOCIAL_CONFIG = [
  { icon: A.socialLinkedin,  label: 'LinkedIn',  key: 'linkedin' },
  { icon: A.socialFacebook,  label: 'Facebook',  key: 'facebook' },
  { icon: A.socialInstagram, label: 'Instagram', key: 'instagram' },
  { icon: A.socialTwitter,   label: 'X',         key: 'twitter' },
  { icon: A.socialYoutube,   label: 'YouTube',   key: 'youtube' },
  { icon: A.socialWhatsapp,  label: 'WhatsApp',  key: 'whatsapp' },
]

export default function Footer({ showNewsletter = false }) {
  const { contact, openLeadPopup } = useSiteData()
  
  const DEFAULT_LOCS = [
    {
      address: 'B-121, Sector 62, Noida, Uttar Pradesh, 201309',
      phone: '+91 98765 43210',
      email: 'srayamclinic@gmail.com',
    },
    {
      address: 'C-45, Indirapuram, Ghaziabad, Uttar Pradesh, 201014',
      phone: '+91 98765 43211',
      email: 'srayamclinic@gmail.com',
    },
  ];

  const footerLocations = [0, 1].map((idx) => {
    const dbLoc = contact?.locations?.[idx] || {};
    const fallback = DEFAULT_LOCS[idx];
    return {
      address: dbLoc.address || fallback.address,
      phone: dbLoc.phone || fallback.phone,
      email: dbLoc.email || fallback.email,
    };
  });

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
        <div className="relative z-10 pt-20 pb-16 px-6 border-b border-white/10">
          <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Stay Updated</p>
            <h3 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.02em' }}>
              Get expert child development tips<br className="hidden sm:block" /> straight to your inbox.
            </h3>
            <p className="text-white/70 text-[15px]">Join thousands of parents and therapists reading our weekly insights.</p>
            <button
              onClick={openLeadPopup}
              className="bg-white text-[#29abe2] font-bold px-8 py-3.5 rounded-full text-[15px] hover:scale-105 transition-transform shadow-lg shadow-black/10"
            >
              Book Free Assessment
            </button>
          </div>
        </div>
      )}

      {/* Top content */}
      <div className={`relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-[90px] ${showNewsletter ? 'pt-16' : 'pt-[86px]'} pb-[140px] sm:pb-[260px] flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20`}>

        {/* Left — Contact info */}
        <div className="flex flex-col gap-6 sm:gap-9 w-full lg:flex-1">
          <p className="font-semibold text-white text-[24px] sm:text-[34px]" style={{ letterSpacing: '-0.03em' }}>
            Contact info
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-[53px]">
            {footerLocations.map((loc, i) => (
              <div key={i} className="flex flex-col gap-3 sm:gap-[30px] text-white/80 font-medium" style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', letterSpacing: '-0.03em', maxWidth: '308px' }}>
                <p className="leading-relaxed">{loc.address}</p>
                <div className="space-y-1 opacity-90">
                  <p>{loc.phone}</p>
                  <p className="text-[0.9em]">{loc.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Social icons */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto lg:max-w-[200px] justify-start sm:justify-center lg:justify-end mt-4 lg:mt-0">
          {SOCIAL_CONFIG.map((s) => (
            <a
              key={s.label}
              href={contact?.socials?.[s.key] || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="bg-white flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
            >
              <img src={s.icon} alt={s.label} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            </a>
          ))}
        </div>
      </div>

      {/* Brand Background */}
      <div className="absolute bottom-[60px] sm:bottom-[52px] left-0 w-full overflow-hidden pointer-events-none select-none z-10 opacity-10 sm:opacity-100">
        <p
          className="text-white text-center font-['Koulen',sans-serif] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(40px, 12.5vw, 193px)', letterSpacing: '-0.03em' }}
        >
          Suryam Child Clinic
        </p>
      </div>

      {/* Copyright area */}
      <div className="relative z-20 pb-8 sm:pb-5 text-center px-6 mt-10 lg:mt-0">
        <p className="text-white/80 font-medium uppercase text-center" style={{ fontSize: 'clamp(11px, 1.5vw, 16px)', letterSpacing: '0.05em' }}>
          @2026 suryam child development clinic. all rights reserved
        </p>
      </div>
    </footer>
  )
}
