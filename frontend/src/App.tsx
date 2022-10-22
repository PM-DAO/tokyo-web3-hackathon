import './App.css'

import { useIsMobileDevice } from './modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from './components/atoms'
import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
  }
}

function App() {
  const isMobile = useIsMobileDevice()
  const [account, setAccount] = useState('')

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider()
      if (provider && window.ethereum?.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
      } else {
        setAccount('Please Install MetaMask')
      }
    }
    init()
  }, [])

  return (
    <>
      {!account && isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}
      {account && <div>Connected account {account}</div>}
    </>
  )
}

export default App
