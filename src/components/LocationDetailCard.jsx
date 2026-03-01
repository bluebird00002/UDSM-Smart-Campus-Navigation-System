import React, { useEffect, useState } from 'react'
import { MapPin, Clock, Users, Briefcase, Calendar, Phone, Mail, User, CheckCircle, AlertCircle, XCircle, Navigation, Plus, Coffee, Wifi, Zap, Wind, Accessibility, BookOpen } from 'lucide-react'

// Mock data for UDSM locations
const UDSM_LOCATIONS = [
  {
    id: 1,
    locationName: 'Dean of Students Office',
    building: 'Main Administration Building',
    block: 'Block A',
    floor: 'Ground Floor',
    type: 'Administrative Office',
    status: 'Open',
    description: 'The Dean of Students office handles student welfare, disciplinary matters, and student support services. They coordinate with various student organizations and manage student grievances.',
    services: ['Student Support', 'Counseling Services', 'Grievance Handling', 'Student Welfare'],
    staff: [
      { name: 'Prof. Dr. Emmanuel Kapinga', title: 'Dean of Students', availability: 'available', phone: '+255 22 241 0001', email: 'e.kapinga@udsm.ac.tz' },
      { name: 'Ms. Sarah Mwambe', title: 'Assistant Dean', availability: 'available', phone: '+255 22 241 0002', email: 's.mwambe@udsm.ac.tz' },
      { name: 'Mr. Vincent Mushi', title: 'Student Services Officer', availability: 'busy', phone: '+255 22 241 0003', email: 'v.mushi@udsm.ac.tz' }
    ],
    events: [
      { title: 'Student Forum Meeting', time: '2:00 PM - 4:00 PM', date: 'Today' },
      { title: 'Disciplinary Committee', time: '10:00 AM - 12:00 PM', date: 'Tomorrow' },
      { title: 'Student Welfare Briefing', time: '3:30 PM - 5:00 PM', date: 'Friday' }
    ],
    distance: 250,
    duration: 4,
    workingHours: 'Mon–Fri: 8:00 AM – 5:00 PM, Sat: 9:00 AM – 2:00 PM',
    additionalInfo: [
      'Student visa support available',
      'Emergency accommodation assistance',
      'Mental health counseling services'
    ]
  },
  {
    id: 2,
    locationName: 'Directorate of ICT',
    building: 'ICT Complex',
    block: 'East Wing',
    floor: '3 Floors',
    type: 'Technology Center',
    status: 'Open',
    description: 'The Directorate of ICT provides technological support, system administration, network infrastructure, and IT training for the university community. Manages campus WiFi, email systems, and student portal.',
    services: ['WiFi Support', 'Email Service', 'IT Training', 'Network Services', 'Computer Labs', 'Phone Support'],
    staff: [
      { name: 'Dr. Julius Mrema', title: 'Director of ICT', availability: 'available', phone: '+255 22 241 0010', email: 'j.mrema@udsm.ac.tz' },
      { name: 'Mr. Fabian Kahinga', title: 'Network Administrator', availability: 'busy', phone: '+255 22 241 0011', email: 'f.kahinga@udsm.ac.tz' },
      { name: 'Ms. Grace Mutemi', title: 'Help Desk Officer', availability: 'available', phone: '+255 22 241 0012', email: 'g.mutemi@udsm.ac.tz' },
      { name: 'Mr. Samuel Kitaye', title: 'Systems Administrator', availability: 'away', phone: '+255 22 241 0013', email: 's.kitaye@udsm.ac.tz' }
    ],
    events: [
      { title: 'System Maintenance', time: '2:00 AM - 4:00 AM', date: 'Sunday' },
      { title: 'WiFi Network Upgrade', time: '10:00 PM', date: 'Next Week' }
    ],
    distance: 450,
    duration: 7,
    workingHours: 'Mon–Fri: 7:30 AM – 6:00 PM, Sat–Sun: On-call support',
    additionalInfo: [
      '24/7 technical support available',
      'Incident reporting available via helpdesk@udsm.ac.tz',
      'Password reset self-service at portal'
    ]
  },
  {
    id: 3,
    locationName: 'Faculty of Science Lecture Hall',
    building: 'Science Building',
    block: 'Central',
    floor: '2nd Floor',
    type: 'Lecture Hall',
    status: 'Occupied',
    description: 'State-of-the-art lecture hall equipped with modern AV facilities. Supports 200+ students with comfortable seating, air conditioning, and excellent acoustics for lectures and seminars.',
    services: ['WiFi', 'Air Conditioning', 'Projector & Sound System', 'Accessibility Features', 'Power Access'],
    staff: [
      { name: 'Prof. Dr. Mpiana Gontha', title: 'Head of Department', availability: 'available', phone: '+255 22 241 0020', email: 'm.gontha@udsm.ac.tz' },
      { name: 'Mr. Robert Mchaki', title: 'Technical Support', availability: 'available', phone: '+255 22 241 0021', email: 'r.mchaki@udsm.ac.tz' }
    ],
    events: [
      { title: 'Organic Chemistry Lecture', time: '9:00 AM - 11:00 AM', date: 'Today' },
      { title: 'Physics Practical Session', time: '2:00 PM - 4:00 PM', date: 'Today' },
      { title: 'Seminar: Climate Change Research', time: '10:00 AM - 12:00 PM', date: 'Wednesday' }
    ],
    distance: 320,
    duration: 5,
    workingHours: 'Mon–Fri: 7:00 AM – 7:00 PM, Sat: 9:00 AM – 2:00 PM',
    additionalInfo: [
      'Lecture recording equipment available',
      'Parking available nearby (50 spaces)',
      'Bathroom facilities on ground floor'
    ]
  },
  {
    id: 4,
    locationName: 'Student Health Center',
    building: 'Health & Wellness Building',
    block: 'South',
    floor: 'Ground Floor, 1st Floor',
    type: 'Healthcare Facility',
    status: 'Open',
    description: 'Comprehensive student healthcare facility providing medical consultations, first aid, vaccination services, and health advice. Staffed with qualified medical professionals.',
    services: ['Medical Consultation', 'First Aid', 'Vaccinations', 'Health Screening', 'Counseling', 'Pharmacy'],
    staff: [
      { name: 'Dr. Martha Kilonzo', title: 'Chief Medical Officer', availability: 'available', phone: '+255 22 241 0030', email: 'm.kilonzo@udsm.ac.tz' },
      { name: 'Nurse Catherine Mwita', title: 'Senior Nurse', availability: 'busy', phone: '+255 22 241 0031', email: 'c.mwita@udsm.ac.tz' },
      { name: 'Ms. Jane Kipchoge', title: 'Health Counselor', availability: 'available', phone: '+255 22 241 0032', email: 'j.kipchoge@udsm.ac.tz' }
    ],
    events: [
      { title: 'Free Health Screening', time: '10:00 AM - 2:00 PM', date: 'Monday & Wednesday' },
      { title: 'Mental Health Awareness', time: '3:00 PM - 4:30 PM', date: 'Thursday' }
    ],
    distance: 180,
    duration: 3,
    workingHours: 'Mon–Fri: 8:00 AM – 5:00 PM, Emergency: 24/7',
    additionalInfo: [
      'Emergency services available 24/7',
      'Pharmacy with discounted medications',
      'Mental health support confidential services'
    ]
  },
  {
    id: 5,
    locationName: 'Main Library - Reference Section',
    building: 'Central Library Complex',
    block: 'Wing A',
    floor: '2nd Floor',
    type: 'Library',
    status: 'Open',
    description: 'Comprehensive reference library with extensive collections of journals, books, databases, and research materials. Provides quiet study spaces, computer terminals, and research support.',
    services: ['WiFi', 'Computer Access', 'Printing', 'Book Lending', 'Research Support', 'Study Tables'],
    staff: [
      { name: 'Mrs. Amelia Nyambura', title: 'Head Librarian', availability: 'available', phone: '+255 22 241 0040', email: 'a.nyambura@udsm.ac.tz' },
      { name: 'Mr. David Kamau', title: 'Reference Librarian', availability: 'available', phone: '+255 22 241 0041', email: 'd.kamau@udsm.ac.tz' }
    ],
    events: [
      { title: 'Library Orientation - New Students', time: '2:00 PM - 3:30 PM', date: 'Tuesday & Thursday' },
      { title: 'Research Methods Workshop', time: '10:00 AM - 12:00 PM', date: 'Wednesday' }
    ],
    distance: 380,
    duration: 6,
    workingHours: 'Mon–Fri: 8:00 AM – 10:00 PM, Sat: 10:00 AM – 6:00 PM, Sun: 2:00 PM – 10:00 PM',
    additionalInfo: [
      'Over 100,000 books in collection',
      'Access to 50+ online databases',
      'Quiet zones for concentrated study'
    ]
  }
]

