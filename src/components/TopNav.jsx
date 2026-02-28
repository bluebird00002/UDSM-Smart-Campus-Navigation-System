import React from 'react'
import { Menu } from 'lucide-react'

export default function TopNav({onMenu, menuOpen = false, disabled = false, theme, setTheme}){
  return (
    <div className={`fixed top-0 left-0 right-0 z-[11000] backdrop-blur-sm px-4 py-3 border-b flex items-center justify-between transform transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'} ${menuOpen? '-translate-y-full pointer-events-none':'translate-y-0'}`}>
      <div className="flex items-center gap-3">
        <button
          aria-label="menu"
          className={`p-2 relative z-[11001] ${disabled ? 'pointer-events-none opacity-40' : 'pointer-events-auto'}`}
          onClick={(e)=>{ e.stopPropagation(); if(!disabled) onMenu && onMenu() }}
        >
          <Menu className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} />
        </button>
      </div>
      <div className="text-center">
        <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>UDSM Smart Campus</div>
        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Navigation System</div>
      </div>
      <div className="w-12" aria-hidden />
    </div>
  )
}
