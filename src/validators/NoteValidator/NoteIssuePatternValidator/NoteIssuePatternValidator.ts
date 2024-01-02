import { type IssueTypePattern } from '@model/NotesModel'
import { validate } from '@utils/DataValidator'
import { isBoolean } from '@utils/isBoolean'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteIssuePatternValidator extends BaseValidator<IssueTypePattern>
  implements Validator<IssueTypePattern> {
  constructor (values: IssueTypePattern) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      isImageView,
      isLinkView,
      imageIssue,
      linkIssue,
      description,
      tagsIds,
      title,
      typeId,
      viewId,
      categoryId,
    } = this.getValues()

    if (isBoolean(isImageView)) {
      this.setError(('imageIssue'), await validate(imageIssue, {
        isRequired: true,
        isFile: true,
        isImage: true,
        isFileSize: { on: true, maxMB: 2 },
      }))
    } else if (isBoolean(isLinkView)) {
      this.setError('linkIssue', await validate(linkIssue, {
        isRequired: true,
        isLink: true,
      }))
    } else {
      this.setError('isImageView', await validate(isImageView, {
        isRequired: true,
      }))

      this.setError('isLinkView', await validate(isImageView, {
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
