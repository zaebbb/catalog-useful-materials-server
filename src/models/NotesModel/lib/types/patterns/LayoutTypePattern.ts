import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatternLayoutCodeList {
  LINK_LAYOUT = 'linkLayout',
  IMAGE_LAYOUT = 'imageLayout'
}

export interface PatternLayout {
  linkLayout?: FieldItem
  imageLayout?: FieldItem
}

export interface LayoutTypePattern extends BaseFields {
  linkLayout?: Fields['text']
  imageLayout?: Fields['file']
}
