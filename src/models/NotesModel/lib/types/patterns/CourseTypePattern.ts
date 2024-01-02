import { type FieldItem } from '@model/FieldsModel'
import { type BaseFields, type Fields } from '../NotesModel'

export enum PatterCourseCodeList {
  LINK_COURSE = 'linkCourse',
  AUTHOR_COURSE = 'authorCourse'
}

export interface PatternCourse {
  linkCourse?: FieldItem
  authorCourse?: FieldItem
}

export interface CourseTypePattern extends BaseFields {
  linkCourse?: Fields['text']
  authorCourse?: Fields['text']
}
