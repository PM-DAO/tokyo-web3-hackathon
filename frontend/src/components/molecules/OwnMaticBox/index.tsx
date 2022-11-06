import { Container, Text } from '@chakra-ui/react'

import { useThemeColor } from '~/modules/hooks/useThemeColor'

type Props = {
  ownMaticAmount: string
}

export const OwnMaticBox = ({ ownMaticAmount }: Props) => {
  const { deepBGColor, contrastTextColor } = useThemeColor()
  return (
    <Container bgColor={deepBGColor} w="max-content" borderRadius="sm" py="2">
      <Text fontSize="sm" color={contrastTextColor} fontWeight="bold">
        現在保有しているMATIC総額
      </Text>
      <Text display="inline" fontSize="12px" fontFamily="poppins" fontWeight="bold" color={contrastTextColor} textAlign="right">
        {ownMaticAmount}
      </Text>
      <Text display="inline" fontSize="4px" fontFamily="poppins" color={contrastTextColor} textAlign="right">
        MATIC
      </Text>
    </Container>
  )
}
