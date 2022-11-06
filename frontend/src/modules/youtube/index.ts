import axios from 'axios'

import { YouTubeVideoData } from '~/types'

export const parseVideoID = (url: string | string[]) => {
  if (!url) return ''
  let prefixRemoved = ''
  if (typeof url === 'string') {
    prefixRemoved = url.replace('https://www.youtube.com/watch?v=', '')
  } else {
    prefixRemoved = url[0].replace('https://www.youtube.com/watch?v=', '')
  }
  // NOTE: return string removed query params
  return prefixRemoved.replace(/&.*/, '')
}

export const getYouTubeData = async (videoId: string): Promise<YouTubeVideoData | null> => {
  try {
    const res = await axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&feature=emb_logo&format=json`)
    return {
      title: res.data.title,
      thumbnailUrl: res.data.thumbnail_url,
      artistName: res.data.author_name
    }
  } catch (err) {
    console.error({ err })
    return null
  }
}
