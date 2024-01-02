import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatternBookCodeList {
  IS_FILE_VIEW = 'isFileView',
  IS_LINK_VIEW = 'isLinkView',
  LINK_BOOK = 'linkBook',
  FILE_BOOK = 'fileBook'
}

export interface PatternBook {
  isFileView?: FieldItem
  isLinkView?: FieldItem
  linkBook?: FieldItem
  fileBook?: FieldItem
}

export interface BookTypePattern extends BaseFields {
  isFileView: Fields['checkbox']
  isLinkView: Fields['checkbox']
  linkBook?: Fields['text']
  fileBook?: Fields['file']
}
