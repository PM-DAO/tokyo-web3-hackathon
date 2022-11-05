import { Box, Text } from '@chakra-ui/react'

import { tokensData } from '~/data'
import { ChannelBar, TokenCard } from '~/components/molecules'
import { UpNext } from '~/components/organisms'
import { SPLayout } from '~/components/templates'
import { TokenType } from '~/types/Token'

const UP_NEXT_MAX_COUNT = 3

const getCurrentToken = (): TokenType | null => {
  return tokensData?.length ? tokensData[0] : null
}

const getUpNextTokens = (): TokenType[] => {
  return tokensData?.length ? tokensData.slice(1, UP_NEXT_MAX_COUNT) : []
}

export const Stream = () => {
  const currentToken = getCurrentToken()
  const upNextTokens = getUpNextTokens()

  return (
    <SPLayout>
      <Box py={4}>
        <ChannelBar channel={{ name: 'main' }} />
      </Box>
      {currentToken ? (
        <Box py={4}>
          <TokenCard token={currentToken} />
        </Box>
      ) : (
        <Box py={4}>
          <Text>Not current token</Text>
        </Box>
      )}
      <Box py={4}>
        <UpNext tokens={upNextTokens ?? []} />
      </Box>
    </SPLayout>
  )
}
