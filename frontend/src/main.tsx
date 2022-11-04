import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { MetaMaskProvider } from 'metamask-react'

import App from './App'
import './index.css'
import { Web3ClientContextProvider } from './contexts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MetaMaskProvider>
        <Web3ClientContextProvider>
          <App />
        </Web3ClientContextProvider>
      </MetaMaskProvider>
    </ChakraProvider>
  </React.StrictMode>
)
