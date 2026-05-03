import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import howWeWorkDiagram from '../assets/how-we-work.svg'

gsap.registerPlugin(ScrollTrigger)

export default function HowWeWork() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hww-badge', '.hww-title', '.hww-diagram'], { autoAlpha: 1 })

      gsap.from('.hww-badge', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.hww-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 82%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
      })
      gsap.from('.hww-diagram', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.2,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="how-we-work" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-[1340px] mx-auto">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] bg-white shadow-[0_8px_60px_rgba(0,0,0,0.08)] px-6 sm:px-10 md:px-14 py-10 sm:py-14 flex flex-col items-center gap-10">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center w-full">
            {/* Badge */}
            <div className="hww-badge flex items-center gap-2 w-fit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#29abe2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-[#29abe2] font-semibold text-[13px] tracking-wide uppercase">How We Work</span>
            </div>

            {/* Heading */}
            <h2
              className="hww-title font-bold text-black leading-tight"
              style={{ fontSize: 'clamp(22px, 2.8vw, 40px)', letterSpacing: '-0.02em', maxWidth: '560px' }}
            >
              Working Hand-in-Hand to Achieve Your Child's Goals
            </h2>
          </div>

          {/* Diagram */}
          <div className="hww-diagram w-full">
            <img
              src={howWeWorkDiagram}
              alt="How We Work — process diagram"
              className="w-full h-auto block mx-auto"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
