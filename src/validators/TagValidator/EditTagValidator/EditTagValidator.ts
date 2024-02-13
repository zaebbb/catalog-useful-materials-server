import { type TagEdit } from '@model/TagModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class EditTagValidator extends BaseValidator<TagEdit>
  implements Validator<TagEdit> {
  constructor (values: TagEdit) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      name,
      id,
    } = this.getValues()

    this.setError('name', await validate(name, {
      isRequired: true,
      isMaxString: { on: true, max: 30 },
      isTagExist: {
        on: true,
        mode: 'name',
        findId: id,
      },
    }))

    this.setError('id', await validate([id], {
      isRequired: true,
      isTagsExist: true,
      isArray: true,
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
