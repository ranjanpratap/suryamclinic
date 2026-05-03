import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import A from '../../assets/images'
import { Logo } from '../ui/Icons'
import { ButtonPrimary } from '../ui/Button'
import { useSiteData } from '../../context/SiteContext'

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/#services' },
  { name: 'Gallery', path: '/#gallery' },
  { name: 'School Admission', path: '/admission' },
  { name: 'Blog', path: '/blog' }
]

function scrollToSection(path, location, setMenuOpen) {
  if (path.includes('#') && location.pathname === '/') {
    const id = path.split('#')[1]
    const el = document.getElementById(id)
    if (el) {
      setMenuOpen(false)
      const offset = 100
      const pos = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: pos, behavior: 'smooth' })
      return true
    }
  }
  return false
}

export default function Navbar() {
  const { contact, openLeadPopup } = useSiteData()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(menuRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      gsap.from('.mobile-link', { x: 30, opacity: 0, stagger: 0.1, duration: 0.4, delay: 0.2 })
    } else {
      document.body.style.overflow = 'auto'
      gsap.to(menuRef.current, { x: '100%', opacity: 0, duration: 0.4, ease: 'power3.in' })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed -top-4 left-0 right-0 z-[60] flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-[#f4faec]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}><Logo /></Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12 xl:gap-16 text-[17px] font-poppins font-normal text-black">
          {NAV_LINKS.map(item => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => {
                if (scrollToSection(item.path, location, setMenuOpen)) {
                  e.preventDefault()
                }
              }}
              className="hover:text-[#29abe2] transition-colors duration-200 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ButtonPrimary 
            onClick={openLeadPopup}
            icon={A.callWhite} 
            className="shadow-md font-normal hidden sm:flex cursor-pointer"
          >
            Book Call
          </ButtonPrimary>

          {/* Hamburger Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[70] focus:outline-none"
          >
            <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#f4faec] z-[55] flex flex-col pt-32 px-10 gap-8 transform translate-x-full opacity-0 lg:hidden"
      >
         <div className="flex flex-col gap-6">
            {NAV_LINKS.map(item => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => {
                  if (scrollToSection(item.path, location, setMenuOpen)) {
                    e.preventDefault()
                  } else {
                    setMenuOpen(false)
                  }
                }}
                className="mobile-link text-[32px] font-black text-black hover:text-[#29abe2] transition-colors"
              >
                {item.name}
              </Link>
            ))}
         </div>
         
         <div className="mt-auto pb-16 flex flex-col gap-4">
            <p className="text-black/40 font-bold uppercase tracking-widest text-[12px]">get in touch</p>
            <p className="text-[20px] font-bold text-black">{contact?.phone}</p>
            <div className="flex gap-4">
               {/* Social placeholders or other items */}
            </div>
         </div>
      </div>
    </>
  )
}
