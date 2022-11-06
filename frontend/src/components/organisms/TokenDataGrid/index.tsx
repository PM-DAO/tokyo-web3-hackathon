import { Grid } from '@chakra-ui/react'

import { TokenDataCard } from '~/components/molecules'
import { TokenType } from '~/types/Token'

type Props = {
  myTokens: TokenType[]
}

export const TokenDataGrid = ({ myTokens }: Props) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={myTokens.length}>
      {myTokens.map((token) => (
        <TokenDataCard key={token.tokenID} {...token} />
      ))}
    </Grid>
  )
}
