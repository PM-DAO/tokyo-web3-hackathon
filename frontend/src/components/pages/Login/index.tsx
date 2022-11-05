import { Container, Stack } from '@chakra-ui/react'
import { useIsMobileDevice } from '../../../modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from '../../atoms'
import { LogoBox, ToggleThemeButton } from '../../molecules'
import { SPLayout } from '../../templates'

type Props = {
  setAccount: React.Dispatch<React.SetStateAction<string>>
}

export const Login = ({ setAccount }: Props) => {
  const isMobile = useIsMobileDevice()
  return (
    <SPLayout>
      <Stack w="full">
        <ToggleThemeButton />
        <Container marginX="auto">
          <LogoBox />
        </Container>
        <Container marginX="auto">{isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}</Container>
      </Stack>
    </SPLayout>
  )
}
