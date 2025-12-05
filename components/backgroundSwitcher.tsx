'use client'

import { useEffect, useState } from 'react'
import FantasyBackground from './FantasyBackground'

export default function ScrollBackground() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      const sections = document.querySelectorAll('[data-background]')
      let activeSection = 'dark' // default

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionBottom = rect.bottom
        const top5Percent = sectionTop + rect.height * 0.05 // Changed from 1.05 to 0.05

        // Check if viewport center is within this section
        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          // If we're in the top 5% and there's a previous section, use previous
          if (viewportCenter < top5Percent && index > 0) {
            activeSection = sections[index - 1].getAttribute('data-background') || 'dark'
          } else {
            // Otherwise use current section's background
            activeSection = section.getAttribute('data-background') || 'dark'
          }
        }
      })

      setDarkMode(activeSection === 'dark')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return <FantasyBackground darkMode={darkMode} />
}
