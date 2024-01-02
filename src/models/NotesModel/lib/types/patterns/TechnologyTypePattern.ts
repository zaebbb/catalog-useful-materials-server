import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatterTechnologyCodeList {
  LINK_TECHNOLOGY = 'linkTechnology',
  LINK_INSTALL = 'linkInstall',
  LINK_DOCS = 'linkDocs',
  ICON = 'icon'
}

export interface PatternTechnology {
  linkTechnology: FieldItem
  linkInstall: FieldItem
  linkDocs: FieldItem
  icon: FieldItem
}

export interface TechnologyTypePattern extends BaseFields {
  linkTechnology: Fields['text']
  linkInstall: Fields['text']
  linkDocs: Fields['text']
  icon?: Fields['file']
}
