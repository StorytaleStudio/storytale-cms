import ScrollFade from 'components/TextScrollFade'
import styles from '../page.module.css'
import { VideoApp } from 'components/VideoAbout'
import { Video } from 'components/types'

const videos: Video[] = [
  {
    id: 1,
    title: 'Ocean Waves',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Mountain View',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'City Lights',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=200&fit=crop',
  },
]

export default function About() {
  return (
    <>
      <VideoApp videos={videos} />
    </>
  )
}
