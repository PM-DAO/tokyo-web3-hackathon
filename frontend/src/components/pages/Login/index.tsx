import { Container, Stack } from '@chakra-ui/react'

import { useIsMobileDevice } from '~/modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from '~/components/atoms'
import { LogoBox } from '~/components/molecules'
import { SPLayout } from '~/components/templates'

type Props = {
  setAccount: React.Dispatch<React.SetStateAction<string>>
}

export const Login = ({ setAccount }: Props) => {
  const isMobile = useIsMobileDevice()
  return (
    <SPLayout>
      <Stack w="full">
        <Container marginX="auto">
          <LogoBox />
        </Container>
        <Container marginX="auto">{isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}</Container>
      </Stack>
    </SPLayout>
  )
}
