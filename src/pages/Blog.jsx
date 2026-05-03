import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteData } from '../context/SiteContext'
import A from '../assets/images'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Newsletter', 'Tips', 'Insight', 'Success Stories']

const CATEGORY_COLORS = {
  Newsletter:        { bg: 'bg-[#29abe2]/15', text: 'text-[#29abe2]', accent: '#29abe2' },
  Tips:              { bg: 'bg-[#77bc52]/15', text: 'text-[#77bc52]', accent: '#77bc52' },
  Insight:           { bg: 'bg-[#f0c85d]/20', text: 'text-[#f6a32b]', accent: '#f6a32b' },
  'Success Stories': { bg: 'bg-[#cdb8fe]/20', text: 'text-[#7c5cbf]', accent: '#7c5cbf' },
}

export default function Blog() {
  const { blogs, loading } = useSiteData()
  const [activeCategory, setActiveCategory] = useState('All')
  const heroRef = useRef(null)
  const gridRef = useRef(null)

  const filtered = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory)

  // Hero entrance
  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.from('.blog-eyebrow', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 })
      gsap.from('.blog-title', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.from('.blog-subtitle', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.35 })
      gsap.from('.blog-filters', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [loading])

  // Animate grid on filter change
  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.blog-card')
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power3.out' }
        )
      }
    }, heroRef)
    return () => ctx.revert()
  }, [activeCategory, filtered.length, loading])

  return (
    <div className="min-h-screen bg-[#f9f1da]" ref={heroRef}>

      {/* ── Page Hero ── */}
      <div className="pt-28 pb-12 px-6 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-3 mb-10">
          <p className="blog-eyebrow text-[11px] font-bold uppercase tracking-[0.2em] text-[#29abe2]">
            Suryam Clinic · Resources
          </p>
          <h1
            className="blog-title font-bold text-black leading-none"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '-0.03em' }}
          >
            Blog &amp; Insights
          </h1>
          <p className="blog-subtitle text-black/50 max-w-[520px] leading-relaxed" style={{ fontSize: 'clamp(14px, 1.3vw, 17px)' }}>
            Therapy insights, parenting tips, and stories of children reaching their full potential.
          </p>
        </div>

        {/* ── Category Filters ── */}
        <div className="blog-filters flex items-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#29abe2] border-[#29abe2] text-white shadow-lg shadow-[#29abe2]/20'
                    : 'bg-white border-black/10 text-black/60 hover:border-[#29abe2]/50 hover:text-[#29abe2]'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className={`ml-1.5 text-[11px] ${isActive ? 'text-white/70' : 'text-black/30'}`}>
                    {blogs.filter(b => b.category === cat).length}
                  </span>
                )}
              </button>
            )
          })}
          <span className="ml-auto text-black/30 text-[13px] hidden sm:block">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Article Grid ── */}
        {filtered.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 pb-32">
            {filtered.map(blog => {
              const col = CATEGORY_COLORS[blog.category] || { bg: 'bg-black/5', text: 'text-black/60' }
              return (
                <Link
                  key={blog.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  to={`/blog/${blog.id}`}
                  className="blog-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Cover */}
                  <div className="relative overflow-hidden" style={{ height: '220px' }}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`absolute top-4 left-4 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm ${col.bg} ${col.text}`}>
                      {blog.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-2.5 p-6 flex-1">
                    <p className="text-black/35 text-[12px] font-medium">{blog.date} · {blog.readTime}</p>
                    <h3
                      className="font-bold text-black leading-snug group-hover:text-[#29abe2] transition-colors duration-200 line-clamp-2"
                      style={{ fontSize: 'clamp(15px, 1.2vw, 19px)', letterSpacing: '-0.01em' }}
                    >
                      {blog.title}
                    </h3>
                    <p className="text-black/50 text-[13px] leading-relaxed line-clamp-3 flex-1">
                      {blog.excerpt || (blog.content ? blog.content.substring(0, 120) + '...' : '')}
                    </p>
                    {/* Author + Read more */}
                    <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-black/5">
                      <div className="w-7 h-7 rounded-full bg-[#29abe2]/20 flex items-center justify-center text-[#29abe2] font-bold text-[12px] flex-shrink-0">
                        {blog.author?.[0] || '?'}
                      </div>
                      <p className="text-black/50 text-[12px] font-medium flex-1 truncate">{blog.author || 'Anonymous'}</p>
                      <div className="flex items-center gap-1 text-[#29abe2] text-[13px] font-bold group-hover:gap-2 transition-all duration-200 flex-shrink-0">
                        Read
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="pb-32 text-center py-12">
            <p className="text-black/30 text-[17px] font-medium">No articles in this category yet.</p>
            <button onClick={() => setActiveCategory('All')} className="mt-4 text-[#29abe2] font-semibold text-[14px] hover:underline">
              View all articles →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
