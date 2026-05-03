import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

const FAQ_CATS = [
  'General Information',
  'Therapy & Approach',
  'Progress & Results',
  'School Readiness Program'
]

const FAQ_ITEMS = [
  // SEGMENT 1: General Information
  {
    cat: 'General Information',
    q: 'What makes Suryam Child Development Clinic different?',
    a: 'We follow a structured, goal-based and multidisciplinary approach. Every child gets an individualized plan with regular tracking, parent involvement, and reassessment. Our focus is on real-life functional improvement, not just session-based activities.'
  },
  {
    cat: 'General Information',
    q: 'How does your clinic understand my child’s needs?',
    a: 'We conduct a detailed consultation with history and observation. We focus on how your child functions in daily life, not just diagnosis. This helps us create a precise and personalized therapy plan.'
  },
  {
    cat: 'General Information',
    q: 'How long is each session?',
    a: 'Each session is 45 minutes, designed to balance engagement and effective skill-building.'
  },
  {
    cat: 'General Information',
    q: 'Are sessions one-on-one or group-based?',
    a: 'Sessions are primarily one-on-one with a professional therapist. Group sessions are introduced when needed for social skills.'
  },
  {
    cat: 'General Information',
    q: 'Do you only provide offline therapy or also provide online & Home therapy?',
    a: 'Yes, We provide therapy at the clinic, online, and home-based (if required), depending on the child’s needs.'
  },

  // SEGMENT 2: Therapy & Approach
  {
    cat: 'Therapy & Approach',
    q: 'Can therapy really improve my child’s daily life?',
    a: 'Yes, therapy focuses on independence, communication, and real-life skills.'
  },
  {
    cat: 'Therapy & Approach',
    q: 'What happens in a therapy session?',
    a: 'Sessions include skill training, behavior work, communication, and functional activities.'
  },
  {
    cat: 'Therapy & Approach',
    q: 'Do you provide home plans?',
    a: 'Yes, we provide structured and practical home programs.'
  },
  {
    cat: 'Therapy & Approach',
    q: 'What is your ultimate goal of therapy?',
    a: 'To make the child independent, confident, and functional in daily life.'
  },

  // SEGMENT 3: Progress & Results
  {
    cat: 'Progress & Results',
    q: 'When will I start seeing results?',
    a: 'Most children show initial improvements within 3–4 weeks with consistency.'
  },
  {
    cat: 'Progress & Results',
    q: 'What if progress is slow?',
    a: 'We review and modify the therapy plan accordingly.'
  },
  {
    cat: 'Progress & Results',
    q: 'Are therapy results long-lasting?',
    a: 'Yes, we focus on functional and sustainable outcomes.'
  },
  {
    cat: 'Progress & Results',
    q: 'Do you provide reassessment?',
    a: 'Yes, every 3 months detailed reassessment is done.'
  },
  {
    cat: 'Progress & Results',
    q: 'Do parents play a role in progress?',
    a: 'Yes, home consistency and parent involvement are key.'
  },
  {
    cat: 'Progress & Results',
    q: 'Are there regular parent meetings?',
    a: 'Yes, monthly meetings are conducted.'
  },

  // SEGMENT 4: School Readiness Program
  {
    cat: 'School Readiness Program',
    q: 'What is the School Readiness Program?',
    a: 'A structured program to prepare children for school environment and routines.'
  },
  {
    cat: 'School Readiness Program',
    q: 'What skills are developed?',
    a: 'Toilet training, sitting tolerance, communication, social and pre-academic skills.'
  },
  {
    cat: 'School Readiness Program',
    q: 'Do you create a school-like environment?',
    a: 'Yes, sessions simulate a real classroom setting.'
  },
  {
    cat: 'School Readiness Program',
    q: 'Is toilet training included?',
    a: 'Yes, with proper guidance and structure.'
  },
  {
    cat: 'School Readiness Program',
    q: 'Do you coordinate with schools?',
    a: 'Yes, we provide school and environment modification guidance.'
  }
]

export default function FAQ() {
  const [activeCat, setActiveCat] = useState(0)
  const [openIdx, setOpenIdx] = useState(0)
  const ref = useRef(null)

  const filteredItems = FAQ_ITEMS.filter(item => item.cat === FAQ_CATS[activeCat])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [activeCat])

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
                onClick={() => {
                  setActiveCat(i)
                  setOpenIdx(0)
                }}
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
          {filteredItems.map((item, i) => {
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
