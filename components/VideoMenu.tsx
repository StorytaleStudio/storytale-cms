'use client'
import React, { useState, useRef } from 'react'
import styles from './style/videoplayer.module.css'
import { Video } from './types'

interface VideoMenuProps {
  videos: Video[]
  onVideoSelect: (video: Video) => void
  currentVideoId: number
}

export const VideoMenu: React.FC<VideoMenuProps> = ({ videos, onVideoSelect, currentVideoId }) => {
  const [hovered, setHovered] = useState(false)
  const [videoHover, setVideoHover] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const activeIndex = videos.findIndex((v) => v.id === currentVideoId)
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex

  const itemHeight = 3 // rem
  const containerPadding = 0.5 // rem
  const minimalHeight = `${itemHeight + containerPadding * 2}rem`
  const expandedHeight = `${videos.length * itemHeight + containerPadding * 2}rem`

  const orderedVideos = hovered
    ? videos
    : [videos[safeActiveIndex], ...videos.filter((_, i) => i !== safeActiveIndex)]

  return (
    <div
      ref={menuRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.videoMenu}
      style={{
        height: hovered ? expandedHeight : minimalHeight,
        transition: 'height 0.4s ease',
        padding: `${containerPadding}rem 0`,
      }}
    >
      {orderedVideos.map((video, idx) => {
        const isActive = idx === 0 && !hovered ? true : video.id === currentVideoId
        const showItem = hovered || isActive

        return (
          <button
            key={video.id}
            onClick={() => onVideoSelect(video)}
            onMouseEnter={() => setVideoHover(video.id)}
            onMouseLeave={() => setVideoHover(null)}
            className={styles.menuButton}
            style={{
              display: showItem ? 'flex' : 'none',
              opacity: showItem ? 1 : 0,
              transform: showItem ? 'translateY(0)' : 'translateY(0.625rem)',
              transition: `opacity 0.4s ease ${isActive ? '0s' : '0.4s'}, transform 0.4s ease ${isActive ? '0s' : '0.6s'}`,
              fontWeight: isActive ? '600' : 'normal',
            }}
          >
            <span
              className={styles.indicator}
              style={{
                background: isActive ? 'white' : 'transparent',
                transition: 'background 0.6s ease',
              }}
            />
            <span
              className={styles.videoTitle}
              style={{
                transition: 'transform 0.4s ease',
                transform:
                  videoHover === video.id && !isActive ? 'translateX(-0.125rem)' : 'translateX(0)',
              }}
            >
              {video.title}
            </span>
            {videoHover === video.id && !isActive && (
              <span
                className={styles.hoverIndicator}
                style={{
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transform: 'translateX(0.125rem)',
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
