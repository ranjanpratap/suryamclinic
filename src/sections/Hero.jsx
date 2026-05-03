import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import { ButtonPrimary } from '../components/ui/Button'
import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { hero: HERO_CONTENT } = useSiteData()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-word', { y: 70, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-btn', { y: 20, opacity: 0, scale: 0.9, duration: 0.6 }, '-=0.4')
        .from('.hero-img', { scale: 0.88, opacity: 0, duration: 1.2, ease: 'back.out(1.4)' }, '-=0.9')
        .from('.hero-trophy', { rotate: -30, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-deco', { scale: 0, opacity: 0, duration: 0.5 }, '-=0.4')

      // Floating animations
      gsap.to('.hero-img', {
        y: -14, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })
      gsap.to('.hero-trophy', {
        rotate: 5, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Parallax Scroll Effect
      gsap.to('.hero-parallax-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
      gsap.to('.hero-img', {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="home" className="pt-[90px] w-full">
      <div className="relative overflow-hidden bg-[#45a3c5]" style={{ minHeight: 'clamp(560px, 80vw, 820px)' }}>
        {/* Texture overlay */}
        <div
          className="hero-parallax-bg absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none "
          style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px', backgroundPosition: 'top left', height: '120%' }}
        />

        {/* Bottom wave — preserve aspect ratio */}
        <img
          src={A.wave3}
          alt=""
          className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none z-40"
        />

        {/* Title */}
        <h1
          className="absolute top-[60px] sm:top-[100px] left-1/2 -translate-x-1/2 text-white text-center leading-[1.1] w-[92%] max-w-[1200px] select-none"
          style={{ fontSize: 'clamp(24px, 5.7vw, 86px)', letterSpacing: '-0.03em' }}
        >
          <span>
            {(HERO_CONTENT.titleWords || []).map(w => (
              <span key={w} className="hero-word inline-block mr-[0.22em]">{w}</span>
            ))}
          </span>
          <br />
          <span className="font-bold">
            {(HERO_CONTENT.boldWords || []).map(w => (
              <span key={w} className="hero-word inline-block mr-[0.22em]">{w}</span>
            ))}
          </span>
        </h1>

        {/* Child photo */}
        <img
          src={HERO_CONTENT.image === '__heroChild__' ? A.heroChild : (HERO_CONTENT.image || A.heroChild)}
          alt="Happy child"
          className="hero-img absolute bottom-0 left-1/2 -translate-x-1/2 object-contain select-none z-20"
          style={{ width: 'clamp(220px, 58%, 873px)', maxHeight: '75%' }}
        />

        {/* Contact group deco — object-contain fix */}
        <img
          src={A.group1}
          alt=""
          className="hero-deco absolute pointer-events-none select-none hidden xl:block object-contain z-30"
          style={{ top: '70%', right: '20.5%', width: '200px', height: '100px' }}
        />

        {/* Small vector sparkle */}
        <img
          src={A.vec5}
          alt=""
          className="absolute pointer-events-none select-none object-contain z-1 hidden sm:block"
          style={{ top: '64%', left: '19%', width: '255px', height: '80px' }}
        />

        {/* CTA */}
        <div className="hero-btn absolute bottom-[10%] sm:bottom-[14%] left-1/2 -translate-x-1/2 z-40">
          <ButtonPrimary icon={A.call1}>{HERO_CONTENT.ctaText || 'Book Assessment'}</ButtonPrimary>
        </div>
      </div>
    </section>
  )
}
