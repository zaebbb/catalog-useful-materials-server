export const isArrayMinLength = <T>(value: T[], max: number | undefined = 3): boolean => {
  return value.length >= max
}
