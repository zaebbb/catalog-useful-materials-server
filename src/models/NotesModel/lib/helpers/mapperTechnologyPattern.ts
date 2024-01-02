import { GetFileService } from '@service/FileService'
import { type PatternTechnology, PatterTechnologyCodeList } from '../types/patterns/TechnologyTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperTechnologyPattern = (fields: MapperOption[]): PatternTechnology => {
  const linkDocs = fields
    .filter(field => field.name === PatterTechnologyCodeList.LINK_DOCS)[0]

  const linkTechnology = fields
    .filter(field => field.name === PatterTechnologyCodeList.LINK_TECHNOLOGY)[0]

  const linkInstall = fields
    .filter(field => field.name === PatterTechnologyCodeList.LINK_INSTALL)[0]

  const icon = fields
    .filter(field => field.name === PatterTechnologyCodeList.ICON)[0]

  if (icon) {
    const imageFile = new GetFileService(icon?.value)
    icon.value = imageFile.getPath()
  }

  return {
    linkDocs,
    linkTechnology,
    linkInstall,
    icon,
  }
}
