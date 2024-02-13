import { type FieldItem } from '@model/FieldsModel'
import { GetFileService } from '@service/FileService'
import { CustomFieldCodeList } from '../types/patterns/CustomTypePattern'

export interface MapperOption {
  name: string
  value: string
  code: string
}

export interface FieldItemCustom extends FieldItem {
  code: string
}

export const mapperCustomPattern = (fields: MapperOption[]): FieldItemCustom[] => {
  return fields.map((field): FieldItemCustom => {
    if (
      field.code === CustomFieldCodeList.FILE &&
      field.value
    ) {
      const file = new GetFileService(field.value)

      return {
        name: field.name,
        value: file.getPath(),
        code: field.code,
      }
    }

    if (
      field.code === CustomFieldCodeList.FILE_GROUP &&
      field.value
    ) {
      const filesPaths: string[] = []
      const files = JSON.parse(field.value) as string[]

      files.forEach((fileCode) => {
        const file = new GetFileService(fileCode)
        filesPaths.push(file.getPath())
      })

      return {
        name: field.name,
        value: JSON.stringify(filesPaths),
        code: field.code,
      }
    }

    return {
      name: field.name,
      value: field.value,
      code: field.code,
    }
  })
}
