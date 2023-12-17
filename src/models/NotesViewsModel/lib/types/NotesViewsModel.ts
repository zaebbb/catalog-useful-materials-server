export enum NotesViewsCodeList {
  // Тип видимости - публичный
  PUBLIC = 'public',
  // Тип видимости - приватный
  PRIVATE = 'private'
}

export interface NotesViewsItem {
  name: string
  code: string
}
