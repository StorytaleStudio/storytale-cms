import { VideoApp } from 'components/VideoAbout'
import { Video } from 'components/types'

const videos: Video[] = [
  {
    id: 1,
    title: 'YouTube Video',
    url: 'https://www.youtube.com/watch?v=gEb_BB-OTxQ&list=RDgEb_BB-OTxQ&start_radio=1',
    description: `<p>This is a Youtube video.</p><p>Please enjoy</p>`,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    type: 'youtube',
  },
  {
    id: 2,
    title: 'Vimeo Video',
    url: 'https://vimeo.com/524933864',
    description: `<p>This is a vimeo video.<br/>Hope you enjoy</p>`,
    thumbnail: 'https://i.vimeocdn.com/video/524933864-1920x1080.jpg',
    type: 'vimeo',
  },
  {
    id: 3,
    title: 'Direct MP4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: `<p>This is a direct video for when you have the mp4 ready</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop',
    type: 'direct',
  },
]

export default function About() {
  return (
    <>
      <VideoApp videos={videos} />
    </>
  )
}
