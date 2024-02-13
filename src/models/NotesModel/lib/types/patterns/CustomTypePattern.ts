import type fileUpload from 'express-fileupload'
import { type BaseFields, type Fields } from '../NotesModel'

export enum CustomFieldCodeList {
  LINK = 'link',
  FILE = 'file',
  FILE_GROUP = 'files-group',
  TEXTAREA = 'textarea',
  INPUT = 'input'
}

export interface NotePatternCustomField {
  code: CustomFieldCodeList
  title: string
  isRequired: boolean
  name: string
  value: string
  id?: number
}

export interface CustomTypePatternBody extends BaseFields {
  stringFields: Fields['text']
}

export interface CustomTypePatternData extends BaseFields {
  stringFields: NotePatternCustomField[]
  files: fileUpload.FileArray | null | undefined
}

export type CustomTypePatternValidation = BaseFields & {
  fields: NotePatternCustomField[]
  files: fileUpload.FileArray | null | undefined
}
