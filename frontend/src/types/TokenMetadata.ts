export type TokenMetadata = {
  name: string
  description: string
  image: string
  dna: string
  edition: number
  data: number
  creator: string
  attributes: {
    trait_type: string
    value: string
  }
}
