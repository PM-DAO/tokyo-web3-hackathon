import { useState } from 'react'
import { PMToken } from '../../types'

type Props = {
  client?: PMToken
  account?: string
}

type Status = 'idle' | 'completeDonate' | 'completeDistributeNum' | 'completeSetContentURI' | 'failed' | undefined

type DistributeArgs = {
  youtubeURL: string
  tokenId: string
  _tokenAmount?: number
}

type ReturnDistribute = {
  status: Status
  distribute: (args: DistributeArgs) => Promise<void>
}

const DEFAULT_DISTRIBUTE_NUM = 100

export const useDistribute = ({ account, client }: Props): ReturnDistribute => {
  const [status, setStatus] = useState<Status>()

  const distribute = async ({ youtubeURL, tokenId, _tokenAmount }: DistributeArgs) => {
    if (!account || !client) return
    setStatus('idle')
    // NOTE: confirmation required
    try {
      // Q: _tokenAmount????
      await client.donateToToken(tokenId)
      setStatus('completeDonate')
      await client.setDistoributeNum(DEFAULT_DISTRIBUTE_NUM)
      setStatus('completeDistributeNum')
      try {
        await client.setContentURI(tokenId, youtubeURL)
        setStatus('completeSetContentURI')
      } catch (err) {
        console.error({ err })
        setStatus('failed')
      }
    } catch (err) {
      setStatus('failed')
      console.error({ err })
    }
  }

  return { status, distribute }
}
