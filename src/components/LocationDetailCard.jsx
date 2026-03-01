import React, { useEffect, useState } from 'react'
import { MapPin, Clock, Users, Briefcase, Calendar, Phone, Mail, User, CheckCircle, AlertCircle, XCircle, Navigation, Plus, Coffee, Wifi, Zap, Wind, Accessibility, BookOpen } from 'lucide-react'

// Minimal mock dataset for fallback (kept small here)
const UDSM_LOCATIONS = [
  { id: 1, locationName: 'Dean of Students Office', building: 'Main Administration Building', block: 'Block A', floor: 'Ground Floor', type: 'Office', status: 'Open', description: 'Handles student welfare and support.', services: ['Advising', 'Counseling'], staff: [{ name: 'Prof. A. Kapinga', title: 'Dean', availability: 'available', phone: '+255 22 241 0001', email: 'a.kapinga@udsm.ac.tz' }], events: [], distance: 250, duration: 4, workingHours: 'Mon–Fri: 8:00 AM – 5:00 PM', additionalInfo: ['Student support available'] }
]

export default function LocationDetailCard({ locationId = 1, location: locationProp = null, theme = 'light', onStartNavigation = null, onClose = null, isMobile = false }) {
  const [location, setLocation] = useState(null)
  const [animateIn, setAnimateIn] = useState(false)

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
  const services = Array.isArray(location.services) ? location.services : (Array.isArray(location.servicesOffered) ? location.servicesOffered : [])
  const staff = Array.isArray(location.staff) ? location.staff : []
  const events = Array.isArray(location.events) ? location.events : []
  const additionalInfo = Array.isArray(location.additionalInfo) ? location.additionalInfo : (location.additionalInfo ? [location.additionalInfo] : [])
  const reviews = Array.isArray(location.reviews) ? location.reviews : []
  const workingHours = location.workingHours ?? location.openingHours ?? 'Not specified'

  // Map fields to a consistent `loc` object used by UI
  const loc = {
    id: location.id,
    locationName: location.locationName ?? location.name ?? 'Unknown Location',
    building: location.building ?? location.buildingName ?? '',
    block: location.block ?? location.blockNumber ?? '',
    floor: location.floor ?? location.floorNumber ?? '',
    type: location.type ?? '',
    status: location.status ?? 'Unknown',
    description: location.description ?? location.detailedDesc ?? location.desc ?? '',
    services,
    staff,
    events,
    distance: location.distance ?? null,
    duration: location.duration ?? null,
    workingHours,
    additionalInfo,
    reviews
  }

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'open': return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' }
      case 'closed': return { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
      case 'occupied': return { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' }
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

  return (
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center pointer-events-auto px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onClose && onClose()} />
      <div className={`relative w-full ${isMobile ? 'max-w-full rounded-t-2xl' : 'max-w-3xl rounded-2xl'} shadow-2xl transition-all duration-500 transform ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${baseTheme.card}`} style={{ zIndex: 10001, maxHeight: '90vh', overflow: 'hidden' }}>
        <button onClick={() => onClose && onClose()} className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white/80 hover:bg-gray-100 text-gray-700'}`}>
          <XCircle className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className={`px-5 pt-6 pb-4 border-b ${baseTheme.divider}`}>
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className={`text-2xl md:text-3xl font-extrabold ${baseTheme.text} truncate`}>{loc.locationName}</h1>
              <div className={`text-sm md:text-base ${baseTheme.subtext} mt-1 truncate`}>{loc.building || '—'} • {loc.block || '—'} • {loc.floor || '—'}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${theme === 'dark' ? 'bg-black/30 text-white' : 'bg-white/80 text-gray-800'} border ${baseTheme.divider}`}>{loc.type}</span>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${statusColor.bg} ${statusColor.text}`}>
                <span className={`w-2 h-2 rounded-full ${statusColor.dot}`}></span>
                {loc.status || 'Unknown'}
              </div>
            </div>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="overflow-y-auto px-5 py-4" style={{ maxHeight: 'calc(90vh - 96px)' }}>

          {/* Description */}
          <section className="mb-4">
            <p className={`${baseTheme.text} text-sm md:text-base leading-relaxed`}>{loc.description || 'No description available.'}</p>
          </section>

          {/* Services */}
          <section className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Coffee className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-md font-semibold ${baseTheme.text}`}>Services</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(services.length ? services : ['No services listed']).map((s, i) => (
                <span key={i} className={`px-3 py-1.5 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>{s}</span>
              ))}
            </div>
          </section>

          {/* Staff */}
          <section className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-md font-semibold ${baseTheme.text}`}>Staff</h3>
            </div>
            <div className="space-y-3">
              {staff.length ? staff.map((m, idx) => {
                const badge = getAvailabilityBadge(m.availability)
                const AvIcon = badge.icon
                return (
                  <div key={idx} className={`p-3 rounded-lg ${baseTheme.section} ${baseTheme.hover} flex items-start justify-between gap-3`}>
                    <div className="min-w-0">
                      <div className={`font-semibold ${baseTheme.text}`}>{m.name || '—'}</div>
                      <div className={`text-sm ${baseTheme.subtext}`}>{m.title || '—'}</div>
                    </div>
                    <div className={`flex items-center gap-2`}>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${badge.bg} ${badge.text} flex items-center gap-1`}><AvIcon size={14} />{(m.availability||'').charAt(0).toUpperCase() + (m.availability||'').slice(1)}</span>
                    </div>
                  </div>
                )
              }) : (
                <div className={`p-3 rounded-lg ${baseTheme.section} ${baseTheme.hover}`}>
                  <div className={`${baseTheme.text} text-sm`}>{loc.type && loc.type.toLowerCase().includes('service') ? 'Public facility — staff not listed.' : 'No staff information available.'}</div>
                </div>
              )}
            </div>
          </section>

          {/* Events */}
          <section className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-md font-semibold ${baseTheme.text}`}>Events</h3>
            </div>
            <div className="space-y-2">
              {events.length ? events.map((e, i) => (
                <div key={i} className={`p-3 rounded-lg ${baseTheme.section}`}>
                  <div className={`font-semibold ${baseTheme.text}`}>{e.title || 'Event'}</div>
                  <div className={`text-xs ${baseTheme.subtext}`}>{e.date || ''} {e.time ? `• ${e.time}` : ''}</div>
                </div>
              )) : (
                <div className={`p-3 rounded-lg ${baseTheme.section}`}>
                  <div className={`${baseTheme.text} text-sm`}>No events scheduled.</div>
                </div>
              )}
            </div>
          </section>

          {/* Navigation & Working Hours */}
          <section className="mb-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className={`p-3 rounded-lg ${baseTheme.section}`}>
                <div className={`text-xs ${baseTheme.subtext}`}>Distance</div>
                <div className={`text-lg font-semibold ${baseTheme.text}`}>{loc.distance ? `${loc.distance} m` : '—'}</div>
              </div>
              <div className={`p-3 rounded-lg ${baseTheme.section}`}>
                <div className={`text-xs ${baseTheme.subtext}`}>Walking Time</div>
                <div className={`text-lg font-semibold ${baseTheme.text}`}>{loc.duration ? `${loc.duration} min` : '—'}</div>
              </div>
            </div>
            <button onClick={() => onStartNavigation && onStartNavigation()} className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-95`}>
              <Navigation className="w-4 h-4" /> Start Navigation
            </button>
          </section>

          {/* Working Hours & Additional Info */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h4 className={`text-sm font-semibold ${baseTheme.text}`}>Working Hours</h4>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${baseTheme.section} mb-3`}><div className={`${baseTheme.text} text-sm`}>{loc.workingHours || 'Not specified'}</div></div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h4 className={`text-sm font-semibold ${baseTheme.text}`}>Additional Info</h4>
              </div>
            </div>
            {(loc.additionalInfo && loc.additionalInfo.length) ? loc.additionalInfo.map((a,i)=>(
              <div key={i} className={`p-3 rounded-lg ${baseTheme.section} mb-2`}><div className={`${baseTheme.text} text-sm`}>{a}</div></div>
            )) : (
              <div className={`p-3 rounded-lg ${baseTheme.section}`}><div className={`${baseTheme.text} text-sm`}>No additional information.</div></div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

// Export mock data for use in other components
export { UDSM_LOCATIONS }
