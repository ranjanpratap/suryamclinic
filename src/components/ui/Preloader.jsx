import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import A from '../../assets/images'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Safety fallback - ensure site is accessible after 3s even if GSAP fails
    const safetyTimeout = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = 'auto'
    }, 3000)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false)
          document.body.style.overflow = 'auto'
          clearTimeout(safetyTimeout)
        }
      })

      // Lock scroll while loading
      document.body.style.overflow = 'hidden'

      // Animation sequence (total ~2.3s as requested)
      tl.fromTo('.pre-logo', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
      .fromTo('.loader-bar', { width: '0%' }, { width: '100%', duration: 1.7, ease: 'power1.inOut' }, '-=0.3')
      .to('.mist-layer', { 
        opacity: 0, 
        scale: 1.5, 
        duration: 1.2, 
        stagger: 0.1,
        ease: 'power2.inOut' 
      }, '-=1.2')
      .to('.cloud-item', { 
        xPercent: (i) => i % 2 === 0 ? -100 : 100, 
        opacity: 0, 
        duration: 1.0, 
        ease: 'power2.inOut' 
      }, '<')
      .to('.preloader-container', { 
        opacity: 0, 
        duration: 0.4, 
        ease: 'power3.inOut' 
      }, '-=0.2')
    })

    return () => {
      ctx.revert()
      document.body.style.overflow = 'auto'
      clearTimeout(safetyTimeout)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="preloader-container fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Mist Layers - Decorative Shapes */}
      <div className="mist-layer absolute inset-0 bg-[#29abe2] opacity-[0.08] blur-[100px]" />
      <div className="mist-layer absolute inset-0 bg-[#45a3c5] opacity-[0.05] blur-[120px] translate-x-[20%] translate-y-[-20%]" />
      <div className="mist-layer absolute inset-0 bg-[#f9f1da] opacity-[0.1] blur-[80px] translate-x-[-30%] translate-y-[30%]" />

      {/* Cloud Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudSVG className="cloud-item absolute top-[20%] left-[10%] w-[120px] text-[#29abe2]/20" />
        <CloudSVG className="cloud-item absolute top-[60%] left-[80%] w-[150px] text-[#29abe2]/20" />
        <CloudSVG className="cloud-item absolute top-[70%] left-[5%] w-[100px] text-[#29abe2]/15" />
        <CloudSVG className="cloud-item absolute top-[15%] left-[75%] w-[140px] text-[#29abe2]/15" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <img src={A.logoSym} alt="Logo" className="pre-logo w-24 h-24 mb-4 object-contain" />
        <div className="pre-logo h-1 bg-[#29abe2]/20 rounded-full w-40 overflow-hidden mt-6">
            <div className="loader-bar h-full bg-[#f15a24]" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  )
}

function CloudSVG({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.58,16.41c2.1,0,3.8-1.7,3.8-3.8c0-1.87-1.34-3.42-3.11-3.72C17.7,6.86,15.11,5,12,5C9.37,5,7.1,6.33,5.82,8.34 C3.65,8.68,2,10.55,2,12.82c0,2.1,1.7,3.59,3.8,3.59h11.78" />
    </svg>
  )
}
