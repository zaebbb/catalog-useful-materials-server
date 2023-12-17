import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatterCodeCodeList {
  CODE = 'code'
}

export interface PatternCode {
  code: FieldItem
}

export interface CodeTypePattern extends BaseFields {
  code: Fields['text']
}
