import './App.css'

import { useIsMobileDevice } from './modules/hooks/is_mobile'
import { MetamaskDesktop, MetamaskMobile } from './components/atoms'

import { Account, TokenList } from './components/organisms'
import { useWeb3Client } from './modules/hooks/web3client'
import { useTokens } from './modules/hooks/tokens'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
  }
}

function App() {
  const isMobile = useIsMobileDevice()
  const { account, setAccount, chain, client } = useWeb3Client()
  const { tokens } = useTokens(client)

  return (
    <>
      {!account && isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}
      <Account account={account} chain={chain} />
      <div>tokens</div>
      <TokenList tokens={tokens} />
    </>
  )
}

export default App
