import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import REGIONS from './UniversityData'

// ── Flatten all universities from all regions ─────────────────────────────────
const ALL_UNIVERSITIES = Object.entries(REGIONS).flatMap(([regionName, regionData]) =>
  regionData.universities.map(uni => ({
    ...uni,
    regionName,
    regionSlug: regionData.slug,
  }))
)

const PAGE_SIZE = 8

// ── Helpers ───────────────────────────────────────────────────────────────────
const uniSlug = (name) =>
  name.toLowerCase().replace(/[\s/'"().,–—]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

const ALL_REGIONS = [...new Set(ALL_UNIVERSITIES.map(u => u.regionName))].sort()
const ALL_TYPES   = ['Public', 'Private', 'Special']
const ALL_FIELDS  = [
  'Medicine', 'Engineering', 'Architecture', 'Economics', 'Law',
  'Computer Science', 'Design', 'Humanities', 'Sciences', 'Agriculture',
  'Pharmacy', 'Political Science', 'Psychology', 'Languages',
]

// ── Tiny UI atoms ─────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const cfg = {
    Public:  { bg: 'bg-[#0F6A5B]/15', border: 'border-[#0F6A5B]/30', text: 'text-[#5ecfbe]' },
    Private: { bg: 'bg-[#7A0C3A]/15', border: 'border-[#7A0C3A]/30', text: 'text-[#e879a0]' },
    Special: { bg: 'bg-[#D4AF37]/12', border: 'border-[#D4AF37]/30', text: 'text-[#D4AF37]' },
  }[type] || {}
  return (
    <span className={`inline-flex items-center text-[0.58rem] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
      {type}
    </span>
  )
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 3L5 8l5 5"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 3l5 5-5 5"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
)
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const SortIcon = ({ dir }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    {dir === 'asc'  && <polygon points="5,1 9,9 1,9"/>}
    {dir === 'desc' && <polygon points="5,9 9,1 1,1"/>}
    {!dir && <>
      <polygon points="5,1 8,4.5 2,4.5" opacity="0.4"/>
      <polygon points="5,9 8,5.5 2,5.5" opacity="0.4"/>
    </>}
  </svg>
)

// ── Column definitions ────────────────────────────────────────────────────────
const COLUMNS = [
  { key: 'name',       label: 'University',  sortable: true,  width: 'min-w-[220px]' },
  { key: 'regionName', label: 'Region',      sortable: true,  width: 'min-w-[120px]' },
  { key: 'type',       label: 'Type',        sortable: true,  width: 'min-w-[90px]'  },
  { key: 'founded',    label: 'Founded',     sortable: true,  width: 'min-w-[90px]'  },
  { key: 'students',   label: 'Students',    sortable: false, width: 'min-w-[100px]' },
  { key: 'specialities', label: 'Fields',   sortable: false, width: 'min-w-[200px]' },
  { key: 'fees',       label: 'Fees',        sortable: false, width: 'min-w-[160px]' },
  { key: 'english',    label: 'English Req.', sortable: false, width: 'min-w-[160px]' },
  { key: 'action',     label: '',            sortable: false, width: 'w-[60px]'      },
]

// ── Main component ────────────────────────────────────────────────────────────
export default function UnivTable() {
  const navigate = useNavigate()
  const tableRef = useRef(null)

  const [search,       setSearch]       = useState('')
  const [typeFilter,   setTypeFilter]   = useState('All')
  const [regionFilter, setRegionFilter] = useState('All')
  const [fieldFilter,  setFieldFilter]  = useState('All')
  const [sortKey,      setSortKey]      = useState('name')
  const [sortDir,      setSortDir]      = useState('asc')
  const [page,         setPage]         = useState(0)
  const [animDir,      setAnimDir]      = useState(null)
  const [animating,    setAnimating]    = useState(false)

  const filtered = useMemo(() => {
    let list = ALL_UNIVERSITIES.filter(u => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        u.name.toLowerCase().includes(q) ||
        u.regionName.toLowerCase().includes(q) ||
        u.city?.toLowerCase().includes(q) ||
        u.specialities?.some(s => s.toLowerCase().includes(q))
      const matchType   = typeFilter === 'All'   || u.type === typeFilter
      const matchRegion = regionFilter === 'All' || u.regionName === regionFilter
      const matchField  = fieldFilter === 'All'  ||
        u.specialities?.some(s => s.toLowerCase().includes(fieldFilter.toLowerCase()))
      return matchSearch && matchType && matchRegion && matchField
    })
    list = [...list].sort((a, b) => {
      let av = a[sortKey] ?? ''
      let bv = b[sortKey] ?? ''
      if (sortKey === 'founded') { av = Number(av); bv = Number(bv) }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase() }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [search, typeFilter, regionFilter, fieldFilter, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages - 1)
  const pageData   = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  useEffect(() => { setPage(0) }, [search, typeFilter, regionFilter, fieldFilter, sortKey, sortDir])

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const goPage = (dir) => {
    if (animating) return
    const next = dir === 'right' ? safePage + 1 : safePage - 1
    if (next < 0 || next >= totalPages) return
    setAnimDir(dir)
    setAnimating(true)
    setTimeout(() => {
      setPage(next)
      setAnimDir(null)
      setAnimating(false)
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 220)
  }

  const activeFilters = [
    typeFilter !== 'All'   && { label: typeFilter,   clear: () => setTypeFilter('All') },
    regionFilter !== 'All' && { label: regionFilter, clear: () => setRegionFilter('All') },
    fieldFilter !== 'All'  && { label: fieldFilter,  clear: () => setFieldFilter('All') },
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#081612] pt-4 pb-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .tbl-row { transition: background 0.18s ease, border-color 0.18s ease; }
        .tbl-row:hover { background: rgba(15,106,91,0.08); border-color: rgba(212,175,55,0.15) !important; }
        .slide-out-left  { animation: slideOutLeft  0.2s ease forwards; }
        .slide-out-right { animation: slideOutRight 0.2s ease forwards; }
        .slide-in-left   { animation: slideInLeft   0.22s ease forwards; }
        .slide-in-right  { animation: slideInRight  0.22s ease forwards; }
        @keyframes slideOutLeft  { to { opacity:0; transform: translateX(-28px); } }
        @keyframes slideOutRight { to { opacity:0; transform: translateX(28px);  } }
        @keyframes slideInLeft   { from { opacity:0; transform: translateX(28px);  } to { opacity:1; transform:none; } }
        @keyframes slideInRight  { from { opacity:0; transform: translateX(-28px); } to { opacity:1; transform:none; } }
        select option { background: #0c1f1a; color: #fff; }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_20%_20%,rgba(15,106,91,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_70%,rgba(122,12,58,0.08)_0%,transparent_55%)]" />
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">

        {/* ── PAGE HEADER ───────────────────────────────────────────────────── */}
        <div className="mb-10 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] text-[0.68rem] font-medium tracking-[0.14em] uppercase">Directory</span>
          </div>
          <h1 className="font-serif text-5xl font-semibold text-white leading-tight mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            All <span className="italic font-light text-[#D4AF37]">Italian Universities</span>
          </h1>
          <p className="text-white/40 text-sm font-light">
            {ALL_UNIVERSITIES.length} institutions across 20 regions — filter, search and compare.
          </p>
        </div>

        {/* ── FILTER BAR ────────────────────────────────────────────────────── */}
        <div className="bg-[#0c1f1a]/70 backdrop-blur-md border border-white/[0.07] rounded-2xl p-5 mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-[340px]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"><SearchIcon /></span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, city, field…"
                className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder-white/25 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#D4AF37]/40 focus:bg-white/[0.06] transition-all duration-200"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  <XIcon />
                </button>
              )}
            </div>

            {/* Region select */}
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] text-white/70 text-[0.78rem] rounded-xl px-4 py-2.5 outline-none focus:border-[#D4AF37]/40 transition-all duration-200 cursor-pointer min-w-[150px]"
            >
              <option value="All">All Regions</option>
              {ALL_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            {/* Field select */}
            <select
              value={fieldFilter}
              onChange={e => setFieldFilter(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] text-white/70 text-[0.78rem] rounded-xl px-4 py-2.5 outline-none focus:border-[#D4AF37]/40 transition-all duration-200 cursor-pointer min-w-[150px]"
            >
              <option value="All">All Fields</option>
              {ALL_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            {/* Result count */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-white/30 text-[0.72rem]">
                <span className="text-[#D4AF37] font-medium">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Type pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white/25 text-[0.65rem] uppercase tracking-widest mr-1">Type:</span>
            {['All', ...ALL_TYPES].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`text-[0.68rem] font-medium tracking-wide px-3 py-1 rounded-full border transition-all duration-200 ${
                  typeFilter === t
                    ? t === 'All'     ? 'bg-white/10 border-white/20 text-white/80'
                    : t === 'Public'  ? 'bg-[#0F6A5B]/20 border-[#0F6A5B]/50 text-[#5ecfbe]'
                    : t === 'Private' ? 'bg-[#7A0C3A]/20 border-[#7A0C3A]/50 text-[#e879a0]'
                    :                   'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]'
                    : 'border-white/[0.08] text-white/35 hover:text-white/60 hover:border-white/20'
                }`}
              >
                {t}
              </button>
            ))}

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-1.5 ml-2">
                <span className="w-px h-4 bg-white/10" />
                {activeFilters.map((f, i) => (
                  <button key={i} onClick={f.clear}
                    className="flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-[0.65rem] font-medium px-2.5 py-1 rounded-full hover:bg-[#D4AF37]/20 transition-colors">
                    {f.label} <XIcon />
                  </button>
                ))}
                <button onClick={() => { setTypeFilter('All'); setRegionFilter('All'); setFieldFilter('All'); setSearch('') }}
                  className="text-white/30 text-[0.65rem] underline underline-offset-2 hover:text-white/60 transition-colors ml-1">
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── TABLE ─────────────────────────────────────────────────────────── */}
        <div ref={tableRef} className="relative">
          <div className="bg-[#0c1f1a]/60 backdrop-blur-md border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">

                {/* Head */}
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#081612]/50">
                    {COLUMNS.map(col => (
                      <th
                        key={col.key}
                        className={`px-5 py-4 text-left ${col.width}`}
                        onClick={() => col.sortable && handleSort(col.key)}
                      >
                        <div className={`flex items-center gap-2 ${col.sortable ? 'cursor-pointer select-none group' : ''}`}>
                          <span className={`text-[0.62rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                            sortKey === col.key ? 'text-[#D4AF37]' : 'text-white/35 group-hover:text-white/55'
                          }`}>
                            {col.label}
                          </span>
                          {col.sortable && (
                            <span className={`transition-colors duration-200 ${sortKey === col.key ? 'text-[#D4AF37]' : 'text-white/20 group-hover:text-white/40'}`}>
                              <SortIcon dir={sortKey === col.key ? sortDir : null} />
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body */}
                <tbody className={animating
                  ? animDir === 'right' ? 'slide-out-left' : 'slide-out-right'
                  : animDir === 'right' ? 'slide-in-right' : animDir === 'left' ? 'slide-in-left' : ''
                }>
                  {pageData.length === 0 ? (
                    <tr>
                      <td colSpan={COLUMNS.length} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                            <SearchIcon />
                          </div>
                          <p className="text-white/40 font-serif text-lg">No universities found</p>
                          <p className="text-white/20 text-sm">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : pageData.map((uni, idx) => (
                    <tr
                      key={`${uni.name}-${idx}`}
                      className="tbl-row border-b border-white/[0.04] last:border-0 cursor-pointer"
                      onClick={() => navigate(`/univ/${uniSlug(uni.name)}`)}
                    >
                      {/* University name */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-white/90 text-[0.82rem] font-medium leading-snug line-clamp-2 max-w-[240px]">
                            {uni.name}
                          </p>
                          {uni.city && (
                            <p className="text-white/30 text-[0.65rem] flex items-center gap-1">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2"/></svg>
                              {uni.city}
                            </p>
                          )}
                          {uni.ranking && (
                            <p className="text-[#D4AF37]/60 text-[0.6rem] leading-tight">{uni.ranking}</p>
                          )}
                        </div>
                      </td>

                      {/* Region */}
                      <td className="px-5 py-4">
                        <span className="text-white/55 text-[0.78rem]">{uni.regionName}</span>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <TypeBadge type={uni.type} />
                      </td>

                      {/* Founded */}
                      <td className="px-5 py-4">
                        <span className="text-white/50 text-[0.78rem] font-light tabular-nums">{uni.founded}</span>
                      </td>

                      {/* Students */}
                      <td className="px-5 py-4">
                        <span className="text-white/70 text-[0.78rem] font-medium tabular-nums">{uni.students}</span>
                      </td>

                      {/* Specialities */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {uni.specialities?.slice(0, 3).map((s, i) => (
                            <span key={i} className="bg-[#0F6A5B]/10 border border-[#0F6A5B]/18 text-[#5ecfbe] text-[0.58rem] px-2 py-0.5 rounded-md">
                              {s.length > 18 ? s.slice(0, 17) + '…' : s}
                            </span>
                          ))}
                          {uni.specialities?.length > 3 && (
                            <span className="bg-white/[0.05] border border-white/[0.08] text-white/35 text-[0.58rem] px-2 py-0.5 rounded-md">
                              +{uni.specialities.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* FEES column (replaces Tuition/yr) */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1 max-w-[160px]">
                          {/* Tuition */}
                          <p className="text-white/80 text-[0.75rem] font-medium leading-snug">
                            {uni.fees?.tuition || '—'}
                          </p>
                          {/* Application fee badge */}
                          {uni.fees?.applicationFee && (
                            <span className={`inline-flex items-center gap-1 text-[0.6rem] px-2 py-0.5 rounded-full border font-medium w-fit ${
                              uni.fees.applicationFee === 'No Fee'
                                ? 'bg-[#0F6A5B]/15 border-[#0F6A5B]/30 text-[#5ecfbe]'
                                : 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]'
                            }`}>
                              App: {uni.fees.applicationFee}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* English requirement */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1 max-w-[160px]">
                          {uni.language?.english?.required === false ? (
                            <span className="text-white/30 text-[0.72rem] italic">Not required</span>
                          ) : (
                            uni.language?.english?.accepted?.slice(0, 2).map((cert, i) => (
                              <span key={i} className="text-white/55 text-[0.68rem] flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50 flex-shrink-0" />
                                {cert.length > 24 ? cert.slice(0, 23) + '…' : cert}
                              </span>
                            ))
                          )}
                          {uni.language?.english?.accepted?.length > 2 && (
                            <span className="text-white/25 text-[0.62rem]">+{uni.language.english.accepted.length - 2} more</span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white/30 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 transition-all duration-200">
                          <ArrowIcon />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── PAGINATION ────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06] bg-[#081612]/30">
              <p className="text-white/30 text-[0.72rem]">
                Showing <span className="text-white/60 font-medium">{safePage * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE + PAGE_SIZE, filtered.length)}</span> of <span className="text-white/60 font-medium">{filtered.length}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goPage('left')}
                  disabled={safePage === 0 || animating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 text-[0.72rem] font-medium tracking-wide transition-all duration-200 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <ChevronLeft /> Prev
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { if (animating) return; setAnimDir(i > safePage ? 'right' : 'left'); setPage(i) }}
                      className={`rounded-full transition-all duration-200 ${
                        i === safePage ? 'w-5 h-2 bg-[#D4AF37]' : 'w-2 h-2 bg-white/15 hover:bg-white/35'
                      }`}
                    />
                  ))}
                  {totalPages > 10 && <span className="text-white/25 text-[0.65rem]">…{totalPages}</span>}
                </div>

                <button
                  onClick={() => goPage('right')}
                  disabled={safePage >= totalPages - 1 || animating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 text-[0.72rem] font-medium tracking-wide transition-all duration-200 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight />
                </button>
              </div>

              <p className="text-white/30 text-[0.72rem]">
                Page <span className="text-white/60 font-medium">{safePage + 1}</span> of <span className="text-white/60 font-medium">{totalPages}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM SUMMARY STRIP ──────────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Universities', value: ALL_UNIVERSITIES.length },
            { label: 'Public',   value: ALL_UNIVERSITIES.filter(u => u.type === 'Public').length,   color: 'text-[#5ecfbe]' },
            { label: 'Private',  value: ALL_UNIVERSITIES.filter(u => u.type === 'Private').length,  color: 'text-[#e879a0]' },
            { label: 'Special / Elite', value: ALL_UNIVERSITIES.filter(u => u.type === 'Special').length, color: 'text-[#D4AF37]' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0c1f1a]/50 border border-white/[0.06] rounded-xl px-5 py-4 flex items-center justify-between">
              <span className="text-white/35 text-[0.68rem] uppercase tracking-widest">{s.label}</span>
              <span className={`text-2xl font-serif font-semibold ${s.color || 'text-white/80'}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}