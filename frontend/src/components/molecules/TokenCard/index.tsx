import { Box, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { Contract } from 'ethers'

import { formatTimeByAttributes } from '~/modules/token'
import { getYouTubeData, parseVideoID } from '~/modules/youtube'
import { YouTubeVideoData } from '~/types'
import { TokenType } from '~/types/Token'
import { Button } from '~/components/atoms'

type TokenCardProps = {
  token: TokenType
  client: Contract
}

const opts: YouTubeProps['opts'] = {
  height: '300px',
  width: '100%',
  margin: '0 auto',
  playerVars: {
    autoplay: 1
  }
}

const rewardTimeSecond = 10

export const TokenCard = ({ token, client }: TokenCardProps) => {
  const [videoData, setVideoData] = useState<YouTubeVideoData | null>()
  const [playing, setPlaying] = useState(false)
  const [activeWithdraw, setActiveWithdraw] = useState(false)
  const { withdrawFromToken } = client.functions

  const videoId = useMemo(() => {
    return parseVideoID(token.youtubeURL)
  }, [token])

  const streamingTime = useMemo(() => {
    if (!token.metadata.attributes) return null
    return formatTimeByAttributes(token.metadata.attributes)
  }, [token])

  const onPlay = () => {
    setPlaying(true)
  }
  const onPause = () => {
    setPlaying(false)
  }

  const handleWithdrawToken = useCallback(() => {
    withdrawFromToken(token.tokenID).catch((err) => {
      if (/lock time has not expired/.test(err)) {
        alert('この曲の報酬は受け取り済です')
      } else {
        console.error(err)
      }
    })
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      setActiveWithdraw(true)
    }, rewardTimeSecond * 1000)
    return () => clearTimeout(t)
  }, [playing])

  useEffect(() => {
    if (!videoId) return
    const handleGetYoutubeData = async () => {
      const data = await getYouTubeData(videoId)
      setVideoData(data)
    }
    handleGetYoutubeData()
  }, [videoId])

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
          width: 'full'
        }}
      >
        {streamingTime && (
          <Box mb="8px">
            <Text fontFamily="poppins" fontWeight="bold" textAlign="left" fontSize="xl">
              {streamingTime.startTime}-{streamingTime.endTime}
            </Text>
          </Box>
        )}
        <YouTube videoId={parseVideoID(token?.youtubeURL)} opts={opts} onPlay={onPlay} onPause={onPause} onEnd={() => console.log('end')} />
        <Box bgColor={'orange.500'} p="16px" textAlign="left" borderBottomRadius="md">
          <Text color={'gray.100'} fontWeight="bold" fontSize="xl">
            {videoData?.title}
          </Text>
          {videoData?.artistName && (
            <Text color={'gray.100'} fontSize="lg">
              {videoData.artistName}
            </Text>
          )}
          <Text color={'gray.300'} fontSize="sm">
            Address: {token.ownerAddress}
          </Text>
          {activeWithdraw && (
            <Button theme="secondary" onClick={handleWithdrawToken}>
              Claim Token
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
