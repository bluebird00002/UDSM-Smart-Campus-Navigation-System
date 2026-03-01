import React, { useState } from 'react'
import LocationDetailCard, { UDSM_LOCATIONS } from './LocationDetailCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function LocationDetailCardDemo({ theme = 'light' }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? UDSM_LOCATIONS.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === UDSM_LOCATIONS.length - 1 ? 0 : prev + 1
    )
  }

  const baseTheme = theme === 'dark'
    ? 'bg-gray-950 text-gray-100'
    : 'bg-gray-50 text-gray-900'

  return (
    <div className={`w-full min-h-screen ${baseTheme} py-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Location Detail Card</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Smart Campus Navigation System - UDSM
          </p>
        </div>

        {/* Card Display */}
        <LocationDetailCard
          locationId={UDSM_LOCATIONS[currentIndex].id}
          theme={theme}
        />

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrevious}
            className={`p-2 rounded-lg transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-100'
                : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
            } hover:shadow-lg active:scale-95`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className={`px-6 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
            <p className="text-sm font-medium">
              {currentIndex + 1} / {UDSM_LOCATIONS.length}
            </p>
          </div>

          <button
            onClick={goToNext}
            className={`p-2 rounded-lg transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-100'
                : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
            } hover:shadow-lg active:scale-95`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Location List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Available Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UDSM_LOCATIONS.map((location, idx) => (
              <button
                key={location.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${
                  currentIndex === idx
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-100'
                      : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
                }`}
              >
                <p className="font-semibold">{location.locationName}</p>
                <p className={`text-sm ${currentIndex === idx ? 'opacity-90' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {location.building}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
