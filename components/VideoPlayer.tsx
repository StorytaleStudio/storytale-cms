import React from 'react'
import styles from './style/videoplayer.module.css'
import TVOutArea from './svgs/tv-outer'
import TVInArea from './svgs/tv-inner'

interface VideoPlayerProps {
  videoUrl: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className={styles.outerArea}>
      <TVOutArea />
      <div className={styles.innerArea}>
        <TVInArea />
        <div className={styles.videoPlayerWrapper}>
          <video key={videoUrl} className={styles.video} controls muted autoPlay loop>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}
