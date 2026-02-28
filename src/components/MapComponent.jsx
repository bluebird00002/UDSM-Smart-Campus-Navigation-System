import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, Marker } from 'react-leaflet'
import L from 'leaflet'
import { 
  Navigation, 
  Wifi, 
  Wind, 
  Car, 
  Accessibility as Accessible, 
  Coffee, 
  Zap, 
  Clock, 
  Star, 
  ChevronDown,
  X,
  MapPin,
  ArrowRight,
  User
} from 'lucide-react'
import { useMap } from 'react-leaflet'

// Custom icons for pathway - Start (green) and End (blue)
const startIcon = new L.DivIcon({
  className: 'custom-icon',
  html: `<div style="background-color: #22c55e; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000;"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
})

const endIcon = new L.DivIcon({
  className: 'custom-icon',
  html: `<div style="background-color: #3b82f6; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000;"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
})

// Component to handle map view changes
function MapController({ center, zoom, selectedLocation }) {
  const map = useMap()
  
  useEffect(() => {
    // Only respond to center/zoom changes from parent. Avoid auto-flying
    // when a popup or selection opens to prevent map jitter.
    if (center) {
      map.setView(center, zoom, { animate: true })
    }
  }, [center, zoom, selectedLocation, map])
  
  return null
}

export default function MapComponent({ center = [-6.7751, 39.2086], locations = [], onSelect, selected, searchQuery = '', recentSearches = [], onNavigationChange, isMobile, theme = 'light' }) {
  const mapRef = useRef()
  const [largePopupLocation, setLargePopupLocation] = useState(null)
  const [pathway, setPathway] = useState(null)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [animatePopup, setAnimatePopup] = useState(false)
  const [navigationDetails, setNavigationDetails] = useState(null)


  // open popup when parent changes selected prop
  useEffect(() => {
    if (selected) {
      openPopup(selected)
    }
  }, [selected])


  // Handle recent search click
  const handleRecentSearchClick = (searchTerm) => {
    // Find the location that matches the recent search
    const loc = locations.find(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()))
    if (loc) {
      setLargePopupLocation(loc)
      if(onSelect) onSelect(loc)
    }
  }

  // Handle navigate button click
  const handleNavigate = (destination) => {
    const currentLocation = center
    const pathwayCoords = [currentLocation, destination.coords]
    setPathway(pathwayCoords)
    
    // Mock data for estimation
    const mockDistance = Math.floor(Math.random() * 2000) + 500 // 500-2500 meters
    const mockTime = Math.ceil(mockDistance / 100) // Approximate walking time in minutes
    const startLocationName = 'Your Location'
    const endLocationName = destination.name
    
    // Set navigation details with destination object
    setNavigationDetails({
      time: mockTime,
      distance: mockDistance,
      from: startLocationName,
      to: endLocationName,
      destination: destination
    })
    
    // Close the popup
    closePopup()
    
    // Notify parent that navigation started
    if (onNavigationChange) {
      onNavigationChange(true)
    }
    
    // Zoom/fit map to pathway coordinates
    if (mapRef.current) {
      try {
        const bounds = L.latLngBounds(pathwayCoords)
        mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 18, animate: true })
      } catch (e) {
        mapRef.current.setView(destination.coords, 18, { animate: true })
      }
    }
  }

  // Close pathway
  const closePathway = () => {
    setPathway(null)
    setNavigationDetails(null)
    // Notify parent that navigation stopped
    if (onNavigationChange) {
      onNavigationChange(false)
    }
  }

  // Open popup with animation
  const openPopup = (loc) => {
    setAnimatePopup(false)
    setTimeout(() => {
      setLargePopupLocation(loc)
      setShowAllReviews(false)
      setTimeout(() => setAnimatePopup(true), 50)
    }, 10)
  }

  // Close popup
  const closePopup = () => {
    setAnimatePopup(false)
    setTimeout(() => {
      setLargePopupLocation(null)
    }, 300)
  }

  return (
    <div className="h-full relative">
      <MapContainer 
        whenCreated={m => mapRef.current = m} 
        center={center} 
        zoom={16} 
        scrollWheelZoom 
        style={{ height: '100vh' }} 
        className="leaflet-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController center={center} zoom={16} selectedLocation={largePopupLocation} />
        
        {locations.map(loc => {
          const color = loc.type === 'Academic' ? '#003366' : loc.type === 'Admin' ? '#28A745' : '#FFA500'
          const isSelected = selected?.id === loc.id
          return (
            <CircleMarker 
              key={loc.id} 
              center={loc.coords} 
              pathOptions={{ color, fillColor: color }} 
              radius={isSelected ? 14 : 9}
              eventHandlers={{
                click: () => {
                  if (!navigationDetails) {
                    openPopup(loc)
                    onSelect && onSelect(loc)
                  }
                }
              }}
            >
              {!navigationDetails && (
                <Popup className="custom-popup" closeButton={false}>
                  <div className="px-2 py-1 bg-white rounded-lg min-w-[120px]">
                    <div className="font-semibold text-md text-gray-800">{loc.name}</div>
                    <div className={`text-sm mt-0.5 flex items-center gap-1 ${
                      loc.status === 'Open' ? 'text-green-600' : 
                      loc.status === 'Closed' ? 'text-red-600' : 
                      loc.status === 'Occupied' ? 'text-yellow-600' : 'text-orange-600'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        loc.status === 'Open' ? 'bg-green-600' : 
                        loc.status === 'Closed' ? 'bg-red-600' : 
                        loc.status === 'Occupied' ? 'bg-yellow-600' : 'bg-orange-600'
                      }`}></span>
                      {loc.status}
                    </div>
                  </div>
                </Popup>
              )}
            </CircleMarker>
          )
        })}

        {/* Pathway with blue line and icons */}
        {pathway && pathway.length === 2 && (
          <>
            <Polyline 
              positions={pathway} 
              pathOptions={{ 
                color: '#3b82f6', 
                weight: 8,
                opacity: 0.9,
                dashArray: null,
                smoothFactor: 1,
                lineCap: 'round',
                lineJoin: 'round'
              }} 
            />
            <Marker position={pathway[0]} icon={startIcon} />
            <Marker position={pathway[1]} icon={endIcon} />
          </>
        )}
      </MapContainer>


      {/* Clear directions button removed; navigation canceled only via sheet */}

      {/* Navigation Panel */}
      {navigationDetails && (
        isMobile ? (
          <NavigationBottomSheet 
            navigationDetails={navigationDetails}
            onClose={closePathway}
            theme={theme}
          />
        ) : (
          <DesktopNavigationPanel
            navigationDetails={navigationDetails}
            onClose={closePathway}
            theme={theme}
          />
        )
      )}

      {/* Large Popup Modal - Hidden during navigation */}
      {largePopupLocation && !navigationDetails && (
        <LargePopup 
          location={largePopupLocation} 
          onClose={closePopup}
          onNavigate={() => handleNavigate(largePopupLocation)}
          animate={animatePopup}
          showAllReviews={showAllReviews}
          setShowAllReviews={setShowAllReviews}
          isMobile={isMobile}
          theme={theme}
        />
      )}

      {/* Removed Search Box Overlay */}
    </div>
  )
}

