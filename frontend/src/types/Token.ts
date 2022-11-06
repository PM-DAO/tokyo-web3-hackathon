export type TokenType = {
  tokenID: number
  youtubeURL: string[]
  ownerAddress: string[]
  metadata: TokenMetadata
}

type TokenMetadata = {
  name: string
  description: string
  image: string
  dna: string
  edition: number
  date: number
  creator: string
  attributes: {
    trait_type: string
    value: string
  }[]
  compiler: string
}
