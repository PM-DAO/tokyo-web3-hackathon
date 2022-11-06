import { Container } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

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

  console.log(myTokens)

  return (
    <Container w="full">
      <p>Collection</p>
    </Container>
  )
}
