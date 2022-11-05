import { Box, Text } from '@chakra-ui/react'

import { TokenRow } from '~/components/molecules'
import { TokenItem } from '~/types/tokenItem'

type Props = {
  tokens: TokenItem[]
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
