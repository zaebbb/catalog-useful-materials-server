import { GetFileService } from '@service/FileService'
import { PatterArticleCodeList, type PatternArticle } from '../types/patterns/ArticleTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperArticlePattern = (fields: MapperOption[]): PatternArticle => {
  const linkNote = fields
    .filter(field => field.name === PatterArticleCodeList.LINK_NOTE)[0]

  const linkVideo = fields
    .filter(field => field.name === PatterArticleCodeList.LINK_VIDEO)[0]

  const image = fields
    .filter(field => field.name === PatterArticleCodeList.IMAGE)[0]

  if (image) {
    const imageFile = new GetFileService(image?.value)
    image.value = imageFile.getPath()
  }

  return {
    linkNote,
    linkVideo,
    image,
  }
}
