import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatterIssueCodeList {
  IS_IMAGE_VIEW = 'isImageView',
  IS_LINK_VIEW = 'isLinkView',
  LINK_ISSUE = 'linkIssue',
  IMAGE_ISSUE = 'imageIssue'
}

export interface PatternIssue {
  isImageView?: FieldItem
  isLinkView?: FieldItem
  linkIssue?: FieldItem
  imageIssue?: FieldItem
}

export interface IssueTypePattern extends BaseFields {
  isImageView: Fields['checkbox']
  isLinkView: Fields['checkbox']
  linkIssue?: Fields['text']
  imageIssue?: Fields['file']
}
