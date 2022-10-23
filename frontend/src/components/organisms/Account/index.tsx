type AccountProps = {
  account: string
  chain: string
}

export const Account = (props: AccountProps) => {
  const { account, chain = 'unknown' } = props
  if (!account) return <></>
  return (
    <div>
      Connected account {account} on {chain}
    </div>
  )
}
