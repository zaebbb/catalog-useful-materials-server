import { PatterCourseCodeList } from '@model/NotesModel/lib/types/patterns/CourseTypePattern'
import {
  type PatternCourse,
} from '../types/patterns/CourseTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperCoursePattern = (fields: MapperOption[]): PatternCourse => {
  const linkCourse = fields
    .filter(field => field.name === PatterCourseCodeList.LINK_COURSE)[0]

  const authorCourse = fields
    .filter(field => field.name === PatterCourseCodeList.AUTHOR_COURSE)[0]

  return {
    linkCourse,
    authorCourse,
  }
}
