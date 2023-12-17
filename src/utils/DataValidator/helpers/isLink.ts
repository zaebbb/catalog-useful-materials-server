export const isLink = (value: string): boolean => {
  if (!value) {
    return true
  }

  return value.toLowerCase().startsWith('http://') || value.toLowerCase().startsWith('https://')
}
