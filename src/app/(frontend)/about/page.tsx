import { VideoApp } from 'components/VideoAbout'
import { Video } from 'components/types'

const videos: Video[] = [
  {
    id: 1,
    title: 'The Studio',
    url: 'https://www.youtube.com/watch?v=gEb_BB-OTxQ&list=RDgEb_BB-OTxQ&start_radio=1',
    description: `<p>Storytale is built on the core belief that great stories spur people to action and sets hearts ablaze.</p><p>Founded by two friends, united in the crucible of tabletop roleplaying and start-ups.</p>`,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    type: 'youtube',
  },
  {
    id: 2,
    title: 'The Duo',
    url: 'https://vimeo.com/524933864',
    description: `<p>This is a vimeo video.<br/>Hope you enjoy</p>`,
    thumbnail: 'https://i.vimeocdn.com/video/524933864-1920x1080.jpg',
    type: 'vimeo',
  },
  {
    id: 3,
    title: 'The Process',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: `<p>This is a direct video for when you have the mp4 ready</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop',
    type: 'direct',
  },
  {
    id: 4,
    title: 'Storytelling',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: `<p>This is a direct video for when you have the mp4 ready</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop',
    type: 'direct',
  },
  {
    id: 5,
    title: 'Legends',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: `<p>This is a direct video for when you have the mp4 ready</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop',
    type: 'direct',
  },
  {
    id: 6,
    title: 'Getting Started',
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
