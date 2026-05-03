import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import SectionHeading from '../components/ui/SectionHeading'
import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

const TEAM_FALLBACK = [
  { name: 'Dr. Sarah Mitchell',  role: 'Speech Therapist',          img: A.img1208 },
  { name: 'Dr. Priya Sharma',    role: 'Occupational Therapist',    img: A.img1209 },
  { name: 'Dr. James Wilson',    role: 'Child Psychologist',        img: A.img1210 },
  { name: 'Dr. Ananya Gupta',    role: 'Special Educator',          img: A.img1211 },
  { name: 'Dr. Rohit Mehta',     role: 'Physiotherapist',           img: A.img1212 },
  { name: 'Dr. Emily Chen',      role: 'Behavioral Therapist',      img: A.img1208 },
  { name: 'Dr. Neha Kapoor',     role: 'Autism Specialist',         img: A.img1209 },
  { name: 'Dr. Arjun Patel',     role: 'Developmental Pediatrician', img: A.img1210 },
]

export default function Team() {
  const { team } = useSiteData()
  const ref = useRef(null)
  const trackRef = useRef(null)

  const displayTeam = (team && team.length > 0) ? team : TEAM_FALLBACK
  const doubled = [...displayTeam, ...displayTeam]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-head', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      })

      // GSAP-driven infinite marquee (left to right)
      const track = trackRef.current
      if (track) {
        const totalWidth = track.scrollWidth / 2
        // Start off-screen left, scroll to 0 (left → right movement)
        gsap.set(track, { x: -totalWidth })
        gsap.to(track, {
          x: 0,
          duration: 30,
          ease: 'none',
          repeat: -1,
        })
      }

      // Parallax Background
      gsap.to('.team-parallax-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [displayTeam])

  return (
    <section ref={ref} id="team" className="relative p-0 m-0 overflow-hidden w-full">
      {/* BG — local asset */}
      
      <img
        src={A.frame38}
        alt=""
        className="team-parallax-bg absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ height: '120%', top: '-10%' }}
      />

      <div className="relative z-10 w-full mb-10 text-center team-head">
        <SectionHeading
          title="Our Team"
          subtitle="Our therapies and programs are designed to support every aspect of your child's growth"
          textColor="black"
        />
      </div>

      {/* Infinite marquee — moves left to right */}
      <div className="relative z-10 overflow-hidden">
        <div ref={trackRef} className="flex gap-5 py-2 w-max">
          {doubled.map((m, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
              style={{ width: 'clamp(240px, 80vw, 292px)', height: 'clamp(320px, 100vw, 380px)' }}
            >
              <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="text-white font-medium text-[16px]">{m.name}</p>
                <p className="text-white/70 text-[13px]">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
