import { type NoteTypeFieldItem } from '@model/CustomFieldModel'

export enum NotesTypesCodeList {
  // Тип записи - статья
  ARTICLE = 'article',
  // Тип записи - Код
  CODE = 'code',
  // Тип записи - Задача
  ISSUE = 'issue',
  // Тип записи - Верстка
  LAYOUT = 'layout',
  // Тип записи - Полезный сервис
  SERVICE = 'service',
  // Тип записи - Технология
  TECHNOLOGY = 'technology',
  // Тип записи - Курс
  COURSE = 'course',
  // Тип записи - Книга
  BOOK = 'book',
  // Тип записи - Видео / конференция
  VIDEO = 'remote-source'
}

export interface NotesTypesItem {
  name: string
  code: string
  isCustom: boolean
}

export interface NotesTypesElement extends NotesTypesItem {
  id: number
  createdAt: Date
}

export interface CreateNoteType {
  name: string
  code: string
  draft: boolean
  fields: NoteTypeFieldItem[]
}

export interface NotePatternCustomField {
  code: string
  title: string
  isRequired: boolean
}
