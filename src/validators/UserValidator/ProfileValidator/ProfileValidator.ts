import { type UserProfile } from '@model/UserModel/lib/types/UserModel'
import { validate } from '@utils/DataValidator/validate'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class ProfileValidator extends BaseValidator<UserProfile>
  implements Validator<UserProfile> {
  constructor (values: UserProfile) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      name,
      surname,
      patronymic,
      avatar,
    } = this.getValues()

    this.setError('name', await validate(name, {
      isRequired: true,
      isMaxString: { on: true, max: 50 },
    }))

    this.setError('surname', await validate(surname, {
      isRequired: true,
      isMaxString: { on: true, max: 50 },
    }))

    this.setError('patronymic', await validate(patronymic, {
      isMaxString: { on: true, max: 50 },
    }))

    this.setError('avatar', await validate(avatar, {
      isFile: true,
      isFileSize: { on: true, maxMB: 2 },
      isImage: true,
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
