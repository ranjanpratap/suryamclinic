import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Admission from './pages/Admission'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import Dashboard from './pages/Dashboard'
import Preloader from './components/ui/Preloader'
import FloatingCTA from './components/ui/FloatingCTA'
import { SiteProvider } from './context/SiteContext'

function AppInner() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`${isDashboard ? 'bg-[#f5f7fa]' : 'bg-[#f9f1da]'} font-poppins overflow-x-hidden min-h-screen`}>
      {!isDashboard && <Preloader />}
      {!isDashboard && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>

      {!isDashboard && <FloatingCTA />}
      {!isDashboard && <Footer showNewsletter={pathname.startsWith('/blog')} />}
    </div>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <AppInner />
    </SiteProvider>
  )
}
