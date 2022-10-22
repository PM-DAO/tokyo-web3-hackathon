const metamaskAppDeepLink = 'dapp://pm-dao.github.io'

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink} target="_self">
      <button>Connect to MetaMask</button>
    </a>
  )
}
