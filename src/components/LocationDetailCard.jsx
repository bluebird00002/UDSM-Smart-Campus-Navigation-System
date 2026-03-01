import React, { useEffect, useState } from 'react'
import { Clock, Users, Briefcase, Calendar, Phone, Mail, User, CheckCircle, AlertCircle, XCircle, Navigation, Coffee, Wifi, Zap, Wind, Accessibility, BookOpen, Star, ChevronDown, MapPin } from 'lucide-react'

// Minimal mock dataset for fallback
const UDSM_LOCATIONS = [
  { id: 1, locationName: 'Dean of Students Office', building: 'Main Administration Building', block: 'Block A', floor: 'Ground Floor', type: 'Office', status: 'Open', description: 'Handles student welfare and support.', services: ['Advising', 'Counseling'], staff: [{ name: 'Prof. A. Kapinga', title: 'Dean', availability: 'available', phone: '+255 22 241 0001', email: 'a.kapinga@udsm.ac.tz' }], events: [], distance: 250, duration: 4, workingHours: 'Mon–Fri: 8:00 AM – 5:00 PM', additionalInfo: ['Student support available'], features: ['WiFi','AC','Charging','Accessible'], reviews: [
    { name: 'Aisha M.', date: '2026-02-25', rating: 5, comment: 'Helpful staff and quick service. Comfortable waiting area.' },
    { name: 'John K.', date: '2026-02-20', rating: 4, comment: 'Got assistance with registration. A bit crowded.' },
    { name: 'Moses L.', date: '2026-01-15', rating: 5, comment: 'Very organized and friendly staff.' }
  ] }
]

