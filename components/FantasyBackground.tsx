'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import StorytaleFrame from './svgs/Storytale-Frame'

type Theme = {
  name: string
  gradientColors: string[]
  noiseTint: string
  noiseIntensity: number
}

type FantasyBackgroundProps = {
  imageSrc?: string
  blurImage?: boolean
  darkMode?: boolean
}

const themes: Theme[] = [
  {
    name: 'Dawn',
    gradientColors: ['#FF9A8B', '#FF6A88', '#FFD6A5'],
    noiseTint: '#b6311dff',
    noiseIntensity: 0.8,
  },
  {
    name: 'Day',
    gradientColors: ['#f0ec0fff', '#99E0FF', '#A0E9FD'],
    noiseTint: '#1c5f7cff',
    noiseIntensity: 0.8,
  },
  {
    name: 'Afternoon',
    gradientColors: ['#f3c33dff', '#EC3537', '#FFEF99'],
    noiseTint: '#9c2f31ff',
    noiseIntensity: 0.4,
  },
  {
    name: 'Sunset',
    gradientColors: ['#FA709A', '#f3256aff', '#ff00bfff'],
    noiseTint: '#860466ff',
    noiseIntensity: 0.4,
  },
  {
    name: 'Night',
    gradientColors: ['#87e2c4ff', '#4CA1AF', '#032aa7ff'],
    noiseTint: '#aaaaaa',
    noiseIntensity: 0.6,
  },
]

// Light mode themes - softer, brighter variants
const lightThemes: Theme[] = [
  {
    name: 'Dawn Light',
    gradientColors: ['#FF9A8B', '#FF6A88', '#FFD6A5'],
    noiseTint: '#1c1c1c',
    noiseIntensity: 0.6,
  },
  {
    name: 'Day Light',
    gradientColors: ['#f0ec0fff', '#99E0FF', '#A0E9FD'],
    noiseTint: '#1c1c1c',
    noiseIntensity: 0.6,
  },
  {
    name: 'Afternoon Light',
    gradientColors: ['#f3c33dff', '#EC3537', '#FFEF99'],
    noiseTint: '#1c1c1c',
    noiseIntensity: 0.8,
  },
  {
    name: 'Sunset Light',
    gradientColors: ['#FA709A', '#f3256aff', '#ff00bfff'],
    noiseTint: '#1c1c1c',
    noiseIntensity: 0.6,
  },
  {
    name: 'Night Light',
    gradientColors: ['#87e2c4ff', '#4CA1AF', '#032aa7ff'],
    noiseTint: '#1c1c1c',
    noiseIntensity: 0.6,
  },
]

// Memoized color interpolation
const lerpColor = (a: string, b: string, t: number) => {
  const hexToRgb = (hex: string) => {
    hex = hex.replace('#', '')
    if (hex.length === 3)
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ]
  }
  const rgbToHex = (r: number, g: number, b: number) =>
    `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b))
      .toString(16)
      .slice(1)}`
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t)
}

