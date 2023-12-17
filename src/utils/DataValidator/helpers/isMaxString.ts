export const isMaxString = (value: string, count: number | undefined = 5): boolean => {
  return value.length <= count
}
