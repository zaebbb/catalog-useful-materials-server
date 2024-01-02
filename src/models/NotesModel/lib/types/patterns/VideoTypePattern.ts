import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatterVideoCodeList {
  VIDEO = 'linkVideo'
}

export interface PatternVideo {
  linkVideo: FieldItem
}

export interface VideoTypePattern extends BaseFields {
  linkVideo: Fields['text']
}
