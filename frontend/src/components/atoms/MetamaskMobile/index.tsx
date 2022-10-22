const dappUrl = 'pm-dao.github.io'
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink} target="_self">
      <button>test, Connect to MetaMask</button>
    </a>
  )
}
