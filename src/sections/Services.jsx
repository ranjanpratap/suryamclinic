import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import SectionHeading from '../components/ui/SectionHeading'
import { AdmissionBadge } from '../components/ui/Icons'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { color: '#f4a92f', from: 'rgba(246,163,43,0)', to: '#f6a32b', img: A.img1209, title: 'Therapy Services',         desc: 'Speech, occupational, physical, and sensory therapies designed to improve communication, movement, and daily skills.' },
  { color: '#cdb8fe', from: 'rgba(205,184,254,0)', to: '#cdb8fe', img: A.img1210, title: 'Special Programs',          desc: 'Structured programs like autism therapy, school readiness, and early intervention to support long-term development.' },
  { color: '#45a3c5', from: 'rgba(69,163,197,0)',  to: '#45a3c5', img: A.childimage3, title: 'Counselling & Assessments', desc: "Professional guidance, psychological support, and detailed assessments to understand and support your child's needs." },
  { color: '#93d9b5', from: 'rgba(147,217,181,0)', to: '#93d9b5', img: A.img1211, title: 'Special School',            desc: 'A nurturing environment designed to support learning, growth, and independence.', badge: true },
]

export default function Services() {
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
    <section ref={ref} id="services" className="p-0 m-0 overflow-hidden w-full">
      <div className="relative overflow-hidden pt-32 pb-56">
        {/* Solid bg */}
        <div className="absolute inset-0 bg-[#f0c85d]" />
        {/* Texture */}
        <div
          className="absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none"
          style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px' }}
        />

        {/* Wave top flipped */}
        <img 
          src={A.wave2} 
          alt="" 
          className="absolute top-0 left-0 w-full h-auto pointer-events-none select-none -translate-y-1 scale-x-[1.05]" 
          style={{ transform: 'scaleY(-1)', marginTop: '-1px' }} 
        />

        <div className='flex flex-col gap-4'>
          {/* Heading */}
        <div className="relative z-10 px-6 mb-6">
          <SectionHeading title="Our Services" subtitle="Our therapies and programs are designed to support every aspect of your child's growth" color="white" textColor="white" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-5 px-4 md:px-6 relative z-10">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="svc-card relative overflow-hidden rounded-2xl w-full sm:w-[315px] hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
              style={{ backgroundColor: s.color, height: 'clamp(450px, 60vh, 607px)' }}
            >
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full object-cover" style={{ height: '78%' }} />
              <div
                className="absolute bottom-0 left-0 w-full flex flex-col gap-2 px-6 pb-6 pt-10"
                style={{ background: `linear-gradient(to bottom, ${s.from}, ${s.to} 47%)` }}
              >
                {s.badge && <AdmissionBadge />}
                <h3 className="text-white font-medium leading-tight" style={{ fontSize: 'clamp(16px, 1.5vw, 23px)' }}>
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
        <img 
          src={A.wave2} 
          alt="" 
          className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none z-20 translate-y-[2px] scale-x-[1.05]" 
          style={{ marginBottom: '-1px' }} 
        />
      </div>
    </section>
  )
}
