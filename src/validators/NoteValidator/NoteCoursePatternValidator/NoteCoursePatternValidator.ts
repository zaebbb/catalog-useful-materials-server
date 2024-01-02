import { type CourseTypePattern } from '@model/NotesModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteCoursePatternValidator extends BaseValidator<CourseTypePattern>
  implements Validator<CourseTypePattern> {
  constructor (values: CourseTypePattern) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      linkCourse,
      authorCourse,
      description,
      tagsIds,
      title,
      typeId,
      viewId,
      categoryId,
    } = this.getValues()

    this.setError('linkCourse', await validate(linkCourse, {
      isRequired: true,
      isLink: true,
    }))

    this.setError('authorCourse', await validate(authorCourse, {
      isRequired: true,
    }))

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
