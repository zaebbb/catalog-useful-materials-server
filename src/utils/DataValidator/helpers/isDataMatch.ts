export const isDataMatch = (value: string, matchData: string): boolean => {
  if (!value || !matchData) {
    return true
  }

  return value === matchData
}
