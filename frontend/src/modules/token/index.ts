import { TokenType } from '~/types/Token'

const STREAMING_DURATION_MINUTES = 5

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

  const endMinutes = Number(minutes) + STREAMING_DURATION_MINUTES

  return {
    startTime: `${hour}:${minutes}`,
    endTime: `${hour}:${endMinutes}`
  }
}
