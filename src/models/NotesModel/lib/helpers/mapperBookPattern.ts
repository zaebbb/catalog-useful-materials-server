import { GetFileService } from '@service/FileService'
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

  if (file) {
    const imageFile = new GetFileService(file?.value)
    file.value = imageFile.getPath()
  }

  return {
    fileBook: file,
    linkBook,
  }
}
