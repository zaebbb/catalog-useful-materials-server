import { type UserAuthValues } from '@model/UserModel'
import { validate } from '@utils/DataValidator/validate'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class AuthValidator extends BaseValidator<UserAuthValues>
  implements Validator<UserAuthValues> {
  constructor (values: UserAuthValues) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      email,
      password,
    } = this.getValues()

    this.setError('email', await validate(email, {
      isRequired: true,
      isEmail: true,
    }))

    this.setError('password', await validate(password, {
      isRequired: true,
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
