import { type UserEditData } from '@model/UserModel/lib/types/UserModel'
import { validate } from '@utils/DataValidator/validate'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class UserEditValidator extends BaseValidator<UserEditData>
  implements Validator<UserEditData> {
  constructor (values: UserEditData) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      username,
      email,
      id,
    } = this.getValues()

    this.setError('id', await validate(id, {
      isRequired: true,
    }))

    this.setError('email', await validate(email, {
      isRequired: true,
      isMaxString: { on: true, max: 50 },
    }))

    this.setError('username', await validate(username, {
      isRequired: true,
      isMaxString: { on: true, max: 50 },
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
