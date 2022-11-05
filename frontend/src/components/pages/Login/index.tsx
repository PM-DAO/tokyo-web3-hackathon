import { Container, Box, Center, Stack } from '@chakra-ui/react'
import { useIsMobileDevice } from '../../../modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from '../../atoms'
import { LogoBox } from '../../molecules'

type Props = {
  setAccount: React.Dispatch<React.SetStateAction<string>>
}

export const Login = ({ setAccount }: Props) => {
  const isMobile = useIsMobileDevice()
  return (
    <Box bgColor="orange.400" width="100vw" height="100vh">
      <Center h="100%">
        <Stack>
          <Container marginX="auto">
            <LogoBox />
          </Container>
          <Container marginX="auto">{isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}</Container>
        </Stack>
      </Center>
    </Box>
  )
}
