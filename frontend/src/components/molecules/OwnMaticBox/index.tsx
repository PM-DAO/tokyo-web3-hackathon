import { Container, Text } from '@chakra-ui/react'
import { useThemeColor } from '../../../modules/hooks/useThemeColor'

type Props = {
  ownMaticAmount: number
}

export const OwnMaticBox = ({ ownMaticAmount = 0 }: Props) => {
  const { deepBGColor, contrastTextColor } = useThemeColor()
  return (
    <Container bgColor={deepBGColor} w="max-content" borderRadius="sm" py="2">
      <Text fontSize="sm" color={contrastTextColor} fontWeight="bold">
        現在保有しているMATIC総額
      </Text>
      <Text fontSize="md" fontFamily="poppins" fontWeight="bold" color={contrastTextColor} textAlign="right">
        {ownMaticAmount}
      </Text>
    </Container>
  )
}
