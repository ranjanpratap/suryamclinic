import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  {
    title: 'Individualized Learning',
    text: 'Every student receives a personalized Education Plan (IEP).',
    icon: A.target
  },
  {
    title: 'Modern Facilities',
    text: 'State-of-the-art sensory rooms and therapy equipment.',
    icon: A.brain
  },
  {
    title: 'Therapy at School',
    text: 'Seamless integration of Occupational and Speech therapy.',
    icon: A.speech
  },
  {
    title: 'Parent Involvement',
    text: 'Regular workshops and feedback sessions for parents.',
    icon: A.msg
  }
]

export default function WhyUs() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reason-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 bg-[#f4faec]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-10 sm:gap-16">
        <div className="flex flex-col gap-3 sm:gap-4 text-center items-center">
          <h2 className="text-black font-black leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)' }}>
            Why Choose Our <span className="text-[#29abe2]">School?</span>
          </h2>
          <p className="text-black/50 text-[15px] sm:text-[18px] font-medium max-w-[720px]">
            We are more than just a school. We are a family that supports your child's journey towards independence and success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {REASONS.map((r, i) => (
            <div key={i} className="reason-card bg-white p-7 sm:p-10 rounded-[28px] sm:rounded-[32px] shadow-sm hover:shadow-lg transition-shadow border border-black/5 flex flex-col gap-5 sm:gap-6 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#29abe2]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#29abe2] group-hover:text-white transition-all duration-300">
                <img src={r.icon} alt={r.title} className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-all group-hover:brightness-200" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-black text-[17px] sm:text-[20px]">{r.title}</h4>
                <p className="text-black/50 text-[14px] sm:text-[15px] font-medium leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
