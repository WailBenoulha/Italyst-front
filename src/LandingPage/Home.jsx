import React, { useEffect, useRef, useState } from 'react'

// ── Floating particle ─────────────────────────────────────────────────────────
const Particle = ({ style }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: style.size,
      height: style.size,
      left: style.left,
      top: style.top,
      background: style.color,
      opacity: style.opacity,
      animation: `float ${style.duration}s ease-in-out ${style.delay}s infinite alternate`,
      filter: 'blur(1px)',
    }}
  />
)

// ── Animated counter ──────────────────────────────────────────────────────────
const AnimCounter = ({ target, suffix = '', duration = 1800 }) => {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(target.replace(/\D/g, ''))
        let start = 0
        const step = Math.ceil(num / (duration / 16))
        const timer = setInterval(() => {
          start += step
          if (start >= num) { setVal(num); clearInterval(timer) }
          else setVal(start)
        }, 16)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

// ── Section title ─────────────────────────────────────────────────────────────
const SectionTitle = ({ eyebrow, title, accent, subtitle, center = false }) => (
  <div className={`flex flex-col gap-4 ${center ? 'items-center text-center' : ''}`}>
    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-4 py-1.5 w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
      <span className="text-[#D4AF37] text-[0.65rem] font-semibold tracking-[0.18em] uppercase">{eyebrow}</span>
    </div>
    <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.1] text-white">
      {title}{' '}
      <span className="italic font-light text-[#D4AF37]">{accent}</span>
    </h2>
    {subtitle && <p className="text-white/50 text-[0.92rem] leading-[1.8] max-w-xl font-light">{subtitle}</p>}
  </div>
)

// ── Feature card ──────────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, delay = 0 }) => (
  <div
    className="group relative bg-[#0b1e19]/70 backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 hover:border-[#D4AF37]/20 hover:bg-[#0F6A5B]/10 transition-all duration-500 cursor-default overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#0F6A5B]/0 to-[#D4AF37]/0 group-hover:from-[#0F6A5B]/5 group-hover:to-[#D4AF37]/3 transition-all duration-500 rounded-2xl" />
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full -translate-x-6 -translate-y-6 blur-xl group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
    <div className="relative z-10">
      <div className="w-11 h-11 rounded-xl bg-[#0F6A5B]/20 border border-[#0F6A5B]/30 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/30 transition-all duration-300">
        <span className="text-[#5ecfbe] group-hover:text-[#D4AF37] transition-colors duration-300 text-xl">{icon}</span>
      </div>
      <h3 className="text-white font-serif text-[1.05rem] font-semibold mb-2.5 group-hover:text-[#D4AF37] transition-colors duration-300">{title}</h3>
      <p className="text-white/45 text-[0.8rem] leading-[1.75] font-light">{desc}</p>
    </div>
  </div>
)

// ── Step card ─────────────────────────────────────────────────────────────────
const StepCard = ({ num, title, desc }) => (
  <div className="flex gap-5 items-start group">
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
      <span className="font-serif text-[#D4AF37] text-lg font-bold">{num}</span>
    </div>
    <div className="pt-0.5">
      <h4 className="text-white font-semibold text-[0.92rem] mb-1.5 group-hover:text-[#D4AF37] transition-colors duration-300">{title}</h4>
      <p className="text-white/45 text-[0.78rem] leading-[1.75] font-light">{desc}</p>
    </div>
  </div>
)

// ── Testimonial card ──────────────────────────────────────────────────────────
const TestiCard = ({ quote, name, country, flag, programme }) => (
  <div className="bg-[#0b1e19]/70 border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#D4AF37]/20 transition-all duration-300">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-[#D4AF37] text-sm">★</span>
      ))}
    </div>
    <p className="text-white/65 text-[0.82rem] leading-[1.8] font-light italic">"{quote}"</p>
    <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
      <div className="w-9 h-9 rounded-full bg-[#0F6A5B]/20 border border-[#0F6A5B]/30 flex items-center justify-center text-lg">{flag}</div>
      <div>
        <p className="text-white/80 text-[0.78rem] font-medium">{name}</p>
        <p className="text-white/35 text-[0.65rem] tracking-wide">{country} · {programme}</p>
      </div>
    </div>
  </div>
)

