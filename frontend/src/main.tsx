import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { MetaMaskProvider } from 'metamask-react'

import App from './App'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </ChakraProvider>
  </React.StrictMode>
)
