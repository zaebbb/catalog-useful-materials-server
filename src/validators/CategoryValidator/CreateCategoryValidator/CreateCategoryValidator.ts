import { type CategoryCreated } from '@model/CategoryModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class CreateCategoryValidator extends BaseValidator<CategoryCreated>
  implements Validator<CategoryCreated> {
  constructor (values: CategoryCreated) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      name,
      code,
    } = this.getValues()

    this.setError('name', await validate(name, {
      isRequired: true,
      isMaxString: { on: true, max: 30 },
      isCategory: {
        on: true,
        mode: 'name',
      },
    }))

    this.setError('code', await validate(code, {
      isRequired: true,
      isMaxString: { on: true, max: 50 },
      isCategory: {
        on: true,
        mode: 'code',
      },
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
