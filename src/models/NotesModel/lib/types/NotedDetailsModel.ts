import { type Category } from '@model/CategoryModel'
import { type NotesTypesItem } from '@model/NotesTypesModel'
import { type NotesViewsItem } from '@model/NotesViewsModel'
import { type Tag } from '@model/TagModel'
import { type UserBaseData } from '@model/UserModel'
import { type PatternArticle } from './patterns/ArticleTypePattern'
import { type PatternCode } from './patterns/CodeTypePattern'

export interface BaseFieldsDetails {
  type: NotesTypesItem
  view: NotesViewsItem
  user: UserBaseData
  category: Category
  tags: Tag[]

  title: string
  description: string
  draft: boolean

  patternArticle?: PatternArticle
  patternCode?: PatternCode
}
