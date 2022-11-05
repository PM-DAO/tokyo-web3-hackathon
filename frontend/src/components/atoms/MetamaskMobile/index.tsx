import { Button } from '~/components/atoms'

const METAMASK_APP_DEEP_LINK = 'dapp://pm-dao.github.io/tokyo-web3-hackathon/'

export const MetamaskMobile = () => {
  return (
    <a href={METAMASK_APP_DEEP_LINK} target="_self">
      <Button>MetaMaskにログイン</Button>
    </a>
  )
}
