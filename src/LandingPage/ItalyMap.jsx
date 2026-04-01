import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { useNavigate } from 'react-router-dom'
import REGIONS from './UniversityData'

const GOLD = '#D4AF37'
const EMERALD = '#0F6A5B'

const GEOJSON_URL =
  'https://cdn.jsdelivr.net/gh/openpolis/geojson-italy@master/geojson/limits_IT_regions.geojson'

// Map GeoJSON region names to our REGIONS keys
// GeoJSON uses Italian names — we match them here
const GEO_TO_REGION = {
  "Piemonte":                               "Piemonte",
  "Valle d'Aosta/Vallée d'Aoste":           "Valle d'Aosta/Vallée d'Aoste",
  "Liguria":                                "Liguria",
  "Lombardia":                              "Lombardia",
  "Trentino-Alto Adige/Südtirol":           "Trentino-Alto Adige/Südtirol",
  "Veneto":                                 "Veneto",
  "Friuli-Venezia Giulia":                  "Friuli-Venezia Giulia",
  "Emilia-Romagna":                         "Emilia-Romagna",
  "Toscana":                                "Toscana",
  "Umbria":                                 "Umbria",
  "Marche":                                 "Marche",
  "Lazio":                                  "Lazio",
  "Abruzzo":                                "Abruzzo",
  "Molise":                                 "Molise",
  "Campania":                               "Campania",
  "Puglia":                                 "Puglia",
  "Basilicata":                             "Basilicata",
  "Calabria":                               "Calabria",
  "Sicilia":                                "Sicilia",
  "Sardegna":                               "Sardegna",
}

