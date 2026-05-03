import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteData } from '../context/SiteContext'
import api from '../api'

gsap.registerPlugin(ScrollTrigger)

/**
 * Try to extract lat,lng from a Google Maps URL.
 * Supports patterns like:
 *   - https://www.google.com/maps?q=28.623857,77.364627
 *   - https://www.google.com/maps/@28.623857,77.364627,15z
 *   - https://www.google.com/maps/place/.../@28.623857,77.364627,...
 *   - https://maps.google.com/maps?q=28.623857,77.364627
 * Returns { lat, lng } or null.
 */
function extractCoordsFromUrl(url) {
  if (!url) return null
  try {
    // Pattern 1: ?q=lat,lng (direct coordinate URLs)
    const qMatch = url.match(/[?&]q=([-\d.]+),([-\d.]+)/)
    if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }

    // Pattern 2: !3d<lat>!4d<lng> (Google Maps place data — most precise for place URLs)
    const dataMatch = url.match(/!3d([-\d.]+)!4d([-\d.]+)/)
    if (dataMatch) return { lat: parseFloat(dataMatch[1]), lng: parseFloat(dataMatch[2]) }

    // Pattern 3: /@lat,lng (viewport center — less precise fallback)
    const atMatch = url.match(/@([-\d.]+),([-\d.]+)/)
    if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) }

    // Pattern 4: destination=lat,lng
    const destMatch = url.match(/destination=([-\d.]+),([-\d.]+)/)
    if (destMatch) return { lat: parseFloat(destMatch[1]), lng: parseFloat(destMatch[2]) }
  } catch {
    return null
  }
  return null
}

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
  const { contact } = useSiteData()
  const [active, setActive] = useState(0)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [distances, setDistances] = useState([null, null])
  const ref = useRef(null)
  const mapRef = useRef(null)

  const DEFAULT_BRANCHES = [
    {
      id: 1,
      name: 'Suryam Clinic — Sector 62',
      address: 'B-121, Sector 62, Noida, Uttar Pradesh, 201309',
      phone: '+91 98765 43210',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      mapsLink: 'https://www.google.com/maps?q=28.623857,77.364627',
    },
    {
      id: 2,
      name: 'Suryam Clinic — Indirapuram',
      address: 'C-45, Indirapuram, Ghaziabad, Uttar Pradesh, 201014',
      phone: '+91 98765 43211',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      mapsLink: 'https://www.google.com/maps?q=28.641234,77.357149',
    },
  ]

  const [resolvedUrls, setResolvedUrls] = useState({})

  // Resolve short Google Maps URLs (maps.app.goo.gl) via server
  useEffect(() => {
    const resolveShortUrls = async () => {
      for (let idx = 0; idx < 2; idx++) {
        const dbLoc = contact?.locations?.[idx] || {}
        const base = DEFAULT_BRANCHES[idx]
        const mapsLink = dbLoc.mapsLink || base.mapsLink
        
        // If we can't extract coords and it looks like a short URL, resolve it
        if (mapsLink && !extractCoordsFromUrl(mapsLink) && !resolvedUrls[mapsLink]) {
          try {
            const { data } = await api.post('/resolve-maps-url', { url: mapsLink })
            if (data.resolvedUrl) {
              setResolvedUrls(prev => ({ ...prev, [mapsLink]: data.resolvedUrl }))
            }
          } catch (err) {
            console.error('Failed to resolve maps URL:', err)
          }
        }
      }
    }
    resolveShortUrls()
  }, [contact])

  const currentLocations = [0, 1].map((idx) => {
    const dbLoc = contact?.locations?.[idx] || {}
    const base = DEFAULT_BRANCHES[idx]
    
    // Merge DB values with hardcoded defaults for each branch individually
    const merged = {
      id: base.id,
      name: dbLoc.name || base.name,
      address: dbLoc.address || base.address,
      phone: dbLoc.phone || base.phone,
      hours: dbLoc.hours || base.hours,
      mapsLink: dbLoc.mapsLink || base.mapsLink,
    }

    // Try to extract coordinates: first from the original URL, then from the resolved URL
    const urlToCheck = resolvedUrls[merged.mapsLink] || merged.mapsLink
    const coords = extractCoordsFromUrl(urlToCheck)

    return {
      ...merged,
      lat: coords?.lat || null,
      lng: coords?.lng || null,
      // For the embedded map: if we can extract coords, use them; otherwise embed the address
      mapSrc: coords
        ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`
        : `https://maps.google.com/maps?q=${encodeURIComponent(merged.address)}&z=15&output=embed`,
      // For directions: use the mapsLink directly (opens the Google Maps page the user shared)
      mapsUrl: merged.mapsLink,
    }
  })

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setDistances(
          currentLocations.map(l => 
            l.lat && l.lng
              ? calcDistance(coords.latitude, coords.longitude, l.lat, l.lng)
              : null
          )
        )
      },
      () => {} // silently fail
    )
  }, [contact])

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
    gsap.to(mapRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActive(idx)
        gsap.to(mapRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      },
    })
  }

  const loc = currentLocations[active]
  const dist = distances[active]

  return (
    <section ref={ref} id="locations" className="py-16 px-6">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-10">

        {/* Heading */}
        <div className="locator-head text-center">
          <h2 className="font-bold text-black" style={{ fontSize: 'clamp(26px, 2.5vw, 40px)', letterSpacing: '-0.02em' }}>
            Find Our <span className="text-[#29abe2]">Clinic</span>
          </h2>
          <p className="text-black/50 mt-2" style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}>
            Visit us at one of our two convenient locations
          </p>
        </div>

        {/* Map full-width with cards overlaid on the left */}
        <div className="map-wrap relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '700px' }}>

          {/* Google Map container with cropping to hide Google UI */}
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
                marginTop: '-100px', // Hides the top search card
                filter: 'grayscale(0.1) contrast(1.1)', // Subtle premium touch
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={loc.name}
            />
          </div>

          <div className="absolute top-10 left-10 flex flex-col gap-4 z-10" style={{ width: '340px' }}>
            {currentLocations.map((l, i) => (
              <div
                key={l.id}
                className={`loc-card rounded-2xl p-7 border-2 transition-all duration-300 cursor-pointer ${
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

                {/* Get Directions — opens Google Maps */}
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

            {/* Quick call strip
            <div className="bg-[#f0c85d]/30 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f0c85d] rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-[12px] text-black/50 font-medium">Call us anytime</p>
                <p className="text-[14px] font-bold text-black">+91 98765 43210</p>
              </div>
            </div> */}
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
