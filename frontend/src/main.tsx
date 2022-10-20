import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"

import { MetaMaskProvider } from 'metamask-react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
)
