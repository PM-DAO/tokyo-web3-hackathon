import { Box, Text } from '@chakra-ui/react'
import { Contract } from 'ethers'
import { useMemo } from 'react'

import { ChannelBar, TokenCard } from '~/components/molecules'
import { UpNext } from '~/components/organisms'
import { SPLayout } from '~/components/templates'
import { useTokens } from '~/modules/hooks/tokens'

type Props = {
  client: Contract
}

export const Stream = ({ client }: Props) => {
  const { tokens } = useTokens(client)

  const formattedTokens = useMemo(() => {
    if (!tokens || !tokens.length) {
      return {
        currentToken: null,
        upNextTokens: []
      }
    }
    // #TODO: get token by current time
    return {
      currentToken: tokens[0],
      // #TODO: order by streaming date
      upNextTokens: tokens.slice(0, tokens.length)
    }
  }, [tokens])

  return (
    <SPLayout>
      <Box py={4}>
        <ChannelBar channel={{ name: 'main' }} />
      </Box>
      {formattedTokens.currentToken ? (
        <Box py={4}>
          <TokenCard token={formattedTokens.currentToken} />
        </Box>
      ) : (
        <Box py={4}>
          <Text>Not current token</Text>
        </Box>
      )}
      <Box py={4}>
        <UpNext tokens={formattedTokens?.upNextTokens ?? []} />
      </Box>
    </SPLayout>
  )
}
