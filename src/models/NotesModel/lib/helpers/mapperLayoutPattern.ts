import { GetFileService } from '@service/FileService'
import { type PatternLayout, PatternLayoutCodeList } from '../types/patterns/LayoutTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperLayoutPattern = (fields: MapperOption[]): PatternLayout => {
  const linkLayout = fields
    .filter(field => field.name === PatternLayoutCodeList.LINK_LAYOUT)[0]

  const image = fields
    .filter(field => field.name === PatternLayoutCodeList.IMAGE_LAYOUT)[0]

  if (image) {
    const imageFile = new GetFileService(image?.value)
    image.value = imageFile.getPath()
  }

  return {
    imageLayout: image,
    linkLayout,
  }
}
