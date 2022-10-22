const dappUrl = 'pm-dao.github.io/tokyo-web3-hackathon'
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink}>
      <button>Connect to MetaMask</button>
    </a>
  )
}
