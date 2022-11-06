import { Container, Text, Box } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

import { TokenDataGrid } from '~/components/organisms'
import { getMyTokens } from '~/modules/token'
import { TokenType } from '~/types/Token'

type Props = {
  account: string
}

export const Collection = ({ account }: Props) => {
  const [myTokens, setMyTokens] = useState<TokenType[]>()

  const handleGetMyTokens = useCallback(async () => {
    const tokens = await getMyTokens(account)
    if (tokens) {
      setMyTokens(tokens)
    }
  }, [])

  useEffect(() => {
    handleGetMyTokens()
  }, [])

  return (
    <Container w="full" pt={'8'}>
      {myTokens && myTokens.length ? (
        <TokenDataGrid myTokens={myTokens} />
      ) : (
        <Box>
          <Text color={'gray.100'}>所有している DePod NFT はありません</Text>
          <a href="https://testnets.opensea.io/ja/collection/pmtoken-v3" target="_blank" rel="noopener noreferrer">
            OpenSea で購入する
          </a>
        </Box>
      )}
    </Container>
  )
}
