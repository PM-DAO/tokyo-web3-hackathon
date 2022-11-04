import './App.css'
import { RouterProvider } from 'react-router-dom'

import { useIsMobileDevice } from './modules/hooks/userIsMobileDevice'
import { MetamaskDesktop, MetamaskMobile } from './components/atoms'

import { Account, TokenList } from './components/organisms'
import { useTokens } from './modules/hooks/useTokens'
import { Stream, Collection, StreamSetting, Login } from './components/pages'
import { createBrowserRouter } from 'react-router-dom'
import { useWeb3ClientContext } from './contexts'
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
  const { account, setAccount, chain, client } = useWeb3ClientContext()
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
