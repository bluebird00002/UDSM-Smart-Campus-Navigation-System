import React, { useEffect, useRef, useState } from 'react'
import { Search, Mic, MapPin, Clock, Coffee, BookOpen, Building2, Trophy, Wifi, Fan, Zap, Accessibility } from 'lucide-react'

export default function MobileBottomSheet({searchQuery = '',suggestions=[],onSearch,recent = [],onSelectLocation,categories,filters,setFilters, locations = [], menuOpen=false, isLoading=false, theme='light', advancedFilters, setAdvancedFilters}){
  const [open,setOpen] = useState(false)
  const sheetRef = useRef(null)
  const startY = useRef(0)
  const currentY = useRef(0)

  useEffect(()=>{
    const el = sheetRef.current
    if(!el) return

    function onTouchStart(e){ startY.current = e.touches ? e.touches[0].clientY : e.clientY }
    function onTouchMove(e){
      const y = e.touches ? e.touches[0].clientY : e.clientY
      currentY.current = y
    }
    function onTouchEnd(){
      const diff = startY.current - currentY.current
      if(diff > 50) setOpen(true)
      if(diff < -50) setOpen(false)
      startY.current = 0
      currentY.current = 0
    }

    el.addEventListener('touchstart', onTouchStart)
    el.addEventListener('touchmove', onTouchMove)
    el.addEventListener('touchend', onTouchEnd)
    // fallback for mouse
    el.addEventListener('mousedown', onTouchStart)
    window.addEventListener('mousemove', onTouchMove)
    window.addEventListener('mouseup', onTouchEnd)

    return ()=>{
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('mousedown', onTouchStart)
      window.removeEventListener('mousemove', onTouchMove)
      window.removeEventListener('mouseup', onTouchEnd)
    }
  },[])

  const collapsedHeight = 120
  const expandedHeight = Math.round(window.innerHeight * 0.75)
  const offscreen = Math.round(window.innerHeight + 20)
  // If the menu is open, push the sheet fully off-screen so the menu can be seen from below
  const translateY = menuOpen ? offscreen : (open ? 0 : (expandedHeight - collapsedHeight))

  return (
    <div ref={sheetRef} className={`fixed left-0 right-0 bottom-0 z-[9000] rounded-t-xl shadow-lg border-t bottom-sheet-transition ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} ${menuOpen? 'pointer-events-none':''}`} style={{height: expandedHeight, transform: `translateY(${translateY}px)`}}>
      <div className="p-3 flex flex-col h-full">
        <div className="bottom-sheet-handle mb-2">
          <div className="bottom-sheet-handle-dot" />
        </div>

        {/* compact search when collapsed */}
        {!open && (
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <div className={`flex items-center rounded-full px-4 py-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <Search size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                <input
                  value={searchQuery}
                  onChange={(e)=> onSearch(e.target.value)}
                  placeholder="Where to ?"
                  className={`ml-3 bg-transparent outline-none w-full text-sm h-10 ${theme === 'dark' ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-600'}`} />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button aria-label="voice-search" title="Voice search (mock)" onClick={()=>{ const q=window.prompt('Voice search (mock)'); if(q) onSearch(q)}} className={`w-11 h-11 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}><Mic className={theme === 'dark' ? 'text-gray-300' : ''} /></button>
                  <button aria-label="locate" onClick={()=>{navigator.geolocation?.getCurrentPosition(()=>{}, ()=>{});}} className={`w-11 h-11 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}><MapPin className={theme === 'dark' ? 'text-gray-300' : ''} /></button>
                </div>
              </div>
              {/* suggestions dropdown - only show when there's a search query match; recents are omitted here */}
              {searchQuery ? (
                <div className={`absolute top-full left-0 right-0 z-20 rounded-xl shadow-lg p-2 mt-1 max-h-48 overflow-auto hide-scrollbar ${theme === 'dark' ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'} backdrop-blur-sm`}>
                  {isLoading ? (
                    Array.from({length:4}).map((_,i)=>(
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    ))
                  ) : (
                    suggestions.length > 0 ? (
                      suggestions.map(loc=>(
                        <button key={loc.id} onClick={()=>onSelectLocation && onSelectLocation(loc)} className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                          <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                          <span className="truncate">{loc.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className={`px-3 py-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location not registered</div>
                    )
                  )}
                </div>
              ) : (
                /* show a small list of popular spots instead of recents when menu is
                   closed and no query is present */
                locations.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 z-20 rounded-xl shadow-lg p-2 mt-1 max-h-48 overflow-auto hide-scrollbar ${theme === 'dark' ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'} backdrop-blur-sm`}>
                    <div className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Popular spots</div>
                    {locations.slice(0,5).map(loc => (
                      <button key={loc.id} onClick={() => onSelectLocation && onSelectLocation(loc)} className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                        <span className="truncate">{loc.name}</span>
                      </button>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        

        {open && (
          <div className={`mt-3 overflow-auto hide-scrollbar ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <div className="text-lg font-semibold mb-3">Navigate the campus with ease</div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                {key:'food', title:'Food', Icon: Coffee, items: ['Cafe 2, CoICT Cafeteria']},
                {key:'admin', title:'Admin', Icon: Building2, items: ['Registry','Bursar','Student Affairs']},
                {key:'sports', title:'Sports', Icon: Trophy, items: ['Football pitch','Netball','Basketball']},
                {key:'stationery', title:'Stationery', Icon: BookOpen, items: ['Bindings','Printing','Accessories']}
              ].map(s=> (
                <button key={s.key} onClick={()=>{ /* optional: set filter or quick-search */ }} className={`text-left p-3 border rounded-lg hover:shadow-md transition duration-150 flex flex-col gap-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-md flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <s.Icon size={18} className="text-udsm-blue" />
                    </div>
                    <div className="font-medium">{s.title}</div>
                  </div>
                  <div className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{s.items.join(', ')}</div>
                </button>
              ))}
            </div>

            {/* search inside expanded view */}
            <div className="mb-6 relative">
              <div className={`relative flex items-center rounded-full px-4 py-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <Search size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                <input
                  value={searchQuery}
                  onChange={(e)=> onSearch(e.target.value)}
                  placeholder="Where to ?"
                  className={`ml-3 bg-transparent outline-none w-full text-sm h-10 ${theme === 'dark' ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-600'}`} />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button aria-label="voice-search" title="Voice search (mock)" onClick={()=>{ const q=window.prompt('Voice search (mock)'); if(q) onSearch(q)}} className={`w-10 h-10 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}><Mic className={theme === 'dark' ? 'text-gray-300' : ''} /></button>
                  <button aria-label="locate" onClick={()=>{navigator.geolocation?.getCurrentPosition(()=>{}, ()=>{});}} className={`w-10 h-10 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}><MapPin className={theme === 'dark' ? 'text-gray-300' : ''} /></button>
                </div>
              </div>
              {/* suggestions/recents dropdown - only show when there's a search query match or when loading */}
              {searchQuery ? (
                <div className={`absolute top-full left-0 right-0 z-[9500] rounded-xl shadow-lg p-2 mt-1 max-h-48 overflow-auto hide-scrollbar ${theme === 'dark' ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'} backdrop-blur-sm`}>
                  {isLoading ? (
                    Array.from({length:4}).map((_,i)=>(
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    ))
                  ) : (()=>{
                    const recentsMatch = recent.filter(r=> r.toLowerCase().includes(searchQuery.toLowerCase()));
                    const otherSuggestions = suggestions.filter(loc => !recentsMatch.some(r=> r.toLowerCase()===loc.name.toLowerCase()));
                    if(recentsMatch.length > 0){
                      return (
                        <>
                          {recentsMatch.map((name,idx)=>(
                            <button key={idx} onClick={()=>{
                              const loc=locations.find(l=> l.name.toLowerCase()===name.toLowerCase());
                              loc && onSelectLocation && onSelectLocation(loc);
                            }} className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                              <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                              <span className="truncate">{name}</span>
                            </button>
                          ))}
                          {otherSuggestions.map(loc=>(
                            <button key={loc.id} onClick={()=>onSelectLocation && onSelectLocation(loc)} className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                              <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                              <span className="truncate">{loc.name}</span>
                            </button>
                          ))}
                        </>
                      )
                    } else {
                      return otherSuggestions.length > 0 ? (
                        otherSuggestions.map(loc=>(
                          <button key={loc.id} onClick={()=>onSelectLocation && onSelectLocation(loc)} className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                            <span className="truncate">{loc.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className={`px-3 py-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location not registered</div>
                      )
                    }
                  })()}
                </div>
              ) : null}
            </div>

            {/* Preferences Filters */}
            {setAdvancedFilters && (
              <div className="mb-6">
                <div className="text-sm font-medium mb-3">Preferences</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    {key:'wifi', label:'WiFi', Icon: Wifi},
                    {key:'ac', label:'AC', Icon: Fan},
                    {key:'charging', label:'Charging', Icon: Zap},
                    {key:'wheelchair', label:'Accessible', Icon: Accessibility},
                    {key:'parking', label:'Parking', Icon: MapPin},
                    {key:'food', label:'Food', Icon: Coffee}
                  ].map(f=>{
                    const active = Array.isArray(advancedFilters?.features) && advancedFilters.features.includes(f.key)
                    const Icon = f.Icon
                    return (
                      <button key={f.key} onClick={()=>{
                        setAdvancedFilters(a=>{
                          const arr = Array.isArray(a.features)? [...a.features] : []
                          if(arr.includes(f.key)){
                            return {...a, features: arr.filter(x=>x!==f.key)}
                          }
                          arr.push(f.key)
                          return {...a, features: arr}
                        })
                      }} className={`px-3 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-colors ${active ? 'bg-udsm-blue text-white shadow-md' : theme === 'dark' ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <Icon size={16} />
                        <span className="text-sm">{f.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {recent.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-3">Recent Searches</div>
                <ul className="space-y-3 mb-6">
                  {(searchQuery ? recent.filter(r => r.toLowerCase().includes(searchQuery.toLowerCase())) : recent).map((r, idx)=>{
                    const loc = locations.find(l => l.name.toLowerCase().includes(r.toLowerCase())) || locations.find(l=> l.name === r)
                    let distanceText = '—'
                    if(loc && loc.coords){
                      const toRad = v => v * Math.PI / 180
                      const [lat1, lon1] = loc.coords
                      const lat2 = -6.7751
                      const lon2 = 39.2086
                      const R = 6371000
                      const dLat = toRad(lat1 - lat2)
                      const dLon = toRad(lon1 - lon2)
                      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat2)) * Math.cos(toRad(lat1)) * Math.sin(dLon/2) * Math.sin(dLon/2)
                      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
                      const meters = Math.round(R * c)
                      distanceText = `${meters} m`
                    }

                    return (
                      <li key={idx}>
                        <button onClick={()=>{
                          if(loc){
                            onSelectLocation && onSelectLocation(loc)
                          } else {
                            alert(`Location "${r}" not found`)
                          }
                        }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                          <div className={`w-10 h-10 flex items-center justify-center rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <Clock size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{r}</div>
                            <div className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{loc ? loc.desc : ''}</div>
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{distanceText}</div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className="mt-auto pt-3" />
          </div>
        )}
      </div>
    </div>
  )
}
