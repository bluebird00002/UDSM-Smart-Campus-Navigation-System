import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import MapComponent from './components/MapComponent'
import MobileBottomSheet from './components/MobileBottomSheet'
import mockLocations from './mockData'

export default function App(){
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  // start the recents with some real locations from our mock data rather
  // than arbitrary placeholders. this way the user can click them and see
  // the large popup immediately. we still cap the list in
  // `handleLocationSelect` so it behaves the same later.
  // initialize recents from the first few locations but explicitly drop
  // any plain "NHIF" entry in case it sneaked in earlier during testing.
  const [recentSearches, setRecentSearches] = useState(
    mockLocations
      .slice(0, 6)
      .map(l => l.name)
      .filter(n => n.toLowerCase() !== 'nhif')
  )
  const [filters, setFilters] = useState({Academic:true,Admin:true,Services:true})
  const [advancedFilters, setAdvancedFilters] = useState({features: [], population:'any'})
  const [selected, setSelected] = useState(null)
  const [selectionKey, setSelectionKey] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      const stored = (typeof window !== 'undefined' && localStorage.getItem('theme'))
      return stored === 'dark' ? 'dark' : 'light'
    } catch(e){
      return 'light'
    }
  })

  useEffect(()=>{
    const onResize = ()=> setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', onResize)
    return ()=> window.removeEventListener('resize', onResize)
  },[])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      try { localStorage.setItem('theme', theme) } catch(e){}
    }
  }, [theme])

  useEffect(()=>{
    if(isNavigating){
      setMobileMenuOpen(false)
    }
  },[isNavigating])

  // simulate loading when user types query
  useEffect(()=>{
    if(!query){
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    const t = setTimeout(()=> setIsLoading(false), 250)
    return ()=> clearTimeout(t)
  },[query])

  // always purge stray plain "NHIF" entries when the component mounts
  useEffect(() => {
    setRecentSearches(prev => prev.filter(n => n.toLowerCase() !== 'nhif'))
  }, [])

  const filtered = mockLocations.filter(l=>{
    const q = query.trim().toLowerCase()
    const passFilter = (l.type === 'Academic' && filters.Academic) || (l.type === 'Admin' && filters.Admin) || (l.type === 'Service' && filters.Services)
    const passQuery = !q || l.name.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)
    if(!passFilter || !passQuery) return false

    // advanced features filter: every selected feature must be true on location
    if(advancedFilters.features && advancedFilters.features.length){
      for(const f of advancedFilters.features){
        if(!l[f]) return false
      }
    }
    if(advancedFilters.population !== 'any' && l.population !== advancedFilters.population) return false

    return true
  })

  // compute suggestions whenever query or filtered list changes
  useEffect(()=>{
    if(!query || query.trim() === ''){
      setSuggestions([])
      return
    }
    const q = query.toLowerCase().trim()
    const matches = filtered.filter(loc =>
      loc.name.toLowerCase().includes(q) ||
      loc.desc.toLowerCase().includes(q) ||
      loc.type.toLowerCase().includes(q) ||
      (loc.detailedDesc && loc.detailedDesc.toLowerCase().includes(q))
    )
    setSuggestions(matches.slice(0,8))
  },[query, filtered])

  // helper for when a location is picked via suggestion or recent
  const handleLocationSelect = (loc) => {
    if(!loc) return
    setSelected(loc)
    setSelectionKey(k => k + 1) // Force re-trigger effect even if same location is selected
    setQuery('')
    setSuggestions([])
    // keep recent list (unique, most recent first) and never store "NHIF"
    setRecentSearches(prev=>{
      const cleaned = prev.filter(n=> n !== loc.name && n.toLowerCase() !== 'nhif')
      cleaned.unshift(loc.name)
      return cleaned.slice(0,6)
    })
    if(isMobile){
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className={`h-screen w-screen flex ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
      {!isMobile && (
          <aside className={`w-[350px] border-r z-50 relative ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <Sidebar
            locations={mockLocations}
            searchQuery={query}
            suggestions={suggestions}
            onSearch={setQuery}
            filters={filters}
            setFilters={setFilters}
            advancedFilters={advancedFilters}
            setAdvancedFilters={setAdvancedFilters}
            onSelect={handleLocationSelect}
            isLoading={isLoading}
            disabled={isNavigating}
            recentSearches={recentSearches}
            theme={theme}
            setTheme={setTheme}
          />
        </aside>
      )}

      <main className={`flex-1 relative ${isMobile ? 'pt-16' : ''}`}>
        {isMobile && (
          <div className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${selected ? '-translate-y-full' : 'translate-y-0'}`}>
            <TopNav onMenu={()=> setMobileMenuOpen(v=>!v)} menuOpen={mobileMenuOpen} disabled={isNavigating} theme={theme} setTheme={setTheme} />
          </div>
        )}
        <MapComponent
          center={[-6.7751,39.2086]}
          locations={filtered}
          searchQuery={query}
          recentSearches={recentSearches}
          onSelect={handleLocationSelect}
          onCloseSelection={() => setSelected(null)}
          selected={selected}
          selectionKey={selectionKey}
          onNavigationChange={setIsNavigating}
          isMobile={isMobile}
          theme={theme}
        />

        {isMobile && !isNavigating && (
          <MobileBottomSheet
            searchQuery={query}
            suggestions={suggestions}
            onSearch={setQuery}
            recent={recentSearches}
            onSelectLocation={handleLocationSelect}
             categories={["Academic","Services"]}
             locations={filtered}
            filters={filters}
            setFilters={setFilters}
            advancedFilters={advancedFilters}
            setAdvancedFilters={setAdvancedFilters}
            menuOpen={mobileMenuOpen}
            isLoading={isLoading}
            theme={theme}
          />
        )}
      </main>

        {/* Render mobile drawer at root level so it sits above map and other stacking contexts */}
        {isMobile && (
          <div className={`fixed inset-0 flex pointer-events-none`} aria-hidden={!mobileMenuOpen}>
            <div className={`w-72 max-w-[80%] border-r shadow-lg transform transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} ${mobileMenuOpen? 'translate-x-0 pointer-events-auto z-[99999]':'-translate-x-full pointer-events-none z-[99999]'}` }>
              <Sidebar
                locations={mockLocations}
                searchQuery={query}
                suggestions={suggestions}
                onSearch={(q)=>{ setQuery(q); setMobileMenuOpen(false)}}
                filters={filters}
                setFilters={setFilters}
                advancedFilters={advancedFilters}
                setAdvancedFilters={setAdvancedFilters}
                onSelect={(l)=> { setSelected(l); setMobileMenuOpen(false)}}
                recentSearches={recentSearches}
                isLoading={isLoading}
                disabled={isNavigating}
                isMobile
                theme={theme}
                setTheme={setTheme}
              />
            </div>
            <button onClick={()=>setMobileMenuOpen(false)} className={`flex-1 ${mobileMenuOpen? 'bg-black/30 pointer-events-auto opacity-70':'pointer-events-none opacity-0'} transition-opacity duration-200 z-[99998]`} aria-label="close menu" />
          </div>
        )}
    </div>
  )
}
