/* eslint-disable */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import A from '../assets/images'
import { AdmissionBadge } from '../components/ui/Icons'
import { ButtonWhite, ButtonOutline } from '../components/ui/Button'
import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

export default function SchoolCTA({
  id = '1',
  formLink = 'https://docs.google.com/forms/your-form-id',
}) {
  const { contact } = useSiteData()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.cta-content-${id}`, {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        x: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      })
      gsap.from(`.cta-img-${id}`, {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [id])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[22px] mx-4 sm:mx-6 my-12 sm:my-16 bg-[#77bc52] border-[9px] border-[#77bc52]"
    >
      {/* Badge */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-6 z-10">
        <AdmissionBadge />
      </div>

      {/* Stack on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Image */}
        <div className={`cta-img-${id} relative flex-shrink-0 w-full sm:w-[45%] overflow-hidden`}
             style={{ height: 'clamp(200px, 55vw, 330px)' }}>
          <img src={A.img1212} alt="School" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className={`cta-content-${id} flex flex-col gap-6 sm:gap-10 px-6 sm:px-10 py-8 flex-1`}>
          <div className="flex flex-col gap-3 text-white">
            <h3 className="font-semibold leading-tight"
                style={{ fontSize: 'clamp(18px, 2vw, 30px)', letterSpacing: '-0.03em' }}>
              Give Your Child the Right Start
            </h3>
            <p className="leading-relaxed"
               style={{ fontSize: 'clamp(13px, 1.2vw, 18px)', letterSpacing: '-0.02em' }}>
              A structured, supportive learning environment designed for children with diverse developmental needs — helping them grow with confidence and independence.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <ButtonWhite 
              href={contact?.admissionForm}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for Admission
            </ButtonWhite>
            <ButtonOutline 
              href={contact?.schoolCalendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a School Visit
            </ButtonOutline>
          </div>
        </div>
      </div>
    </div>
  )
}
