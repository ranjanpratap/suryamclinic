import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BLOGS } from '../data/blogs'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_COLORS = {
  Newsletter:        { bg: 'bg-[#29abe2]/15', text: 'text-[#29abe2]' },
  Tips:              { bg: 'bg-[#77bc52]/15', text: 'text-[#77bc52]' },
  Insight:           { bg: 'bg-[#f0c85d]/20', text: 'text-[#f6a32b]' },
  'Success Stories': { bg: 'bg-[#cdb8fe]/20', text: 'text-[#7c5cbf]' },
}

// ─── Reading progress bar ────────────────────────────────────────────────────
function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-black/5">
      <div className="h-full bg-[#29abe2]" style={{ width: `${pct}%`, transition: 'none' }} />
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function BlogArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const wrapRef = useRef(null)
  const heroRef = useRef(null)

  const blog = BLOGS.find(b => b.id === id)
  const related = BLOGS.filter(b => b.id !== id).slice(0, 3)

  useEffect(() => {
    if (!blog) return
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to('.hero-img-inner', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Hero text fade in
      gsap.from('.hero-badge', { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 })
      gsap.from('.hero-title', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.from('.hero-meta', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })

      // Article body reveal
      gsap.from('.body-content', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'center 85%', once: true },
      })

      // Related cards
      gsap.from('.related-card', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.related-section', start: 'top 85%', once: true },
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [blog])

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-28 bg-[#f9f1da]">
        <p className="text-2xl font-bold text-black/30">Article not found</p>
        <Link to="/blog" className="text-[#29abe2] font-medium underline text-[15px]">← Back to Blog</Link>
      </div>
    )
  }

  const col = CATEGORY_COLORS[blog.category] || { bg: 'bg-black/5', text: 'text-black/60' }

  return (
    <>
      <ReadingProgress />
      <div ref={wrapRef} className="min-h-screen bg-[#f9f1da]">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative pt-[72px] overflow-hidden" style={{ height: 'clamp(440px, 60vh, 680px)' }}>
          {/* Parallax image */}
          <div className="hero-img-inner absolute inset-0 scale-110">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Back button */}
          <button
            onClick={() => navigate('/blog')}
            className="absolute top-[88px] left-6 md:left-12 z-10 flex items-center gap-2 text-white/80 hover:text-white text-[14px] font-medium transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/70 group-hover:bg-white/10 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </span>
            <span className="hidden sm:inline">Back to Blog</span>
          </button>

          {/* Hero content — pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-[900px]">
            <span className={`hero-badge inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${col.bg} ${col.text} backdrop-blur-sm`}>
              {blog.category}
            </span>
            <h1
              className="hero-title font-bold text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(24px, 4vw, 52px)', letterSpacing: '-0.025em' }}
            >
              {blog.title}
            </h1>
            <div className="hero-meta flex items-center gap-4 flex-wrap">
              <div className="w-9 h-9 rounded-full bg-[#29abe2] flex items-center justify-center text-white font-bold text-[14px] ring-2 ring-white/30">
                {blog.author[0]}
              </div>
              <div>
                <p className="font-semibold text-white text-[13px] leading-tight">{blog.author}</p>
                <p className="text-white/60 text-[12px]">{blog.authorRole}</p>
              </div>
              <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block" />
              <p className="text-white/60 text-[13px]">{blog.date}</p>
              <div className="flex items-center gap-1.5 text-white/60 text-[13px]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {blog.readTime}
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLE LAYOUT ── */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 flex gap-12 items-start">

          {/* Main content */}
          <article className="body-content flex-1 min-w-0">

            {/* Lead paragraph */}
            <p className="text-black/80 text-[18px] md:text-[20px] leading-relaxed font-medium mb-8 pb-8 border-b border-black/10"
              style={{ letterSpacing: '-0.01em' }}>
              {blog.excerpt}
            </p>

            {/* Article body - simple text rendering */}
            <div className="prose-custom space-y-4">
              {blog.body.trim().split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-bold text-black mt-10 mb-4 leading-tight pt-4"
                      style={{ fontSize: 'clamp(20px, 2vw, 28px)', letterSpacing: '-0.02em' }}>
                      {line.replace('## ', '')}
                    </h2>
                  )
                }
                if (line.startsWith('---')) {
                  return <hr key={i} className="border-black/10 my-8" />
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex gap-3 items-start mb-2">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#29abe2] flex-shrink-0 mt-[9px]" />
                      <p className="text-black/70 leading-relaxed text-[16px]">{line.replace('- ', '')}</p>
                    </div>
                  )
                }
                if (line === '') {
                  return <div key={i} className="h-2" />
                }
                return (
                  <p key={i} className="text-black/70 leading-relaxed text-[17px]">
                    {line}
                  </p>
                )
              })}
            </div>

            {/* Tags row */}
            <div className="mt-10 pt-8 border-t border-black/10 flex items-center flex-wrap gap-3">
              <span className="text-black/40 text-[13px] font-medium">Tags:</span>
              {['Child Development', blog.category, 'Therapy', 'Parenting'].map(tag => (
                <span key={tag} className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-black/5 text-black/60 hover:bg-[#29abe2]/10 hover:text-[#29abe2] transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            {/* Share row */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <span className="text-black/40 text-[13px] font-medium">Share this article:</span>
              {['Facebook', 'Twitter', 'WhatsApp'].map(s => (
                <button
                  key={s}
                  className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-full border border-black/10 text-black/60 hover:border-[#29abe2]/40 hover:text-[#29abe2] transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-6 w-[300px] flex-shrink-0 sticky top-28">

            {/* Author card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-4">About the Author</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#29abe2]/20 flex items-center justify-center text-[#29abe2] font-bold text-[18px] flex-shrink-0">
                  {blog.author[0]}
                </div>
                <div>
                  <p className="font-bold text-black text-[15px] leading-tight">{blog.author}</p>
                  <p className="text-black/50 text-[13px]">{blog.authorRole}</p>
                </div>
              </div>
              <p className="text-black/55 text-[13px] leading-relaxed">
                A specialist at Suryam Child Development Clinic dedicated to helping children reach their full potential.
              </p>
            </div>

            {/* Article info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-4">Article Info</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-black/40 text-[13px]">Category</span>
                  <span className="text-black font-semibold text-[13px]">{blog.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black/40 text-[13px]">Published</span>
                  <span className="text-black font-semibold text-[13px]">{blog.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black/40 text-[13px]">Read Time</span>
                  <span className="text-black font-semibold text-[13px]">{blog.readTime}</span>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="relative overflow-hidden bg-[#29abe2] rounded-2xl p-6 text-white">
              <div
                className="absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none"
                style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '1024px 1024px', backgroundPosition: 'top left' }}
              />
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-3">Free Consultation</p>
                <h4 className="font-bold text-[18px] leading-snug mb-3">Ready to support your child's growth?</h4>
                <p className="text-white/80 text-[13px] leading-relaxed mb-5">
                  Book a free assessment with one of our specialists today.
                </p>
                <Link
                  to="/#contact"
                  className="block text-center bg-white text-[#29abe2] font-bold text-[14px] py-3 rounded-xl hover:scale-[1.02] transition-transform"
                >
                  Book Assessment →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Mobile CTA ── */}
        <div className="lg:hidden max-w-[700px] mx-auto px-6 pb-10">
          <div className="relative overflow-hidden bg-[#29abe2] rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-5 justify-between">
            <div
              className="absolute inset-0 mix-blend-color-burn opacity-75 pointer-events-none"
              style={{ backgroundImage: `url(${A.texture})`, backgroundSize: '1024px 1024px', backgroundPosition: 'top left' }}
            />
            <div className="relative z-10">
              <h3 className="font-bold text-white text-[20px] leading-tight">Ready to take the next step?</h3>
              <p className="text-white/80 text-[14px] mt-1">Book a free consultation with our specialists today.</p>
            </div>
            <Link
              to="/#contact"
              className="relative z-10 bg-white text-[#29abe2] font-bold px-6 py-3 rounded-full text-[14px] hover:scale-105 transition-transform whitespace-nowrap flex-shrink-0"
            >
              Book Assessment
            </Link>
          </div>
        </div>

        {/* ── Related Articles ── */}
        <section className="related-section bg-white/50 border-t border-black/5 py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#29abe2] mb-2">Keep Reading</p>
                <h2 className="font-bold text-black" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.02em' }}>
                  More Articles
                </h2>
              </div>
              <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[#29abe2] font-semibold text-[14px] hover:gap-3 transition-all duration-200">
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(b => {
                const rc = CATEGORY_COLORS[b.category] || { bg: 'bg-black/5', text: 'text-black/60' }
                return (
                  <Link
                    key={b.id}
                    to={`/blog/${b.id}`}
                    className="related-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="overflow-hidden relative" style={{ height: '200px' }}>
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className={`absolute top-4 left-4 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${rc.bg} ${rc.text}`}>
                        {b.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <p className="text-black/35 text-[12px] font-medium">{b.date} · {b.readTime}</p>
                      <h4 className="font-bold text-black text-[15px] leading-snug group-hover:text-[#29abe2] transition-colors duration-200 line-clamp-2">
                        {b.title}
                      </h4>
                      <p className="text-black/50 text-[13px] leading-relaxed line-clamp-2 flex-1">{b.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-[#29abe2] text-[13px] font-semibold mt-2 group-hover:gap-2.5 transition-all duration-200">
                        Read Article
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
