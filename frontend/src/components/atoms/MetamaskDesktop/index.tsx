import { useMetaMask } from 'metamask-react'
import { useEffect } from 'react'

export interface MetamaskDesktopProps {
  onSetAccount?: React.Dispatch<React.SetStateAction<string>>
}

export const MetamaskDesktop = (props: MetamaskDesktopProps) => {
  const { status, connect, account } = useMetaMask()
  const { onSetAccount } = props

  useEffect(() => {
    if (onSetAccount && account) {
      onSetAccount(account)
    }
  }, [account, onSetAccount])

  if (status === 'initializing') return <div>Synchronisation with MetaMask ongoing...</div>

  if (status === 'unavailable') return <div>MetaMask not available :(</div>

  if (status === 'notConnected') return <button onClick={connect}>Connect to MetaMask</button>

  return <></>
}