// ── Main component ────────────────────────────────────────────────────────────
const Home = () => {
  const heroRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    heroRefs.forEach((ref, i) => {
      if (!ref.current) return
      ref.current.style.opacity = '0'
      ref.current.style.transform = 'translateY(32px)'
      setTimeout(() => {
        if (!ref.current) return
        ref.current.style.transition = `opacity 0.8s cubic-bezier(0.23,1,0.32,1) ${i * 0.13}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${i * 0.13}s`
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'translateY(0)'
      }, 80)
    })
  }, [])

  const particles = [
    { size: '4px', left: '12%', top: '18%', color: '#D4AF37', opacity: 0.6, duration: 4.2, delay: 0 },
    { size: '6px', left: '88%', top: '32%', color: '#0F6A5B', opacity: 0.5, duration: 5.1, delay: 0.8 },
    { size: '3px', left: '55%', top: '8%',  color: '#D4AF37', opacity: 0.4, duration: 3.7, delay: 1.5 },
    { size: '5px', left: '25%', top: '78%', color: '#5ecfbe', opacity: 0.35, duration: 6.0, delay: 0.3 },
    { size: '4px', left: '72%', top: '65%', color: '#D4AF37', opacity: 0.45, duration: 4.8, delay: 2.1 },
    { size: '7px', left: '92%', top: '82%', color: '#0F6A5B', opacity: 0.3, duration: 5.5, delay: 1.0 },
  ]

  const features = [
    { icon: '🎓', title: 'University Matching', desc: 'We analyse your academic profile and match you to the Italian universities where you are most likely to succeed.', delay: 0 },
    { icon: '📋', title: 'Application Guidance', desc: 'Step-by-step support for every document — transcripts, motivation letters, and Declaration of Value.', delay: 80 },
    { icon: '🗺️', title: 'Visa & Pre-enrollment', desc: 'We walk you through Universitaly pre-enrollment and the Italian student visa process.', delay: 160 },
    { icon: '🏛️', title: 'Scholarship Support', desc: 'Identify DSU, MAECI, and university merit scholarships you are eligible for and apply with confidence.', delay: 240 },
    { icon: '🌍', title: 'Language Preparation', desc: 'Guidance on English and Italian proficiency requirements, accepted certificates, and MOI letters.', delay: 320 },
    { icon: '🤝', title: 'End-to-End Support', desc: 'From first inquiry to enrollment day — we stay with you every step of your Italian journey.', delay: 400 },
  ]

  const steps = [
    { num: '01', title: 'Free Consultation', desc: 'Tell us about your academic background, goals, and preferred field of study.' },
    { num: '02', title: 'Profile Assessment', desc: 'We evaluate your GPA, language certificates, and match you to suitable programmes.' },
    { num: '03', title: 'Application Preparation', desc: 'We help you compile and verify all required documents for each university.' },
    { num: '04', title: 'Pre-enrollment & Visa', desc: 'We guide you through Universitaly pre-enrollment and your Italian visa application.' },
    { num: '05', title: 'Enrollment & Arrival', desc: 'Complete your enrollment, activate your scholarship, and start your Italian chapter.' },
  ]

  const testimonials = [
    { quote: "Italyst made what felt impossible completely manageable. I got into Politecnico di Milano on my first try.", name: 'Youssef B.', country: 'Algeria', flag: '🇩🇿', programme: 'M.Sc. Computer Engineering' },
    { quote: "They knew the deadlines better than I did. My Universitaly pre-enrollment was perfect and my visa approved first attempt.", name: 'Fatima Z.', country: 'Morocco', flag: '🇲🇦', programme: 'M.Sc. Architecture, Polimi' },
    { quote: "I got a full DSU scholarship I didn't even know I was eligible for. Italyst literally saved me €10,000.", name: 'Ahmed K.', country: 'Tunisia', flag: '🇹🇳', programme: 'M.Sc. Economics, Bologna' },
  ]

  return (
    <>
      <style>{`
        @keyframes float { from { transform: translateY(0px) rotate(0deg); } to { transform: translateY(-18px) rotate(5deg); } }
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .gradient-text {
          background: linear-gradient(135deg, #D4AF37 0%, #f0d060 40%, #c9a227 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease infinite;
        }
        .hero-glow { box-shadow: 0 0 120px rgba(15,106,91,0.25), 0 0 60px rgba(212,175,55,0.1); }
        .ring-spin { animation: spin-slow 18s linear infinite; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen bg-[#081612] flex items-center overflow-hidden">

        {/* Deep background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_10%_50%,rgba(15,106,91,0.22)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_92%_15%,rgba(122,12,58,0.16)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_70%_88%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-35" style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.06) 1px,transparent 1px)',
            backgroundSize: '72px 72px'
          }} />
          {/* Diagonal accent */}
          <div className="absolute top-0 left-[52%] w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/12 to-transparent" style={{ transform: 'rotate(7deg)' }} />
        </div>

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} style={p} />)}

        {/* Decorative rotating ring */}
        <div className="absolute right-[8%] top-[20%] w-64 h-64 pointer-events-none opacity-10 ring-spin" style={{
          border: '1px solid',
          borderColor: '#D4AF37',
          borderRadius: '50%',
          borderStyle: 'dashed'
        }} />
        <div className="absolute right-[10%] top-[22%] w-48 h-48 pointer-events-none opacity-8 ring-spin" style={{
          border: '1px solid #0F6A5B',
          borderRadius: '50%',
          animationDirection: 'reverse',
          animationDuration: '12s'
        }} />

        {/* Main grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full grid lg:grid-cols-2 gap-14 items-center py-24 pt-32">

          {/* LEFT: Logo visual */}
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl hero-glow scale-105 opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0F6A5B]/10 to-[#D4AF37]/5 blur-2xl scale-110" />
              {/* Image */}
              <img
                src="./src/assets/Italyst-w-bg.png"
                alt="Italyst"
                className="relative w-full max-w-[520px] h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ filter: 'drop-shadow(0 0 50px rgba(15,106,91,0.35)) drop-shadow(0 0 20px rgba(212,175,55,0.15))' }}
              />
              {/* Corner accent */}
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-lg" />
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="flex flex-col gap-7 order-1 lg:order-2">

            {/* Badge */}
            <div ref={heroRefs[0]} className="inline-flex items-center gap-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-5 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Your Gateway to Italian Education
              </span>
            </div>

            {/* Headline */}
            <div ref={heroRefs[1]}>
              <h1 className="font-serif text-[clamp(2.8rem,5vw,4.4rem)] font-bold leading-[1.04] text-white m-0">
                Study in Italy,
              </h1>
              <h1 className="font-serif text-[clamp(2.8rem,5vw,4.4rem)] font-light leading-[1.04] m-0">
                <span className="gradient-text italic">Start Your Future.</span>
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#0F6A5B] to-transparent" />
              <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
              <div className="h-px w-8 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
            </div>

            {/* Body */}
            <p ref={heroRefs[2]} className="text-white/55 text-[0.95rem] leading-[1.85] font-light max-w-[480px] m-0">
              Italyst removes the complexity of studying abroad in Italy. From{' '}
              <span className="text-white/80 font-medium">university selection</span> and{' '}
              <span className="text-white/80 font-medium">document preparation</span> to{' '}
              <span className="text-white/80 font-medium">visa guidance</span> — we handle every step, so you can focus on your future.
            </p>

            {/* CTA row */}
            <div ref={heroRefs[3]} className="flex flex-wrap items-center gap-4 mt-1">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden group bg-[#0F6A5B] text-white text-[0.76rem] font-semibold tracking-[0.12em] uppercase px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(212,175,55,0.3)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Start Your Journey</span>
              </button>

              <button
                onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-3 text-white/55 text-[0.76rem] font-medium tracking-wide hover:text-[#D4AF37] transition-colors duration-300 group"
              >
                Explore Universities
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:translate-x-1.5 transition-all duration-300">
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div ref={heroRefs[4]} className="flex items-center gap-0 pt-6 mt-1 border-t border-white/[0.07] divide-x divide-white/[0.07]">
              {[
                { num: '500', suffix: '+', label: 'Students Guided' },
                { num: '40',  suffix: '+', label: 'Partner Universities' },
                { num: '98',  suffix: '%', label: 'Visa Success Rate' },
              ].map((s, i) => (
                <div key={s.label} className="flex flex-col gap-1 px-6 first:pl-0 last:pr-0">
                  <span className="font-serif text-[2rem] font-bold text-white leading-none">
                    <AnimCounter target={s.num} suffix={s.suffix} />
                  </span>
                  <span className="text-[0.63rem] tracking-[0.12em] uppercase text-white/35 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-[0.58rem] tracking-[0.22em] uppercase text-white/20 font-medium">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" style={{ animation: 'float 2s ease-in-out infinite alternate' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#0a1a15] border-y border-[#D4AF37]/10 py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            'Politecnico di Milano', 'Università di Bologna', 'Sapienza Roma',
            'Università di Padova', 'Università di Pisa', 'Università Bocconi',
          ].map((u) => (
            <span key={u} className="text-white/20 text-[0.68rem] font-medium tracking-[0.1em] uppercase whitespace-nowrap hover:text-[#D4AF37]/50 transition-colors duration-300 cursor-default">{u}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="relative bg-[#081612] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(15,106,91,0.1)_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-80 flex-shrink-0 lg:sticky lg:top-28">
              <SectionTitle
                eyebrow="What We Do"
                title="Everything You"
                accent="Need to Succeed"
                subtitle="Our team has helped hundreds of students navigate the Italian university system. Here's how we do it."
              />
              <button
                onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 relative overflow-hidden group bg-[#0F6A5B]/20 border border-[#0F6A5B]/40 text-[#5ecfbe] text-[0.72rem] font-semibold tracking-widest uppercase px-6 py-3 rounded-lg hover:bg-[#0F6A5B]/30 transition-all duration-300"
              >
                Browse Universities →
              </button>
            </div>
            <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {features.map((f, i) => <FeatureCard key={i} {...f} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative bg-[#060f0d] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_15%_60%,rgba(212,175,55,0.05)_0%,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: steps */}
            <div className="flex flex-col gap-8">
              <SectionTitle
                eyebrow="How It Works"
                title="Your Path to"
                accent="Italy in 5 Steps"
                subtitle="We've streamlined the Italian university application process into a clear, manageable journey."
              />
              <div className="flex flex-col gap-7 mt-2">
                {steps.map((s, i) => (
                  <React.Fragment key={i}>
                    <StepCard {...s} />
                    {i < steps.length - 1 && (
                      <div className="ml-6 w-px h-5 bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right: visual card */}
            <div className="flex flex-col gap-5">
              {/* Big stat card */}
              <div className="relative bg-gradient-to-br from-[#0F6A5B]/25 to-[#D4AF37]/8 border border-[#0F6A5B]/25 rounded-3xl p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/6 rounded-full translate-x-16 -translate-y-16 blur-2xl" />
                <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-3">Italy at a Glance</p>
                <p className="font-serif text-white text-5xl font-bold mb-1">100<span className="text-[#D4AF37]">+</span></p>
                <p className="text-white/50 text-sm font-light mb-8">Universities across 20 regions</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Public Universities', val: '67', note: 'Low/zero tuition possible' },
                    { label: 'Elite Schools', val: '8+', note: 'SNS, SISSA, Sant\'Anna...' },
                    { label: 'English Programmes', val: '500+', note: 'No Italian required' },
                    { label: 'Scholarships', val: '€16K', note: 'Max GSSI stipend/yr' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                      <p className="font-serif text-white text-2xl font-semibold mb-0.5">{item.val}</p>
                      <p className="text-white/40 text-[0.65rem] uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="text-[#5ecfbe] text-[0.6rem]">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini CTA */}
              <div className="bg-[#D4AF37] rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#081612] font-serif text-xl font-bold leading-tight">Ready to apply?</p>
                  <p className="text-[#081612]/60 text-sm font-light mt-0.5">Get your free profile assessment today.</p>
                </div>
                <button className="flex-shrink-0 bg-[#081612] text-[#D4AF37] text-[0.7rem] font-bold tracking-widest uppercase px-5 py-3 rounded-xl hover:bg-[#0F6A5B] hover:text-white transition-all duration-300 whitespace-nowrap">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#081612] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(15,106,91,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-14 flex flex-col items-center text-center">
            <SectionTitle
              eyebrow="Success Stories"
              title="Students Who"
              accent="Made It to Italy"
              center
            />
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => <TestiCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#060f0d] py-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(15,106,91,0.18) 0%, transparent 60%)',
        }} />
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.06) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 max-w-3xl mx-auto px-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] text-[0.65rem] font-semibold tracking-[0.18em] uppercase">Limited Spots Available</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-semibold text-white leading-[1.08] mb-5">
            Your Italian Story{' '}
            <span className="italic font-light text-[#D4AF37]">Starts Here.</span>
          </h2>
          <p className="text-white/45 text-[0.92rem] leading-[1.8] mb-10 font-light">
            Join hundreds of students who trusted Italyst to guide them from application to enrollment. Our team is ready to help you write the next chapter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="relative overflow-hidden group bg-[#D4AF37] text-[#081612] text-[0.76rem] font-bold tracking-[0.12em] uppercase px-10 py-4 rounded-lg hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
              Book Free Consultation
            </button>
            <button
              onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/50 text-[0.76rem] font-medium tracking-wide hover:text-[#D4AF37] transition-colors duration-300 underline underline-offset-4 decoration-white/20 hover:decoration-[#D4AF37]/50"
            >
              Explore all universities →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home