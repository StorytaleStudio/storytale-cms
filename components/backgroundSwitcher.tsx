'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import FantasyBackground from './FantasyBackground'

export default function ScrollBackground() {
  const [darkMode, setDarkMode] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      const sections = document.querySelectorAll('[data-background]')
      let activeSection = 'dark' // default

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionBottom = rect.bottom
        const top5Percent = sectionTop + rect.height * 0.05

        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          if (viewportCenter < top5Percent && index > 0) {
            activeSection = sections[index - 1].getAttribute('data-background') || 'dark'
          } else {
            activeSection = section.getAttribute('data-background') || 'dark'
          }
        }
      })

      setDarkMode(activeSection === 'dark')
    }

    // Small delay to ensure DOM has updated after navigation
    const timeoutId = setTimeout(handleScroll, 0)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [pathname])

  return <FantasyBackground darkMode={darkMode} />
}
