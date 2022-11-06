import { Container } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TokenDataCard } from '~/components/molecules'
import { getTokenByTokenId } from '~/modules/token'
import { TokenType } from '~/types/Token'

type Props = {
  account: string
}

export const StreamSetting = ({ account }: Props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [token, setToken] = useState<TokenType>()

  const handleGetToken = useCallback(async (tokenId: number) => {
    const fetchedToken = await getTokenByTokenId(tokenId)
    console.debug({ fetchedToken })
    if (fetchedToken) {
      setToken(fetchedToken)
    }
  }, [])

  useEffect(() => {
    if (!account || !params?.tokenId) return
    const numberTokenId = Number(params.tokenId)
    handleGetToken(numberTokenId)
  }, [account, params])

  // #NOTE: 所有者でなけれなコレクションページへリダイレクト
  useEffect(() => {
    if (!token || !account) return
    if (token.ownerAddress[0] !== account) {
      navigate('/collection')
    }
  }, [token, account])

  if (!token) return <p>loading...</p>

  return (
    <Container>
      <p>StreamSetting</p>
      {token && <TokenDataCard {...token} />}
    </Container>
  )
}
