import { Box, Text, Image } from '@chakra-ui/react'
import { getImageUrl } from '../../../modules/images/getImageUrl'

export const LogoBox = () => {
  return (
    <Box>
      <Image src={getImageUrl('logo')} marginX="auto" marginBottom={6} />
      <Text fontSize={'2xl'} fontWeight="bold" fontFamily={'poppins'}>
        Decentralized Podcast Platform
      </Text>
    </Box>
  )
}
