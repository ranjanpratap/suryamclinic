import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Admission from './pages/Admission'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/dashboard/Login'
import Preloader from './components/ui/Preloader'
import FloatingCTA from './components/ui/FloatingCTA'
import LeadPopup from './components/layout/LeadPopup'
import { useSiteData } from './context/SiteContext'

export default function App() {
  const { pathname } = useLocation();
  const { leadSettings } = useSiteData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className={`font-poppins overflow-x-hidden ${!isDashboard ? 'bg-[#f9f1da]' : 'bg-white'}`}>
      {!isDashboard && <Preloader />}
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/login" element={<Login />} />
      </Routes>
      {!isDashboard && <FloatingCTA />}
      {!isDashboard && leadSettings?.enabled && (
        <LeadPopup timer={leadSettings.timer} />
      )}
      {!isDashboard && <Footer showNewsletter={pathname.startsWith('/blog')} />}
    </div>
  )
}
