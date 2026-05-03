import { createContext, useContext, useState } from 'react'
import {
  HERO_CONTENT, SERVICES, TEAM, REVIEWS, CONTACT_INFO,
  GALLERY_DATA, TESTIMONIALS, LOCATIONS, FAQ_CATS, FAQ_ITEMS,
  HOW_WE_WORK_STEPS,
} from '../data/siteContent'

const SiteContext = createContext(null)

const LS_KEY = 'suryam_site_data_v1'

const DEFAULTS = {
  hero:          HERO_CONTENT,
  services:      SERVICES,
  team:          TEAM,
  reviews:       REVIEWS,
  contact:       CONTACT_INFO,
  gallery:       GALLERY_DATA,
  testimonials:  TESTIMONIALS,
  locations:     LOCATIONS,
  faqCats:       FAQ_CATS,
  faqItems:      FAQ_ITEMS,
  howWeWork:     HOW_WE_WORK_STEPS,
}

function loadStored() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw)
    // Merge with defaults so new keys from code updates are picked up
    return { ...DEFAULTS, ...stored }
  } catch {
    return null
  }
}

function persist(data) {
  try {
    // Strip image objects (keep only serialisable fields)
    const safe = {
      ...data,
      hero:          { ...data.hero, image: '__heroChild__' },
      gallery:       '__skip__',
    }
    localStorage.setItem(LS_KEY, JSON.stringify(safe))
  } catch {}
}

export function SiteProvider({ children }) {
  const [state, setState] = useState(() => loadStored() || DEFAULTS)

  const update = (key, value) => {
    setState(prev => {
      const next = { ...prev, [key]: value }
      persist(next)
      return next
    })
  }

  return (
    <SiteContext.Provider value={{ ...state, update }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSiteData must be inside SiteProvider')
  return ctx
}
