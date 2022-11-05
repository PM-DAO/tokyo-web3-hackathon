import React from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { MetaMaskProvider } from 'metamask-react'

import App from './App'

import './index.css'
import { theme } from '~/modules/chakra/theme'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MetaMaskProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </MetaMaskProvider>
    </ChakraProvider>
  </React.StrictMode>
)
