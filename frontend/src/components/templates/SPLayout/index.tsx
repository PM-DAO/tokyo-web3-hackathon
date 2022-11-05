import { Box, Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { useThemeColor } from '~/modules/hooks/useThemeColor'

type Props = {
  children: ReactNode
}

export const SPLayout = ({ children }: Props) => {
  const { bgColor } = useThemeColor()
  return (
    <Container maxW="container.lg" w="full" h="100vh" bgColor={bgColor}>
      <Box boxSize="lg">{children}</Box>
    </Container>
  )
}
