import { GetFileService } from '@service/FileService'
import { PatterIssueCodeList, type PatternIssue } from '../types/patterns/IssueTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperIssuePattern = (fields: MapperOption[]): PatternIssue => {
  const linkIssue = fields
    .filter(field => field.name === PatterIssueCodeList.LINK_ISSUE)[0]

  const image = fields
    .filter(field => field.name === PatterIssueCodeList.IMAGE_ISSUE)[0]

  if (image) {
    const imageFile = new GetFileService(image?.value)
    image.value = imageFile.getPath()
  }

  return {
    imageIssue: image,
    linkIssue,
  }
}
