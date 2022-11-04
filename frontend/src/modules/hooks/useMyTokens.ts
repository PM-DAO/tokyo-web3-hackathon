import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { PMToken } from '../../types'
import { TokenMetadata } from '../../types/TokenMetadata'

type Props = {
  client?: PMToken
  account?: string
}

type ReturnUseMyTokens = {
  myTokens: TokenMetadata[]
}

export const useMyTokens = ({ account, client }: Props): ReturnUseMyTokens => {
  const [myTokens, setMyTokens] = useState<TokenMetadata[]>([])

  useEffect(() => {
    const getMyTokens = async () => {
      if (!client || !account) return
      const { totalSupply, tokenByIndex, tokenURI, ownerOf } = client.functions
      const supply = parseInt(await totalSupply().toString())
      const items: TokenMetadata[] = []
      for (let i = 0; i < supply; i++) {
        const tokenID = parseInt(await tokenByIndex(i).toString())
        // filter own tokens
        const ownerAddress = await ownerOf(tokenID).toString()
        if (ownerAddress !== account) return
        const uri = await tokenURI(tokenID).toString()
        // #NOTE: check CORS setting
        const contents: AxiosResponse<TokenMetadata> = await axios.get(uri)
        if (!contents?.data) return
        items.push(contents.data)
      }
      setMyTokens(items)
    }
    getMyTokens()
  }, [client])

  return { myTokens }
}
