import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import SectionHeading from '../components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const CONDITIONS = [
  { icon: A.brain,  title: 'Autism Spectrum',          desc: 'Helping children improve communication, behavior, and social skills.' },
  { icon: A.speech, title: 'Speech Delay',              desc: 'Supporting speech clarity, language development, and expression.' },
  { icon: A.target, title: 'ADHD',                     desc: 'Improving focus, behavior regulation, and attention skills.' },
  { icon: A.book,   title: 'Learning Difficulties',    desc: 'Supporting children with reading, writing, and academic challenges to build confidence.' },
  { icon: A.puzzle, title: 'Developmental Delay',      desc: 'Helping children achieve age-appropriate milestones in movement, communication, and daily skills.' },
  { icon: A.run,    title: 'Motor Skill Challenges',   desc: 'Improving fine and gross motor skills for better coordination, balance, and independence.' },
  { icon: A.msg,    title: 'Communication Challenges', desc: 'Helping children express thoughts, understand language, and interact confidently with others.' },
]

export default function Conditions() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll — use autoAlpha so they're visible even if trigger fails
      const cards = gsap.utils.toArray('.cond-card')
      if (cards.length) {
        gsap.set(cards, { autoAlpha: 1 }) // ensure visible by default
        gsap.from(cards, {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="services" className="py-20 px-6">
      <div className="max-w-[1340px] mx-auto flex flex-col items-center gap-12">
        <SectionHeading
          title="Supporting Every Child's Unique Needs"
          subtitle="We help children facing developmental and learning challenges grow with confidence."
          textColor="black"
        />

        {/* Cards grid */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {CONDITIONS.map((c) => (
            <div
              key={c.title}
              className="cond-card bg-white rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              style={{ width: 'clamp(280px, 30%, 434px)', minHeight: '260px' }}
            >
              <div className="flex flex-col gap-3">
                <img src={c.icon} alt="" className="w-7 h-7 object-contain" />
                <h3
                  className="font-medium text-black leading-tight"
                  style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', letterSpacing: '-0.03em' }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-black/60 leading-snug"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 16px)', letterSpacing: '-0.02em' }}
                >
                  {c.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <span className="text-black/60 text-[15px]">Learn More</span>
                <img src={A.arrowR} alt="" className="w-5 h-5 object-contain group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
