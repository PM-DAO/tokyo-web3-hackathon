import './App.css'

import { useIsMobileDevice } from './modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from './components/atoms'
import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'

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
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.defaultChain = 'ropsten'
        const accounts = await web3.eth.requestAccounts()
        if (accounts.length > 0) {
          const account = accounts[0]
          setAccount(account)
          return
        }
      } else {
        setAccount('Please Install MetaMask')
      }
    }
    init()
  }, [])

  return (
    <>
      {isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}
      {account && <div>Connected account {account}</div>}
    </>
  )
}

export default App
