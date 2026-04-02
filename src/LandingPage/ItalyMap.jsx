import React, { useState, useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import { useNavigate } from 'react-router-dom'
import REGIONS from './UniversityData'

const GOLD    = '#D4AF37'
const EMERALD = '#0F6A5B'

const GEOJSON_URL =
  'https://cdn.jsdelivr.net/gh/openpolis/geojson-italy@master/geojson/limits_IT_regions.geojson'

const GEO_TO_REGION = {
  "Piemonte":                             "Piemonte",
  "Valle d'Aosta/Vallée d'Aoste":         "Valle d'Aosta/Vallée d'Aoste",
  "Liguria":                              "Liguria",
  "Lombardia":                            "Lombardia",
  "Trentino-Alto Adige/Südtirol":         "Trentino-Alto Adige/Südtirol",
  "Veneto":                               "Veneto",
  "Friuli-Venezia Giulia":                "Friuli-Venezia Giulia",
  "Emilia-Romagna":                       "Emilia-Romagna",
  "Toscana":                              "Toscana",
  "Umbria":                               "Umbria",
  "Marche":                               "Marche",
  "Lazio":                                "Lazio",
  "Abruzzo":                              "Abruzzo",
  "Molise":                               "Molise",
  "Campania":                             "Campania",
  "Puglia":                               "Puglia",
  "Basilicata":                           "Basilicata",
  "Calabria":                             "Calabria",
  "Sicilia":                              "Sicilia",
  "Sardegna":                             "Sardegna",
}

const uniSlug = (name) =>
  name.toLowerCase().replace(/[\s/'"().,–—]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

const RegionListItem = ({ name, region, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-250 ${
      isSelected
        ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]'
        : 'bg-white/[0.03] border-white/[0.06] text-white/65 hover:bg-[#0F6A5B]/10 hover:border-[#0F6A5B]/30 hover:text-white/85'
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[0.82rem] font-medium leading-tight truncate">{name}</span>
        <span className="text-[0.62rem] opacity-50 tracking-wide">
          {region.capital} · {region.universities.length} universit{region.universities.length === 1 ? 'y' : 'ies'}
        </span>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
        className={`flex-shrink-0 transition-transform duration-200 ${isSelected ? 'rotate-180' : ''}`}>
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>
  </button>
)

export default function ItalyMap() {
  const [hovered,  setHovered]  = useState(null)
  const [selected, setSelected] = useState(null)
  const [tooltip,  setTooltip]  = useState({ x: 0, y: 0, visible: false })
  const [paths,    setPaths]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab,setMobileTab]= useState('map') // 'map' | 'list'

  const svgRef       = useRef(null)
  const containerRef = useRef(null)
  const panelRef     = useRef(null)
  const navigate     = useNavigate()

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Load GeoJSON
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(GEOJSON_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const geojson = await res.json()
        const W = 420, H = 560
        const projection = d3.geoMercator().fitSize([W, H], geojson)
        const pathGen    = d3.geoPath().projection(projection)
        const built = geojson.features.map((feature) => {
          const geoName   = feature.properties.reg_name || feature.properties.name || ''
          const regionKey = GEO_TO_REGION[geoName] || geoName
          const dStr      = pathGen(feature) || ''
          const centroid  = pathGen.centroid(feature)
          return { name: regionKey, geoName, d: dStr, centroid }
        })
        if (!cancelled) { setPaths(built); setLoading(false) }
      } catch (e) {
        if (!cancelled) { setError(e.message); setLoading(false) }
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // Scroll panel into view on mobile when region selected
  useEffect(() => {
    if (selected && isMobile && panelRef.current) {
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
  }, [selected, isMobile])

  const handleMouseMove = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (rect) setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(null)
    setTooltip(t => ({ ...t, visible: false }))
  }, [])

  const handleTouchEnd = useCallback((e, name) => {
    e.preventDefault()
    if (!REGIONS[name]) return
    setSelected(prev => prev === name ? null : name)
  }, [])

  const region        = selected ? REGIONS[selected] : null
  const hoveredRegion = hovered  ? REGIONS[hovered]  : null
  const sortedRegions = Object.keys(REGIONS).sort()

  return (
    <div className="bg-[#081612] flex flex-col font-sans">
      <style>{`
        .panel-enter { animation: panelSlideUp 0.35s cubic-bezier(0.23,1,0.32,1) forwards; }
        @keyframes panelSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .map-scroll::-webkit-scrollbar { width: 3px; }
        .map-scroll::-webkit-scrollbar-track { background: transparent; }
        .map-scroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 3px; }
      `}</style>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(15,106,91,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_30%,rgba(122,12,58,0.10)_0%,transparent_55%)]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center py-8 md:py-10 px-6">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[#D4AF37] text-[0.65rem] font-medium tracking-[0.14em] uppercase">Explore Italy</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-semibold text-white leading-tight mb-2">
          Find Your <span className="italic font-light text-[#D4AF37]">Italian Region</span>
        </h1>
        <p className="text-white/45 text-sm font-light max-w-sm mx-auto leading-relaxed">
          {isMobile
            ? 'Tap a region on the map or browse the list.'
            : 'Hover to explore each region, click to discover universities.'}
        </p>
      </div>

      {/* ── MOBILE TAB SWITCHER ──────────────────────────────────────────────── */}
      {isMobile && (
        <div className="relative z-10 flex mx-6 mb-5 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 gap-1">
          {[
            { key: 'map',  label: '🗺 Map'  },
            { key: 'list', label: '📋 List' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setMobileTab(tab.key)}
              className={`flex-1 py-2.5 rounded-lg text-[0.72rem] font-semibold tracking-wide transition-all duration-200 ${
                mobileTab === tab.key
                  ? 'bg-[#0F6A5B] text-white shadow-sm'
                  : 'text-white/40 hover:text-white/65'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div className={`relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pb-16 ${
        isMobile ? 'flex flex-col gap-5' : 'flex items-start gap-8 justify-center'
      }`}>

        {/* ════ MAP ═══════════════════════════════════════════════════════════ */}
        {(!isMobile || mobileTab === 'map') && (
          <div className="relative flex-shrink-0" ref={containerRef}
            style={isMobile ? { width: '100%' } : {}}>
            <div className="absolute -inset-4 rounded-3xl bg-[#0F6A5B]/5 blur-2xl pointer-events-none" />

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center"
                style={{ width: isMobile ? '100%' : '420px', height: isMobile ? '280px' : '560px' }}>
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/40 text-sm">Loading map…</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center justify-center"
                style={{ width: isMobile ? '100%' : '420px', height: isMobile ? '280px' : '560px' }}>
                <div className="text-center px-8">
                  <p className="text-red-400/80 text-sm mb-2">Failed to load map</p>
                  <p className="text-white/30 text-xs">{error}</p>
                </div>
              </div>
            )}

            {/* SVG Map */}
            {!loading && !error && (
              <div className="relative" style={isMobile ? { width: '100%' } : {}}>
                <svg
                  ref={svgRef}
                  viewBox="0 0 420 560"
                  className="drop-shadow-2xl"
                  style={{
                    width: isMobile ? '100%' : '420px',
                    height: isMobile ? 'auto' : '560px',
                    maxWidth: isMobile ? '360px' : 'none',
                    display: 'block',
                    margin: isMobile ? '0 auto' : '0',
                    cursor: isMobile ? 'default' : 'pointer',
                    touchAction: 'manipulation',
                  }}
                  onMouseMove={!isMobile ? handleMouseMove : undefined}
                  onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                >
                  <defs>
                    <filter id="mglow">
                      <feGaussianBlur stdDeviation="2" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="msglow">
                      <feGaussianBlur stdDeviation="4" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {paths.map(({ name, d, centroid }) => {
                    const isHovered  = !isMobile && hovered  === name
                    const isSelected = selected === name
                    const hasData    = !!REGIONS[name]
                    return (
                      <g key={name}>
                        {(isHovered || isSelected) && (
                          <path d={d} fill={isSelected ? GOLD : EMERALD} opacity={0.3}
                            filter="url(#msglow)" style={{ pointerEvents: 'none' }} />
                        )}
                        <path
                          d={d}
                          fill={
                            isSelected ? `${GOLD}cc`
                            : isHovered ? `${EMERALD}cc`
                            : hasData   ? 'rgba(15,106,91,0.22)'
                            : 'rgba(15,106,91,0.10)'
                          }
                          stroke={isSelected ? GOLD : isHovered ? '#5ecfbe' : 'rgba(212,175,55,0.25)'}
                          strokeWidth={isSelected || isHovered ? 1.5 : 0.6}
                          style={{ transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                          onMouseEnter={!isMobile ? () => hasData && setHovered(name) : undefined}
                          onMouseLeave={!isMobile ? () => setHovered(null) : undefined}
                          onClick={() => { if (!isMobile) hasData && setSelected(p => p === name ? null : name) }}
                          onTouchEnd={(e) => handleTouchEnd(e, name)}
                          filter={isHovered || isSelected ? 'url(#mglow)' : undefined}
                        />
                        {(isHovered || isSelected) && centroid && !isNaN(centroid[0]) && (
                          <text
                            x={centroid[0]} y={centroid[1]}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize={isMobile ? "6" : "7"}
                            fill={isSelected ? '#081612' : '#fff'}
                            fontWeight="600" fontFamily="Georgia, serif"
                            style={{ pointerEvents: 'none', userSelect: 'none' }}
                          >
                            {name.length > 14 ? name.split('/')[0].trim() : name}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>

                {/* Desktop tooltip */}
                {!isMobile && tooltip.visible && hovered && hoveredRegion && hovered !== selected && (
                  <div
                    className="absolute z-50 pointer-events-none"
                    style={{
                      left: Math.min(tooltip.x + 16, 270),
                      top: Math.max(tooltip.y - 20, 0),
                    }}
                  >
                    <div className="bg-[#0c1f1a]/95 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-2xl min-w-[180px] max-w-[230px]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-sm bg-[#D4AF37] rotate-45 flex-shrink-0" />
                        <p className="text-white font-serif font-semibold text-sm leading-tight">{hovered}</p>
                      </div>
                      <p className="text-[#D4AF37]/80 text-[0.62rem] tracking-widest uppercase mb-1">
                        {hoveredRegion.capital}
                      </p>
                      <p className="text-white/50 text-[0.7rem] leading-relaxed line-clamp-2">{hoveredRegion.description}</p>
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                        <span className="text-[#0F6A5B] text-[0.62rem] font-medium">
                          {hoveredRegion.universities.length} universit{hoveredRegion.universities.length === 1 ? 'y' : 'ies'}
                        </span>
                        <span className="text-white/20 text-[0.62rem]">· click</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile tap hint */}
            {isMobile && !selected && !loading && (
              <p className="text-center text-white/22 text-[0.65rem] mt-2 tracking-wide">
                Tap any region to explore universities
              </p>
            )}
          </div>
        )}

        {/* ════ MOBILE: REGION LIST TAB ════════════════════════════════════════ */}
        {isMobile && mobileTab === 'list' && (
          <div className="w-full flex flex-col gap-2 panel-enter">
            {sortedRegions.map(name => (
              <React.Fragment key={name}>
                <RegionListItem
                  name={name}
                  region={REGIONS[name]}
                  isSelected={selected === name}
                  onClick={() => setSelected(prev => prev === name ? null : name)}
                />
                {selected === name && (
                  <div className="ml-3 flex flex-col gap-1.5 pb-1 panel-enter">
                    {REGIONS[name].universities.map((uni, i) => (
                      <button key={i} onClick={() => navigate(`/univ/${uniSlug(uni.name)}`)}
                        className="group text-left bg-[#081612]/60 border border-white/[0.05] hover:border-[#D4AF37]/25 rounded-xl px-4 py-3 transition-all duration-200 active:scale-[0.99]">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-white/78 text-[0.78rem] font-medium leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                              {uni.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className={`text-[0.56rem] tracking-widest uppercase px-2 py-0.5 rounded-full border font-semibold ${
                                uni.type === 'Public'  ? 'bg-[#0F6A5B]/15 border-[#0F6A5B]/30 text-[#5ecfbe]'
                                : uni.type === 'Special' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]'
                                : 'bg-[#7A0C3A]/15 border-[#7A0C3A]/30 text-[#e879a0]'
                              }`}>{uni.type}</span>
                              <span className="text-white/25 text-[0.62rem]">Est. {uni.founded}</span>
                              {uni.fees?.applicationFee && (
                                <span className={`text-[0.58rem] font-medium ${uni.fees.applicationFee === 'No Fee' ? 'text-[#5ecfbe]' : 'text-[#D4AF37]'}`}>
                                  {uni.fees.applicationFee === 'No Fee' ? '✓ Free' : uni.fees.applicationFee}
                                </span>
                              )}
                            </div>
                          </div>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="flex-shrink-0 text-white/18 group-hover:text-[#D4AF37] mt-1 transition-colors">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ════ SIDE / BELOW PANEL ════════════════════════════════════════════ */}
        <div
          ref={panelRef}
          className={isMobile ? 'w-full' : 'flex-1 max-w-[440px] min-h-[560px] flex flex-col'}
        >
          {!selected ? (
            /* Empty state */
            <div className={`flex flex-col items-center justify-center text-center gap-4 ${isMobile ? 'py-4' : 'h-full min-h-[500px]'}`}>
              {isMobile && mobileTab === 'map' && (
                <>
                  <div className="w-12 h-12 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="10" r="3"/>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm font-light">Tap a region on the map above to see its universities.</p>
                </>
              )}
              {!isMobile && (
                <>
                  <div className="w-16 h-16 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="10" r="3"/>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/65 font-serif text-xl mb-1">Select a Region</p>
                    <p className="text-white/28 text-sm font-light">Click any region on the map to explore its universities.</p>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-3 w-full max-w-xs">
                    {['20 Regions', '100+ Universities', '500+ Programmes', 'All Levels'].map(s => (
                      <div key={s} className="bg-[#0F6A5B]/10 border border-[#0F6A5B]/20 rounded-lg px-3 py-2.5 text-center">
                        <p className="text-[#D4AF37] text-[0.68rem] font-medium tracking-wide">{s}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Region detail panel */
            <div className="bg-[#0c1f1a]/60 backdrop-blur-md border border-[#D4AF37]/15 rounded-2xl overflow-hidden flex flex-col panel-enter">

              {/* Panel header */}
              <div className="bg-gradient-to-r from-[#0F6A5B]/30 to-[#D4AF37]/10 border-b border-[#D4AF37]/15 px-5 py-4 md:px-6 md:py-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[#D4AF37] text-[0.62rem] tracking-[0.16em] uppercase font-medium mb-0.5">
                      {region.capital} · Italy
                    </p>
                    <h2 className="text-white font-serif text-xl md:text-2xl font-semibold leading-tight">{selected}</h2>
                    <p className="text-white/45 text-[0.75rem] mt-1.5 leading-relaxed line-clamp-2">{region.description}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l8 8M9 1L1 9"/>
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="bg-[#0F6A5B]/20 border border-[#0F6A5B]/30 text-[#5ecfbe] text-[0.62rem] tracking-wide uppercase px-3 py-1 rounded-full">
                    {region.universities.length} Universit{region.universities.length === 1 ? 'y' : 'ies'}
                  </span>
                  <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[0.62rem] tracking-wide uppercase px-3 py-1 rounded-full">
                    Accepting Applications
                  </span>
                </div>
              </div>

              {/* Universities list */}
              <div className="relative">
                <div
                  className="overflow-y-auto px-4 py-4 flex flex-col gap-2.5 map-scroll"
                  style={{
                    maxHeight: isMobile ? '60vw' : '380px',
                    minHeight: isMobile ? '160px' : 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${GOLD}33 transparent`,
                  }}
                >
                  {region.universities.map((uni, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(`/univ/${uniSlug(uni.name)}`)}
                      className="group text-left bg-[#081612]/50 border border-white/[0.06] hover:border-[#D4AF37]/30 rounded-xl px-4 py-3.5 transition-all duration-300 hover:bg-[#0F6A5B]/10 active:scale-[0.99]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[0.82rem] font-medium leading-snug group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-2">
                            {uni.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className={`text-[0.58rem] tracking-widest uppercase px-2 py-0.5 rounded-full border font-medium ${
                              uni.type === 'Public'   ? 'bg-[#0F6A5B]/15 border-[#0F6A5B]/30 text-[#5ecfbe]'
                              : uni.type === 'Special' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]'
                              : 'bg-[#7A0C3A]/15 border-[#7A0C3A]/30 text-[#e879a0]'
                            }`}>{uni.type}</span>
                            <span className="text-white/28 text-[0.65rem]">Est. {uni.founded}</span>
                            <span className="text-white/28 text-[0.65rem]">{uni.students}</span>
                            {uni.fees?.applicationFee && (
                              <span className={`text-[0.58rem] font-medium ${uni.fees.applicationFee === 'No Fee' ? 'text-[#5ecfbe]' : 'text-[#D4AF37]'}`}>
                                {uni.fees.applicationFee === 'No Fee' ? '✓ Free App' : `App: ${uni.fees.applicationFee}`}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-200 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="text-white/25 group-hover:text-[#D4AF37]">
                            <path d="M2 6h8M7 3l3 3-3 3"/>
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                  <div className="h-3 flex-shrink-0" />
                </div>
                {region.universities.length > 4 && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0c1f1a] to-transparent pointer-events-none z-10" />
                )}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-white/[0.06] px-4 py-4">
                <button className="w-full relative overflow-hidden group bg-[#0F6A5B] text-white text-[0.72rem] font-medium tracking-widest uppercase py-3 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)] active:scale-[0.99]">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 truncate">Get Guidance for {selected}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}