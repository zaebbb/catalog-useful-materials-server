import { type CustomTypePatternValidation } from '@model/NotesModel'
import { type BaseFields } from '@model/NotesModel/lib/types/NotesModel'
import { CustomFieldCodeList } from '@model/NotesModel/lib/types/patterns/CustomTypePattern'
import { validate } from '@utils/DataValidator'
import { type Validator } from '@validator/lib/types/Validator'
import { type UploadedFile } from 'express-fileupload'
import { BaseValidator } from '../../lib/BaseValidator/BaseValidator'

export class NoteCustomPatternValidator extends BaseValidator<CustomTypePatternValidation>
  implements Validator<CustomTypePatternValidation> {
  constructor (values: CustomTypePatternValidation) {
    super(values)
    this.values = values
  }

  async apply (): Promise<boolean> {
    const {
      description,
      tagsIds,
      title,
      typeId,
      viewId,
      categoryId,
      fields,
      files,
    } = this.getValues()

    fields.map(async (field) => {
      const fileItems = files?.[field.name] as UploadedFile[]

      switch (field.code) {
        case CustomFieldCodeList.LINK:
          this.setError(
            field.name as keyof BaseFields | 'fields',
            await validate(field.value, {
              isRequired: field.isRequired,
              isLink: true,
            })
          )
          break
        case CustomFieldCodeList.TEXTAREA:
        case CustomFieldCodeList.INPUT:
          this.setError(
            field.name as keyof BaseFields | 'fields',
            await validate(field.value, {
              isRequired: field.isRequired,
            })
          )

          break
        case CustomFieldCodeList.FILE:
          this.setError(
            field.name as keyof BaseFields | 'fields',
            await validate(files?.[field.name], {
              isRequired: field.isRequired,
              isFile: true,
              isImage: true,
              isFileSize: {
                on: true,
                maxMB: 2,
              },
            })
          )
          break
        case CustomFieldCodeList.FILE_GROUP:
          this.setError(
            field.name as keyof BaseFields | 'fields',
            await validate(files?.[field.name], {
              isRequired: field.isRequired,
            })
          )

          if (Array.isArray(files?.[field.name])) {
            fileItems.map(async (file) => {
              this.setError(
                field.name as keyof BaseFields | 'fields',
                await validate(file, {
                  isFile: true,
                  isImage: true,
                  isFileSize: {
                    on: true,
                    maxMB: 2,
                  },
                })
              )
            })
          } else {
            this.setError(
              field.name as keyof BaseFields | 'fields',
              await validate(files?.[field.name], {
                isRequired: field.isRequired,
                isFile: true,
                isImage: true,
                isFileSize: {
                  on: true,
                  maxMB: 2,
                },
              })
            )
          }

          break
      }
    })

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
