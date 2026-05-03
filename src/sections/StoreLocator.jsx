import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useSiteData } from '../context/SiteContext'

gsap.registerPlugin(ScrollTrigger)

// Haversine formula — returns distance in km
function calcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1)
}

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
)

export default function StoreLocator() {
  const { locations: LOCATIONS } = useSiteData()
  const [active, setActive] = useState(0)
  const [distances, setDistances] = useState([])
  const ref = useRef(null)
  const mapRef = useRef(null)

  // Try to get user's real location and compute distances
  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setDistances(
          LOCATIONS.map(l => calcDistance(coords.latitude, coords.longitude, l.lat, l.lng))
        )
      },
      () => {}
    )
  }, [LOCATIONS])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.locator-head', '.loc-card', '.map-wrap'], { autoAlpha: 1 })
      gsap.from('.locator-head', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.loc-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        x: -40, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.map-wrap', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        x: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const switchLocation = (idx) => {
    if (idx === active) return
    if (mapRef.current) {
      gsap.to(mapRef.current, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          setActive(idx)
          gsap.to(mapRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        },
      })
    } else {
      setActive(idx)
    }
  }

  const safeActive = Math.min(active, LOCATIONS.length - 1)
  const loc = LOCATIONS[safeActive]
  const dist = distances[safeActive]

  // Shared card list
  const LocationCards = () => (
    <>
      {LOCATIONS.map((l, i) => (
        <div
          key={l.id}
          className={`loc-card rounded-2xl p-5 sm:p-7 border-2 transition-all duration-300 cursor-pointer ${
            active === i
              ? 'bg-[#29abe2] border-[#29abe2] text-white shadow-lg scale-[1.015]'
              : 'bg-white border-black/10 text-black hover:border-[#29abe2]/40 hover:shadow-md'
          }`}
          onClick={() => switchLocation(i)}
        >
          {/* Badge */}
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${
            active === i ? 'bg-white/20 text-white' : 'bg-[#29abe2]/10 text-[#29abe2]'
          }`}>
            <PinIcon />
            Location {l.id}
            {active === i && <span className="ml-1 w-2 h-2 rounded-full bg-[#ccff5c] inline-block" />}
          </div>

          <h3 className="font-semibold text-[16px] leading-tight mb-1">{l.name}</h3>
          <div className={`flex items-start gap-3 text-[13px] mb-2 ${active === i ? 'text-white/80' : 'text-black/60'}`}>
            <span className="flex-shrink-0 mt-[1px] opacity-70"><PinIcon /></span>
            <span>{l.address}</span>
          </div>
          <div className={`flex items-start gap-3 text-[13px] mb-2 ${active === i ? 'text-white/80' : 'text-black/60'}`}>
            <span className="flex-shrink-0 mt-[1px] opacity-70"><PhoneIcon /></span>
            <span>{l.phone}</span>
          </div>
          <div className={`flex items-start gap-3 text-[13px] ${active === i ? 'text-white/80' : 'text-black/60'}`}>
            <span className="flex-shrink-0 mt-[1px] opacity-70"><ClockIcon /></span>
            <span>{l.hours}</span>
          </div>

          <a
            href={l.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className={`mt-4 flex items-center justify-between rounded-xl py-2.5 px-4 text-[13px] font-semibold transition-opacity hover:opacity-80 ${
              active === i ? 'bg-white text-[#29abe2]' : 'bg-[#29abe2]/10 text-[#29abe2]'
            }`}
          >
            <span>Get Directions</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </a>
        </div>
      ))}
    </>
  )

  return (
    <section ref={ref} id="locations" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-8 sm:gap-10">

        {/* Heading */}
        <div className="locator-head text-center">
          <h2 className="font-bold text-black" style={{ fontSize: 'clamp(26px, 2.5vw, 40px)', letterSpacing: '-0.02em' }}>
            Find Our <span className="text-[#29abe2]">Clinic</span>
          </h2>
          <p className="text-black/50 mt-2" style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}>
            Visit us at one of our two convenient locations
          </p>
        </div>

        {/* ── MOBILE layout: cards above map ── */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex flex-col gap-3">
            <LocationCards />
          </div>
          {/* Map */}
          <div ref={mapRef} className="map-wrap rounded-2xl overflow-hidden shadow-xl" style={{ height: '340px' }}>
            <iframe
              key={active}
              src={loc.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={loc.name}
            />
          </div>
          {/* Directions button */}
          <a
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f6a32b] hover:bg-[#e8931a] transition-colors rounded-full shadow-lg px-6 py-3 flex items-center gap-3 w-fit mx-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
            </svg>
            <div className="text-white">
              <p className="font-bold text-[15px] leading-none">Directions</p>
              <p className="text-[11px] text-white/80">
                {dist ? `${dist} km from you` : 'Open in Google Maps'}
              </p>
            </div>
          </a>
        </div>

        {/* ── DESKTOP layout: overlay cards on map ── */}
        <div className="map-wrap hidden md:block relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '680px' }}>

          {/* Google Map */}
          <div ref={mapRef} className="absolute inset-0 overflow-hidden">
            <iframe
              key={active}
              src={loc.mapSrc}
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: '800px',
                width: '100%',
                height: 'calc(100% + 200px)',
                marginTop: '-100px',
                filter: 'grayscale(0.1) contrast(1.1)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={loc.name}
            />
          </div>

          {/* Cards overlaid on left */}
          <div className="absolute top-10 left-10 flex flex-col gap-4 z-10" style={{ width: '340px' }}>
            <LocationCards />
          </div>

          {/* Directions pill bottom-center */}
          <a
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#f6a32b] hover:bg-[#e8931a] transition-colors rounded-full shadow-lg px-6 py-3 flex items-center gap-3 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
            </svg>
            <div className="text-white">
              <p className="font-bold text-[15px] leading-none">Directions</p>
              <p className="text-[11px] text-white/80">
                {dist ? `${dist} km from you` : 'Open in Google Maps'}
              </p>
            </div>
          </a>
        </div>

      </div>
    </section>
  )
}
