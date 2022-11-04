import { useCallback, useState } from 'react'
import { PMToken } from '../../types'

type Props = {
  client?: PMToken
  account?: string
  youtubeURL?: string
  tokenId?: string
  tokenAmount?: number
}

type Status = 'idle' | 'completePayment' | 'completeSetContentURI' | 'failed' | undefined

type DistributeArgs = {
  youtubeURL: string
  tokenId: string
  tokenAmount: number
}

type ReturnDistribute = {
  status: Status
  distribute: (args: DistributeArgs) => Promise<void>
}

export const useDistribute = ({ account, client }: Props): ReturnDistribute => {
  const [status, setStatus] = useState<Status>()

  const distribute = useCallback(async ({ youtubeURL, tokenId, tokenAmount }: DistributeArgs) => {
    if (!account || !client) return
    setStatus('idle')
    // NOTE: confirmation required
    try {
      await client.setDistoributeNum(tokenAmount)
      setStatus('completePayment')
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
  }, [])

  return { status, distribute }
}
