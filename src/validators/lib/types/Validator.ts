import { type ErrorResult } from '@utils/DataValidator'

export interface Validator<T extends object> {
  apply: () => Promise<boolean>
  getErrors: () => OptionalRecord<keyof T, ErrorResult>
  getValues: () => T
  setValues: (values: T) => void
  setError: (key: keyof T, error: ErrorResult) => void
  isExistError: () => boolean
  clearSuccessErrors: () => void
}
