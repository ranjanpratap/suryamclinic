import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import SectionHeading from '../components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

import { useSiteData } from '../context/SiteContext'

export default function Gallery() {
  const { gallery } = useSiteData()
  const ref = useRef(null)

  const IMGS = [A.img1208, A.img1209, A.img1210, A.img1211, A.img1212]
  const currentImgs = (gallery?.length > 0) ? gallery.map(g => g.url || g.image) : [...IMGS, ...IMGS]

  const ROWS = [
    [...currentImgs],
    [...currentImgs].reverse(),
    [...currentImgs].map((_, i, a) => a[(i + 2) % a.length]),
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gall-head', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      })

      // Select all 4 tracks to animate differently or together
      document.querySelectorAll('.gall-track').forEach((track, i) => {
        // Sliding right to left means starting at 0 and moving to -50% (if content is doubled)
        gsap.to(track, {
          xPercent: -50,
          duration: 35 + (i * 5),
          ease: 'none',
          repeat: -1,
        })
      })

      // Parallax Background
      gsap.to('.gall-parallax-bg', {
        yPercent: 15,
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
  }, [])

  return (
    <section ref={ref} id="gallery" className="py-0 overflow-hidden">
      <div className="relative bg-[#29abe2] overflow-hidden pt-16 pb-20">
        {/* Texture */}
        <div
          className="gall-parallax-bg absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none"
          style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px', height: '120%' }}
        />

        {/* Wave top flipped */}
        <img 
          src={A.wave1} 
          alt="" 
          className="absolute top-0 left-0 w-full h-auto pointer-events-none select-none -translate-y-1 scale-x-[1.1]" 
          style={{ transform: 'scaleY(-1)', marginTop: '-1px' }} 
        />

        {/* Heading */}
        <div className="gall-head relative z-10 pt-20 mb-14 px-10">
          <SectionHeading title="Our Gallery" subtitle="Our therapies and programs are designed to support every aspect of your child's growth" color="white" textColor="white" />
        </div>

        {/* 4 Tracks Grid */}
        <div className="relative z-10 space-y-4 pb-40">
          {ROWS.map((row, idx) => (
            <div key={idx} className="overflow-hidden">
              {/* Double the row for seamless loop */}
              <div className="gall-track flex gap-4 w-max px-2">
                {[...row, ...row].map((src, i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ width: '320px', height: '220px' }}
                  >
                    <img 
                      src={src} 
                      alt={`Gallery ${idx}-${i}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
