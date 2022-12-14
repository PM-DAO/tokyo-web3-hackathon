import { ComponentProps } from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = ComponentProps<typeof ChakraLink> & ComponentProps<typeof RouterLink>

export const Link = ({ children, ...rest }: LinkProps) => {
  return (
    <ChakraLink as={RouterLink} {...rest}>
      {children}
    </ChakraLink>
  )
}
