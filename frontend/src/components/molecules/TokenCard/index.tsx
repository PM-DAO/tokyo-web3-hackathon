import { TokenItem } from '../../../types/tokenItem'

type TokenItemProps = {
  token: TokenItem
}

export const TokenCard = (props: TokenItemProps) => {
  const { token } = props
  return (
    <div key={token.tokenID}>
      {token.tokenID}: {token.youtubeURL}
    </div>
  )
}
