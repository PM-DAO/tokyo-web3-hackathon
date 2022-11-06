import { Box, Container, GridItem, Image, Text } from '@chakra-ui/react'

import { Button, Link } from '~/components/atoms'
import { TokenType } from '~/types/Token'

type Props = TokenType

export const TokenDataCard = ({ metadata, tokenID }: Props) => {
  return (
    <GridItem borderRadius="md" bgColor={'gray.800'} border={'2px'} borderColor="gray.700">
      <Image src={metadata.image} w="full" />
      <Container py={'4'} px={'3'}>
        <Text textAlign={'left'} fontFamily={'poppins'} fontSize="l">
          {metadata.name}
        </Text>
        <Link to={`/stream-setting/${tokenID}`}>
          <Box textAlign={'right'} mt={2}>
            <Button theme="secondary">設定</Button>
          </Box>
        </Link>
      </Container>
    </GridItem>
  )
}
