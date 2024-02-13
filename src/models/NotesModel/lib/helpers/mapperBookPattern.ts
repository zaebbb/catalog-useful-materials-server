import { type PatternBook, PatternBookCodeList } from '../types/patterns/BookTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperBookPattern = (fields: MapperOption[]): PatternBook => {
  const linkBook = fields
    .filter(field => field.name === PatternBookCodeList.LINK_BOOK)[0]

  const file = fields
    .filter(field => field.name === PatternBookCodeList.FILE_BOOK)[0]

  return {
    fileBook: file,
    linkBook,
  }
}
