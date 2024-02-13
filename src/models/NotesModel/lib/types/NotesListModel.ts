import { type Category } from '@model/CategoryModel'

export interface UserNotesQueryParams {
  description: string
  categoryId: string
  viewId: string
  typeId: string
  tagsIds: string
  page: string
}

export interface UserNotesListElement {
  id: number
  title: string
  description: string
  code: string
  createdAt: Date
  category: Category
}
