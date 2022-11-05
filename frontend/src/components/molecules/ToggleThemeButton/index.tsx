import { useColorMode } from '@chakra-ui/react'
import { Button } from '../../atoms'

export const ToggleThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </header>
  )
}
