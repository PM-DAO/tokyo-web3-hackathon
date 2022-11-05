import { Box, Text } from '@chakra-ui/react'

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
      <Text color="white" fontFamily="poppins">
        #{channel.name}-channel
      </Text>
    </Box>
  )
}
