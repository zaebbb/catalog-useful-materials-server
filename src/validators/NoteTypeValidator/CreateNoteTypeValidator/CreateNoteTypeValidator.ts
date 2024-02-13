import { type CreateNoteType } from '@model/NotesTypesModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class CreateNoteTypeValidator extends BaseValidator<CreateNoteType>
  implements Validator<CreateNoteType> {
  constructor (values: CreateNoteType) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      name,
      code,
      fields,
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

    this.setError('fields', await validate(fields, {
      isRequired: true,
      isArray: true,
      isArrayMinLength: {
        on: true,
        max: 1,
      },
    }))

    fields.map(async (field) => {
      const {
        title,
        fieldId,
      } = field

      this.setError('fields', await validate(title, {
        isRequired: true,
        isMaxString: { on: true, max: 255 },
      }))

      this.setError('fields', await validate(fieldId, {
        isRequired: true,
        isCustomFieldExist: true,
      }))
    })

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
