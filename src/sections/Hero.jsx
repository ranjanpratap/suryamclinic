/* eslint-disable */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import { ButtonPrimary } from '../components/ui/Button'
import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const ref = useRef(null)
  const { hero, loading, openLeadPopup } = useSiteData()

  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-word', { y: 60, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.hero-btn',  { y: 16, opacity: 0, scale: 0.92, duration: 0.6 }, '-=0.4')
        .from('.hero-img',  { scale: 0.9, opacity: 0, duration: 1.1, ease: 'back.out(1.4)' }, '-=0.8')
        .from('.hero-deco', { scale: 0, opacity: 0, duration: 0.5 }, '-=0.3')

      gsap.to('.hero-img', { y: -10, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true })

      gsap.to('.hero-parallax-bg', {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }, ref)
    return () => ctx.revert()
  }, [loading])

  const heroImage  = (!hero?.image || hero.image === '__heroChild__') ? A.heroChild : hero.image
  const titleWords = (hero?.title    || 'Helping Every Child Reach').split(' ')
  const boldWords  = (hero?.subtitle || 'Their Full Potential').split(' ')
  const ctaText    = hero?.cta || 'Book Assessment'

  return (
    <section ref={ref} id="home" className="pt-[90px] md:pt-[110px] pb-5 md:pb-10 px-4 md:px-6 w-full min-h-[480px] md:min-h-[820px] overflow-hidden">
      <div className="relative overflow-hidden bg-white rounded-[20px] md:rounded-[30px] min-h-[480px] md:min-h-[820px]">
        {/* Detached background layer to prevent bottom line bleed */}
        <div className="absolute inset-0 bg-[#45a3c5] z-0 rounded-[20px] md:rounded-[30px]" style={{ marginBottom: '2px' }} />
        
        {/* Texture overlay — also detached from bottom */}
        <div
          className="hero-parallax-bg absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none z-0 rounded-[20px] md:rounded-[30px]"
          style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px', height: '120%', marginBottom: '2px' }}
        />
        
        {/* Wave — bottom */}
        <img
          src={A.wave3}
          alt=""
          className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none z-40"
        />

        {/* Hero image — fills section, bottom-anchored */}
        <div className="absolute inset-0 flex justify-center items-end z-10">
          <img
            src={heroImage}
            alt="Happy child"
            className="hero-img object-contain object-bottom select-none mx-auto"
            style={{ height: '96%', width: 'auto', maxWidth: '100%' }}
          />
        </div>

        {/* Title — top center, above image */}
        <div className="relative z-20 flex flex-col items-center text-center w-full px-[5px] sm:px-10 pt-[70px] sm:pt-10 lg:pt-14">
          <h1
            className="font-bold text-white leading-[1.15] select-none w-full max-w-[900px] text-[26px] sm:text-[clamp(27px,4.5vw,72px)]"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span>
              {titleWords.map((w, i) => (
                <span key={i} className="hero-word inline-block mr-[0.2em] font-normal">{w}</span>
              ))}
            </span>
            {' '}
            <span className="font-bold">
              {boldWords.map((w, i) => (
                <span key={i} className="hero-word inline-block mr-[0.2em]">{w}</span>
              ))}
            </span>
          </h1>
        </div>

        {/* CTA button — overlaid on image, ~mid-section */}
        <div
          className="hero-btn absolute z-20 left-1/2 -translate-x-1/2 top-[80%] md:top-[72%]"
        >
          <ButtonPrimary 
            onClick={openLeadPopup} 
            icon={A.calendar}
          >
            {ctaText}
          </ButtonPrimary>
        </div>

        {/* Decorations */}
        <img src={A.group1} alt=""
          className="hero-deco absolute pointer-events-none select-none hidden xl:block object-contain z-20"
          style={{ top: '58%', right: '19%', width: '140px', height: '70px' }}
        />
        <img src={A.vec5} alt=""
          className="absolute pointer-events-none select-none object-contain hidden lg:block z-20"
          style={{ top: '58%', left: '10%', width: '200px', height: '62px' }}
        />
      </div>
    </section>
  )
}
