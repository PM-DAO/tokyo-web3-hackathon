import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useWeb3Client } from '~/modules/hooks/web3client'
import { Collection, Login, Stream, StreamSetting } from '~/components/pages'
import { Header } from '~/components/organisms'
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
  }
}

function App() {
  const { account, setAccount, client } = useWeb3Client()
  if (!client) return <></>
  if (!account) {
    return <Login setAccount={setAccount} />
  }
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Stream client={client} />}></Route>
          <Route path="/collection" element={<Collection />}></Route>
          <Route path="/stream-setting" element={<StreamSetting />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
