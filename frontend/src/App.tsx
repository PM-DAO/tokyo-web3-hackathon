import './App.css'

import { useIsMobileDevice } from './modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from './components/atoms'
import { useEffect, useState } from 'react'

interface Ethereum {
  selectedAddress: string
}

declare global {
  interface Window {
    ethereum?: Ethereum
  }
}

function App() {
  const isMobile = useIsMobileDevice()
  const [account, setAccount] = useState('')

  useEffect(() => {
    if (window.ethereum) {
      setAccount(window.ethereum.selectedAddress)
    }
  }, [window.ethereum, window.ethereum?.selectedAddress])

  return (
    <>
      {isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}
      {account && <div>Connected account {account}</div>}
    </>
  )
}

export default App
