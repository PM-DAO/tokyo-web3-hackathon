import { Box, Container, Text } from '@chakra-ui/react'
import { Contract } from 'ethers'

import { tokensData } from '~/data'
import { ChannelBar, TokenCard } from '~/components/molecules'
import { UpNext } from '~/components/organisms'
import { getFormattedTokens } from '~/modules/token'

type Props = {
  client?: Contract
}

export const Stream = ({ client }: Props) => {
  const { currentToken, upNextTokens } = getFormattedTokens(tokensData)

  if (!client) return <></>

  return (
    <Container w="full">
      <Box py={4}>
        <ChannelBar channel={{ name: 'main' }} />
      </Box>
      {currentToken ? (
        <Box py={2}>
          <TokenCard token={currentToken} client={client} />
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
