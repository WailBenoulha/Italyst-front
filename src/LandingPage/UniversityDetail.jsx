import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import REGIONS from './UniversityData'

const GOLD = '#D4AF37'
const EMERALD = '#0F6A5B'
const BURGUNDY = '#7A0C3A'

// ── Small reusable atoms ──────────────────────────────────────────────────────

const Pill = ({ children, variant = 'emerald' }) => {
  const styles = {
    emerald: 'bg-[#0F6A5B]/15 border-[#0F6A5B]/30 text-[#5ecfbe]',
    gold:    'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]',
    burgundy:'bg-[#7A0C3A]/15 border-[#7A0C3A]/30 text-[#e879a0]',
    ghost:   'bg-white/5 border-white/10 text-white/50',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${styles[variant]}`}>
      {children}
    </span>
  )
}

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-[#0b1e19]/70 backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 ${className}`}>
    {children}
  </div>
)

const SectionTitle = ({ icon, children }) => (
  <h3 className="flex items-center gap-2.5 text-white font-serif text-lg font-semibold mb-5 pb-3 border-b border-white/[0.07]">
    <span className="text-[#D4AF37]">{icon}</span>
    {children}
  </h3>
)

const InfoRow = ({ label, value, valueClass = 'text-white/80' }) => (
  <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/[0.05] last:border-0">
    <span className="text-white/35 text-[0.72rem] tracking-wide font-light flex-shrink-0">{label}</span>
    <span className={`text-[0.78rem] font-medium text-right ${valueClass}`}>{value}</span>
  </div>
)

// ── Icons as inline SVG (no dependency) ──────────────────────────────────────
const Icon = {
  back:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 3L5 8l5 5"/></svg>,
  cap:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  pin:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  users:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  star:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  lang:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  doc:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  money:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a2.5 2.5 0 010 5H9a2.5 2.5 0 010 5H15"/></svg>,
  calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  warn:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  arrow:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  check:    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  book:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  award:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  external: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
}

