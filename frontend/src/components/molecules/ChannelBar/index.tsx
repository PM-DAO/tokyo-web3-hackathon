import { Box, Flex, Image, Text } from '@chakra-ui/react'

import { getImageUrl } from '~/modules/images/getImageUrl'

type ChannelType = {
  name: string
}
type Props = {
  channel: ChannelType
}

export const ChannelBar = (props: Props) => {
  const { channel } = props
  return (
    <Box py={2} bgColor="orange.700" borderRadius="sm">
      <Flex alignItems="center" justifyContent="center">
        <Image src={getImageUrl('chikachika', 'gif')} w={2} h={2} mb="1px" />
        <Box ml={2}>
          <Text color="white" fontFamily="poppins">
            #{channel.name}-channel
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
