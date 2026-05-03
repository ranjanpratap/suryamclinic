import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteData } from '../context/SiteContext'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

import api from '../api'

export default function Contact() {
  const { contact } = useSiteData()
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.contact-card', { autoAlpha: 1 })
      gsap.from('.contact-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/submissions', { ...form, type: 'contact_form' });
      setSubmitted(true)
      gsap.from('.success-msg', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' })
    } catch (err) {
      console.error('SUBMISSION ERROR:', err);
      alert('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} id="contact" className="py-16 px-6">
      <div className="contact-card relative overflow-hidden rounded-[30px] max-w-[1340px] mx-auto flex flex-col lg:flex-row min-h-[500px]">
        {/* Lime green bg */}
        <div className="absolute inset-0 bg-[#ccff5c] rounded-[30px]" />
        {/* Texture */}
        <div
          className="absolute inset-0 mix-blend-color-burn pointer-events-none rounded-[30px]"
          style={{ backgroundImage: `url(${A.contactTexture})`, backgroundSize: '2048px 2048px', backgroundPosition: 'top left' }}
        />

        {/* Left — doctor photo */}
        <div className="relative flex-shrink-0 w-full lg:w-[38%] min-h-[320px] lg:min-h-full overflow-hidden rounded-[30px] lg:rounded-r-none">
          <img
            src={A.contactPhoto}
            alt="Doctor with child"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Right — form */}
        <div className="relative z-10 flex flex-col gap-10 px-10 lg:px-16 py-12 flex-1">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-black" style={{ fontSize: 'clamp(24px, 2.2vw, 32px)' }}>
              Contact us
            </h2>
            <p className="font-medium text-black/70" style={{ fontSize: 'clamp(14px, 1.3vw, 18px)' }}>
              Reach out and we'll get in touch within 24 hours
            </p>
          </div>

          {submitted ? (
            <div className="success-msg flex flex-col items-center justify-center gap-4 py-16">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#ccff5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-black text-xl">Message sent!</p>
              <p className="text-black/60 text-center">We'll get back to you within 24 hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', mobile: '', message: '' }) }}
                className="mt-2 underline text-black/50 text-sm">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="font-normal text-black text-[17px]">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-white rounded-[9px] h-11 px-3 text-[16px] outline-none focus:ring-2 focus:ring-black/20 transition-shadow w-full"
                />
              </div>

              {/* Email + Mobile */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-normal text-black text-[17px]">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="bg-white rounded-[9px] h-11 px-3 text-[16px] outline-none focus:ring-2 focus:ring-black/20 transition-shadow w-full"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-normal text-black text-[17px]">Mobile number</label>
                  <div className="flex bg-white rounded-[9px] h-11 overflow-hidden focus-within:ring-2 focus-within:ring-black/20 transition-shadow">
                    <span className="flex items-center px-3 text-[16px] text-black border-r border-black/10 flex-shrink-0">+91</span>
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={e => setForm({ ...form, mobile: e.target.value })}
                      className="flex-1 px-3 text-[16px] outline-none bg-transparent"
                      placeholder="00000 00000"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="font-normal text-black text-[17px]">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Leave us your message ....."
                  className="bg-white rounded-[9px] px-3 py-2.5 text-[16px] text-black/40 outline-none focus:ring-2 focus:ring-black/20 transition-shadow resize-none w-full placeholder:text-black/40 focus:text-black"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white rounded-full h-[59px] w-full text-[17px] hover:bg-black/80 transition-colors duration-200 mt-1 flex items-center justify-center disabled:bg-black/50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/api/v2/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Get consultation'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