// ── Main component ────────────────────────────────────────────────────────────
const UniversityDetail = () => {
  const { univSlug } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setHeaderVisible(true), 60)

    const onScroll = () => {
      const sticky = document.getElementById('sticky-nav')
      if (sticky) sticky.style.opacity = window.scrollY > 300 ? '1' : '0'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Find university ──────────────────────────────────────────────────────
  const findUni = () => {
    for (const regionName in REGIONS) {
      const found = REGIONS[regionName].universities.find(
        u => u.name.toLowerCase().replace(/[\s/'"().,–—]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') === univSlug
      )
      if (found) return { ...found, regionName }
    }
    return null
  }

  const uni = findUni()

  if (!uni) return (
    <div className="min-h-screen bg-[#081612] flex flex-col items-center justify-center gap-4">
      <p className="text-white/40 font-serif text-2xl">University not found</p>
      <button onClick={() => navigate('/map')} className="text-[#D4AF37] text-sm underline underline-offset-4">← Back to Map</button>
    </div>
  )

  const displayImage = uni.image || 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200'
  const typeVariant = uni.type === 'Public' ? 'emerald' : uni.type === 'Special' ? 'gold' : 'burgundy'

  const tabs = ['overview', 'admissions', 'financials', 'deadlines']

  return (
    <div className="min-h-screen bg-[#081612] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(15,106,91,0.13)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_60%,rgba(122,12,58,0.08)_0%,transparent_55%)]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* Sticky nav (fades in on scroll) */}
      <div id="sticky-nav" className="fixed top-0 left-0 right-0 z-50 opacity-0 transition-opacity duration-300 bg-[#081612]/90 backdrop-blur-xl border-b border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/map')} className="flex items-center gap-2 text-[#D4AF37] text-[0.72rem] tracking-widest uppercase font-medium hover:text-white transition-colors">
            {Icon.back} Map
          </button>
          <p className="text-white/70 text-sm font-medium truncate max-w-sm">{uni.name}</p>
          <a href={uni.links?.universitaly} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[0.72rem] tracking-widest uppercase text-[#0F6A5B] hover:text-[#D4AF37] transition-colors">
            Universitaly {Icon.external}
          </a>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <img src={displayImage} alt={uni.name} className="w-full h-full object-cover opacity-25 scale-105" style={{ transform: 'scale(1.05)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081612] via-[#081612]/50 to-[#081612]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081612]/60 to-transparent" />
        </div>

        {/* Hero content */}
        <div className={`relative z-10 w-full max-w-6xl mx-auto px-8 pb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Back button */}
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#D4AF37] text-[0.7rem] tracking-[0.14em] uppercase font-medium mb-6 hover:text-white transition-colors group">
            <span className="group-hover:-translate-x-0.5 transition-transform">{Icon.back}</span>
            Back to Map
          </button>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Pill variant={typeVariant}>{Icon.cap} {uni.type}</Pill>
            <Pill variant="ghost">Est. {uni.founded}</Pill>
            {uni.ranking && <Pill variant="gold">{Icon.star} {uni.ranking}</Pill>}
            {uni.city && <Pill variant="ghost">{Icon.pin} {uni.city}</Pill>}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-[1.08] mb-4 max-w-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {uni.name}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm font-light">
            <span className="flex items-center gap-1.5 text-[#5ecfbe]">{Icon.users} {uni.students} Students</span>
            <span className="w-px h-4 bg-white/15" />
            <span className="flex items-center gap-1.5">{Icon.pin} {uni.regionName}, Italy</span>
            {uni.specialities?.length > 0 && <>
              <span className="w-px h-4 bg-white/15" />
              <span>{uni.specialities.length} Specialities</span>
            </>}
          </div>
        </div>
      </div>

      {/* ── TAB BAR ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[#081612]/95 backdrop-blur-lg border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-8 flex gap-0">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-4 text-[0.72rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                activeTab === tab ? 'text-[#D4AF37]' : 'text-white/40 hover:text-white/70'
              }`}>
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#0F6A5B]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-10 pb-20">

        {/* ═══ OVERVIEW TAB ════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left col: Specialities + Programmes */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Specialities */}
              {uni.specialities?.length > 0 && (
                <SectionCard>
                  <SectionTitle icon={Icon.book}>Fields of Study & Specialities</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {uni.specialities.map((s, i) => (
                      <span key={i} className="bg-[#0F6A5B]/10 border border-[#0F6A5B]/20 text-[#5ecfbe] text-[0.72rem] px-3 py-1.5 rounded-lg hover:bg-[#0F6A5B]/20 transition-colors cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Degree programmes */}
              <SectionCard>
                <SectionTitle icon={Icon.cap}>Degree Programmes Offered</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  {uni.programmes?.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                      <span className="text-white/70 text-[0.78rem]">{p}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Language requirements */}
              <SectionCard>
                <SectionTitle icon={Icon.lang}>Language Requirements</SectionTitle>
                <div className="flex flex-col gap-5">

                  {/* English */}
                  {uni.language?.english && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-sm bg-[#5ecfbe] rotate-45" />
                        <p className="text-white/80 text-sm font-medium">English Proficiency</p>
                        {!uni.language.english.required && <Pill variant="ghost">Not Required</Pill>}
                      </div>
                      {uni.language.english.required && (
                        <div className="pl-4 border-l-2 border-[#0F6A5B]/40">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {uni.language.english.accepted?.map((cert, i) => (
                              <span key={i} className="flex items-center gap-1.5 bg-[#0F6A5B]/10 border border-[#0F6A5B]/25 text-[#5ecfbe] text-[0.68rem] font-medium px-2.5 py-1 rounded-full">
                                <span className="text-[#D4AF37]">{Icon.check}</span> {cert}
                              </span>
                            ))}
                          </div>
                          {uni.language.english.note && (
                            <p className="text-white/40 text-[0.72rem] leading-relaxed mt-1.5 italic">{uni.language.english.note}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="w-full h-px bg-white/[0.06]" />

                  {/* Italian */}
                  {uni.language?.italian && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-sm bg-[#D4AF37] rotate-45" />
                        <p className="text-white/80 text-sm font-medium">Italian Proficiency</p>
                        <Pill variant="gold">Level: {uni.language.italian.level}</Pill>
                      </div>
                      <div className="pl-4 border-l-2 border-[#D4AF37]/30">
                        <p className="text-white/50 text-[0.72rem] mb-2">{uni.language.italian.required}</p>
                        <div className="flex flex-wrap gap-2">
                          {uni.language.italian.accepted?.map((cert, i) => (
                            <span key={i} className="flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[0.68rem] font-medium px-2.5 py-1 rounded-full">
                              <span>{Icon.check}</span> {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* Right col: Quick info + CTA */}
            <div className="flex flex-col gap-5">

              {/* Quick stats card */}
              <div className="bg-gradient-to-br from-[#0F6A5B]/20 to-[#D4AF37]/5 border border-[#0F6A5B]/25 rounded-2xl p-5">
                <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.18em] uppercase font-semibold mb-4">University at a Glance</p>
                <div className="flex flex-col">
                  <InfoRow label="Type" value={uni.type} valueClass={uni.type === 'Public' ? 'text-[#5ecfbe]' : uni.type === 'Special' ? 'text-[#D4AF37]' : 'text-[#e879a0]'} />
                  <InfoRow label="Founded" value={uni.founded} />
                  <InfoRow label="Students" value={uni.students} />
                  {uni.city && <InfoRow label="City" value={uni.city} />}
                  {uni.ranking && <InfoRow label="Ranking" value={uni.ranking} valueClass="text-[#D4AF37] text-right leading-snug" />}
                  <InfoRow label="Programmes" value={uni.programmes?.length + ' types'} />
                  <InfoRow label="Specialities" value={uni.specialities?.length + ' fields'} />
                </div>
              </div>

              {/* Admission type */}
              <SectionCard>
                <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.18em] uppercase font-semibold mb-3">Admission Type</p>
                <p className="text-white/70 text-[0.8rem] leading-relaxed">{uni.admission?.type}</p>
                {uni.admission?.gpa && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <p className="text-white/35 text-[0.65rem] uppercase tracking-wide mb-1">Min. GPA</p>
                    <p className="text-white/80 text-sm font-medium">{uni.admission.gpa.minimum}</p>
                    {uni.admission.gpa.note && <p className="text-white/35 text-[0.68rem] mt-1 leading-relaxed">{uni.admission.gpa.note}</p>}
                  </div>
                )}
              </SectionCard>

              {/* CTA buttons */}
              <button className="w-full relative overflow-hidden group bg-[#0F6A5B] text-white text-[0.72rem] font-medium tracking-[0.12em] uppercase py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_6px_24px_rgba(212,175,55,0.2)] hover:-translate-y-0.5">
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">Get Admission Guidance {Icon.arrow}</span>
              </button>
              <a href={uni.links?.universitaly} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-[#D4AF37]/70 text-[0.72rem] tracking-widest uppercase border border-[#D4AF37]/20 rounded-xl py-3 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-200">
                Universitaly Portal {Icon.external}
              </a>
            </div>
          </div>
        )}

        {/* ═══ ADMISSIONS TAB ══════════════════════════════════════════════════ */}
        {activeTab === 'admissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Required Documents */}
            <SectionCard className="lg:col-span-2">
              <SectionTitle icon={Icon.doc}>Required Documents</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {uni.admission?.documents?.map((doc, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 hover:border-[#0F6A5B]/30 hover:bg-[#0F6A5B]/5 transition-all duration-200">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#0F6A5B]/20 flex items-center justify-center text-[#5ecfbe]">{Icon.check}</span>
                    <span className="text-white/70 text-[0.78rem] leading-snug">{doc}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Admission type */}
            <SectionCard>
              <SectionTitle icon={Icon.cap}>Admission Process</SectionTitle>
              <div className="flex flex-col gap-3">
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-xl p-4">
                  <p className="text-[#D4AF37] text-[0.65rem] tracking-widest uppercase mb-1.5">Type</p>
                  <p className="text-white/80 text-sm leading-relaxed">{uni.admission?.type}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-white/35 text-[0.65rem] tracking-widest uppercase mb-1.5">Minimum GPA</p>
                  <p className="text-white/80 text-base font-medium">{uni.admission?.gpa?.minimum}</p>
                  {uni.admission?.gpa?.note && <p className="text-white/35 text-[0.68rem] mt-1.5 leading-relaxed">{uni.admission.gpa.note}</p>}
                </div>
                {uni.admission?.extraRequirements?.length > 0 && (
                  <div className="bg-[#7A0C3A]/10 border border-[#7A0C3A]/20 rounded-xl p-4">
                    <p className="text-[#e879a0] text-[0.65rem] tracking-widest uppercase mb-2">Extra Requirements</p>
                    {uni.admission.extraRequirements.map((r, i) => (
                      <p key={i} className="text-white/60 text-[0.75rem] flex gap-2 mb-1"><span className="text-[#D4AF37]">→</span>{r}</p>
                    ))}
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Tip card */}
            <SectionCard>
              <SectionTitle icon={Icon.warn}>Important Notes</SectionTitle>
              <div className="flex flex-col gap-3">
                <div className="bg-[#0F6A5B]/10 border border-[#0F6A5B]/20 rounded-xl p-4">
                  <p className="text-[#5ecfbe] text-[0.7rem] font-semibold tracking-wide mb-1.5">Declaration of Value</p>
                  <p className="text-white/55 text-[0.72rem] leading-relaxed">Non-EU applicants must obtain a <em className="text-white/70 not-italic font-medium">Dichiarazione di Valore</em> from the Italian embassy in their home country. This validates your foreign degree.</p>
                </div>
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-xl p-4">
                  <p className="text-[#D4AF37] text-[0.7rem] font-semibold tracking-wide mb-1.5">Universitaly Pre-enrollment</p>
                  <p className="text-white/55 text-[0.72rem] leading-relaxed">Non-EU students must pre-enroll on <strong className="text-white/75">universitaly.it</strong> before July 15th. This is mandatory for your student visa application.</p>
                </div>
                <div className="bg-[#7A0C3A]/10 border border-[#7A0C3A]/20 rounded-xl p-4">
                  <p className="text-[#e879a0] text-[0.7rem] font-semibold tracking-wide mb-1.5">Academic Match (Laurea Magistrale)</p>
                  <p className="text-white/55 text-[0.72rem] leading-relaxed">For Master entry, your Bachelor credits must align with the programme curriculum. Verification is done by the admissions committee.</p>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* ═══ FINANCIALS TAB ══════════════════════════════════════════════════ */}
        {activeTab === 'financials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Fee summary — hero card */}
            <div className="lg:col-span-3 bg-gradient-to-br from-[#0F6A5B]/25 to-[#D4AF37]/5 border border-[#0F6A5B]/25 rounded-2xl p-7 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">Annual Tuition</p>
                <p className="text-white font-serif text-4xl font-semibold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{uni.fees?.tuition}</p>
                <p className="text-white/40 text-[0.72rem] leading-relaxed mt-2">{uni.fees?.financialNote}</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[180px]">
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
                  <p className="text-white/35 text-[0.62rem] uppercase tracking-wide mb-0.5">Application Fee</p>
                  <p className="text-white/80 text-sm font-medium">{uni.fees?.applicationFee}</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
                  <p className="text-white/35 text-[0.62rem] uppercase tracking-wide mb-0.5">Institution Type</p>
                  <p className={`text-sm font-medium ${uni.type === 'Public' ? 'text-[#5ecfbe]' : uni.type === 'Special' ? 'text-[#D4AF37]' : 'text-[#e879a0]'}`}>{uni.type}</p>
                </div>
              </div>
            </div>

            {/* Scholarships */}
            <SectionCard className="lg:col-span-2">
              <SectionTitle icon={Icon.award}>Available Scholarships</SectionTitle>
              <div className="flex flex-col gap-3">
                {uni.fees?.scholarships?.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#D4AF37]/5 border border-[#D4AF37]/12 rounded-xl px-4 py-3">
                    <span className="mt-0.5 text-[#D4AF37] flex-shrink-0">{Icon.check}</span>
                    <span className="text-white/70 text-[0.78rem] leading-snug">{s}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* DSU / ISEE info */}
            <div className="flex flex-col gap-4">
              <SectionCard>
                <p className="text-[#5ecfbe] text-[0.65rem] tracking-[0.18em] uppercase font-semibold mb-3">DSU Scholarship</p>
                <p className="text-white/55 text-[0.75rem] leading-relaxed">Regional DSU scholarships cover tuition fees fully and provide a yearly stipend (€5,000–€7,000) plus free canteen and accommodation priority.</p>
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <p className="text-white/35 text-[0.65rem]">Based on ISEE declaration (family income assessment).</p>
                </div>
              </SectionCard>
              <SectionCard>
                <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.18em] uppercase font-semibold mb-3">MAECI Scholarship</p>
                <p className="text-white/55 text-[0.75rem] leading-relaxed">The Italian Government (MAECI) offers scholarships for non-EU students. Covers tuition, a monthly stipend (~€900), and health insurance.</p>
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <p className="text-white/35 text-[0.65rem]">Apply via your local Italian embassy.</p>
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ═══ DEADLINES TAB ═══════════════════════════════════════════════════ */}
        {activeTab === 'deadlines' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Gold deadline card */}
            <div className="bg-[#D4AF37] text-[#081612] rounded-2xl p-7 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-8">{Icon.calendar}</div>
              <p className="text-[#081612]/60 text-[0.65rem] tracking-[0.2em] uppercase font-black mb-6">Key Dates</p>
              <div className="flex flex-col gap-5">
                <div className="pb-5 border-b border-black/10">
                  <p className="text-[0.62rem] uppercase font-black tracking-widest text-[#081612]/50 mb-1">Application Window</p>
                  <p className="text-xl font-black">{uni.deadlines?.applicationWindow}</p>
                </div>
                <div className="pb-5 border-b border-black/10">
                  <p className="text-[0.62rem] uppercase font-black tracking-widest text-[#081612]/50 mb-1">Universitaly Pre-enrollment</p>
                  <p className="text-xl font-black">{uni.deadlines?.universitalyDeadline}</p>
                  <p className="text-[0.65rem] text-[#081612]/50 mt-1">Non-EU students only — mandatory</p>
                </div>
                <div>
                  <p className="text-[0.62rem] uppercase font-black tracking-widest text-red-900/70 mb-1">Student Visa Deadline</p>
                  <p className="text-2xl font-black text-red-900 underline decoration-2">{uni.deadlines?.visaDeadline}</p>
                  <p className="text-[0.65rem] text-red-900/60 mt-1">Missing this = loss of your seat</p>
                </div>
              </div>
            </div>

            {/* Timeline steps */}
            <div className="flex flex-col gap-4">
              {[
                { step: '01', title: 'Choose Programme', desc: 'Browse the university catalogue and confirm English/Italian instruction, requirements and fees.' },
                { step: '02', title: 'Prepare Documents', desc: 'Obtain legalised transcripts, Declaration of Value, Europass CV, language certificates and letters of recommendation.' },
                { step: '03', title: 'Universitaly Pre-enrollment', desc: 'Register and upload documents on universitaly.it before July 15th. This is mandatory for Non-EU applicants.' },
                { step: '04', title: 'Apply for Visa', desc: 'Submit your study visa (Type D) at the Italian embassy. Book early — appointments fill fast. Deadline: August 30th.' },
                { step: '05', title: 'Enroll & Arrive', desc: 'Complete official enrollment at the university upon arrival. Activate your DSU scholarship if eligible.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-4 hover:border-[#0F6A5B]/25 hover:bg-[#0F6A5B]/5 transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0F6A5B]/20 border border-[#0F6A5B]/30 flex items-center justify-center">
                    <span className="text-[#D4AF37] text-[0.6rem] font-black">{s.step}</span>
                  </div>
                  <div>
                    <p className="text-white/85 text-sm font-medium mb-0.5">{s.title}</p>
                    <p className="text-white/40 text-[0.72rem] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note card */}
            {uni.deadlines?.note && (
              <SectionCard className="lg:col-span-2">
                <div className="flex gap-3 items-start">
                  <span className="text-[#D4AF37] flex-shrink-0 mt-0.5">{Icon.warn}</span>
                  <p className="text-white/50 text-[0.78rem] leading-relaxed">{uni.deadlines.note}</p>
                </div>
              </SectionCard>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UniversityDetail