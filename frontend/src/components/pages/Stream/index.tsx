import { Box } from '@chakra-ui/react'

import { ChannelBar } from '~/components/molecules/ChannelBar'
import { SPLayout } from '~/components/templates'

export const Stream = () => {
  return (
    <SPLayout>
      <Box py={4}>
        <ChannelBar channel={{ name: 'main' }} />
      </Box>
    </SPLayout>
  )
}
