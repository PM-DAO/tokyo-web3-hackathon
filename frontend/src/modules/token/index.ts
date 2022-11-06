import { TokenType } from '~/types/Token'

const STREAMING_DURATION_MINUTES = 5

const UP_NEXT_MAX_COUNT = 3

export const formatTimeByAttributes = (attributes: TokenType['metadata']['attributes']) => {
  const hour = attributes.find((attribute) => attribute.trait_type === 'Hour')?.value

  const minutes = attributes.find((attribute) => attribute.trait_type === 'Minute')?.value

  if (!hour || !minutes) return null

  const numberMinutes = Number(minutes)

  // #NOTE: 終了時刻が60分を超える時
  if (numberMinutes + STREAMING_DURATION_MINUTES >= 60) {
    const endHour = Number(hour) + 1
    const endMinutes = numberMinutes + STREAMING_DURATION_MINUTES - 60
    return {
      startTime: `${hour}:${minutes}`,
      endTime: `${endHour}:${endMinutes}`
    }
  }

  const endMinutes = numberMinutes + STREAMING_DURATION_MINUTES

  return {
    startTime: `${hour}:${minutes}`,
    endTime: `${hour}:${endMinutes}`
  }
}

export const getCurrentToken = (tokens: TokenType[]): TokenType | null => {
  return tokens?.length ? tokens[0] : null
}

export const getUpNextTokens = (tokens: TokenType[]): TokenType[] => {
  const orderedTokens = sortTokenByCurrentTime(tokens)
  return tokens?.length ? orderedTokens.slice(1, UP_NEXT_MAX_COUNT) : []
}

// #TODO: sort by proximity to current time
export const sortTokenByCurrentTime = (tokens: TokenType[]): TokenType[] => {
  return tokens
}
