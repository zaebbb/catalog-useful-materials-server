export const isBoolean = (data: string | boolean): boolean => {
  if (typeof data === 'string') {
    return data === 'true'
  }

  return data
}
