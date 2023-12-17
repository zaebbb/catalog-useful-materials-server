export const isRequired = <T>(value: T): boolean => {
  if (Array.isArray(value)) {
    return Boolean(value.length)
  }

  return !!value
}
