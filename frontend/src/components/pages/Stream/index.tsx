import { Box, Container, Text } from '@chakra-ui/react'

import { tokensData } from '~/data'
import { ChannelBar, TokenCard } from '~/components/molecules'
import { UpNext } from '~/components/organisms'
import { getFormattedTokens } from '~/modules/token'

export const Stream = () => {
  const { currentToken, upNextTokens } = getFormattedTokens(tokensData)

  return (
    <Container w="full">
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
    </Container>
  )
}
