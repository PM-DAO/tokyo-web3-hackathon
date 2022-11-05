import './App.css'
import { RouterProvider } from 'react-router-dom'
import { useWeb3Client } from './modules/hooks/web3client'

import { Stream, Collection, StreamSetting, Login } from './components/pages'
import { createBrowserRouter } from 'react-router-dom'
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
  { path: '*', element: <p>404 - Not Found</p> }
])

function App() {
  const { account, setAccount } = useWeb3Client()
  return (
    <>
      {!account && <Login setAccount={setAccount} />}
      {/* routes */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
