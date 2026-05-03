import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

export default function QualityEducation() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.qe-img', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out'
      })
      gsap.from('.qe-content', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 px-10 bg-white">
      <div className="max-w-[1340px] mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* Left Image */}
        <div className="qe-img flex-1 relative rounded-[40px] overflow-hidden lg:min-h-[550px] shadow-2xl">
          <img src={A.videoThumb} alt="Quality Education" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Right Content */}
        <div className="qe-content flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
             <div className="bg-[#ccff5c] text-black font-bold text-[13px] px-4 py-1.5 rounded-full w-fit uppercase tracking-wider shadow-sm">our philosophy</div>
             <h2 className="text-black font-black leading-tight" style={{ fontSize: 'clamp(32px, 3.5vw, 56px)' }}>
               Quality <span className="text-[#29abe2]">Education</span> for Every Child
             </h2>
          </div>
          
          <p className="text-black/60 text-[18px] font-medium leading-relaxed">
            We believe that every child has a unique learning style. Our curriculum is not just about books; it's about building confidence, social skills, and cognitive independence through child-centered methodologies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
             {[
               { t: 'Holistic Development', s: 'Focused on motor, social, and emotional growth.' },
               { t: 'Integrated Therapy', s: 'OT and SLP sessions built into the school day.' },
               { t: 'Expert Educators', s: 'Experienced special educators and child psychologists.' },
               { t: 'Inclusive Environment', s: 'Safe, supportive, and modern learning spaces.' }
             ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-5 rounded-2xl bg-[#f4faec] border border-black/5 hover:bg-[#ccff5c]/20 transition-colors cursor-default">
                  <h4 className="font-bold text-black text-[17px]">{item.t}</h4>
                  <p className="text-black/50 text-[14px] font-medium leading-tight">{item.s}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}
