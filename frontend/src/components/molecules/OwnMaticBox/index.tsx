import { Box, Container, Text } from '@chakra-ui/react'

import { useThemeColor } from '~/modules/hooks/useThemeColor'

type Props = {
  ownMaticAmount: string
}

export const OwnMaticBox = ({ ownMaticAmount }: Props) => {
  const { deepBGColor, contrastTextColor } = useThemeColor()
  return (
    <Container bgColor={deepBGColor} w="max-content" borderRadius="md" pt="3" pb="2">
      <Text fontSize="9px" color={contrastTextColor} fontWeight="bold" fontFamily="poppins">
        現在保有しているトークン
      </Text>
      <Box textAlign="right">
        <Text display="inline" fontSize="14px" fontFamily="poppins" fontWeight="bold" color={contrastTextColor} textAlign="right">
          {parseFloat(ownMaticAmount).toFixed(6)}
        </Text>{' '}
        <Text display="inline" fontSize="2xs" fontFamily="poppins" color={contrastTextColor} textAlign="right">
          MATIC
        </Text>
      </Box>
    </Container>
  )
}