export default function FantasyBackground({
  imageSrc,
  blurImage = false,
  darkMode = true,
}: FantasyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const noiseFrameRef = useRef<number | undefined>(undefined)
  const transitionRafRef = useRef<number | undefined>(undefined)
  const darkModeRafRef = useRef<number | undefined>(undefined)
  const gradientDivsRef = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const frameDivsRef = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const overlayDivRef = useRef<HTMLDivElement | null>(null)
  const framePositionsRef = useRef<{ x: number; y: number }[]>([
    { x: 30, y: 20 },
    { x: 70, y: 60 },
  ])
  const frameVelocitiesRef = useRef<{ vx: number; vy: number }[]>([
    { vx: 0.03, vy: 0.02 },
    { vx: -0.02, vy: 0.03 },
  ])

  // Client-side only flag to prevent SSR issues
  const [isMounted, setIsMounted] = useState(false)

  // Get theme based on time - memoized
  const getThemeByTime = useCallback(() => {
    const now = new Date()
    const hour = now.getHours()
    const min = now.getMinutes()
    const totalMinutes = hour * 60 + min

    let themeIdx = 4 // default to night

    // Dawn: 5:00-7:59 (300-479 minutes)
    if (totalMinutes >= 300 && totalMinutes < 480) {
      themeIdx = 0
    }
    // Day: 8:00-11:59 (480-719 minutes)
    else if (totalMinutes >= 480 && totalMinutes < 720) {
      themeIdx = 1
    }
    // Afternoon: 12:00-16:59 (720-1019 minutes)
    else if (totalMinutes >= 720 && totalMinutes < 1020) {
      themeIdx = 2
    }
    // Sunset: 17:00-19:59 (1020-1199 minutes)
    else if (totalMinutes >= 1020 && totalMinutes < 1200) {
      themeIdx = 3
    }

    return themeIdx
  }, [])

  // Initialize with night theme (safe default for SSR)
  const [themeIndex, setThemeIndex] = useState(4)
  const [targetThemeIndex, setTargetThemeIndex] = useState(4)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Select theme set based on dark mode - memoized to prevent recalculation
  const activeThemes = useMemo(() => (darkMode ? themes : lightThemes), [darkMode])

  const [gradientColors, setGradientColors] = useState(themes[4].gradientColors)
  const [framePositions, setFramePositions] = useState(framePositionsRef.current)
  const prevDarkModeRef = useRef(darkMode)
  const currentColorsRef = useRef(themes[4].gradientColors)

  // Memoized overlay gradient functions
  const interpolateRGBA = useCallback((from: string, to: string, t: number) => {
    // Parse rgba values
    const parseRGBA = (str: string) => {
      if (str.startsWith('#')) {
        // Convert hex to rgba
        const hex = str.replace('#', '')
        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)
        return { r, g, b, a: 1 }
      } else if (str.includes('rgba')) {
        const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
        if (match) {
          return {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: match[4] ? parseFloat(match[4]) : 1,
          }
        }
      } else if (str === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0 }
      }
      return { r: 0, g: 0, b: 0, a: 0 }
    }

    const fromRGBA = parseRGBA(from)
    const toRGBA = parseRGBA(to)

    const r = Math.round(fromRGBA.r + (toRGBA.r - fromRGBA.r) * t)
    const g = Math.round(fromRGBA.g + (toRGBA.g - fromRGBA.g) * t)
    const b = Math.round(fromRGBA.b + (toRGBA.b - fromRGBA.b) * t)
    const a = fromRGBA.a + (toRGBA.a - fromRGBA.a) * t

    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`
  }, [])

  const getOverlayGradient = useCallback((isDark: boolean) => {
    const color = isDark ? '#1c1c1c' : 'rgba(255,255,255,0.85)'
    const transparent = isDark ? 'transparent' : 'rgba(255,255,255,0)'
    return { color, transparent }
  }, [])

  const overlayGradient = useMemo(() => {
    const { color, transparent } = getOverlayGradient(darkMode)
    return `radial-gradient(circle at 20% 30%, ${color} 0%, ${color} 20%, ${transparent} 85%), linear-gradient(to bottom right, ${color} 0%, ${color} 20%, ${transparent} 85%)`
  }, [darkMode, getOverlayGradient])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent-color-1', gradientColors[0])
      document.documentElement.style.setProperty('--accent-color-2', gradientColors[1])
    }
    currentColorsRef.current = gradientColors
  }, [gradientColors])

  // Mount effect - set correct theme on client side only
  useEffect(() => {
    setIsMounted(true)
    const correctTheme = getThemeByTime()
    setThemeIndex(correctTheme)
    setTargetThemeIndex(correctTheme)
    setGradientColors(activeThemes[correctTheme].gradientColors)
  }, [])

  // Handle dark mode changes with animation
  useEffect(() => {
    if (!isMounted) return

    // Check if dark mode actually changed
    if (prevDarkModeRef.current === darkMode) return

    prevDarkModeRef.current = darkMode

    // Cancel any ongoing transitions
    if (transitionRafRef.current) {
      cancelAnimationFrame(transitionRafRef.current)
      transitionRafRef.current = undefined
    }
    if (darkModeRafRef.current) {
      cancelAnimationFrame(darkModeRafRef.current)
    }

    setIsTransitioning(true)

    const startColors = [...currentColorsRef.current]
    const endColors = activeThemes[themeIndex].gradientColors
    const duration = 1000
    let startTime: number | null = null

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const t = Math.min(elapsed / duration, 1)

      // Ease-in-out function
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const colors = startColors.map((c, i) => lerpColor(c, endColors[i], eased))

      setGradientColors(colors)
      currentColorsRef.current = colors

      // Interpolate overlay colors
      const startOverlay = getOverlayGradient(!darkMode)
      const endOverlay = getOverlayGradient(darkMode)
      const interpolatedColor = interpolateRGBA(startOverlay.color, endOverlay.color, eased)
      const interpolatedTransparent = interpolateRGBA(
        startOverlay.transparent,
        endOverlay.transparent,
        eased,
      )

      // Update gradient divs
      Object.keys(gradientDivsRef.current).forEach((key) => {
        const idx = parseInt(key)
        const div = gradientDivsRef.current[idx]
        if (div && idx < colors.length - 1) {
          const isFirst = idx === 0
          const xVar = isFirst ? 'var(--g1-offset, 0)' : 'calc(50% + var(--g2-offset, 0))'
          const yVar = isFirst ? 'var(--g1-offset, 0)' : '100%'
          div.style.background = `radial-gradient(circle at ${xVar} ${yVar}, ${colors[idx]} 0%, transparent calc(${idx} * 75%))`
        } else if (div && idx === colors.length - 1) {
          div.style.background = `linear-gradient(to right, ${colors[idx]}, transparent)`
        }
      })

      // Update frame colors
      Object.keys(frameDivsRef.current).forEach((key) => {
        const idx = parseInt(key)
        const div = frameDivsRef.current[idx]
        if (div && idx < colors.length - 1) {
          div.style.color = colors[idx]
        }
      })

      // Update overlay gradient with interpolated colors
      if (overlayDivRef.current) {
        overlayDivRef.current.style.background = `radial-gradient(circle at 20% 30%, ${interpolatedColor} 0%, ${interpolatedColor} 20%, ${interpolatedTransparent} 85%), linear-gradient(to bottom right, ${interpolatedColor} 0%, ${interpolatedColor} 20%, ${interpolatedTransparent} 85%)`
      }

      if (t < 1) {
        darkModeRafRef.current = requestAnimationFrame(animate)
      } else {
        setIsTransitioning(false)
        darkModeRafRef.current = undefined
      }
    }

    darkModeRafRef.current = requestAnimationFrame(animate)
    return () => {
      if (darkModeRafRef.current) {
        cancelAnimationFrame(darkModeRafRef.current)
        darkModeRafRef.current = undefined
      }
    }
  }, [darkMode, isMounted, themeIndex, activeThemes, interpolateRGBA, getOverlayGradient])

  // Animate gradient drift - optimized with refs
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let t = 0
    const animate = () => {
      t += 0.01
      const g1 = Math.sin(t) * 15
      const g2 = Math.cos(t * 0.8) * 15
      el.style.setProperty('--g1-offset', `${g1}px`)
      el.style.setProperty('--g2-offset', `${g2}px`)

      // Update frame positions
      framePositionsRef.current = framePositionsRef.current.map((pos, idx) => {
        const vel = frameVelocitiesRef.current[idx]
        let newX = pos.x + vel.vx
        let newY = pos.y + vel.vy

        // Bounce off edges
        if (newX <= 10 || newX >= 90) {
          frameVelocitiesRef.current[idx].vx *= -1
          newX = Math.max(10, Math.min(90, newX))
        }
        if (newY <= 10 || newY >= 90) {
          frameVelocitiesRef.current[idx].vy *= -1
          newY = Math.max(10, Math.min(90, newY))
        }

        return { x: newX, y: newY }
      })

      // Update state every 3 frames for performance
      if (Math.floor(t * 100) % 3 === 0) {
        setFramePositions([...framePositionsRef.current])
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Check theme every minute
  useEffect(() => {
    if (!isMounted) return
    const interval = setInterval(() => {
      const newTheme = getThemeByTime()
      if (newTheme !== themeIndex) {
        setTargetThemeIndex(newTheme)
      }
    }, 60_000)
    return () => clearInterval(interval)
  }, [themeIndex, getThemeByTime, isMounted])

  // Smooth theme fade transition with JS animation
  useEffect(() => {
    if (themeIndex === targetThemeIndex || isTransitioning) return

    const startColors = [...currentColorsRef.current]
    const endColors = activeThemes[targetThemeIndex].gradientColors
    const duration = 2000
    let startTime: number | null = null

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const t = Math.min(elapsed / duration, 1)

      // Ease-in-out function for smoother animation
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const colors = startColors.map((c, i) => lerpColor(c, endColors[i], eased))
      setGradientColors(colors)
      currentColorsRef.current = colors

      // Manually update the gradient divs
      Object.keys(gradientDivsRef.current).forEach((key) => {
        const idx = parseInt(key)
        const div = gradientDivsRef.current[idx]
        if (div && idx < colors.length - 1) {
          const isFirst = idx === 0
          const xVar = isFirst ? 'var(--g1-offset, 0)' : 'calc(50% + var(--g2-offset, 0))'
          const yVar = isFirst ? 'var(--g1-offset, 0)' : '100%'
          div.style.background = `radial-gradient(circle at ${xVar} ${yVar}, ${colors[idx]} 0%, transparent calc(${idx} * 75%))`
        } else if (div && idx === colors.length - 1) {
          div.style.background = `linear-gradient(to right, ${colors[idx]}, transparent)`
        }
      })

      // Update frame colors
      Object.keys(frameDivsRef.current).forEach((key) => {
        const idx = parseInt(key)
        const div = frameDivsRef.current[idx]
        if (div && idx < colors.length - 1) {
          div.style.color = colors[idx]
        }
      })

      if (t < 1) {
        transitionRafRef.current = requestAnimationFrame(animate)
      } else {
        setThemeIndex(targetThemeIndex)
      }
    }

    if (transitionRafRef.current) {
      cancelAnimationFrame(transitionRafRef.current)
    }
    transitionRafRef.current = requestAnimationFrame(animate)

    return () => {
      if (transitionRafRef.current) {
        cancelAnimationFrame(transitionRafRef.current)
      }
    }
  }, [targetThemeIndex, themeIndex, activeThemes, isTransitioning])

  // Noise layer - optimized with throttling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 2
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    let lastTime = 0
    const fpsInterval = 1000 / 24 // 24fps for noise

    const animateNoise = (time: number) => {
      if (time - lastTime < fpsInterval) {
        noiseFrameRef.current = requestAnimationFrame(animateNoise)
        return
      }
      lastTime = time

      const w = window.innerWidth
      const h = window.innerHeight
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      const theme = activeThemes[themeIndex]
      const noiseIntensity = theme.noiseIntensity

      // Optimized noise generation
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.floor(Math.random() * noiseIntensity * 240)
        data[i] = data[i + 1] = data[i + 2] = v
        data[i + 3] = darkMode ? 20 : 20 // Less intense noise in light mode
      }

      ctx.putImageData(imageData, 0, 0)
      noiseFrameRef.current = requestAnimationFrame(animateNoise)
    }

    noiseFrameRef.current = requestAnimationFrame(animateNoise)

    return () => {
      if (noiseFrameRef.current) {
        cancelAnimationFrame(noiseFrameRef.current)
      }
      window.removeEventListener('resize', resize)
    }
  }, [themeIndex, darkMode, activeThemes])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: gradientColors[2],
        transition: 'all 0.5s ease-in-out',
      }}
    >
      {/* Overlay */}
      <div
        ref={overlayDivRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayGradient,
          zIndex: -2,
        }}
      />

      {/* Optional background image */}
      {imageSrc && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: blurImage ? 'blur(0.8rem)' : 'none',
            opacity: darkMode ? 0.6 : 0.3,
            zIndex: -3,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

      {/* Animated gradients */}
      {gradientColors.map((color, idx) => {
        if (idx === gradientColors.length - 1) {
          return (
            <div
              key={`gradient-${idx}`}
              ref={(el) => {
                gradientDivsRef.current[idx] = el
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to right, ${color}, transparent)`,
                zIndex: -4,
                pointerEvents: 'none',
              }}
            />
          )
        }

        const isFirst = idx === 0
        const xVar = isFirst ? 'var(--g1-offset, 0)' : 'calc(50% + var(--g2-offset, 0))'
        const yVar = isFirst ? 'var(--g1-offset, 0)' : '100%'

        return (
          <div key={`gradient-${idx}`}>
            <div
              ref={(el) => {
                gradientDivsRef.current[idx] = el
              }}
              style={{
                position: 'absolute',
                width: '150%',
                height: '150%',
                borderRadius: '50%',
                top: '-25%',
                left: '-25%',
                background: `radial-gradient(circle at ${xVar} ${yVar}, ${color} 0%, transparent calc(${idx} * 75%))`,
                zIndex: -4,
                pointerEvents: 'none',
              }}
            />
            <div
              ref={(el) => {
                frameDivsRef.current[idx] = el
              }}
              style={{
                color: color,
                width: '30rem',
                filter: `blur(${darkMode ? 6 : 7}rem)`,
                position: 'absolute',
                mixBlendMode: darkMode ? 'color-dodge' : 'soft-light',
                top: `${framePositions[idx]?.y || (isFirst ? 20 : 60)}%`,
                left: `${framePositions[idx]?.x || (isFirst ? 30 : 70)}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: -2,
                opacity: darkMode ? 1 : 0.8,
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              <StorytaleFrame />
            </div>
          </div>
        )
      })}

      {/* Noise canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: darkMode ? 'color-burn' : 'plus-lighter',
          pointerEvents: 'none',
          display: 'block',
          zIndex: -1,
        }}
      />
    </div>
  )
}
