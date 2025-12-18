'use client'
import React, { useState } from 'react'
import { VideoPlayer } from './VideoPlayer'
import { VideoMenu } from './VideoMenu'
import { Video } from './types'
import styles from './style/videoplayer.module.css'
import ScrollFade from './TextScrollFade'

interface VideoAppProps {
  videos: Video[]
}

export const VideoApp: React.FC<VideoAppProps> = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0])

  return (
    <div data-section="dark" data-background="light" className={styles.page}>
      <aside className={styles.aside}>
        <div className={styles.aboutTop}>
          <ScrollFade>
            <h1>{currentVideo.title}</h1>
            <div
              className={styles.videoContent}
              dangerouslySetInnerHTML={{ __html: currentVideo.description }}
            />
          </ScrollFade>
          <ScrollFade>
            <VideoMenu
              videos={videos}
              onVideoSelect={setCurrentVideo}
              currentVideoId={currentVideo.id}
            />
          </ScrollFade>
        </div>
        <div>
          <ScrollFade>
            <h2>About</h2>
          </ScrollFade>
        </div>
      </aside>
      <main className={styles.main}>
        <VideoPlayer videoUrl={currentVideo.url} videoType={currentVideo.type} />
      </main>
    </div>
  )
}
