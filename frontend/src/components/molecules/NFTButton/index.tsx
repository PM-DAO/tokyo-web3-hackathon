import { Flex, Image } from '@chakra-ui/react'

type Props = {
  toggleColorMode: () => void
}

export const NFTButton = ({ toggleColorMode }: Props) => {
  // #TODO: add link
  return (
    <button onClick={toggleColorMode}>
      <Flex bgColor="gray.900" borderRadius="md" h="60px" w="60px" justifyContent="center" alignItems="center">
        <Image src={`${window.location.origin}/nft.svg`} h="40px" w="40px" decoding="async" />
      </Flex>
    </button>
  )
}