// Large Popup Component with detailed information
function LargePopup({ location, onClose, onNavigate, animate, showAllReviews, setShowAllReviews, isMobile, theme = 'light' }) {
  if (!location) return null

  const totalReviews = location.reviews?.length || 0
  const displayedReviews = showAllReviews
    ? location.reviews
    : location.reviews?.slice(0, 2) || []
  // number of reviews not currently shown when collapsed
  const hiddenCount = showAllReviews
    ? 0
    : Math.max(0, totalReviews - displayedReviews.length)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-500'
      case 'Closed': return 'bg-red-500'
      case 'Occupied': return 'bg-yellow-500'
      case 'Temporarily Closed': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600'
      case 'Closed': return 'text-red-600'
      case 'Occupied': return 'text-yellow-600'
      case 'Temporarily Closed': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

const features = [
    { key: 'wifi', label: 'WiFi', icon: Wifi, available: location.wifi },
    { key: 'ac', label: 'AC', icon: Wind, available: location.ac },
    { key: 'parking', label: 'Parking', icon: Car, available: location.parking },
    { key: 'wheelchair', label: 'Wheelchair', icon: Accessible, available: location.wheelchair },
    { key: 'food', label: 'Food', icon: Coffee, available: location.food },
    { key: 'charging', label: 'Charging', icon: Zap, available: location.charging },
  ]

  return (
    <div 
      className={`fixed inset-0 flex ${isMobile ? 'items-start pt-24' : 'items-center'} justify-center z-[10000] transition-all duration-300 ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Popup Content */}
      <div 
        className={`relative rounded-2xl shadow-2xl ${isMobile ? 'w-[90%] max-w-sm max-h-[80vh]' : 'w-[95%] max-w-md max-h-[85vh]'} overflow-hidden flex flex-col transform transition-all duration-500 ${
          animate ? 'scale-100 translate-y-0' : 'scale-75 translate-y-8'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          animation: animate ? 'elasticPopup 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-xl font-bold text-white mb-1">{location.name}</h2>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)} bg-white/20 text-white`}>
                  {location.status}
                </span>
                <span className="text-blue-100 text-xs">{location.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          {/* Description */}
          <div>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{location.detailedDesc || location.desc}</p>
          </div>

          {/* Opening Hours */}
          <div className={`flex items-start gap-2 p-2.5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Hours</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{location.openingHours}</div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Facilities</h3>
            <div className="grid grid-cols-3 gap-2">
              {features.map(feature => (
                <div 
                  key={feature.key}
                  className={`p-2 rounded-lg text-center transition-all ${
                    feature.available 
                      ? theme === 'dark' ? 'bg-blue-900/40 border border-blue-700' : 'bg-blue-50 border border-blue-100'
                      : theme === 'dark' ? 'bg-gray-800 border border-gray-700 opacity-40' : 'bg-gray-50 border border-gray-100 opacity-40'
                  }`}
                >
                  <feature.icon className={`w-4 h-4 mx-auto mb-0.5 ${feature.available ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600') : (theme === 'dark' ? 'text-gray-500' : 'text-gray-400')}`} />
                  <span className={`text-xs font-medium block ${feature.available ? (theme === 'dark' ? 'text-blue-300' : 'text-blue-700') : (theme === 'dark' ? 'text-gray-500' : 'text-gray-400')}`}>
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Reviews ({totalReviews})</h3>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} 
                  />
                ))}
                <span className={`text-xs ml-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>4.2</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {displayedReviews.map(review => (
                <div key={review.id} className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-start gap-2">
                    {/* placeholder avatar icon instead of real photo */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <User className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className={`font-medium text-xs ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{review.name}</div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{review.date}</div>
                      </div>
                      <p className={`text-xs mt-0.5 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More Reviews Button */}
            {(hiddenCount > 0 || showAllReviews) && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className={`w-full mt-2 py-1 text-xs font-medium flex items-center justify-center gap-0.5 transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                {showAllReviews ? 'Show Less' : `+${hiddenCount} More`}
                <ChevronDown className={`w-3 h-3 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Navigate Button - Sticky at bottom */}
        <div className={`border-t px-5 py-3 ${theme === 'dark' ? 'border-gray-800 bg-gray-800' : 'border-gray-100 bg-white'}`}>
          <button
            onClick={onNavigate}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Navigation className="w-4 h-4" />
            Navigate
          </button>
        </div>
      </div>

      {/* CSS for elastic animation */}
      <style>{`
        @keyframes elasticPopup {
          0% {
            transform: scale(0.5) translateY(40px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.95) translateY(5px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// Desktop navigation panel component
function DesktopNavigationPanel({ navigationDetails, onClose, theme = 'light' }) {
  return (
    <div className={`fixed bottom-0 right-0 m-6 z-[1000] w-80 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Navigation</h3>
          <button onClick={onClose} className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{navigationDetails.time} min</span>
        </div>
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{navigationDetails.distance} m</span>
        </div>
        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          From: <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{navigationDetails.from}</span>
        </div>
        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          To: <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{navigationDetails.to}</span>
        </div>
        {navigationDetails.destination?.detailedDesc && (
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{navigationDetails.destination.detailedDesc}</p>
        )}
        {navigationDetails.destination?.status && (
          <div className={`flex items-center justify-between p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Status</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
              navigationDetails.destination.status === 'Open' ? 'bg-green-500' :
              navigationDetails.destination.status === 'Closed' ? 'bg-red-500' :
              navigationDetails.destination.status === 'Occupied' ? 'bg-yellow-500' : 'bg-orange-500'
            }`}> {navigationDetails.destination.status}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Navigation Bottom Sheet Component
function NavigationBottomSheet({ navigationDetails, onClose, theme = 'light' }) {
  const [showDetails, setShowDetails] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [touchStartY, setTouchStartY] = useState(null)
  const sheetRef = useRef(null)
  const contentRef = useRef(null)

  // smooth height transition handles sliding; no translate to keep sheet visible


  const features = [
    { key: 'wifi', label: 'WiFi', icon: Wifi, available: navigationDetails.destination?.wifi },
    { key: 'ac', label: 'AC', icon: Wind, available: navigationDetails.destination?.ac },
    { key: 'parking', label: 'Parking', icon: Car, available: navigationDetails.destination?.parking },
    { key: 'wheelchair', label: 'Wheelchair', icon: Accessible, available: navigationDetails.destination?.wheelchair },
    { key: 'food', label: 'Food', icon: Coffee, available: navigationDetails.destination?.food },
    { key: 'charging', label: 'Charging', icon: Zap, available: navigationDetails.destination?.charging },
  ]

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up'
    
    setLastScrollTop(scrollTop)
    setShowDetails(scrollTop > 30)
    
    if (scrollDirection === 'down' && scrollTop > 50) {
      setIsMinimized(true)
    } else if (scrollDirection === 'up' && scrollTop < 50) {
      setIsMinimized(false)
    }
  }

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e) => {
    if (touchStartY === null) return
    const dy = touchStartY - e.touches[0].clientY
    // swipe up
    if (dy > 20 && isMinimized) {
      setIsMinimized(false)
    }
    // swipe down when expanded
    if (dy < -20 && !isMinimized) {
      setIsMinimized(true)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Full screen overlay - transparent and pointer-events-none so map interactions pass through */}
      <div 
        className="absolute inset-0 bg-transparent pointer-events-none"
      />
      
      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`absolute bottom-0 left-0 right-0 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
          isMinimized ? 'max-h-[25vh]' : 'max-h-[92vh]'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scroll Handle - Always visible (tap to expand) */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div
            className={`w-12 h-1 rounded-full cursor-grab active:cursor-grabbing ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={() => setIsMinimized(false)}
          ></div>
        </div>

        {/* Simple Info - Always Visible */}
        <div className={`px-6 py-3 flex items-center justify-between flex-shrink-0 ${theme === 'dark' ? 'border-b border-gray-800' : 'border-b border-gray-100'}`}>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Clock className="w-4 h-4 text-blue-600" />
              <div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Time</div>
                <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{navigationDetails.time} min</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Navigation className="w-4 h-4 text-blue-600" />
              <div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Distance</div>
                <div className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{navigationDetails.distance}m</div>
              </div>
            </div>
          </div>

        </div>

        {/* From and To */}
        <div className={`px-6 py-3 space-y-2 flex-shrink-0 ${theme === 'dark' ? 'border-b border-gray-800' : 'border-b border-gray-100'}`}>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>From: </span>
            <span className={`font-medium truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{navigationDetails.from}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0"></div>
            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>To: </span>
            <span className={`font-medium truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{navigationDetails.to}</span>
          </div>
        </div>

        {/* Scroll Icon Indicator - removed as requested */}

        {/* Scrollable Details Content - Hidden when minimized */}
        {!isMinimized && (
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className={`flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth hide-scrollbar ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
          >
            {/* Destination Details */}
            <div>
              <h3 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>About Destination</h3>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{navigationDetails.destination?.detailedDesc || navigationDetails.destination?.desc}</p>
            </div>

            {/* Opening Hours */}
            <div className={`flex items-start gap-2 p-2.5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Hours</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{navigationDetails.destination?.openingHours}</div>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Facilities</h3>
              <div className="grid grid-cols-3 gap-2">
                {features.map(feature => (
                  <div 
                    key={feature.key}
                    className={`p-2 rounded-lg text-center transition-all ${
                      feature.available 
                        ? theme === 'dark' ? 'bg-blue-900/40 border border-blue-700' : 'bg-blue-50 border border-blue-100'
                        : theme === 'dark' ? 'bg-gray-800 border border-gray-700 opacity-40' : 'bg-gray-50 border border-gray-100 opacity-40'
                    }`}
                  >
                    <feature.icon className={`w-4 h-4 mx-auto mb-0.5 ${feature.available ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600') : (theme === 'dark' ? 'text-gray-500' : 'text-gray-400')}`} />
                    <span className={`text-xs font-medium block ${feature.available ? (theme === 'dark' ? 'text-blue-300' : 'text-blue-700') : (theme === 'dark' ? 'text-gray-500' : 'text-gray-400')}`}>
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            {navigationDetails.destination?.status && (
              <div className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Status</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                  navigationDetails.destination.status === 'Open' ? 'bg-green-500' :
                  navigationDetails.destination.status === 'Closed' ? 'bg-red-500' :
                  navigationDetails.destination.status === 'Occupied' ? 'bg-yellow-500' : 'bg-orange-500'
                }`}>
                  {navigationDetails.destination.status}
                </span>
              </div>
            )}

            {/* Cancel button always visible when sheet expanded */}
            <div className="px-6 py-3">
              <button
                onClick={onClose}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel Navigation
              </button>
            </div>

            <div className="pb-4"></div>
          </div>
        )}
      </div>
    </div>
  )
}
