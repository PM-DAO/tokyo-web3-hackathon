import { Box, Container, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '~/components/atoms'
import { DEFAULT_CHANNEL_NAME } from '~/constants'
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

  {
    /* #TODO: separate components */
  }
  return (
    <Container w="full" pt={'8'} pb={16}>
      <Box textAlign={'center'}>
        <Image src={token.metadata.image} maxW="100%" />
      </Box>
      <Box textAlign={'left'} pt="8">
        <Box mb={6}>
          <Text color="gray.300" fontWeight="bold" fontSize="lg" fontFamily={'poppins'}>
            配信チャンネル
          </Text>
          <Box>
            <Text color="white" fontSize="lg">
              #{DEFAULT_CHANNEL_NAME}-channel
            </Text>
          </Box>
        </Box>
        <Box mb={6}>
          <Text color="gray.300" fontWeight="bold" fontSize="lg" fontFamily={'poppins'}>
            配信楽曲のYouTube URL
          </Text>
          <Box mt={2}>
            <Input color="white" fontSize="lg" placeholder={'https://youtube.com/watch?v=jfKfPfyJ...'} />
          </Box>
        </Box>
        <Box mb={6}>
          <Text color="gray.300" fontWeight="bold" fontSize="lg" fontFamily={'poppins'}>
            配信費用
          </Text>
          <Text color="gray.500" fontSize="xs">
            配信費用を報酬として分配して、多くのリスナーに聞いてもらいましょう
          </Text>
          <Box mt={2}>
            <Input color="white" fontSize="lg" placeholder={'100 MATIC'} />
          </Box>
        </Box>
        <Box mb={6}>
          <Text color="gray.300" fontWeight="bold" fontSize="lg" fontFamily={'poppins'}>
            配信人数
          </Text>
          <Text color="gray.500" fontSize="xs">
            こちらの人数に達するまで配信され続けます
          </Text>
          <Box>
            <Text color="white" fontSize="lg">
              100人
            </Text>
          </Box>
        </Box>
        <Box mb={6}>
          <Text color="gray.300" fontWeight="bold" fontSize="lg" fontFamily={'poppins'}>
            一人あたりの報酬
          </Text>
          <Box>
            <Text color="white" fontSize="lg">
              1 MATIC
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex>
        {/* #TODO: setting */}
        <Button>支払いする</Button>
        <Box mr={4} />
        <Button theme="secondary">キャンセル</Button>
      </Flex>
    </Container>
  )
}
