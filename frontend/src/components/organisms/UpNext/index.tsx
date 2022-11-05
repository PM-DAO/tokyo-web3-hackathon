import { Box, Text } from '@chakra-ui/react'

import { TokenRow } from '~/components/molecules'
import { TokenType } from '~/types/Token'

type Props = {
  tokens: TokenType[]
}

export const UpNext = ({ tokens }: Props) => {
  return (
    <Box>
      <Text fontFamily="poppins" fontSize="xl" textAlign="left">
        UP NEXT
      </Text>
      <Box border="2px" mt={2} />
      {tokens.length ? tokens.map((token) => <TokenRow token={token} key={token.tokenID} />) : <Text>Not up next tokens</Text>}
    </Box>
  )
}
