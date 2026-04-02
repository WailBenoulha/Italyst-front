import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const SocialIcons = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
}

// ── Animated counter on scroll ─────────────────────────────────────────────
const FooterStat = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const target = parseInt(value)
        let cur = 0
        const step = Math.ceil(target / 60)
        const t = setInterval(() => {
          cur += step
          if (cur >= target) { setCount(target); clearInterval(t) }
          else setCount(cur)
        }, 18)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 group">
      <span className="font-serif text-3xl font-bold text-white leading-none">
        {count.toLocaleString()}<span className="text-[#D4AF37]">{suffix}</span>
      </span>
      <span className="text-[0.62rem] tracking-[0.14em] uppercase text-white/35 font-medium">{label}</span>
    </div>
  )
}

// ── Newsletter input ───────────────────────────────────────────────────────
const NewsletterInput = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-white/[0.05] border border-white/[0.10] text-white/80 placeholder-white/25 text-[0.78rem] rounded-lg px-4 py-2.5 outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.08] transition-all duration-200 min-w-0"
      />
      <button
        type="submit"
        className="relative overflow-hidden group flex-shrink-0 bg-[#D4AF37] text-[#081612] text-[0.72rem] font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all duration-300"
      >
        {sent ? (
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Sent!
          </span>
        ) : 'Subscribe'}
      </button>
    </form>
  )
}

// ── Footer link item ──────────────────────────────────────────────────────
const FooterLink = ({ label, href, onClick, external }) => (
  <li>
    {onClick ? (
      <button
        onClick={onClick}
        className="text-white/40 text-[0.78rem] font-light hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-1.5 group"
      >
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-colors duration-200 flex-shrink-0" />
        {label}
      </button>
    ) : (
      <a
        href={href || '#'}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-white/40 text-[0.78rem] font-light hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-1.5 group"
      >
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-colors duration-200 flex-shrink-0" />
        {label}
      </a>
    )}
  </li>
)

// ── Divider ───────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="flex items-center gap-3 w-full">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
    <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rotate-45 flex-shrink-0" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
  </div>
)

