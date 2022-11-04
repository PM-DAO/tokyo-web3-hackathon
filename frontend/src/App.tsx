import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { useIsMobileDevice } from './modules/hooks/useIsMobileDevice '
import { useTokens } from './modules/hooks/useTokens'
import { useWeb3Client } from './modules/hooks/useWeb3Client'

import { MetamaskDesktop, MetamaskMobile } from './components/atoms'
import { Account, TokenList } from './components/organisms'

import { Stream, Collection, StreamSetting, Login } from './components/pages'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
  }
}

const router = createBrowserRouter([
  { path: '/', element: <Stream /> },
  { path: 'collection', element: <Collection /> },
  { path: 'stream-setting', element: <StreamSetting /> },
  { path: 'login', element: <Login /> },
  { path: '*', element: <p>404 - Not Found</p> }
])

function App() {
  const isMobile = useIsMobileDevice()
  const { account, setAccount, chain, client } = useWeb3Client()
  const { tokens } = useTokens(client)
  return (
    <>
      {/* common */}
      {!account && isMobile ? <MetamaskMobile /> : <MetamaskDesktop onSetAccount={setAccount} />}
      <Account account={account} chain={chain} />
      <TokenList tokens={tokens} />
      {/* routes */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
