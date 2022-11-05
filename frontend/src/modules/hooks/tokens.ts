import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios, { AxiosResponse } from 'axios'

import { TokenType } from '~/types/Token'

export const useTokens = (client?: ethers.Contract) => {
  const [tokens, setTokens] = useState<Array<TokenType>>([])
  useEffect(() => {
    const getTokens = async () => {
      if (!client) return
      const { totalSupply, tokenByIndex, contentURI, tokenURI } = client.functions
      const supply = parseInt(await totalSupply())
      const items: TokenType[] = []
      for (let i = 0; i < supply; i++) {
        const tokenID = parseInt(await tokenByIndex(i))
        const uri = await contentURI(tokenID)
        const tokenUri = await tokenURI(tokenID)
        const { data: metadata }: AxiosResponse<TokenType['metadata']> = await axios.get(tokenUri)
        const tokenItem: TokenType = {
          tokenID: tokenID,
          youtubeURL: uri,
          metadata
        }
        items.push(tokenItem)
      }
      setTokens(items)
    }
    getTokens()
  }, [client])
  return { tokens }
}
