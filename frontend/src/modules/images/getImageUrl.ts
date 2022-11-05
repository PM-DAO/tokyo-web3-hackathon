export const getImageUrl = (name: string, ext?: string) => {
  return new URL(`../../../public/${name}.${ext ?? 'svg'}`, import.meta.url).href
}
