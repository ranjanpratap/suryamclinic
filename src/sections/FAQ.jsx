import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

const FAQ_CATS = ['General Information', 'Program & Schools', 'Therapy & Approach', 'Progress & Results', 'Parent Support', 'Online & Home Therapy']

const FAQ_ITEMS = [
  { q: 'Do I need a referral to start therapy?',           a: 'No referral is needed. You can contact us directly to schedule an initial assessment for your child.' },
  { q: 'What conditions do you treat?',                    a: 'We support children with autism, speech delay, ADHD, learning difficulties, developmental delay, motor challenges, and more.' },
  { q: 'What age groups do you work with?',                a: 'We support children from early intervention (1.5 years) to school-age, based on individual needs.' },
  { q: 'What is your school readiness program?',           a: 'Our program prepares children for school by developing attention, social skills, communication, and basic academic readiness.' },
  { q: 'Do you offer special education support?',          a: 'Yes, our special school and educators provide tailored academic support alongside therapeutic interventions.' },
  { q: 'How do you decide which therapy my child needs?',  a: 'We conduct a comprehensive assessment first, then create a personalised therapy plan with measurable goals.' },
  { q: 'Are therapy sessions one-on-one?',                 a: 'Most sessions are one-on-one. We also offer small group sessions when appropriate for social skill development.' },
]

export default function FAQ() {
  const [activeCat, setActiveCat] = useState(2)
  const [openIdx, setOpenIdx] = useState(4)
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="faq" className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-28">
        {/* Left */}
        <div className="flex flex-col gap-10 flex-shrink-0 lg:w-[400px]">
          <h2 className="font-bold text-[#f6a32b] leading-tight" style={{ fontSize: 'clamp(26px, 2.8vw, 42px)', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-1">
            {FAQ_CATS.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCat(i)}
                className={`text-left px-4 py-3 rounded text-[#434962] text-[18px] transition-all duration-200 ${
                  activeCat === i ? 'bg-white shadow-[0_4px_75px_-12px_rgba(0,0,0,0.12)] font-medium' : 'hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right: accordion */}
        <div className="flex flex-col gap-4 flex-1">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className={`faq-item rounded overflow-hidden transition-shadow duration-200 ${
                  isOpen ? 'shadow-[0_4px_75px_-12px_rgba(0,0,0,0.12)] bg-white' : 'shadow-[0_4px_75px_-12px_rgba(0,0,0,0.06)]'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-4 text-left"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span className="text-[#434962] font-normal pr-4" style={{ fontSize: 'clamp(14px, 1.3vw, 20px)' }}>
                    {item.q}
                  </span>
                  <img
                    src={isOpen ? A.cancel : A.add}
                    alt=""
                    className="w-6 h-6 flex-shrink-0 object-contain transition-transform duration-300"
                  />
                </button>
                <div className={`faq-body px-4 ${isOpen ? 'open pb-4' : ''}`}>
                  <p className="text-[#434962] text-[14px] leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
