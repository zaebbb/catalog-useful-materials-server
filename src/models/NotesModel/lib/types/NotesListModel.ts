import { type Category } from '@model/CategoryModel'

export interface UserNotesListElement {
  id: number
  title: string
  description: string
  code: string
  createdAt: Date
  category: Category
}
