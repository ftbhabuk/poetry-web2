"use client"

import { ChevronDown, BookOpen, Feather, Clock, Heart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ContentContextButtonProps {
  category?: string;
  title?: string;
  author?: string;
  description?: string | object;
}

const ContentContextButton = ({ 
  category = 'Uncategorized', 
  title = 'Untitled', 
  author = 'Unknown Author', 
  description = 'No description available' 
}: ContentContextButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Debug logging
  useEffect(() => {
    console.log('Debug Props:', {
      category,
      title,
      author,
      description,
      descriptionType: typeof description,
    });
  }, [category, title, author, description]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const safeCategory = typeof category === 'string' ? category : 'Uncategorized'
  const safeAuthor = typeof author === 'string' ? author : 'Unknown Author'

  const contextInfo = {
    timeToRead: "4 min read",
    genre: safeCategory,
    mood: safeAuthor,
    themes: [safeCategory],
    // Temporarily using author instead of description for testing
    writtenOn: `By: ${safeAuthor}` // Changed this line for testing
  }

  return (
    <div className="relative flex justify-end w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/30 px-6 py-3 rounded-full shadow-md border border-white/20
                  transition-all duration-300 hover:shadow-md hover:scale-105
                  flex items-center space-x-2 backdrop-blur-sm"
      >
        <span className="text-sm font-semibold text-gray-400">
          Journey Context
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-300
                    ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-72 rounded-2xl bg-white/30 backdrop-blur-md
                       border border-white/20 shadow-xl transition-all duration-300
                       animate-in slide-in-from-top-5 fade-in-20 z-50">
          <div className="p-4 space-y-4">
            <div className="border-b border-gray-200/30 pb-2">
              <h3 className="text-lg font-serif text-gray-700">{title}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{contextInfo.timeToRead}</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">{contextInfo.genre}</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{contextInfo.mood}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Feather className="h-4 w-4" />
                  <span className="text-sm">Themes</span>
                </div>
                <div className="flex flex-wrap gap-2 pl-7">
                  {contextInfo.themes.map((theme, index) => (
                    <span
                      key={`${theme}-${index}`}
                      className="px-2 py-1 text-xs rounded-full bg-white/40 text-gray-600"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/30 text-center">
                <span className="text-xs text-gray-500 italic">
                  {contextInfo.writtenOn}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentContextButton