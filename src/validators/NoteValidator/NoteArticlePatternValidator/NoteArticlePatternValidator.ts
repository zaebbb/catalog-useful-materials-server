import { type ArticleTypePattern } from '@model/NotesModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteArticlePatternValidator extends BaseValidator<ArticleTypePattern>
  implements Validator<ArticleTypePattern> {
  constructor (values: ArticleTypePattern) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      linkNote,
      image,
      description,
      tagsIds,
      linkVideo,
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

    this.setError('linkNote', await validate(linkNote, {
      isRequired: true,
      isLink: true,
    }))

    this.setError('linkVideo', await validate(linkVideo, {
      isLink: true,
    }))

    this.setError('image', await validate(image, {
      isFile: true,
      isImage: true,
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