export default function ItalyMap() {
  const [hovered,  setHovered]  = useState(null)
  const [selected, setSelected] = useState(null)
  const [tooltip,  setTooltip]  = useState({ x: 0, y: 0 })
  const [paths,    setPaths]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const svgRef       = useRef(null)
  const containerRef = useRef(null)
  const navigate     = useNavigate()

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
          const geoName = feature.properties.reg_name || feature.properties.name || ''
          const regionKey = GEO_TO_REGION[geoName] || geoName
          const dStr    = pathGen(feature) || ''
          const centroid = pathGen.centroid(feature)
          return { name: regionKey, geoName, d: dStr, centroid }
        })

        if (!cancelled) {
          setPaths(built)
          setLoading(false)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleMouseMove = (e) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (rect) setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const region        = selected ? REGIONS[selected] : null
  const hoveredRegion = hovered  ? REGIONS[hovered]  : null

  return (
    <div className="min-h-screen bg-[#081612] flex flex-col pt-4 font-sans">

      {/* Background layers */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(15,106,91,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_30%,rgba(122,12,58,0.10)_0%,transparent_55%)] pointer-events-none" />
      <div className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center py-10 px-6">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[#D4AF37] text-[0.68rem] font-medium tracking-[0.14em] uppercase">Explore Italy</span>
        </div>
        <h1 className="text-5xl font-serif font-semibold text-white leading-tight mb-3">
          Find Your <span className="italic font-light text-[#D4AF37]">Italian Region</span>
        </h1>
        <p className="text-white/50 text-sm font-light max-w-md mx-auto leading-relaxed">
          Hover to explore each region, click to discover universities and programmes waiting for you.
        </p>
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex flex-1 items-start justify-center gap-8 px-8 pb-16 max-w-7xl mx-auto w-full">

        {/* Map container */}
        <div className="flex-shrink-0 relative" ref={containerRef}>
          <div className="absolute -inset-6 rounded-3xl bg-[#0F6A5B]/5 blur-2xl" />

          {loading && (
            <div className="relative w-[420px] h-[560px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-white/40 text-sm">Loading map…</p>
              </div>
            </div>
          )}

          {error && (
            <div className="relative w-[420px] h-[560px] flex items-center justify-center">
              <div className="text-center px-8">
                <p className="text-red-400/80 text-sm mb-2">Failed to load map</p>
                <p className="text-white/30 text-xs">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <svg
              ref={svgRef}
              viewBox="0 0 420 560"
              className="relative w-[420px] h-[560px] drop-shadow-2xl cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHovered(null)}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {paths.map(({ name, d, centroid }) => {
                const isHovered  = hovered  === name
                const isSelected = selected === name
                const hasData    = !!REGIONS[name]

                return (
                  <g key={name}>
                    {(isHovered || isSelected) && (
                      <path
                        d={d}
                        fill={isSelected ? GOLD : EMERALD}
                        opacity={0.3}
                        filter="url(#strongGlow)"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}

                    <path
                      d={d}
                      fill={
                        isSelected
                          ? `${GOLD}cc`
                          : isHovered
                          ? `${EMERALD}cc`
                          : hasData
                          ? 'rgba(15,106,91,0.22)'
                          : 'rgba(15,106,91,0.10)'
                      }
                      stroke={
                        isSelected
                          ? GOLD
                          : isHovered
                          ? '#5ecfbe'
                          : 'rgba(212,175,55,0.25)'
                      }
                      strokeWidth={isSelected || isHovered ? 1.5 : 0.6}
                      style={{ transition: 'fill 0.2s ease, stroke 0.2s ease', cursor: hasData ? 'pointer' : 'default' }}
                      onMouseEnter={() => hasData && setHovered(name)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => hasData && setSelected(selected === name ? null : name)}
                      filter={isHovered || isSelected ? 'url(#glow)' : undefined}
                    />

                    {(isHovered || isSelected) && centroid && !isNaN(centroid[0]) && (
                      <text
                        x={centroid[0]}
                        y={centroid[1]}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="7"
                        fill={isSelected ? '#081612' : '#fff'}
                        fontWeight="600"
                        fontFamily="Georgia, serif"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {name}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          )}

          {/* Tooltip */}
          {hovered && hoveredRegion && hovered !== selected && (
            <div
              className="absolute z-50 pointer-events-none"
              style={{ left: tooltip.x + 16, top: tooltip.y - 20 }}
            >
              <div className="bg-[#0c1f1a]/95 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-2xl min-w-[200px] max-w-[240px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[#D4AF37] rotate-45 flex-shrink-0" />
                  <p className="text-white font-serif font-semibold text-base leading-tight">{hovered}</p>
                </div>
                <p className="text-[#D4AF37]/80 text-[0.65rem] tracking-widest uppercase mb-1.5">
                  Capital: {hoveredRegion.capital}
                </p>
                <p className="text-white/55 text-[0.72rem] leading-relaxed">{hoveredRegion.description}</p>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                  <span className="text-[#0F6A5B] text-[0.65rem] font-medium">
                    {hoveredRegion.universities.length} universit{hoveredRegion.universities.length === 1 ? 'y' : 'ies'}
                  </span>
                  <span className="text-white/20 text-[0.65rem]">· click to explore</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="flex-1 max-w-[440px] min-h-[560px] flex flex-col">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center gap-4">
              <div className="w-16 h-16 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
              </div>
              <div>
                <p className="text-white/70 font-serif text-xl mb-1">Select a Region</p>
                <p className="text-white/30 text-sm font-light">Click any region on the map to explore its universities and programmes.</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-xs">
                {['20 Regions', '100+ Universities', '500+ Programmes', 'All Levels'].map((s) => (
                  <div key={s} className="bg-[#0F6A5B]/10 border border-[#0F6A5B]/20 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-[#D4AF37] text-[0.7rem] font-medium tracking-wide">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#0c1f1a]/60 backdrop-blur-md border border-[#D4AF37]/15 rounded-2xl overflow-hidden h-full flex flex-col">
              {/* Panel header */}
              <div className="bg-gradient-to-r from-[#0F6A5B]/30 to-[#D4AF37]/10 border-b border-[#D4AF37]/15 px-6 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.16em] uppercase font-medium mb-1">
                      {region.capital} · Italy
                    </p>
                    <h2 className="text-white font-serif text-2xl font-semibold leading-tight">{selected}</h2>
                    <p className="text-white/50 text-[0.78rem] mt-2 leading-relaxed">{region.description}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l8 8M9 1L1 9"/>
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="bg-[#0F6A5B]/20 border border-[#0F6A5B]/30 text-[#5ecfbe] text-[0.65rem] tracking-wide uppercase px-3 py-1 rounded-full">
                    {region.universities.length} Universit{region.universities.length === 1 ? 'y' : 'ies'}
                  </span>
                  <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[0.65rem] tracking-wide uppercase px-3 py-1 rounded-full">
                    Accepting Applications
                  </span>
                </div>
              </div>

              {/* Universities list */}
              <div className="relative flex-1">
                <div
                  className="h-[400px] overflow-y-auto px-4 py-4 flex flex-col gap-3"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: `${GOLD}33 transparent`, scrollBehavior: 'smooth' }}
                >
                  {region.universities.map((uni, i) => (
                    <div
                      key={i}
                      onClick={() => navigate(`/univ/${uni.name.toLowerCase().replace(/[\s/'"().,–—]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`)}
                      className="group bg-[#081612]/50 border border-white/[0.06] hover:border-[#D4AF37]/30 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 hover:bg-[#0F6A5B]/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[0.85rem] font-medium leading-snug group-hover:text-[#D4AF37] transition-colors duration-200">
                            {uni.name}
                          </p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className={`text-[0.6rem] tracking-widest uppercase px-2 py-0.5 rounded-full border font-medium ${
                              uni.type === 'Public'
                                ? 'bg-[#0F6A5B]/15 border-[#0F6A5B]/30 text-[#5ecfbe]'
                                : uni.type === 'Special'
                                ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]'
                                : 'bg-[#7A0C3A]/15 border-[#7A0C3A]/30 text-[#e879a0]'
                            }`}>
                              {uni.type}
                            </span>
                            <span className="text-white/30 text-[0.68rem]">Est. {uni.founded}</span>
                            <span className="text-white/30 text-[0.68rem]">{uni.students} students</span>
                            {/* Application fee quick view */}
                            {uni.fees?.applicationFee && (
                              <span className={`text-[0.6rem] font-medium ${
                                uni.fees.applicationFee === 'No Fee' ? 'text-[#5ecfbe]' : 'text-[#D4AF37]'
                              }`}>
                                {uni.fees.applicationFee === 'No Fee' ? 'Free App' : `App: ${uni.fees.applicationFee}`}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-200">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-[#D4AF37]">
                            <path d="M2 6h8M7 3l3 3-3 3"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="h-4 w-full flex-shrink-0" />
                </div>

                {region.universities.length > 4 && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c1f1a] to-transparent pointer-events-none z-20" />
                )}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-white/[0.06] px-4 py-4">
                <button className="w-full relative overflow-hidden group bg-[#0F6A5B] text-white text-[0.75rem] font-medium tracking-widest uppercase py-3 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)]">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Get Admission Guidance for {selected}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}