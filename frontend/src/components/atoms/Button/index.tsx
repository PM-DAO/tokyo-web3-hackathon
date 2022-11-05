import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: ReactNode
} & JSX.IntrinsicElements['button']

export const Button = ({ children, ...rest }: Props) => {
  const buttonBGColor = useColorModeValue('gray.900', 'orange.400')
  return (
    <ChakraButton bgColor={buttonBGColor} color={'white'} w="min-content" {...rest}>
      {children}
    </ChakraButton>
  )
}
