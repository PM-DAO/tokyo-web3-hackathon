import { Box, Text, Image, Spacer, Flex } from '@chakra-ui/react'
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
    <Box mb="8px">
      {streamingTime && (
        <Box p="8px">
          <Text fontFamily="poppins" fontWeight="bold" textAlign="left" fontSize="lg">
            {streamingTime.startTime}-{streamingTime.endTime}
          </Text>
        </Box>
      )}
      {videoData ? (
        <Box bgColor="orange.500" borderRadius="md" p="16px">
          <Flex>
            <Box w="60%" textAlign={'left'}>
              <Text color="gray.100" whiteSpace="nowrap" overflow="hidden" fontSize={'xl'} fontWeight="bold">
                {videoData.title}
              </Text>
              <Text color="gray.100">{videoData.artistName}</Text>
            </Box>
            <Spacer />
            <Image src={videoData.thumbnailUrl} h="auto" w="30%" />
          </Flex>
        </Box>
      ) : (
        <p>loading...</p>
      )}
    </Box>
  )
}
