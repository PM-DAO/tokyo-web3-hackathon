import { Box, Container, Text } from '@chakra-ui/react'
import { Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

import { ChannelBar, TokenCard } from '~/components/molecules'
import { UpNext } from '~/components/organisms'
import { getFormattedTokens } from '~/modules/token'
import { TokenType } from '~/types/Token'

type Props = {
  client?: Contract
}

export const Stream = ({ client }: Props) => {
  const [currentToken, setCurrentToken] = useState<TokenType | null>()
  const [upNextTokens, setUpNextTokens] = useState<TokenType[]>([])

  const handleGetFormattedTokens = useCallback(async () => {
    const { currentToken: fetchedCurrentTokens, upNextTokens: fetchedUpNextTokens } = await getFormattedTokens()
    setCurrentToken(fetchedCurrentTokens)
    setUpNextTokens(fetchedUpNextTokens)
  }, [])

  useEffect(() => {
    handleGetFormattedTokens()
  }, [])

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
