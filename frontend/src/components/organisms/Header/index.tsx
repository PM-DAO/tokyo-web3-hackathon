import { Box, Container, HStack, Image, Flex, Spacer, useColorMode } from '@chakra-ui/react'

import { useThemeColor } from '~/modules/hooks/useThemeColor'
import { getImageUrl } from '~/modules/images/getImageUrl'
import { OwnMaticBox, NFTButton, HomeButton } from '~/components/molecules'

export const Header = () => {
  const { bgColor } = useThemeColor()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW="container.lg" w="full" bgColor={bgColor} py="4">
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
          {/* #TODO: fetch own MATIC amount */}
          <OwnMaticBox ownMaticAmount={0} />
          {colorMode === 'light' ? <NFTButton toggleColorMode={toggleColorMode} /> : <HomeButton toggleColorMode={toggleColorMode} />}
        </HStack>
      </Flex>
    </Container>
  )
}