// ── Main Footer ───────────────────────────────────────────────────────────
const Footer = () => {
  const navigate = useNavigate()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else navigate('/')
  }

  const quickLinks = [
    { label: 'Home',           onClick: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) } },
    { label: 'Explore Map',    onClick: () => scrollTo('map') },
    { label: 'Universities',   onClick: () => scrollTo('table') },
    { label: 'Our Services',   onClick: () => scrollTo('services') },
    { label: 'About Italyst',  onClick: () => scrollTo('about') },
  ]

  const resources = [
    { label: 'Universitaly Portal',      href: 'https://www.universitaly.it', external: true },
    { label: 'MAECI Scholarships',        href: 'https://esteri.it', external: true },
    { label: 'Italian Embassy Locator',   href: 'https://esteri.it/en/italian-network/embassies-abroad/', external: true },
    { label: 'CILS Italian Certification',href: 'https://cils.unistrasi.it', external: true },
    { label: 'DSU Scholarship Guide',     href: '#', external: false },
    { label: 'Declaration of Value',      href: '#', external: false },
  ]

  const legal = [
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms of Service',  href: '#' },
    { label: 'Cookie Policy',     href: '#' },
    { label: 'Disclaimer',        href: '#' },
  ]

  const socials = [
    { key: 'instagram', href: '#',  label: 'Instagram' },
    { key: 'facebook',  href: '#',  label: 'Facebook'  },
    { key: 'whatsapp',  href: '#',  label: 'WhatsApp'  },
    { key: 'youtube',   href: '#',  label: 'YouTube'   },
    { key: 'linkedin',  href: '#',  label: 'LinkedIn'  },
  ]

  return (
    <footer className="relative bg-[#060f0d] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      {/* ── Background atmosphere ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_80%,rgba(15,106,91,0.12)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_20%,rgba(122,12,58,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.05) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <FooterStat value="500"  suffix="+" label="Students Guided"      />
            <FooterStat value="100"  suffix="+" label="Italian Universities"  />
            <FooterStat value="98"   suffix="%" label="Visa Success Rate"     />
            <FooterStat value="20"   suffix=""  label="Regions Covered"       />
          </div>
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-12">

          {/* ── Col 1: Brand (5 cols) ──────────────────────────────────────── */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            {/* Logo */}
            <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="w-fit focus:outline-none">
              <img
                src="./src/assets/Italyst-w.png"
                alt="Italyst"
                className="h-10 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </button>

            {/* Tagline */}
            <p className="text-white/40 text-[0.85rem] leading-[1.85] font-light max-w-sm">
              Italyst is your dedicated partner for studying in Italy — from choosing the right university
              to securing your student visa. We've helped{' '}
              <span className="text-white/65 font-normal">500+ students</span> across Africa and the Middle East
              start their Italian journey.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: '✉', text: 'contact@italyst.com', href: 'mailto:contact@italyst.com' },
                { icon: '📱', text: 'WhatsApp Channel', href: '#' },
                { icon: '📍', text: 'Milan, Italy & Online Worldwide', href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm w-5 text-center">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="text-white/40 text-[0.78rem] font-light hover:text-[#D4AF37] transition-colors duration-200">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white/40 text-[0.78rem] font-light">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(s => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/35 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 transition-all duration-250 hover:-translate-y-0.5"
                >
                  {SocialIcons[s.key]}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links (2 cols) ────────────────────────────────── */}
          <div className="xl:col-span-2 flex flex-col gap-5">
            <div>
              <p className="text-white/70 text-[0.7rem] font-semibold tracking-[0.18em] uppercase mb-1">Platform</p>
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full mb-4" />
            </div>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link, i) => (
                <FooterLink key={i} {...link} />
              ))}
            </ul>
          </div>

          {/* ── Col 3: Resources (3 cols) ──────────────────────────────────── */}
          <div className="xl:col-span-3 flex flex-col gap-5">
            <div>
              <p className="text-white/70 text-[0.7rem] font-semibold tracking-[0.18em] uppercase mb-1">Resources</p>
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full mb-4" />
            </div>
            <ul className="flex flex-col gap-3">
              {resources.map((link, i) => (
                <FooterLink key={i} {...link} />
              ))}
            </ul>
          </div>

          {/* ── Col 4: Newsletter (2 cols) ─────────────────────────────────── */}
          <div className="xl:col-span-2 flex flex-col gap-5">
            <div>
              <p className="text-white/70 text-[0.7rem] font-semibold tracking-[0.18em] uppercase mb-1">Newsletter</p>
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full mb-4" />
            </div>
            <p className="text-white/35 text-[0.75rem] leading-[1.75] font-light">
              Get deadline alerts, scholarship tips, and university updates straight to your inbox.
            </p>
            <NewsletterInput />

            {/* Trust badge */}
            <div className="mt-2 bg-[#0F6A5B]/10 border border-[#0F6A5B]/20 rounded-xl px-4 py-3">
              <p className="text-[#5ecfbe] text-[0.65rem] font-semibold tracking-wide uppercase mb-1">Free Consultation</p>
              <p className="text-white/40 text-[0.7rem] font-light leading-snug">
                Book a free 30-min session with an Italyst advisor.
              </p>
              <button className="mt-2 text-[#D4AF37] text-[0.68rem] font-semibold tracking-wide underline underline-offset-2 decoration-[#D4AF37]/40 hover:decoration-[#D4AF37] transition-all duration-200">
                Book Now →
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="mt-14 mb-8">
          <Divider />
        </div>

        {/* ── Featured regions strip ─────────────────────────────────────── */}
        <div className="mb-8">
          <p className="text-white/20 text-[0.6rem] tracking-[0.18em] uppercase font-medium mb-4 text-center">
            Guiding Students to All 20 Italian Regions
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              'Lombardia', 'Lazio', 'Toscana', 'Emilia-Romagna', 'Veneto',
              'Campania', 'Puglia', 'Piemonte', 'Sicilia', 'Abruzzo',
              'Calabria', 'Marche', 'Umbria', 'Liguria', 'Friuli-Venezia Giulia',
              'Trentino', 'Basilicata', 'Molise', 'Sardegna', "Valle d'Aosta",
            ].map(r => (
              <button
                key={r}
                onClick={() => scrollTo('map')}
                className="text-white/20 text-[0.65rem] hover:text-[#D4AF37]/70 transition-colors duration-200"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <Divider />
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Copyright */}
          <div className="flex items-center gap-3">
            <p className="text-white/25 text-[0.7rem] font-light">
              © {new Date().getFullYear()} Italyst. All rights reserved.
            </p>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <p className="text-white/20 text-[0.7rem] font-light">
              Made with{' '}
              <span className="text-[#D4AF37]/60">♥</span>
              {' '}for students worldwide.
            </p>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            {legal.map((link, i) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  className="text-white/25 text-[0.68rem] hover:text-white/55 transition-colors duration-200"
                >
                  {link.label}
                </a>
                {i < legal.length - 1 && (
                  <span className="w-px h-3 bg-white/[0.08]" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-white/30 text-[0.68rem] font-medium tracking-wide hover:text-[#D4AF37] transition-colors duration-200 group"
          >
            Back to top
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/8 group-hover:-translate-y-0.5 transition-all duration-200">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 10V2M2 6l4-4 4 4"/>
              </svg>
            </span>
          </button>
        </div>

        {/* ── Watermark ──────────────────────────────────────────────────── */}
        <div className="mt-10 text-center pointer-events-none select-none overflow-hidden">
          <p
            className="font-serif font-bold text-white/[0.025] leading-none tracking-tighter"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontFamily: 'Cormorant Garamond, serif' }}
          >
            ITALYST
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer