import { PatterCodeCodeList, type PatternCode } from '../types/patterns/CodeTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperCodePattern = (fields: MapperOption[]): PatternCode => {
  const code = fields
    .filter(field => field.name === PatterCodeCodeList.CODE)[0]

  return {
    code,
  }
}
