import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSiteData } from '../context/SiteContext'
import A from '../assets/images'

export default function AdmissionHero() {
  const { contact } = useSiteData()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.ad-word', { y: 60, opacity: 0, stagger: 0.1, duration: 1 })
        .from('.ad-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.ad-btn', { scale: 0, opacity: 0, stagger: 0.2, duration: 0.7 }, '-=0.5')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative pt-[120px] pb-24 overflow-hidden bg-[#29abe2] min-h-[800px] flex items-center">
      <div className="absolute inset-0 mix-blend-color-burn opacity-70 pointer-events-none"
        style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px' }} />
      
      <div className="max-w-[1340px] mx-auto px-10 relative z-10 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-white font-black leading-[1] mb-6" style={{ fontSize: 'clamp(44px, 6vw, 100px)' }}>
          <span className="ad-word inline-block mr-2">Join</span>
          <span className="ad-word inline-block mr-2">Our</span>
          <br className="hidden lg:block" />
          <span className="ad-word inline-block mr-2">Learning</span>
          <span className="ad-word inline-block mr-2 font-normal italic">Family.</span>
        </h1>

        <p className="ad-sub text-white/80 text-[20px] font-medium max-w-[620px] mb-12">
          Admissions are now open for the 2026-27 academic session. Give your child the foundation they deserve with our specialized therapy-integrated educational programs.
        </p>

        <div className="ad-btn flex flex-col sm:flex-row gap-5">
          <a
            href={contact?.admissionForm}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#29abe2] px-10 py-5 rounded-full font-bold text-[18px] hover:bg-black hover:text-white transition-all shadow-xl"
          >
            Fill Application Form
          </a>
          <a
            href={contact?.schoolCalendly}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white/40 text-white px-10 py-5 rounded-full font-bold text-[18px] hover:bg-white/10 transition-all text-center"
          >
            Book a School Visit
          </a>
        </div>
      </div>

      {/* Decorative Wave */}
      <img 
        src={A.wave3} 
        alt="" 
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none translate-y-[2px] scale-x-[1.05]" 
        style={{ marginBottom: '-1px' }} 
      />
    </section>
  )
}
