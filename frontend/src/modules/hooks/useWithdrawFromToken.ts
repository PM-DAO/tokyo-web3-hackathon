import { useState } from 'react'
import { PMToken } from '../../types'

type Props = {
  client?: PMToken
}

type Status = 'idle' | 'success' | 'failed' | undefined

type WithdrawFromTokenArgs = {
  tokenId: string
  // #NOTE: 視聴が終わったらフラグを切り替える
  disabled?: boolean
}

type ReturnDistribute = {
  status: Status
  withdrawFromToken: (args: WithdrawFromTokenArgs) => Promise<void>
}

export const useWithdrawFromToken = ({ client }: Props): ReturnDistribute => {
  const [status, setStatus] = useState<Status>()

  const withdrawFromToken = async ({ tokenId, disabled = true }: WithdrawFromTokenArgs) => {
    if (disabled || !client) return
    setStatus('idle')
    try {
      client.withdrawFromToken(tokenId)
    } catch (err) {
      setStatus('failed')
      console.error({ err })
    }
  }

  return { status, withdrawFromToken }
}
