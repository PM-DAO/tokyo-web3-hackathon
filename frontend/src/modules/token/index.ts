import axios, { AxiosResponse } from 'axios'

import { DAYS_OF_WEEK_ARRAY } from '../date'

import { TokenType } from '~/types/Token'

const HOSTED_DEPOD_NFT_URI = 'https://depod-nft.s3.ap-northeast-1.amazonaws.com/tokens.json'

const STREAMING_DURATION_MINUTES = 5

const UP_NEXT_MAX_COUNT = 3

export const getDayOfWeekNumber = (daysOfWeek: string): number => {
  return DAYS_OF_WEEK_ARRAY.find((dayOfWeek) => dayOfWeek.name === daysOfWeek)?.number ?? 7
}

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

const getTokens = async () => {
  const { data: tokens }: AxiosResponse<TokenType[]> = await axios.get(HOSTED_DEPOD_NFT_URI)
  return tokens
}

export const getTokenByTokenId = async (tokenId: number) => {
  const tokens = await getTokens()
  return tokens.find((token) => token.tokenID === tokenId)
}

export const getMyTokens = async (myAddress: string) => {
  const tokens = await getTokens()
  return tokens.filter((token) => token.ownerAddress[0] === myAddress)
}

export const getFormattedTokens = async () => {
  const tokens = await getTokens()
  const orderedTokens = sortTokenByDate(tokens.filter(filterIsIn24HoursFromNow))
  return {
    currentToken: orderedTokens?.length ? orderedTokens[0] : null,
    upNextTokens: orderedTokens?.length ? orderedTokens.slice(1, UP_NEXT_MAX_COUNT) : []
  }
}

const filterIsIn24HoursFromNow = (token: TokenType) => {
  const formattedDate = {
    daysOfWeek: getDayOfWeekNumber(token.metadata.attributes.find((attribute) => attribute.trait_type === 'Days of the Week')?.value ?? ''),
    hour: Number(token.metadata.attributes.find((attribute) => attribute.trait_type === 'Hour')?.value ?? 0),
    minute: Number(token.metadata.attributes.find((attribute) => attribute.trait_type === 'Minute')?.value ?? '00')
  }
  const now = new Date()
  const tokenDate = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${formattedDate.hour}:${formattedDate.minute}`)
  tokenDate.setDate(tokenDate.getDate() + (formattedDate.daysOfWeek - now.getDay()))
  return now.getTime() - tokenDate.getTime() <= 1000 * 60 * 60 * 24 && now.getTime() - tokenDate.getTime() < 0
}

const compareTokenByDate = (a: TokenType, b: TokenType) => {
  const formattedADate = {
    daysOfWeek: getDayOfWeekNumber(a.metadata.attributes.find((attribute) => attribute.trait_type === 'Days of the Week')?.value ?? ''),
    hour: Number(a.metadata.attributes.find((attribute) => attribute.trait_type === 'Hour')?.value ?? 0),
    minute: Number(a.metadata.attributes.find((attribute) => attribute.trait_type === 'Minute')?.value ?? '00')
  }

  const formattedBDate = {
    daysOfWeek: getDayOfWeekNumber(b.metadata.attributes.find((attribute) => attribute.trait_type === 'Days of the Week')?.value ?? ''),
    hour: Number(b.metadata.attributes.find((attribute) => attribute.trait_type === 'Hour')?.value ?? '0'),
    minute: Number(b.metadata.attributes.find((attribute) => attribute.trait_type === 'Minute')?.value ?? '00')
  }

  const now = new Date()
  const DateA = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${formattedADate.hour}:${formattedADate.minute}`)
  const DateB = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${formattedBDate.hour}:${formattedBDate.minute}`)
  DateA.setDate(DateA.getDate() + (formattedADate.daysOfWeek - now.getDay()))
  DateB.setDate(DateB.getDate() + (formattedBDate.daysOfWeek - now.getDay()))

  return Math.abs(now.getTime() - DateA.getTime()) < Math.abs(now.getTime() - DateB.getTime()) ? -1 : 1
}

export const sortTokenByDate = (tokens: TokenType[]): TokenType[] => {
  // 曜日でソート
  tokens.sort(compareTokenByDate)
  // const { currentDaysOfWeekNumber, currentHour, currentMinutes } = getCurrentDate()
  // #TODO: 現在時刻の近い順にソート
  return tokens
}
