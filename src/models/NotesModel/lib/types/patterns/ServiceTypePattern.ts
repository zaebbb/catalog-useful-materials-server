import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatternServiceCodeList {
  LINK_Service = 'linkService'
}

export interface PatternService {
  linkService?: FieldItem
}

export interface ServiceTypePattern extends BaseFields {
  linkService?: Fields['text']
}
