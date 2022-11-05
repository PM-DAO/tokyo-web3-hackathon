import { Box, Text, Image } from '@chakra-ui/react'

export const LogoBox = () => {
  return (
    <Box>
      <Image src={`${window.location.origin}/logo.svg`} marginX="auto" marginBottom={6} />
      <Text fontSize={'2xl'} fontWeight="bold" fontFamily={'poppins'}>
        Decentralized Podcast Platform
      </Text>
    </Box>
  )
}