export default function LocationDetailCard({ locationId = 1, location: locationProp = null, theme = 'light', onStartNavigation = null, onClose = null, isMobile = false }) {
  const [location, setLocation] = useState(null)
  const [animateIn, setAnimateIn] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)

  useEffect(() => {
    if (locationProp && typeof locationProp === 'object') setLocation(locationProp)
    else {
      const found = UDSM_LOCATIONS.find(l => l.id === locationId)
      setLocation(found || UDSM_LOCATIONS[0])
    }
    const t = setTimeout(() => setAnimateIn(true), 40)
    return () => clearTimeout(t)
  }, [locationId, locationProp])

  if (!location) return null

  // Defensive normalization: ensure arrays exist
  const reviews = Array.isArray(location.reviews) ? location.reviews : []
  const staff = Array.isArray(location.staff) ? location.staff : []
  const events = Array.isArray(location.events) ? location.events : []
  const workingHours = location.workingHours ?? location.openingHours ?? 'Not specified'
  
  // Extract features from boolean properties
  const featuresList = []
  if (location.wifi) featuresList.push('WiFi')
  if (location.ac) featuresList.push('AC')
  if (location.charging) featuresList.push('Charging')
  if (location.parking) featuresList.push('Parking')
  if (location.food) featuresList.push('Food')
  if (location.wheelchair) featuresList.push('Accessible')

  // Map fields to a consistent `loc` object used by UI
  const loc = {
    id: location.id,
    locationName: location.locationName ?? location.name ?? 'Unknown Location',
    building: location.building ?? location.buildingName ?? '',
    block: location.block ?? location.blockNumber ?? '',
    floor: location.floor ?? location.floorNumber ?? '',
    type: location.type ?? '',
    status: location.status ?? 'Unknown',
    description: location.description ?? location.detailedDesc ?? location.desc ?? 'Comprehensive study and research facility with modern amenities.',
    staff,
    events,
    distance: location.distance ?? null,
    duration: location.duration ?? null,
    workingHours,
    reviews
  }

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'open': return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' }
      case 'closed': return { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
      case 'occupied': return { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' }
      case 'temporarily closed': return { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' }
    }
  }

  const getAvailabilityBadge = (availability) => {
    switch ((availability || '').toLowerCase()) {
      case 'available': return { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
      case 'busy': return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle }
      case 'away': return { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: User }
    }
  }

  const statusColor = getStatusColor(loc.status)

  const baseTheme = theme === 'dark'
    ? {
      card: 'bg-gray-900 border border-gray-800',
      text: 'text-gray-100',
      subtext: 'text-gray-400',
      section: 'bg-gray-800 border border-gray-700',
      hover: 'hover:bg-gray-700',
      divider: 'border-gray-700'
    }
    : {
      card: 'bg-white border border-gray-100',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      section: 'bg-gray-50 border border-gray-100',
      hover: 'hover:bg-gray-100',
      divider: 'border-gray-100'
    }

  // Friendly facility type mapping
  const facilityTypeLabel = (() => {
    const t = (loc.type || '').toLowerCase()
    if (!t) return ''
    if (t.includes('service')) return 'Service'
    if (t.includes('admin') || t.includes('administration')) return 'Administration'
    if (t.includes('acad') || t.includes('faculty') || t.includes('department') || t.includes('lecture') || t.includes('office')) return 'Academic'
    return loc.type
  })()

  // Only show building/block/floor parts that exist, joined by a single dot
  const locationParts = [loc.building, loc.block, loc.floor].filter(Boolean).join(' • ')

  // Show top 2 reviews by default or all if "Load More" is clicked
  const displayedReviews = showAllReviews ? loc.reviews : loc.reviews.slice(0, 2)
  const hasMoreReviews = loc.reviews.length > 2

  return (
    <div className={`fixed inset-0 z-[10000] flex ${isMobile ? 'items-center' : 'items-center'} justify-center pointer-events-auto px-4 py-4`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onClose && onClose()} />
      <div className={`relative w-full ${isMobile ? 'max-w-md rounded-2xl' : 'max-w-3xl rounded-2xl'} shadow-2xl transition-all duration-500 transform ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'} ${baseTheme.card}`} style={{ zIndex: 10001, maxHeight: isMobile ? '80vh' : '90vh', overflow: 'hidden' }}>
        
        {/* Close button with proper spacing */}
        <button onClick={() => onClose && onClose()} className={`absolute top-5 right-5 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white/80 hover:bg-gray-100 text-gray-700'}`}>
          <XCircle className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className={`px-5 pt-6 pb-4 border-b ${baseTheme.divider} pr-12`}>
          <div className="flex items-start gap-4 justify-between">
            <div className="flex-1 min-w-0">
              <h1 className={`text-2xl md:text-3xl font-extrabold ${baseTheme.text} truncate`}>{loc.locationName}</h1>
              {facilityTypeLabel ? (
                <div className={`text-sm md:text-base ${baseTheme.subtext} mt-1`}>{facilityTypeLabel}</div>
              ) : null}
              {locationParts ? (
                <div className={`text-sm md:text-base ${baseTheme.subtext} mt-1 truncate`}>{locationParts}</div>
              ) : null}
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${statusColor.bg} ${statusColor.text} whitespace-nowrap`}>
                <span className={`w-2 h-2 rounded-full ${statusColor.dot}`}></span>
                {loc.status || 'Unknown'}
              </div>
            </div>
          </div>
        </div>

        {/* Hide scrollbar styles */}
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none} .hide-scrollbar{-ms-overflow-style:none; scrollbar-width:none;}`}</style>

        {/* Content - scrollable */}
        <div className="overflow-y-auto px-5 py-4 hide-scrollbar" style={{ maxHeight: isMobile ? 'calc(80vh - 120px)' : 'calc(90vh - 120px)', WebkitOverflowScrolling: 'touch' }}>

          {/* Description */}
          <section className="mb-4">
            <p className={`${baseTheme.text} text-sm md:text-base leading-relaxed`}>{loc.description || 'A comprehensive facility providing services to the university community.'}</p>
          </section>

          {/* Features */}
          {featuresList.length > 0 && (
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-md font-semibold ${baseTheme.text}`}>Features</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuresList.map((f, i) => {
                  const key = (f || '').toString().toLowerCase()
                  let Icon = Coffee
                  if (key.includes('wifi')) Icon = Wifi
                  else if (key.includes('ac') || key.includes('air')) Icon = Wind
                  else if (key.includes('charge') || key.includes('power') || key.includes('outlet')) Icon = Zap
                  else if (key.includes('access') || key.includes('accessible')) Icon = Accessibility
                  else if (key.includes('parking')) Icon = Briefcase
                  return (
                    <span key={i} className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
                      <Icon className="w-4 h-4" /> {f}
                    </span>
                  )
                })}
              </div>
            </section>
          )}

          {/* Staff */}
          {staff.length > 0 && (
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-md font-semibold ${baseTheme.text}`}>Staff</h3>
              </div>
              <div className="space-y-3">
                {staff.map((m, idx) => {
                  const badge = getAvailabilityBadge(m.availability)
                  const AvIcon = badge.icon
                  return (
                    <div key={idx} className={`p-3 rounded-lg ${baseTheme.section} ${baseTheme.hover} flex items-start justify-between gap-3`}>
                      <div className="min-w-0">
                        <div className={`font-semibold ${baseTheme.text}`}>{m.name || '—'}</div>
                        <div className={`text-sm ${baseTheme.subtext}`}>{m.title || '—'}</div>
                        {m.phone && <div className={`text-xs ${baseTheme.subtext} mt-1`}>{m.phone}</div>}
                      </div>
                      <div className={`flex items-center gap-2 flex-shrink-0`}>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${badge.bg} ${badge.text} flex items-center gap-1 whitespace-nowrap`}><AvIcon size={14} />{(m.availability||'').charAt(0).toUpperCase() + (m.availability||'').slice(1)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Distance & Duration */}
          {(loc.distance || loc.duration) && (
            <section className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                {loc.distance && (
                  <div className={`p-3 rounded-lg ${baseTheme.section}`}>
                    <div className={`text-xs ${baseTheme.subtext} flex items-center gap-1`}><MapPin className="w-4 h-4" /> Distance</div>
                    <div className={`text-lg font-semibold ${baseTheme.text} mt-1`}>{loc.distance} m</div>
                  </div>
                )}
                {loc.duration && (
                  <div className={`p-3 rounded-lg ${baseTheme.section}`}>
                    <div className={`text-xs ${baseTheme.subtext} flex items-center gap-1`}><Clock className="w-4 h-4" /> Walk Time</div>
                    <div className={`text-lg font-semibold ${baseTheme.text} mt-1`}>{loc.duration} min</div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Navigation Button */}
          <section className="mb-4">
            <button onClick={() => onStartNavigation && onStartNavigation()} className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}>
              <Navigation className="w-5 h-5" /> Start Navigation
            </button>
          </section>

          {/* Working Hours */}
          <section className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h4 className={`text-sm font-semibold ${baseTheme.text}`}>Working Hours</h4>
            </div>
            <div className={`p-3 rounded-lg ${baseTheme.section}`}><div className={`${baseTheme.text} text-sm`}>{loc.workingHours || 'Not specified'}</div></div>
          </section>

          {/* Reviews */}
          {loc.reviews && loc.reviews.length > 0 && (
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                <h4 className={`text-sm font-semibold ${baseTheme.text}`}>Student Reviews ({loc.reviews.length})</h4>
              </div>
              <div className="space-y-3">
                {displayedReviews.map((r, idx) => {
                  const dt = r.date ? new Date(r.date) : new Date()
                  const dateLabel = dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
                  return (
                    <div key={idx} className={`p-3 rounded-lg ${baseTheme.section}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">{(r.name||'U').charAt(0)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className={`font-semibold ${baseTheme.text} truncate`}>{r.name || 'Student'}</div>
                            <div className={`text-xs ${baseTheme.subtext} flex-shrink-0`}>{dateLabel}</div>
                          </div>
                          {r.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < r.rating ? 'fill-yellow-400 text-yellow-400' : `text-gray-300`} />
                              ))}
                            </div>
                          )}
                          {r.comment && (
                            <div className={`text-sm ${baseTheme.text} mt-2 leading-relaxed`}>{r.comment}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Load More Reviews Button */}
              {hasMoreReviews && !showAllReviews && (
                <button onClick={() => setShowAllReviews(true)} className={`w-full py-2 mt-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' : 'bg-gray-50 text-blue-600 hover:bg-gray-100'} transition-colors`}>
                  <ChevronDown className="w-4 h-4" /> Load More Reviews ({loc.reviews.length - 2})
                </button>
              )}
              {showAllReviews && hasMoreReviews && (
                <button onClick={() => setShowAllReviews(false)} className={`w-full py-2 mt-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' : 'bg-gray-50 text-blue-600 hover:bg-gray-100'} transition-colors`}>
                  <ChevronDown className="w-4 h-4 transform rotate-180" /> Show Less
                </button>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Export mock data for use in other components
export { UDSM_LOCATIONS }
