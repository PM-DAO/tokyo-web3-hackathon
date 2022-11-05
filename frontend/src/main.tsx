import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { MetaMaskProvider } from 'metamask-react'

import App from './App'
import './index.css'
import { theme } from './modules/chakra/theme'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </ChakraProvider>
  </React.StrictMode>
)
