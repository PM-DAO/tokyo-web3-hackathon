import { Box, Text, Image, HStack, Spacer } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

import { formatTimeByAttributes } from '~/modules/token'
import { getYouTubeData, parseVideoID } from '~/modules/youtube'
import { YouTubeVideoData } from '~/types'
import { TokenType } from '~/types/Token'

type TokenTypeProps = {
  token: TokenType
}

export const TokenRow = ({ token }: TokenTypeProps) => {
  const [videoData, setVideoData] = useState<YouTubeVideoData | null>()

  const videoId = useMemo(() => {
    return parseVideoID(token.youtubeURL)
  }, [token])

  useEffect(() => {
    if (!videoId) return
    const handleGetYoutubeData = async () => {
      const data = await getYouTubeData(videoId)
      setVideoData(data)
    }
    handleGetYoutubeData()
  }, [videoId])

  const streamingTime = useMemo(() => {
    if (!token.metadata.attributes) return null
    return formatTimeByAttributes(token.metadata.attributes)
  }, [token])

  return (
    <>
      {streamingTime && (
        <Text fontFamily="poppins" fontWeight="bold" textAlign="left">
          {streamingTime.startTime}-{streamingTime.endTime}
        </Text>
      )}
      {videoData ? (
        <Box bgColor="gray.900" h="70px">
          <HStack>
            <Box w="60%">
              <Text color="gray.100" whiteSpace="nowrap" overflow="hidden">
                {videoData.title}
              </Text>
              <Text color="gray.100">{videoData.artistName}</Text>
            </Box>
            <Spacer />
            <Image src={videoData.thumbnailUrl} h="auto" w="30%" />
          </HStack>
        </Box>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}
