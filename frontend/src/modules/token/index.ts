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

export const getFormattedTokens = async () => {
  const tokens = await getTokens()
  const orderedTokens = tokens
  // NOTE: temporally comment out
  // const orderedTokens = sortTokenByDate(tokens)
  return {
    currentToken: orderedTokens?.length ? orderedTokens[0] : null,
    upNextTokens: orderedTokens?.length ? orderedTokens.slice(1, UP_NEXT_MAX_COUNT) : []
  }
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

  // 曜日でソート
  if (formattedADate.daysOfWeek < formattedBDate.daysOfWeek) {
    return -1
  }

  // 時間でソート
  if (formattedADate.hour < formattedBDate.hour) {
    return -1
  }

  // 分でソート
  if (formattedADate.minute < formattedBDate.minute) {
    return -1
  }
  return 0
}

export const sortTokenByDate = (tokens: TokenType[]): TokenType[] => {
  // 曜日でソート
  tokens.sort(compareTokenByDate)
  // const { currentDaysOfWeekNumber, currentHour, currentMinutes } = getCurrentDate()
  // #TODO: 現在時刻の近い順にソート
  return tokens
}
