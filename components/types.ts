export type VideoType = 'youtube' | 'vimeo' | 'direct'

export interface Video {
  id: number
  title: string
  url: string
  thumbnail: string
  type: VideoType
}
