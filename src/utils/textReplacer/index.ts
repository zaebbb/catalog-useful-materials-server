export const textReplacer = (text: string, from: string, to: string) => {
  return text.replace(`{${from}}`, to)
}
