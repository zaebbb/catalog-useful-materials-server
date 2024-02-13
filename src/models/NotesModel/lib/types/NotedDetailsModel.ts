import { type Category } from '@model/CategoryModel'
import { type FieldItem } from '@model/FieldsModel'
import { type NotesTypesItem } from '@model/NotesTypesModel'
import { type NotesViewsItem } from '@model/NotesViewsModel'
import { type Tag } from '@model/TagModel'
import { type UserBaseData } from '@model/UserModel'
import { type PatternArticle } from './patterns/ArticleTypePattern'
import { type PatternBook } from './patterns/BookTypePattern'
import { type PatternCode } from './patterns/CodeTypePattern'
import { type PatternCourse } from './patterns/CourseTypePattern'
import { type PatternIssue } from './patterns/IssueTypePattern'
import { type PatternLayout } from './patterns/LayoutTypePattern'
import { type PatternService } from './patterns/ServiceTypePattern'
import { type PatternTechnology } from './patterns/TechnologyTypePattern'
import { type PatternVideo } from './patterns/VideoTypePattern'

export interface BaseFieldsDetails {
  type: NotesTypesItem
  view: NotesViewsItem
  user: UserBaseData
  category: Category
  tags: Tag[]

  title: string
  description: string
  createdAt: Date
  draft: boolean

  patternArticle?: PatternArticle
  patternCode?: PatternCode
  patternIssue?: PatternIssue
  patternLayout?: PatternLayout
  patternService?: PatternService
  patternBook?: PatternBook
  patternVideo?: PatternVideo
  patternTechnology?: PatternTechnology
  patternCourse?: PatternCourse
  patternCustom?: FieldItem[]
}