export default function LocationDetailCard({ locationId = 1, location: locationProp = null, theme = 'light', onStartNavigation = null }) {
  const [location, setLocation] = useState(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Prefer a passed `location` object prop when available, otherwise fall back to lookup by id
    if (locationProp && typeof locationProp === 'object') {
      setLocation(locationProp)
    } else {
      const selectedLocation = UDSM_LOCATIONS.find(loc => loc.id === locationId)
      setLocation(selectedLocation || UDSM_LOCATIONS[0])
    }

    // Trigger animation
    const timer = setTimeout(() => setAnimateIn(true), 50)
    return () => clearTimeout(timer)
  }, [locationId, locationProp])

  if (!location) return null

  // Ensure arrays exist to avoid runtime .map on undefined when different data shapes are passed
  location.services = Array.isArray(location.services) ? location.services : []
  location.staff = Array.isArray(location.staff) ? location.staff : []
  location.events = Array.isArray(location.events) ? location.events : []
  location.additionalInfo = Array.isArray(location.additionalInfo) ? location.additionalInfo : []
  location.reviews = Array.isArray(location.reviews) ? location.reviews : []
  location.workingHours = location.workingHours ?? location.openingHours ?? ''

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' }
      case 'Closed': return { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
      case 'Occupied': return { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' }
    }
  }

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'available':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
      case 'busy':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle }
      case 'away':
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: User }
    }
  }

  const statusColor = getStatusColor(location.status)
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
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-lg transition-all duration-700 transform ${
          animateIn
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        } ${baseTheme.card}`}
      >
        {/* HEADER SECTION */}
        <div className={`p-6 border-b ${baseTheme.divider}`}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h1 className={`text-3xl font-bold ${baseTheme.text} mb-1`}>
                {location.locationName}
              </h1>
              <p className={`text-sm ${baseTheme.subtext}`}>
                {location.building} • {location.block} • {location.floor}
              </p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusColor.bg} ${statusColor.text}`}>
              <span className={`w-2 h-2 rounded-full ${statusColor.dot}`}></span>
              {location.status}
            </div>
          </div>
          <div className="inline-block">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
              {location.type}
            </span>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="p-6 border-b border-gray-100">
          <p className={`${baseTheme.text} leading-relaxed`}>
            {location.description}
          </p>
        </div>

        {/* SERVICES SECTION */}
        <div className={`p-6 border-b ${baseTheme.divider}`}>
          <div className="flex items-center gap-2 mb-4">
            <Coffee className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-lg font-semibold ${baseTheme.text}`}>Services Offered</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {location.services.map((service, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-blue-900/20 text-blue-300 hover:bg-blue-900/40'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* WORKING HOURS SECTION */}
        <div className={`p-6 border-b ${baseTheme.divider}`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-lg font-semibold ${baseTheme.text}`}>Working Hours</h2>
          </div>
          <p className={`${baseTheme.subtext} text-sm`}>{location.workingHours}</p>
        </div>

        {/* STAFF SECTION */}
        {location.staff && location.staff.length > 0 && (
          <div className={`p-6 border-b ${baseTheme.divider}`}>
            <div className="flex items-center gap-2 mb-4">
              <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-lg font-semibold ${baseTheme.text}`}>Staff Information</h2>
            </div>
            <div className="space-y-3">
              {location.staff.map((member, idx) => {
                const availabilityBadge = getAvailabilityBadge(member.availability)
                const AvailabilityIcon = availabilityBadge.icon
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg transition-all duration-200 ${baseTheme.section} ${baseTheme.hover} cursor-pointer`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className={`font-semibold ${baseTheme.text}`}>{member.name}</p>
                        <p className={`text-sm ${baseTheme.subtext}`}>{member.title}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${availabilityBadge.bg} ${availabilityBadge.text}`}>
                        <AvailabilityIcon size={12} />
                        {member.availability.charAt(0).toUpperCase() + member.availability.slice(1)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className={baseTheme.subtext} />
                        <a href={`tel:${member.phone}`} className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className={baseTheme.subtext} />
                        <a href={`mailto:${member.email}`} className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* EVENTS SECTION */}
        {location.events && location.events.length > 0 && (
          <div className={`p-6 border-b ${baseTheme.divider}`}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-lg font-semibold ${baseTheme.text}`}>Events & Schedule</h2>
            </div>
            <div className="space-y-2">
              {location.events.map((event, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${baseTheme.section}`}>
                  <p className={`font-semibold text-sm ${baseTheme.text}`}>{event.title}</p>
                  <p className={`text-xs ${baseTheme.subtext}`}>
                    {event.date} • {event.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NAVIGATION & DISTANCE SECTION */}
        <div className={`p-6 border-b ${baseTheme.divider}`}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-3 rounded-lg ${baseTheme.section}`}>
              <p className={`text-xs ${baseTheme.subtext} mb-1`}>Distance</p>
              <p className={`text-2xl font-bold ${baseTheme.text}`}>{location.distance}m</p>
            </div>
            <div className={`p-3 rounded-lg ${baseTheme.section}`}>
              <p className={`text-xs ${baseTheme.subtext} mb-1`}>Walking Time</p>
              <p className={`text-2xl font-bold ${baseTheme.text}`}>{location.duration} min</p>
            </div>
          </div>
          <button
            onClick={() => onStartNavigation && onStartNavigation()}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
            } hover:scale-105 active:scale-95`}
          >
            <Navigation size={18} />
            Start Navigation
          </button>
        </div>

        {/* ADDITIONAL INFORMATION SECTION */}
        {location.additionalInfo && location.additionalInfo.length > 0 && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${baseTheme.text}`}>Additional Information</h2>
              <button className={`p-2 rounded-lg transition-all duration-200 ${baseTheme.section} ${baseTheme.hover}`}>
                <Plus size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
              </button>
            </div>
            <div className="space-y-2">
              {location.additionalInfo.map((info, idx) => (
                <div key={idx} className={`p-3 rounded-lg text-sm ${baseTheme.section}`}>
                  <p className={baseTheme.text}>• {info}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Export mock data for use in other components
export { UDSM_LOCATIONS }
