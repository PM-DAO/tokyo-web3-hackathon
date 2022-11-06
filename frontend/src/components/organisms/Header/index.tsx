import { Box, Container, HStack, Image, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import { utils, Contract } from 'ethers'
import { useState, useEffect } from 'react'

import { getImageUrl } from '~/modules/images/getImageUrl'
import { OwnMaticBox, NFTButton, HomeButton } from '~/components/molecules'

type Props = {
  client?: Contract
}

export const Header = ({ client }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [ownMaticAmount, setOwnMaticAmount] = useState('0')
  useEffect(() => {
    const onLoad = async () => {
      if (!client) return
      setOwnMaticAmount(utils.formatEther(await client.signer.getBalance()))
    }
    onLoad()
  }, [client])
  return (
    <Container py="4" w="full">
      <Flex alignItems="center">
        <Box>
          {colorMode === 'light' ? (
            <Image src={getImageUrl('logo')} h="70px" w="auto" decoding="async" />
          ) : (
            <Image src={getImageUrl('logo-white')} h="70px" w="auto" decoding="async" />
          )}
        </Box>
        <Spacer />
        <HStack>
          <OwnMaticBox ownMaticAmount={ownMaticAmount} />
          {colorMode === 'light' ? <NFTButton toggleColorMode={toggleColorMode} /> : <HomeButton toggleColorMode={toggleColorMode} />}
        </HStack>
      </Flex>
    </Container>
  )
}
