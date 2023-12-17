import { type ErrorResult } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'

export abstract class BaseValidator<T extends object> implements Validator<T> {
  protected values: T
  protected errors: OptionalRecord<keyof T, ErrorResult> = {}

  protected constructor (values: T) {
    this.values = values
  }

  getValues (): T {
    return this.values
  }

  abstract apply (): Promise<boolean>

  getErrors (): OptionalRecord<keyof T, ErrorResult> {
    return this.errors
  }

  isExistError (): boolean {
    return Object.keys(this.getErrors()).length > 0
  }

  setError (key: keyof T, error: ErrorResult): void {
    this.errors[key] = error
  }

  setValues (values: T): void {
    this.values = values
  }

  clearSuccessErrors (): void {
    const errors: OptionalRecord<keyof T, ErrorResult> = {
      ...this.getErrors(),
    }

    const deleteKeys: Array<Extract<keyof T, string>> = []

    for (const key in errors) {
      if (this.errors[key]) {
        deleteKeys.push(key)
      }
    }

    deleteKeys.forEach(key => {
      if (typeof this.errors[key] === 'boolean') {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.errors[key]
      }
    })
  }
}
