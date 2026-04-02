import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ── Orb ───────────────────────────────────────────────────────────────────────
const Orb = ({ style }) => <div className="absolute rounded-full pointer-events-none" style={style} />

// ── Progress step dots ────────────────────────────────────────────────────────
const StepDots = ({ total, current }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <React.Fragment key={i}>
        <div className={`rounded-full transition-all duration-400 ${
          i < current
            ? 'w-4 h-2 bg-[#D4AF37]'
            : i === current
            ? 'w-6 h-2 bg-[#D4AF37]'
            : 'w-2 h-2 bg-white/15'
        }`} />
        {i < total - 1 && (
          <div className={`h-px flex-1 transition-all duration-400 ${i < current ? 'bg-[#D4AF37]/50' : 'bg-white/10'}`}
            style={{ width: '20px', minWidth: '20px' }} />
        )}
      </React.Fragment>
    ))}
  </div>
)

// ── Input ─────────────────────────────────────────────────────────────────────
const Field = ({ label, type = 'text', value, onChange, placeholder, error, icon, rightSlot, half }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div className={`flex flex-col gap-1.5 ${half ? '' : 'col-span-2'}`}>
      <label className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-white/50">{label}</label>
      <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
        error ? 'border-[#e879a0]/50 bg-[#7A0C3A]/8' : focused ? 'border-[#D4AF37]/50 bg-white/[0.06]' : 'border-white/[0.09] bg-white/[0.04]'
      }`}>
        {icon && (
          <span className={`absolute left-4 transition-colors duration-300 ${focused ? 'text-[#D4AF37]' : 'text-white/25'}`}>{icon}</span>
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
      {error && <p className="text-[#e879a0] text-[0.65rem] font-light flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────────────────
const SelectField = ({ label, value, onChange, options, error, icon }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5 col-span-2">
      <label className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-white/50">{label}</label>
      <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
        error ? 'border-[#e879a0]/50' : focused ? 'border-[#D4AF37]/50 bg-white/[0.06]' : 'border-white/[0.09] bg-white/[0.04]'
      }`}>
        {icon && <span className={`absolute left-4 transition-colors duration-300 ${focused ? 'text-[#D4AF37]' : 'text-white/25'}`}>{icon}</span>}
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-white/75 text-[0.85rem] font-light py-3.5 pr-4 outline-none appearance-none cursor-pointer"
          style={{ paddingLeft: icon ? '2.75rem' : '1rem' }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value} style={{ background: '#0b1e19', color: '#fff' }}>{o.label}</option>
          ))}
        </select>
        <span className="absolute right-4 text-white/30 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      {error && <p className="text-[#e879a0] text-[0.65rem] font-light flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const icons = {
  user:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  email:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  lock:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  globe:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  cap:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  phone:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
}

const COUNTRIES = [
  { value: '', label: 'Select your country…' },
  { value: 'DZ', label: '🇩🇿 Algeria' },
  { value: 'MA', label: '🇲🇦 Morocco' },
  { value: 'TN', label: '🇹🇳 Tunisia' },
  { value: 'LY', label: '🇱🇾 Libya' },
  { value: 'EG', label: '🇪🇬 Egypt' },
  { value: 'PK', label: '🇵🇰 Pakistan' },
  { value: 'TR', label: '🇹🇷 Turkey' },
  { value: 'SA', label: '🇸🇦 Saudi Arabia' },
  { value: 'SN', label: '🇸🇳 Senegal' },
  { value: 'NG', label: '🇳🇬 Nigeria' },
  { value: 'GH', label: '🇬🇭 Ghana' },
  { value: 'CM', label: '🇨🇲 Cameroon' },
  { value: 'CI', label: "🇨🇮 Côte d'Ivoire" },
  { value: 'OTHER', label: '🌍 Other' },
]

const STUDY_LEVELS = [
  { value: '', label: 'Select study level…' },
  { value: 'bachelor', label: 'Bachelor (Laurea Triennale)' },
  { value: 'master', label: 'Master (Laurea Magistrale)' },
  { value: 'phd', label: 'PhD (Dottorato di Ricerca)' },
  { value: 'language', label: 'Language Course' },
  { value: 'undecided', label: 'Not decided yet' },
]

// ── Step configs ──────────────────────────────────────────────────────────────
const STEPS = [
  { title: 'Create Account', subtitle: 'Start your Italian adventure' },
  { title: 'Your Profile',   subtitle: 'Help us match you better'    },
  { title: 'All Set!',       subtitle: 'Welcome to Italyst'          },
]

