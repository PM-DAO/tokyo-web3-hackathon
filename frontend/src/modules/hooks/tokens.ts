import { useEffect, useState } from 'react'
import { TokenItem } from '../../types/tokenItem'
import { PMToken } from '../../types'

export const useTokens = (client?: PMToken) => {
  const [tokens, setTokens] = useState<Array<TokenItem>>([])
  useEffect(() => {
    const getTokens = async () => {
      if (!client) return
      const { totalSupply, tokenByIndex, contentURI } = client.functions
      const supply = parseInt(await totalSupply().toString())
      const items: TokenItem[] = []
      for (let i = 0; i < supply; i++) {
        const tokenID = parseInt(await tokenByIndex(i).toString())
        const uri = await contentURI(tokenID)
        const tokenItem: TokenItem = {
          tokenID: tokenID,
          youtubeURL: uri.toString()
        }
        items.push(tokenItem)
      }
      setTokens(items)
    }
    getTokens()
  }, [client])
  return { tokens }
}
