import { Box } from '@chakra-ui/react'

type ChannelType = {
  name: string
}
type Props = {
  channel: ChannelType
}

export const ChannelBar = (props: Props) => {
  const { channel } = props
  return (
    <Box mx={8} bgColor="orange.400">
      #{channel.name}-channel
    </Box>
  )
}
