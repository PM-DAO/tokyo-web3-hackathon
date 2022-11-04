import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

import artifact from '../abi/PMToken.json'
import { PMToken } from '../types'

const NFT_ADDRESS = '0x250ad80574bf9733713A8cB38769F91264D7C5e1'
const ABI = artifact.abi
const CHAIN_ID = '0x13881'

const CHAIN_CONFIG = {
  chainId: CHAIN_ID,
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Polygon',
    symbol: 'MATIC'
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com']
}

type Value = {
  account: string
  client?: PMToken
  chain: string
}

type Dispatch = {
  setAccount: React.Dispatch<React.SetStateAction<string>>
}

const initialValue: Value = {
  account: '',
  client: undefined,
  chain: ''
}

const Web3ClientValueContext = createContext<Value>(initialValue)

const Web3ClientSetContext = createContext<Dispatch>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccount: () => {}
})

type Props = {
  children: ReactNode
}

export const Web3ClientContextProvider = ({ children }: Props) => {
  const [client, setClient] = useState<PMToken>()
  const [account, setAccount] = useState('')
  const [chain, setChain] = useState('')

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider()
      if (provider && window.ethereum?.isMetaMask) {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)

        const contract = new ethers.Contract(NFT_ADDRESS, ABI, provider) as PMToken
        setClient(contract.connect(signer))

        if (process.env.NODE_ENV !== 'development') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: CHAIN_ID }]
            })
          } catch {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [CHAIN_CONFIG]
            })
          } finally {
            provider = new ethers.providers.Web3Provider(window.ethereum)
          }
        }

        const network = await provider.getNetwork()
        setChain(`chain id: ${network.chainId} ${network.name}`)
      } else {
        setAccount('Please Install MetaMask')
      }
    }
    init()
  }, [])

  return (
    <Web3ClientValueContext.Provider value={{ account, client, chain }}>
      <Web3ClientSetContext.Provider value={{ setAccount }}>{children}</Web3ClientSetContext.Provider>
    </Web3ClientValueContext.Provider>
  )
}

type ReturnUseWeb3ClientContext = Value & Dispatch

export const useWeb3ClientContext = (): ReturnUseWeb3ClientContext => {
  const { account, client, chain } = useContext(Web3ClientValueContext)
  const { setAccount } = useContext(Web3ClientSetContext)

  return {
    account,
    client,
    chain,
    setAccount
  }
}
