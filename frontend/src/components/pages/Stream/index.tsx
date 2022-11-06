import { Box, Text } from '@chakra-ui/react'

import { tokensData } from '~/data'
import { ChannelBar, TokenCard } from '~/components/molecules'
import { UpNext } from '~/components/organisms'
import { SPLayout } from '~/components/templates'
import { getCurrentToken, getUpNextTokens } from '~/modules/token'

export const Stream = () => {
  const currentToken = getCurrentToken(tokensData)
  const upNextTokens = getUpNextTokens(tokensData)

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
