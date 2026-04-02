import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import myImage from "../assets/Italyst-w.png"

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Nav items: label, path or anchor, type
  const navItems = [
    { label: 'Home',       href: '/',         type: 'route'  },
    { label: 'Map',        href: '/#map',      type: 'anchor' },
    { label: 'Universities', href: '/#table',  type: 'anchor' },
    { label: 'Services',   href: '/#services', type: 'anchor' },
    { label: 'About',      href: '/#about',    type: 'anchor' },
  ]

  const handleNav = (item) => {
    setMobileOpen(false)
    if (item.type === 'route') {
      navigate(item.href)
    } else {
      const sectionId = item.href.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isActive = (item) => {
    if (item.href === '/' && location.pathname === '/' && !location.hash) return true
    if (item.href.includes('#') && location.hash === '#' + item.href.split('#')[1]) return true
    return false
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#081612]/92 backdrop-blur-xl border-b border-[#D4AF37]/20 py-2.5'
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex-shrink-0 focus:outline-none">
          <img
            src={myImage}
            alt="Italyst"
            className="h-10 transition-all duration-300 hover:scale-105 hover:brightness-110"
          />
        </button>

        {/* Desktop Nav links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item, i) => (
            <React.Fragment key={item.label}>
              <li>
                <button
                  onClick={() => handleNav(item)}
                  className={`relative group px-3.5 py-2 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 focus:outline-none rounded-md ${
                    isActive(item)
                      ? 'text-[#D4AF37]'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-gradient-to-r from-[#D4AF37] to-[#0F6A5B] rounded-full transition-all duration-300 ${
                    isActive(item) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`} style={{ transformOrigin: 'left' }} />
                </button>
              </li>
              {i < navItems.length - 1 && (
                <span className="w-0.5 h-0.5 rounded-full bg-[#D4AF37]/30 inline-block mx-0.5" />
              )}
            </React.Fragment>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/signin')}
            className="relative overflow-hidden group text-[0.72rem] font-semibold tracking-widest uppercase px-5 py-2.5 rounded-md border border-white/15 text-white/60 transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8">
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="relative overflow-hidden group bg-[#0F6A5B] text-white text-[0.72rem] font-semibold tracking-widest uppercase px-6 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(15,106,91,0.45)]">
            <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Register</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
        >
          <span className={`block w-5 h-0.5 bg-white/70 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white/70 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white/70 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#081612]/98 backdrop-blur-xl border-t border-[#D4AF37]/10 px-8 py-4 flex flex-col gap-1">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="text-left px-3 py-2.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-white/65 hover:text-[#D4AF37] transition-colors duration-200 border-b border-white/[0.04] last:border-0"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-3 pt-3">
            <button onClick={() => { setMobileOpen(false); navigate('/signin') }} className="flex-1 text-[0.72rem] font-semibold tracking-widest uppercase py-2.5 rounded-md border border-white/15 text-white/60 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-200">Login</button>
            <button onClick={() => { setMobileOpen(false); navigate('/register') }} className="flex-1 relative overflow-hidden group bg-[#0F6A5B] text-white text-[0.72rem] font-semibold tracking-widest uppercase py-2.5 rounded-md">
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Register</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar