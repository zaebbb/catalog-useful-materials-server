import { type Tag } from '@model/TagModel'

export interface Category {
  name: string
  code: string
}

export interface CategoryElement extends Category {
  id: number
  createdAt: Date
}

export type CategoryCreated = Category & {
  draft: boolean
}

export type CategoryEdit = Omit<Tag, 'code'> & Omit<CategoryElement, 'createdAt' | 'code'> & {
  draft: boolean
}

export type CategoryMode = 'name' | 'code'
