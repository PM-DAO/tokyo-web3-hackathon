import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

import { TokenItem } from '~/types/Token'

type TokenItemProps = {
  token: TokenItem
}
const opts: YouTubeProps['opts'] = {
  height: '200',
  width: '400',
  margin: '0 auto',
  playerVars: {
    autoplay: 1
  }
}

const parseVideoID = (url: string | string[]) => {
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

export const TokenCard = (props: TokenItemProps) => {
  const { token } = props
  const [title, setTitle] = useState('')
  if (!token.youtubeURL[0])
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '400px',
          height: '200px',
          margin: '0 auto'
        }}
      >
        <Box>no content</Box>
      </Box>
    )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Box
        sx={{
          margin: '16px auto',
          width: '400px'
        }}
      >
        <YouTube
          videoId={parseVideoID(token?.youtubeURL)}
          opts={opts}
          onReady={(e) => setTitle(e.target.videoTitle)}
          onPlay={() => console.log('play')}
          onPause={() => console.log('pause')}
          onEnd={() => console.log('end')}
        />
      </Box>
      <Box width="400px">
        <Text>{title}</Text>
      </Box>
    </Box>
  )
}
