import { type CategoryEdit } from '@model/CategoryModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class EditCategoryValidator extends BaseValidator<CategoryEdit>
  implements Validator<CategoryEdit> {
  constructor (values: CategoryEdit) {
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
      isCategory: {
        on: true,
        mode: 'name',
        findId: id,
      },
    }))

    this.setError('id', await validate(id, {
      isRequired: true,
      isCategoryExist: true,
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
