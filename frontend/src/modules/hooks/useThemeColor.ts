import { useColorModeValue } from '@chakra-ui/react'

export const useThemeColor = () => {
  const bgColor = useColorModeValue('orange.400', 'gray.900')
  return {
    bgColor
  }
}
