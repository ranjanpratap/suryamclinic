import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'

import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function HowWeWork() {
  const { howWeWork: STEPS } = useSiteData()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hww-badge', '.hww-title', '.hww-step', '.hww-img'], { autoAlpha: 1 })

      gsap.from('.hww-badge', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.hww-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 82%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
      })
      gsap.from('.hww-step', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%', toggleActions: 'play none none none' },
        x: -40, opacity: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.hww-img', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%', toggleActions: 'play none none none' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="how-we-work" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-[1340px] mx-auto">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] bg-white shadow-[0_8px_60px_rgba(0,0,0,0.08)] px-6 sm:px-10 md:px-12 py-10 sm:py-14 flex flex-col lg:flex-row gap-10 sm:gap-12 items-center">

          {/* Subtle bg tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f9f1da]/60 via-white to-white pointer-events-none rounded-[24px] sm:rounded-[30px]" />

          {/* Left — content */}
          <div className="relative z-10 flex flex-col gap-8 sm:gap-10 flex-1 w-full">
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
              style={{ fontSize: 'clamp(22px, 2.8vw, 40px)', letterSpacing: '-0.02em', maxWidth: '420px' }}
            >
              Working Hand-in-Hand to Achieve Your Child's Goals
            </h2>

            {/* Steps */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {STEPS.map((s) => (
                <div key={s.num} className="hww-step flex gap-4 sm:gap-5 group">
                  {/* Number */}
                  <div className="flex-shrink-0 pt-1">
                    <span
                      className="font-bold text-black/15 group-hover:text-[#29abe2]/40 transition-colors duration-300"
                      style={{ fontSize: 'clamp(20px, 2vw, 32px)', letterSpacing: '-0.02em' }}
                    >
                      {s.num}
                    </span>
                  </div>

                  {/* Divider + text */}
                  <div className="flex flex-col gap-1 border-l-2 border-black/8 group-hover:border-[#29abe2]/40 transition-colors duration-300 pl-4 sm:pl-5">
                    <h3
                      className="font-semibold text-black"
                      style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', letterSpacing: '-0.01em' }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-black/50 leading-relaxed"
                      style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="hww-img relative flex-shrink-0 w-full lg:w-[45%] rounded-2xl overflow-hidden" style={{ height: 'clamp(240px, 40vw, 500px)' }}>
            <img
              src={A.img1212}
              alt="How we work"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Floating stat card */}
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-5 py-3 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#77bc52] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-black text-[15px] leading-none">500+ Children</p>
                <p className="text-black/50 text-[12px] mt-0.5">helped & growing</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
