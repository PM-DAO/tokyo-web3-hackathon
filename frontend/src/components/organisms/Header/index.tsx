import { Box, Container, HStack, Image, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import { useThemeColor } from '../../../modules/hooks/useThemeColor'
import { OwnMaticBox, NFTButton, HomeButton } from '../../molecules'

export const Header = () => {
  const { bgColor } = useThemeColor()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW="container.lg" w="full" bgColor={bgColor} py="4">
      <Flex alignItems="center">
        <Box>
          {colorMode === 'light' ? (
            <Image src={`${window.location.origin}/logo.svg`} h="70px" w="auto" decoding="async" />
          ) : (
            <Image src={`${window.location.origin}/logo-white.svg`} h="70px" w="auto" decoding="async" />
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
