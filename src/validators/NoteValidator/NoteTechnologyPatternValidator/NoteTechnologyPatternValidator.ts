import { type TechnologyTypePattern } from '@model/NotesModel'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteTechnologyPatternValidator extends BaseValidator<TechnologyTypePattern>
  implements Validator<TechnologyTypePattern> {
  constructor (values: TechnologyTypePattern) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      linkTechnology,
      linkInstall,
      icon,
      linkDocs,
      description,
      tagsIds,
      title,
      typeId,
      viewId,
      categoryId,
    } = this.getValues()

    this.setError('icon', await validate(icon, {
      isRequired: true,
      isFile: true,
      isImage: true,
      isFileSize: { on: true, maxMB: 2 },
    }))

    this.setError('linkDocs', await validate(linkDocs, {
      isRequired: true,
      isLink: true,
    }))

    this.setError('linkInstall', await validate(linkInstall, {
      isRequired: true,
      isLink: true,
    }))

    this.setError('linkTechnology', await validate(linkTechnology, {
      isRequired: true,
      isLink: true,
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
