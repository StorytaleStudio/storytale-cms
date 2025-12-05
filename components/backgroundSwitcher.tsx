'use client'

import { useEffect, useState } from 'react'
import FantasyBackground from './FantasyBackground'

export default function ScrollBackground() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Use the center of viewport as the detection point
      const viewportCenter = window.innerHeight / 2

      // Get all sections with data-section attribute
      const sections = document.querySelectorAll('[data-background]')
      let activeSection = 'dark' // default

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionBottom = rect.bottom
        const top5Percent = sectionTop + rect.height * 1.05

        // Check if viewport center is within the section and past the top 5%
        if (viewportCenter >= top5Percent && viewportCenter <= sectionBottom) {
          activeSection = section.getAttribute('data-background') || 'dark'
        } else if (viewportCenter < top5Percent && viewportCenter >= sectionTop) {
          // If viewport center is in the top 5%, use the previous section's background
          const sectionIndex = Array.from(sections).indexOf(section)
          if (sectionIndex > 0) {
            activeSection = sections[sectionIndex - 1].getAttribute('data-background') || 'dark'
          }
        }
      })

      // Update dark mode based on section attribute value
      setDarkMode(activeSection === 'dark')
    }

    // Initial check
    handleScroll()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return <FantasyBackground darkMode={darkMode} />
}
