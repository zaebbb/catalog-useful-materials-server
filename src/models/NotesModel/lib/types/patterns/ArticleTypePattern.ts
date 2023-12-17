import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatterArticleCodeList {
  LINK_NOTE = 'linkNote',
  LINK_VIDEO = 'linkVideo',
  IMAGE = 'image'
}

export interface PatternArticle {
  linkNote: FieldItem
  linkVideo: FieldItem
  image: FieldItem
}

export interface ArticleTypePattern extends BaseFields {
  linkNote: Fields['text']
  linkVideo?: Fields['text']
  image?: Fields['file']
}
