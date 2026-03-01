import React, { useState, useEffect } from 'react'
import { Search, Mic, Wifi, Users, BookOpen, Info, HelpCircle, LogIn, Fan, Volume1, VolumeX, Zap, MapPin, Sun, Moon, Heart, Clock, Compass } from 'lucide-react'

export default function Sidebar({locations, searchQuery = '', suggestions = [], onSearch, filters, setFilters, advancedFilters, setAdvancedFilters, onSelect, isMobile, recentSearches = [], isLoading = false, disabled = false, theme, setTheme}){

  const themeBase = theme === 'dark'
    ? 'bg-gray-900 text-gray-100 border-gray-800'
    : 'bg-white text-gray-900 border-gray-200'

  return (
    <div className={`${disabled ? 'pointer-events-none opacity-60' : ''} h-full flex flex-col ${themeBase} w-full sm:w-80 max-w-[320px] border-r text-sm`} aria-hidden={disabled}>
      <div className="px-4 pt-4 pb-3 border-b relative flex-none bg-transparent">
        {/* Text logo (SCNS) used for both desktop and mobile. Theme toggle on top-right. */}
        <div className="flex items-center justify-center">
          <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>SCNS</div>
        </div>
        <button onClick={() => setTheme(t => {
            const next = t === 'dark' ? 'light' : 'dark'
            return next
          })} className={`absolute right-3 top-3 p-2 rounded-full shadow-sm backdrop-blur ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/80'}`}>
          {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500"/> : <Moon className="w-4 h-4 text-gray-600"/>}
        </button>

        <div className="mt-3 text-center">
          <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Smart Campus Navigation System</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-3 hide-scrollbar">
        {!isMobile && (
          <div className="relative">
            <div className={`flex items-center rounded-xl px-3 py-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
              <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              <input value={searchQuery} onChange={(e)=>onSearch(e.target.value)} placeholder="Search offices, staff..." className={`ml-3 bg-transparent outline-none w-full text-sm h-10 ${theme === 'dark' ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-600'}`} />
              <button aria-label="voice search" title="Voice search (mock)" onClick={()=>{
                const q = window.prompt('Voice search (mock): say or type your query')
                if(q) onSearch(q)
              }} className={`ml-2 w-11 h-11 flex items-center justify-center rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Mic size={16} />
              </button>
            </div>
            {/* dropdown which houses both suggestions and matching recents. the
                entire box is only rendered when the user has entered a non‑empty
                query; desktop should show nothing by default. recents are then
                merged inside this dropdown via recentsMatch logic. */}
            {/* dropdown only visible when user has typed something */}
            {searchQuery.trim().length > 0 && (
              (suggestions.length > 0 ||
                recentSearches.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))) && (
              <div className={`absolute top-full left-0 right-0 z-30 rounded-xl shadow-lg p-2 mt-1 max-h-48 overflow-auto hide-scrollbar ${theme === 'dark' ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'} backdrop-blur-sm`}>
                {isLoading ? (
                  // skeleton placeholders
                  Array.from({length:4}).map((_,i)=>(
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  ))
                ) : (
                  (()=>{
                    const recentsMatch = recentSearches.filter(r=> r.toLowerCase().includes(searchQuery.toLowerCase()));
                    const otherSuggestions = suggestions.filter(loc => !recentsMatch.some(r=> r.toLowerCase()===loc.name.toLowerCase()));
                    if(recentsMatch.length > 0){
                      return (
                        <>
                          {recentsMatch.map((name,idx)=>(
                            <button key={idx} onClick={()=>{
                              const loc=locations.find(l=> l.name.toLowerCase()===name.toLowerCase());
                              loc && onSelect && onSelect(loc);
                            }} className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                              <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                              <span className="truncate">{name}</span>
                            </button>
                          ))}
                          {otherSuggestions.map(loc=>(
                            <button key={loc.id} onClick={()=>onSelect && onSelect(loc)} className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                              <MapPin size={16} className="text-gray-600" />
                              <span className="truncate">{loc.name}</span>
                            </button>
                          ))}
                        </>
                      )
                    } else {
                      // only other suggestions (could be empty)
                      return otherSuggestions.length > 0 ? (
                        otherSuggestions.map(loc=>(
                          <button key={loc.id} onClick={()=>onSelect && onSelect(loc)} className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <MapPin size={16} className="text-gray-600" />
                            <span className="truncate">{loc.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className={`px-3 py-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location not registered</div>
                      )
                    }
                  })()
                )}
              </div>
              )
            )}
          </div>
        )}

            <div className="mt-3">
          <div className="grid gap-3">
            {/* Recent Searches are intentionally hidden inside the mobile sidebar
                because recents are shown below the search bar in the mobile
                bottom sheet. Show this block only on desktop. */}
            {!isMobile && (
            <div className={`p-3 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-sm font-medium mb-2">Recent Searches</div>
                <div className={`space-y-2 max-h-[144px] overflow-auto hide-scrollbar ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {recentSearches && recentSearches.slice(0).map((name, idx) => {
                  const loc = locations.find(l=> l.name.toLowerCase().includes(name.toLowerCase()))
                  return (
                    <button key={idx} onClick={()=>{
                      if(loc){
                        onSelect && onSelect(loc)
                      } else {
                        alert(`Location "${name}" not found`)
                      }
                    }} className={`w-full flex flex-col items-start gap-1 p-3 rounded text-left ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <div className="text-sm font-medium truncate">{name}</div>
                      <div className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{loc ? loc.desc : ''}</div>
                    </button>
                  )
                })}
              </div>
            </div>
            )}

            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Preferences</div>
              <div className="flex flex-wrap gap-2 max-h-[96px] overflow-auto">
                {[
                  {key:'wifi', label:'WiFi', Icon: Wifi},
                  {key:'ac', label:'AC', Icon: Fan},
                  {key:'charging', label:'Charging', Icon: Zap},
                  {key:'wheelchair', label:'Accessible', Icon: Users},
                  {key:'parking', label:'Parking', Icon: MapPin},
                  {key:'food', label:'Food', Icon: Heart}
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
              <div className={`mt-4 p-3 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-sm font-medium mb-2">Most Searched</div>
                  <div className={`space-y-2 max-h-[160px] overflow-auto hide-scrollbar ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  {locations && locations.slice(0,6).map(loc=> (
                    <button key={loc.id} onClick={()=> onSelect && onSelect(loc)} className={`w-full flex flex-col items-start gap-1 p-2 rounded min-w-0 text-left ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <div className="text-sm font-medium truncate">{loc.name}</div>
                      <div className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{loc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* removed duplicate empty flex area; main content above is scrollable */}

      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
          <div className="flex gap-2">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-150 font-medium ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
              <Info size={18} className="text-udsm-blue" />
              <span>About</span>
            </button>

            <button className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-150 font-medium ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
              <HelpCircle size={18} className="text-udsm-blue" />
              <span>Support</span>
            </button>
          </div>

          <div className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-udsm-blue hover:opacity-95 shadow-sm text-white px-3 py-2 rounded-md font-semibold transition">
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </div>
        </div>
        <div className={`mt-3 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <button onClick={()=>{
            setTheme('light')
          }} className="underline">Reset theme to light</button>
        </div>
      </div>
    </div>
  )
}
