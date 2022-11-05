import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & JSX.IntrinsicElements['button']

export const Button = ({ children, ...rest }: Props) => {
  return (
    <ChakraButton bgColor={'gray.800'} color={'white'} w="min-content" {...rest}>
      {children}
    </ChakraButton>
  )
}
