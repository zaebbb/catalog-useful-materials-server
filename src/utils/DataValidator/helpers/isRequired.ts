import { isBoolean } from '@utils/isBoolean'

export const isRequired = <T>(value: T): boolean => {
  if (Array.isArray(value)) {
    return Boolean(value.length)
  }

  if (value === 'true' || value === 'false') {
    return isBoolean(value as string)
  }

  return !!value
}
