import { type CodeTypePattern } from '@model/NotesModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteCodePatternValidator extends BaseValidator<CodeTypePattern>
  implements Validator<CodeTypePattern> {
  constructor (values: CodeTypePattern) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      code,
      description,
      tagsIds,
      title,
      typeId,
      viewId,
      categoryId,
    } = this.getValues()

    this.setError('title', await validate(title, {
      isRequired: true,
      isMaxString: { on: true, max: 255 },
    }))

    this.setError('description', await validate(description, {
      isRequired: true,
    }))

    this.setError('code', await validate(code, {
      isRequired: true,
    }))

    this.setError('categoryId', await validate(Number(categoryId), {
      isRequired: true,
      isCategoryExist: true,
    }))

    this.setError('typeId', await validate(Number(typeId), {
      isRequired: true,
      isNotesTypesExist: true,
    }))

    this.setError('viewId', await validate(Number(viewId), {
      isRequired: true,
      isNotesViewsExist: true,
    }))

    this.setError('tagsIds', await validate(tagsIds, {
      isRequired: true,
      isTagsExist: true,
      isArray: true,
      isArrayMinLength: {
        on: true,
        max: 3,
      },
    }))

    this.clearSuccessErrors()

    return this.isExistError()
  }
}
