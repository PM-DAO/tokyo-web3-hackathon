import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  theme?: 'primary' | 'secondary'
} & JSX.IntrinsicElements['button']

export const Button = ({ children, theme = 'primary', ...rest }: Props) => {
  const primaryButtonBGColor = useColorModeValue('gray.900', 'orange.400')
  const secondaryButtonBGColor = useColorModeValue('orange.600', 'gray.700')
  return (
    <ChakraButton bgColor={theme === 'primary' ? primaryButtonBGColor : secondaryButtonBGColor} color={'white'} w="min-content" {...rest}>
      {children}
    </ChakraButton>
  )
}
