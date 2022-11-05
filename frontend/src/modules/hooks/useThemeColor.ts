import { useColorModeValue } from '@chakra-ui/react'

export const useThemeColor = () => {
  const bgColor = useColorModeValue('orange.400', 'gray.900')
  const deepBGColor = useColorModeValue('orange.500', 'gray.700')
  const contrastTextColor = useColorModeValue('gray.100', 'gray.200')
  return {
    bgColor,
    deepBGColor,
    contrastTextColor
  }
}
