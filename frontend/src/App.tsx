import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SPLayout } from './components/templates'

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
    <SPLayout>
      <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/tokyo-web3-hackathon' : ''}>
        <Header client={client} />
        <Routes>
          <Route index element={<Stream client={client} />}></Route>
          <Route path="/collection" element={<Collection account={account} />}></Route>
          <Route path="/stream-setting/:tokenId" element={<StreamSetting account={account} client={client} />}></Route>
        </Routes>
      </BrowserRouter>
    </SPLayout>
  )
}

export default App
