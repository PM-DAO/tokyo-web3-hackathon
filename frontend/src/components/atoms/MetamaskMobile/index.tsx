const dappUrl = 'pm-dao.github.io'
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink}>
      <button>Connect to MetaMask</button>
    </a>
  )
}
