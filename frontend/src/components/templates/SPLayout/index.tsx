import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { useThemeColor } from '~/modules/hooks/useThemeColor'

type Props = {
  children: ReactNode
}

export const SPLayout = ({ children }: Props) => {
  const { bgColor } = useThemeColor()
  return (
    <>
      <Container minW="320px" w="600px" maxW="container.lg" minH="100vh" maxH="full" bgColor={bgColor}>
        {children}
      </Container>
    </>
  )
}
