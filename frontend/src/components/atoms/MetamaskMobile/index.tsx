const metamaskAppDeepLink = 'dapp://pm-dao.github.io/tokyo-web3-hackathon/'

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink} target="_self">
      <button>Connect to MetaMask</button>
    </a>
  )
}
