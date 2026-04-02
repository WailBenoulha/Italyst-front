import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ── Tiny floating orb ─────────────────────────────────────────────────────────
const Orb = ({ style }) => (
  <div className="absolute rounded-full pointer-events-none" style={style} />
)

// ── Input field ───────────────────────────────────────────────────────────────
const Field = ({ label, type = 'text', value, onChange, placeholder, error, icon, rightSlot }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-white/50">{label}</label>
      <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
        error
          ? 'border-[#e879a0]/50 bg-[#7A0C3A]/8'
          : focused
          ? 'border-[#D4AF37]/50 bg-white/[0.06]'
          : 'border-white/[0.09] bg-white/[0.04]'
      }`}>
        {icon && (
          <span className={`absolute left-4 transition-colors duration-300 ${focused ? 'text-[#D4AF37]' : 'text-white/25'}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-white/85 placeholder-white/20 text-[0.85rem] font-light py-3.5 pr-4 outline-none"
          style={{ paddingLeft: icon ? '2.75rem' : '1rem' }}
        />
        {rightSlot && <span className="absolute right-4">{rightSlot}</span>}
      </div>
      {error && <p className="text-[#e879a0] text-[0.68rem] font-light flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

// ── Social button ─────────────────────────────────────────────────────────────
const SocialBtn = ({ children, icon }) => (
  <button className="flex items-center justify-center gap-2.5 w-full bg-white/[0.04] border border-white/[0.09] hover:border-white/20 hover:bg-white/[0.07] text-white/60 hover:text-white/85 text-[0.78rem] font-medium py-3 rounded-xl transition-all duration-250">
    {icon}
    {children}
  </button>
)

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [mounted, setMounted]   = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 60)
    window.scrollTo(0, 0)
  }, [])

  const validate = () => {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'At least 6 characters'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/') }, 1600)
  }

  const orbs = [
    { width: 320, height: 320, background: 'radial-gradient(circle, rgba(15,106,91,0.18) 0%, transparent 70%)', top: '-80px', left: '-80px', filter: 'blur(40px)' },
    { width: 280, height: 280, background: 'radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)', bottom: '60px', right: '-60px', filter: 'blur(50px)' },
    { width: 180, height: 180, background: 'radial-gradient(circle, rgba(122,12,58,0.14) 0%, transparent 70%)', top: '40%', right: '10%', filter: 'blur(35px)' },
  ]

  return (
    <div className="min-h-screen bg-[#081612] flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards; }
        .spin-slow { animation: spinSlow 18s linear infinite; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.05) 1px,transparent 1px)',
          backgroundSize: '64px 64px'
        }} />
        {orbs.map((o, i) => <Orb key={i} style={{ position: 'absolute', ...o }} />)}
        {/* Rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] spin-slow opacity-[0.03]"
          style={{ border: '1px dashed #D4AF37', borderRadius: '50%' }} />
      </div>

      {/* Card */}
      <div className={`relative z-10 w-full max-w-[420px] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Card glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#0F6A5B]/20 via-transparent to-[#D4AF37]/10 blur-xl opacity-70" />

        <div className="relative bg-[#0b1e19]/80 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden">

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          <div className="px-8 pt-10 pb-8">

            {/* Logo + heading */}
            <div className="flex flex-col items-center gap-5 mb-8 fade-up" style={{ animationDelay: '0.05s' }}>
              <button onClick={() => navigate('/')} className="focus:outline-none">
                <img src="./src/assets/Italyst-w.png" alt="Italyst" className="h-9 opacity-90 hover:opacity-100 transition-opacity duration-300" />
              </button>
              <div className="text-center">
                <h1 className="font-serif text-[1.75rem] font-semibold text-white leading-tight mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Welcome back
                </h1>
                <p className="text-white/35 text-[0.8rem] font-light">
                  Sign in to continue your Italian journey
                </p>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6 fade-up" style={{ animationDelay: '0.12s' }}>
              <SocialBtn icon={
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              }>Google</SocialBtn>
              <SocialBtn icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              }>Facebook</SocialBtn>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6 fade-up" style={{ animationDelay: '0.16s' }}>
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-white/25 text-[0.68rem] tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="fade-up" style={{ animationDelay: '0.20s' }}>
                <Field
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  error={errors.email}
                  icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  }
                />
              </div>

              <div className="fade-up" style={{ animationDelay: '0.25s' }}>
                <Field
                  label="Password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  error={errors.password}
                  icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  }
                  rightSlot={
                    <button type="button" onClick={() => setShowPw(p => !p)} className="text-white/25 hover:text-white/55 transition-colors duration-200 focus:outline-none">
                      {showPw ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  }
                />
              </div>

              {/* Forgot password */}
              <div className="flex justify-end -mt-1 fade-up" style={{ animationDelay: '0.28s' }}>
                <button type="button" className="text-[#D4AF37]/60 text-[0.72rem] hover:text-[#D4AF37] transition-colors duration-200">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden group w-full bg-[#0F6A5B] text-white text-[0.78rem] font-semibold tracking-[0.12em] uppercase py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(212,175,55,0.25)] disabled:opacity-60 disabled:cursor-not-allowed fade-up mt-1"
                style={{ animationDelay: '0.30s' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" opacity="0.25"/>
                        <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                      </svg>
                      Signing in…
                    </>
                  ) : 'Sign In'}
                </span>
              </button>
            </form>

            {/* Register link */}
            <p className="text-center text-white/35 text-[0.78rem] mt-6 fade-up" style={{ animationDelay: '0.35s' }}>
              Don't have an account?{' '}
              <Link to="/register" className="text-[#D4AF37] hover:text-white transition-colors duration-200 font-medium">
                Create one free
              </Link>
            </p>
          </div>

          {/* Bottom accent */}
          <div className="px-8 py-4 bg-[#081612]/40 border-t border-white/[0.05] flex items-center justify-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F6A5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span className="text-white/20 text-[0.65rem] tracking-wide">Secured with 256-bit encryption</span>
          </div>
        </div>

        {/* Back to home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/25 text-[0.72rem] mx-auto mt-6 hover:text-white/55 transition-colors duration-200 group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-200">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to home
        </button>
      </div>
    </div>
  )
}