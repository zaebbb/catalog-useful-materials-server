import {
  type PatternService,
  PatternServiceCodeList,
} from '../types/patterns/ServiceTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperServicePattern = (fields: MapperOption[]): PatternService => {
  const linkService = fields
    .filter(field => field.name === PatternServiceCodeList.LINK_Service)[0]

  return {
    linkService,
  }
}
