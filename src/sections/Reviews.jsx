import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'

import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function Reviews() {
  const { reviews: REVIEWS } = useSiteData()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-card', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-20 flex flex-col items-center">
      {/* Top CTA Strip */}
      <div className="flex flex-col items-center gap-5 mb-20 px-6">
        <p className="text-black/60 text-[18px] font-medium text-center">if you have any questions, feel free to reach out.</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-[#dee9ff] hover:bg-[#cfdfff] text-[#1a4da1] font-bold py-3 px-7 rounded-full flex items-center gap-2.5 transition-all text-[15px]">
            <span>call us</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
          <button className="bg-[#008f75] hover:bg-[#007b64] text-white font-bold py-3 px-7 rounded-full flex items-center gap-2.5 transition-all text-[15px]">
            <span>whatsapp us</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zM17.52 14.3c-.33-.17-1.93-.95-2.22-1.06-.3-.1-.51-.17-.71.13-.21.3-.81.67-1 .85-.18.18-.36.2-.69.03-.33-.17-1.42-.52-2.7-1.66-1-1-1.68-2.21-1.88-2.54-.2-.33-.02-.51.15-.68.15-.15.33-.36.49-.54.17-.18.23-.31.33-.51.1-.2.05-.38-.03-.54-.08-.17-.71-1.71-.97-2.33-.26-.6-.52-.52-.71-.53-.18 0-.39-.01-.61-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73 0 1.61 1.17 3.16 1.34 3.39.17.23 2.3 3.51 5.56 4.92.78.33 1.38.53 1.86.68.78.25 1.49.21 2.05.13.62-.1 1.93-.79 2.19-1.55.27-.77.27-1.43.19-1.56-.08-.13-.31-.2-.64-.37z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <svg className="text-[#fbbc05]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <p className="text-black/50 text-[15px] font-semibold flex items-center gap-2">
            4.7 
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            rating | 5000+ happy parents
          </p>
        </div>
      </div>

      {/* Reviews Main Section */}
      <div className="w-full bg-[#f4faec] py-24 px-6">
        <div className="max-w-[1300px] mx-auto flex flex-col gap-12">
          <h2 className="text-center font-bold text-black opacity-80" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', letterSpacing: '-0.02em' }}>
            see how other parents found hope at <span className="font-extrabold text-black opacity-100">sunshine</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="review-card bg-white rounded-[32px] p-8 pb-10 flex flex-col gap-6 relative group">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5 text-[#fbbc05]">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="font-bold text-black text-[17px] leading-tight flex items-center justify-between">
                    {review.name}
                    <span className="text-black/30 text-[12px] font-medium">{review.date}</span>
                  </h3>
                </div>

                <p className="text-black/70 text-[15.5px] leading-relaxed font-medium italic opacity-90">
                   {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
