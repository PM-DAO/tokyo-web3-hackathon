import { TokenType } from '~/types/Token'

const STREAMING_DURATION_MINUTES = 5

export const formatTimeByAttributes = (attributes: TokenType['metadata']['attributes']) => {
  const hour = attributes.find((attribute) => attribute.trait_type === 'Hour')?.value

  const minutes = attributes.find((attribute) => attribute.trait_type === 'Minute')?.value

  if (!hour || !minutes) return null

  const endMinutes = Number(minutes) + STREAMING_DURATION_MINUTES

  return {
    startTime: `${hour}:${minutes}`,
    endTime: `${hour}:${endMinutes}`
  }
}
