import './App.css'
import { RouterProvider } from 'react-router-dom'
import { useWeb3Client } from './modules/hooks/web3client'

import { Login } from './components/pages'
import { router } from './modules/router'
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
  }
}

function App() {
  const { account, setAccount } = useWeb3Client()
  if (!account) {
    return <Login setAccount={setAccount} />
  }
  return <RouterProvider router={router} />
}

export default App