export default function Register() {
  const navigate  = useNavigate()
  const [step, setStep]       = useState(0)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [animDir, setAnimDir] = useState('forward') // forward | back

  // Step 0 fields
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw,    setShowPw]    = useState(false)

  // Step 1 fields
  const [country,    setCountry]    = useState('')
  const [studyLevel, setStudyLevel] = useState('')
  const [phone,      setPhone]      = useState('')
  const [agreed,     setAgreed]     = useState(false)

  const [errors, setErrors] = useState({})

  useEffect(() => { setTimeout(() => setMounted(true), 60); window.scrollTo(0, 0) }, [])

  const goNext = () => {
    const e = {}
    if (step === 0) {
      if (!firstName.trim()) e.firstName = 'Required'
      if (!lastName.trim())  e.lastName  = 'Required'
      if (!email) e.email = 'Required'
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email'
      if (!password) e.password = 'Required'
      else if (password.length < 8) e.password = 'Min 8 characters'
      if (password !== confirmPw) e.confirmPw = 'Passwords do not match'
    }
    if (step === 1) {
      if (!country) e.country = 'Select your country'
      if (!studyLevel) e.studyLevel = 'Select a study level'
      if (!agreed) e.agreed = 'You must agree to continue'
    }
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    if (step < 2) {
      setAnimDir('forward')
      setStep(s => s + 1)
    }
  }

  const goBack = () => {
    setErrors({})
    setAnimDir('back')
    setStep(s => s - 1)
  }

  const handleFinalSubmit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/signin') }, 1800)
  }

  const orbs = [
    { width: 350, height: 350, background: 'radial-gradient(circle, rgba(15,106,91,0.15) 0%, transparent 70%)', top: '-100px', right: '-80px', filter: 'blur(50px)' },
    { width: 250, height: 250, background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)', bottom: '0px', left: '-60px', filter: 'blur(40px)' },
    { width: 200, height: 200, background: 'radial-gradient(circle, rgba(122,12,58,0.12) 0%, transparent 70%)', top: '35%', left: '5%', filter: 'blur(35px)' },
  ]

  // ── Password strength ────────────────────────────────────────────────────
  const strength = (() => {
    if (!password) return 0
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#e879a0', '#D4AF37', '#5ecfbe', '#0F6A5B'][strength]

  return (
    <div className="min-h-screen bg-[#081612] flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideInR { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInL { from { opacity:0; transform:translateX(-32px);} to { opacity:1; transform:translateX(0); } }
        @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes popIn    { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
        .fade-up  { animation: fadeUp   0.65s cubic-bezier(0.23,1,0.32,1) forwards; }
        .slide-r  { animation: slideInR 0.45s cubic-bezier(0.23,1,0.32,1) forwards; }
        .slide-l  { animation: slideInL 0.45s cubic-bezier(0.23,1,0.32,1) forwards; }
        .spin-slow{ animation: spinSlow 20s linear infinite; }
        .pop-in   { animation: popIn    0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        select option { background: #0b1e19; color: #fff; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.05) 1px,transparent 1px)',
          backgroundSize: '64px 64px'
        }} />
        {orbs.map((o, i) => <Orb key={i} style={{ position: 'absolute', ...o }} />)}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] spin-slow opacity-[0.025]"
          style={{ border: '1px dashed #D4AF37', borderRadius: '50%' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-[0.02]"
          style={{ border: '1px solid #0F6A5B', borderRadius: '50%', animation: 'spinSlow 12s linear infinite reverse' }} />
      </div>

      {/* Card */}
      <div className={`relative z-10 w-full max-w-[480px] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#0F6A5B]/15 via-transparent to-[#D4AF37]/10 blur-xl opacity-60" />

        <div className="relative bg-[#0b1e19]/80 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <div className="px-8 pt-10 pb-8">

            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-8 fade-up">
              <button onClick={() => navigate('/')} className="focus:outline-none">
                <img src="./src/assets/Italyst-w.png" alt="Italyst" className="h-9 opacity-90 hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Step progress */}
              <StepDots total={3} current={step} />

              <div className="text-center">
                <p className="text-[#D4AF37] text-[0.62rem] tracking-[0.2em] uppercase font-semibold mb-1">
                  Step {step + 1} of 3
                </p>
                <h1 className="font-serif text-[1.65rem] font-semibold text-white leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {STEPS[step].title}
                </h1>
                <p className="text-white/35 text-[0.78rem] font-light mt-0.5">{STEPS[step].subtitle}</p>
              </div>
            </div>

            {/* ─── STEP 0: Account ─────────────────────────────────────────── */}
            {step === 0 && (
              <div key="step0" className={animDir === 'forward' ? 'slide-r' : 'slide-l'}>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Youssef" error={errors.firstName} icon={icons.user} half />
                  <Field label="Last Name"  value={lastName}  onChange={e => setLastName(e.target.value)}  placeholder="Bouali"  error={errors.lastName}  icon={icons.user} half />
                  <Field label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" error={errors.email} icon={icons.email} />
                  <div className="col-span-2">
                    <Field
                      label="Password"
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      error={errors.password}
                      icon={icons.lock}
                      rightSlot={
                        <button type="button" onClick={() => setShowPw(p => !p)} className="text-white/25 hover:text-white/55 transition-colors duration-200 focus:outline-none">
                          {showPw
                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          }
                        </button>
                      }
                    />
                    {/* Password strength bar */}
                    {password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex gap-1 flex-1">
                          {[1,2,3,4].map(n => (
                            <div key={n} className="h-1 flex-1 rounded-full transition-all duration-300"
                              style={{ background: n <= strength ? strengthColor : 'rgba(255,255,255,0.08)' }} />
                          ))}
                        </div>
                        <span className="text-[0.62rem] font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
                      </div>
                    )}
                  </div>
                  <Field label="Confirm Password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat password" error={errors.confirmPw} icon={icons.lock} />
                </div>

                <button onClick={goNext}
                  className="relative overflow-hidden group w-full bg-[#0F6A5B] text-white text-[0.78rem] font-semibold tracking-[0.12em] uppercase py-4 rounded-xl mt-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(212,175,55,0.25)]">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Continue →</span>
                </button>
              </div>
            )}

            {/* ─── STEP 1: Profile ─────────────────────────────────────────── */}
            {step === 1 && (
              <div key="step1" className={animDir === 'forward' ? 'slide-r' : 'slide-l'}>
                <div className="grid grid-cols-2 gap-3">
                  <SelectField label="Your Country" value={country} onChange={e => setCountry(e.target.value)} options={COUNTRIES} error={errors.country} icon={icons.globe} />
                  <SelectField label="Study Level" value={studyLevel} onChange={e => setStudyLevel(e.target.value)} options={STUDY_LEVELS} error={errors.studyLevel} icon={icons.cap} />
                  <Field label="Phone / WhatsApp (optional)" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+213 555 000 000" icon={icons.phone} />
                </div>

                {/* Terms checkbox */}
                <div className="mt-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => setAgreed(a => !a)}
                      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center ${
                        agreed ? 'bg-[#D4AF37] border-[#D4AF37]' : 'bg-transparent border-white/20 group-hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {agreed && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#081612" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-white/40 text-[0.75rem] leading-relaxed font-light">
                      I agree to Italyst's{' '}
                      <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors duration-200">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors duration-200">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreed && <p className="text-[#e879a0] text-[0.65rem] mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.agreed}</p>}
                </div>

                <div className="flex gap-3 mt-5">
                  <button onClick={goBack}
                    className="flex-shrink-0 px-5 py-4 rounded-xl border border-white/[0.09] text-white/45 text-[0.78rem] font-medium hover:border-white/20 hover:text-white/70 transition-all duration-200">
                    ←
                  </button>
                  <button onClick={goNext}
                    className="relative overflow-hidden group flex-1 bg-[#0F6A5B] text-white text-[0.78rem] font-semibold tracking-[0.12em] uppercase py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(212,175,55,0.25)]">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Create Account →</span>
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP 2: Success ─────────────────────────────────────────── */}
            {step === 2 && (
              <div key="step2" className="flex flex-col items-center gap-6 py-4 pop-in">
                {/* Animated check */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#0F6A5B]/20 border-2 border-[#D4AF37]/40 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/5 blur-md" />
                </div>

                <div className="text-center">
                  <h2 className="font-serif text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Welcome, {firstName}!
                  </h2>
                  <p className="text-white/45 text-[0.82rem] font-light leading-relaxed max-w-xs mx-auto">
                    Your account has been created. You're one step closer to your Italian university journey.
                  </p>
                </div>

                {/* Summary card */}
                <div className="w-full bg-[#081612]/50 border border-white/[0.06] rounded-xl px-5 py-4 flex flex-col gap-2.5">
                  {[
                    { label: 'Name',   value: `${firstName} ${lastName}` },
                    { label: 'Email',  value: email                       },
                    { label: 'Level',  value: STUDY_LEVELS.find(o => o.value === studyLevel)?.label || '—' },
                    { label: 'Origin', value: COUNTRIES.find(o => o.value === country)?.label.replace(/^.{2}\s/, '') || '—' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span className="text-white/30 text-[0.68rem] uppercase tracking-widest">{r.label}</span>
                      <span className="text-white/70 text-[0.78rem] font-medium text-right truncate max-w-[200px]">{r.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="relative overflow-hidden group w-full bg-[#D4AF37] text-[#081612] text-[0.78rem] font-bold tracking-[0.12em] uppercase py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)] disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                      </svg>
                      Setting up your account…
                    </span>
                  ) : 'Go to Sign In →'}
                </button>
              </div>
            )}

            {/* Sign in link */}
            {step < 2 && (
              <p className="text-center text-white/30 text-[0.75rem] mt-5">
                Already have an account?{' '}
                <Link to="/signin" className="text-[#D4AF37] hover:text-white transition-colors duration-200 font-medium">
                  Sign in
                </Link>
              </p>
            )}
          </div>

          {/* Bottom bar */}
          <div className="px-8 py-4 bg-[#081612]/40 border-t border-white/[0.05] flex items-center justify-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F6A5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span className="text-white/20 text-[0.65rem] tracking-wide">Free forever · No credit card required</span>
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