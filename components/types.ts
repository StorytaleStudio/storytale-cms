export type VideoType = 'youtube' | 'vimeo' | 'direct'

export interface Video {
  id: number
  title: string
  description: string
  url: string
  thumbnail: string
  type: VideoType
}
