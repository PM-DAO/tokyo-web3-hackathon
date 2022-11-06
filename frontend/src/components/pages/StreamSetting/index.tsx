import { Box, Container, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Contract, ethers } from 'ethers'

import { Button } from '~/components/atoms'
import { DEFAULT_CHANNEL_NAME } from '~/constants'
import { getTokenByTokenId } from '~/modules/token'
import { TokenType } from '~/types/Token'

type Props = {
  account: string
  client: Contract
}

const isValidUrl = (s: string) => {
  return /^http:\/\/.|^https:\/\/./.test(s)
}

export const StreamSetting = ({ account, client }: Props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [token, setToken] = useState<TokenType>()
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState(isValidUrl(token?.youtubeURL?.join(',') || ''))
  const [urlErrorMessage, setUrlErrorMessage] = useState('')
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(true)
  const [amountErrorMessage, setAmountErrorMessage] = useState('')
  const [balance, setBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from(0))
  const [distributedAmount, setDistributedAmount] = useState('0')

  useEffect(() => {
    client.signer.getBalance().then((b: ethers.BigNumber) => {
      setBalance(b)
    })
  }, [client.signer])

  const isValidEth = useCallback((pay?: ethers.BigNumber, have?: ethers.BigNumber) => {
    if (pay?.lt(ethers.BigNumber.from(100))) {
      setAmountErrorMessage('最低100weiの寄付が必要です')
      return false
    } else if (have?.lt(pay || 0)) {
      setAmountErrorMessage('所持金額より多い金額が入力されています')
      return false
    }
    setAmountErrorMessage('')
    return true
  }, [])

  const handleSubmit = useCallback(async () => {
    if (typeof token?.tokenID === 'undefined') return
    let eth: ethers.BigNumber | undefined = undefined
    try {
      eth = ethers.utils.parseEther(amount)
    } catch {
      // nothing TODO
    }
    if (!isValidUrl(url) || !isValidEth(eth, balance)) return
    await client.donateToToken(token.tokenID, { value: eth })
  }, [amount, balance, client, isValidEth, token])

  const handleChangeUrl = useCallback((s: string) => {
    setUrl(s)
    if (!isValidUrl(s)) {
      setUrlError(true)
      setUrlErrorMessage('http://またはhttps://から入力してください')
    } else {
      setUrlError(false)
      setUrlErrorMessage('')
    }
  }, [])

  const handleChangeAmount = useCallback(
    (s: string) => {
      setAmount(s)
      let eth: ethers.BigNumber | undefined = undefined
      try {
        eth = ethers.utils.parseEther(s)
      } catch {
        // nothing TODO
      }
      setAmountError(!isValidEth(eth, balance))
      if (eth) {
        setDistributedAmount(ethers.utils.formatEther(eth.div(ethers.BigNumber.from(100))))
      }
    },
    [balance, isValidEth]
  )

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

  if (!token || !client) return <p>loading...</p>

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
            <Input
              color="white"
              fontSize="lg"
              placeholder={'https://youtube.com/watch?v=jfKfPfyJ...'}
              isInvalid={urlError}
              onChange={(e) => handleChangeUrl(e.target.value)}
              errorBorderColor="crimson"
              defaultValue={token.youtubeURL.join(',') || ''}
            />
            <Text color="red">{urlErrorMessage}</Text>
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
            <Input
              color="white"
              fontSize="lg"
              placeholder={'100 MATIC'}
              onChange={(e) => handleChangeAmount(e.target.value)}
              isInvalid={amountError}
              errorBorderColor="crimson"
            />
            <Text color="red">{amountErrorMessage}</Text>
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
              {distributedAmount} MATIC
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex>
        <Button onClick={handleSubmit} disabled={amountError || urlError}>
          支払いする
        </Button>
        <Box mr={4} />
        <Link to="/collection">
          <Button theme="secondary">キャンセル</Button>
        </Link>
      </Flex>
    </Container>
  )
}
