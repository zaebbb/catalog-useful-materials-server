import { type UserRegisterValues } from '@model/UserModel'
import { validate } from '@utils/DataValidator/validate'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class RegisterValidator extends BaseValidator<UserRegisterValues>
  implements Validator<UserRegisterValues> {
  constructor (values: UserRegisterValues) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      email,
      password,
      repeatPassword,
      username,
      userConsent,
    } = this.getValues()

    this.setError('email', await validate(email, {
      isRequired: true,
      isEmail: true,
      isEmailExist: true,
    }))

    this.setError('username', await validate(username, {
      isRequired: true,
      isMaxString: { on: true, max: 50 },
    }))

    this.setError('password', await validate(password, {
      isRequired: true,
      isMinString: { on: true, min: 8 },
      isDataMatch: { on: true, dataMatch: repeatPassword },
    }))

    this.setError('repeatPassword', await validate(repeatPassword, {
      isRequired: true,
      isDataMatch: { on: true, dataMatch: password },
    }))

    this.setError('userConsent', await validate(userConsent, {
      isRequired: true,
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
