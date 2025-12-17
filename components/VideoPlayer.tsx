import React from 'react'
import styles from './style/videoplayer.module.css'

interface VideoPlayerProps {
  videoUrl: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className={styles.outerArea}>
      <div className={styles.innerArea}>
        <div className={styles.videoPlayerWrapper}>
          <video key={videoUrl} className={styles.video} controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}
