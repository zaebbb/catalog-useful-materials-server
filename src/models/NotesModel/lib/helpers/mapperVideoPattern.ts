import { PatterVideoCodeList } from '@model/NotesModel/lib/types/patterns/VideoTypePattern'
import {
  type PatternVideo,
} from '../types/patterns/VideoTypePattern'

export interface MapperOption {
  name: string
  value: string
}

export const mapperVideoPattern = (fields: MapperOption[]): PatternVideo => {
  const linkVideo = fields
    .filter(field => field.name === PatterVideoCodeList.VIDEO)[0]

  return {
    linkVideo,
  }
}
