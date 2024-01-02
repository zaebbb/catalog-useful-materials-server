import { type BookTypePattern } from '@model/NotesModel'
import { validate } from '@utils/DataValidator'
import { isBoolean } from '@utils/isBoolean'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteBookPatternValidator extends BaseValidator<BookTypePattern>
  implements Validator<BookTypePattern> {
  constructor (values: BookTypePattern) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      isFileView,
      isLinkView,
      fileBook,
      linkBook,
      description,
      tagsIds,
      title,
      typeId,
      viewId,
      categoryId,
    } = this.getValues()

    if (isBoolean(isFileView)) {
      this.setError(('fileBook'), await validate(fileBook, {
        isRequired: true,
        isFile: true,
        isDocument: true,
        isFileSize: { on: true, maxMB: 10 },
      }))
    } else if (isBoolean(isLinkView)) {
      this.setError('linkBook', await validate(linkBook, {
        isRequired: true,
        isLink: true,
      }))
    } else {
      this.setError('isFileView', await validate(isFileView, {
        isRequired: true,
      }))

      this.setError('isLinkView', await validate(isLinkView, {
        isRequired: true,
      }))
    }

    this.setError('title', await validate(title, {
      isRequired: true,
      isMaxString: { on: true, max: 255 },
    }))

    this.setError('title', await validate(title, {
      isRequired: true,
      isMaxString: { on: true, max: 255 },
    }))

    this.setError('description', await validate(description, {
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
