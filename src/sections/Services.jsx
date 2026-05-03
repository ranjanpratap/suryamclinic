import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import SectionHeading from '../components/ui/SectionHeading'
import { AdmissionBadge } from '../components/ui/Icons'

import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { services: SERVICES } = useSiteData()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.svc-card')
      if (cards.length) {
        gsap.from(cards, {
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
          y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="p-0 m-0 overflow-hidden w-full">
      <div className="relative overflow-hidden pt-24 sm:pt-32 pb-40 sm:pb-56">
        {/* Solid bg */}
        <div className="absolute inset-0 bg-[#f0c85d]" />
        {/* Texture */}
        <div
          className="absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none"
          style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px' }}
        />

        {/* Wave top flipped */}
        <img src={A.wave2} alt="" className="absolute top-0 left-0 w-full h-auto pointer-events-none select-none" style={{ transform: 'scaleY(-1)' }} />

        <div className="flex flex-col gap-4">
          {/* Heading */}
          <div className="relative z-10 px-4 sm:px-6 mb-4 sm:mb-6">
            <SectionHeading title="Our Services" subtitle="Our therapies and programs are designed to support every aspect of your child's growth" color="white" textColor="white" />
          </div>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 px-4 sm:px-6 relative z-10">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="svc-card relative overflow-hidden rounded-2xl flex-shrink-0 hover:scale-[1.02] transition-transform duration-300 cursor-pointer w-full sm:w-auto"
                style={{
                  backgroundColor: s.color,
                  width: 'clamp(140px, 44vw, 315px)',
                  height: 'clamp(360px, 55vw, 607px)',
                }}
              >
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full object-cover" style={{ height: '90%' }} />
                <div
                  className="absolute bottom-0 left-0 w-full flex flex-col gap-1.5 sm:gap-2 px-4 sm:px-6 pb-4 sm:pb-6 pt-8 sm:pt-10"
                  style={{ background: `linear-gradient(to bottom, ${s.from}, ${s.to} 47%)` }}
                >
                  {s.badge && <AdmissionBadge />}
                  <h3 className="text-white font-medium leading-tight" style={{ fontSize: 'clamp(14px, 1.5vw, 23px)' }}>
                    {s.title}
                  </h3>
                  <p className="text-white/90 leading-snug" style={{ fontSize: 'clamp(10px, 0.8vw, 12px)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <img src={A.wave2} alt="" className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none z-20" />
      </div>
    </section>
  )
}
