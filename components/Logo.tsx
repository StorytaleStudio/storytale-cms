'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import StorytaleFrame from './svgs/Storytale-Frame'
import { useElementSectionColors } from './ScrollColorContext'

export default function LogoLink() {
  const [hovered, setHovered] = useState(false)
  const [timeGreeting, setTimeGreeting] = useState('')
  const [mounted, setMounted] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const { menuBgColor, menuFontColor } = useElementSectionColors(logoRef)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine greeting based on local time
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let greeting = ''
      if (hour >= 5 && hour < 12) greeting = 'Good Morning'
      else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon'
      else if (hour >= 17 && hour < 21) greeting = 'Good Evening'
      else greeting = 'Good Night'
      setTimeGreeting(greeting)
    }

    updateGreeting()
    const interval = setInterval(updateGreeting, 60 * 1000) // update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={logoRef}
      style={{
        position: 'fixed',
        width: '4rem',
        height: '4rem',
        color: menuFontColor,
        bottom: '2rem',
        right: '2rem',
        zIndex: 15,
        transition: 'color 0.6s ease',
      }}
    >
      <Link
        href="/"
        style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <StorytaleFrame />
        {/* Hover text */}
        {hovered && (
          <span
            style={{
              position: 'absolute',
              top: '0',
              left: '-50%',
              transform: 'translateX(-50%)',
              background: menuBgColor,
              backdropFilter: 'blur(0.625rem)',
              border: `1px solid ${menuFontColor}33`,
              color: menuFontColor,
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              transition:
                'opacity 0.4s ease, transform 0.4s ease, background 0.6s ease, color 0.6s ease, border-color 0.6s ease',
              opacity: hovered ? 1 : 0,
            }}
          >
            {timeGreeting}
          </span>
        )}
      </Link>
    </div>
  )
}
