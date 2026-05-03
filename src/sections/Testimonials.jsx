/* eslint-disable */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import SectionHeading from '../components/ui/SectionHeading'
import { Stars } from '../components/ui/Icons'
import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const { testimonials, loading } = useSiteData()
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const cardRef = useRef(null)

  const items = testimonials?.length > 0 ? testimonials : [
    { name: 'Mrs. Priya Verma', location: 'New Delhi', text: 'Real progress daily, not monthly.' },
    { name: 'Mr. Rahul Singh',  location: 'Mumbai',    text: 'Speech clarity has improved dramatically.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-head', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
      gsap.to('.testi-parallax-bg', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const go = (dir) => {
    const next = (active + dir + items.length) % items.length
    gsap.to(cardRef.current, {
      x: dir * -60, opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActive(next)
        gsap.fromTo(cardRef.current,
          { x: dir * 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
      },
    })
  }

  const t = items[active % items.length]

  const getEmbedUrl = (url) => {
    if (!url) return null
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.split('v=')?.[1]?.split('&')?.[0] || url.split('youtu.be/')?.[1]
      return id ? `https://www.youtube.com/embed/${id}` : url
    }
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview')
    }
    return url
  }

  const embedUrl = getEmbedUrl(t.video)
  const isDirectVideo = t.video && (t.video.match(/\.(mp4|webm|ogg|mov)$/i) || t.video.includes('cloudinary.com'))

  return (
    <section
      ref={ref}
      className="relative overflow-hidden w-full bg-[#29abe2]"
      style={{ paddingTop: 'clamp(60px, 14vw, 320px)', paddingBottom: '80px' }}
    >
      {/* Texture parallax bg */}
      <div
        className="testi-parallax-bg absolute inset-0 mix-blend-color-burn opacity-60 pointer-events-none w-full"
        style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '2048px 2048px', height: '120%', top: '-10%' }}
      />

      {/* Cream arc — made more circular for imaginative feel */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-[#f9f1da] rounded-[100%] pointer-events-none z-0"
        style={{ width: '350%', height: '3000px', top: 'clamp(-5px, 4vw, 40px)' }}
      />

      {/* Clouds — scaled and repositioned responsively */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <CloudSVG className="absolute text-white" style={{ top: 'clamp(8px, 2vw, 20px)', left: '8%', width: 'clamp(50px, 10vw, 130px)' }} />
        <CloudSVG className="absolute text-white" style={{ top: 'clamp(20px, 5vw, 80px)', left: '70%', width: 'clamp(60px, 12vw, 160px)' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-8 sm:gap-12">

        {/* Heading */}
        <div className="testi-head">
          <SectionHeading
            title="Testimonial & Reviews"
            subtitle="Our therapies and programs are designed to support every aspect of your child's growth"
            color="#29abe2"
            textColor="#29abe2"
          />
        </div>

        {/* Carousel */}
        <div className="w-full relative z-20 mt-4 sm:mt-10">
          <div ref={cardRef} className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row gap-5 sm:gap-8 shadow-xl">

            {/* Video / image thumb */}
            <div
              className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black/5 w-full md:w-[clamp(200px,32%,440px)]"
              style={{ minHeight: 'clamp(180px, 45vw, 320px)' }}
            >
              {isDirectVideo ? (
                <video src={t.video} controls className="w-full h-full object-cover" />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  style={{ minHeight: 'clamp(180px, 45vw, 320px)' }}
                  title="Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img src={A.videoThumb} alt="Testimonial" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-5 rounded-full">
                      <img src={A.play} alt="Play" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4 sm:gap-5 flex-1 justify-center">
              <div>
                <h3 className="font-normal text-black" style={{ fontSize: 'clamp(20px, 2.5vw, 40px)', letterSpacing: '-0.02em' }}>
                  {t.name}
                </h3>
                <p className="text-black/40" style={{ fontSize: 'clamp(13px, 1.3vw, 22px)' }}>
                  {t.location}
                </p>
                <Stars count={5} />
              </div>
              <div className="relative">
                <img src={A.quote} alt="" className="absolute -top-3 -left-1 w-12 sm:w-20 opacity-80 pointer-events-none object-contain" />
                <p className="relative text-black leading-relaxed pt-5 sm:pt-6" style={{ fontSize: 'clamp(13px, 1.3vw, 22px)', letterSpacing: '-0.02em' }}>
                  {t.text}
                </p>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-4 mt-5 sm:mt-6">
            <button onClick={() => go(-1)} className="hover:scale-110 transition-transform rotate-180">
              <img src={A.circleR2} alt="prev" className="w-11 h-11 sm:w-14 sm:h-14 object-contain" />
            </button>
            <button onClick={() => go(1)} className="hover:scale-110 transition-transform">
              <img src={A.circleR2} alt="next" className="w-11 h-11 sm:w-14 sm:h-14 object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CloudSVG({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
      <path d="M17.58,16.41c2.1,0,3.8-1.7,3.8-3.8c0-1.87-1.34-3.42-3.11-3.72C17.7,6.86,15.11,5,12,5C9.37,5,7.1,6.33,5.82,8.34 C3.65,8.68,2,10.55,2,12.82c0,2.1,1.7,3.59,3.8,3.59h11.78" />
    </svg>
  )
}
