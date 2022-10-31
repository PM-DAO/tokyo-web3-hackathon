import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'

import { MetaMaskProvider } from 'metamask-react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </ChakraProvider>
  </React.StrictMode>
)
