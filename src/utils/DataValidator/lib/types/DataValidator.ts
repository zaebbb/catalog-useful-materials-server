export type ErrorResult = string | boolean

interface BaseOptions {
  on: boolean
}

export interface IsMaxStringProps extends BaseOptions {
  max?: number
}

export interface IsMinStringProps extends BaseOptions {
  min?: number
}

export interface IsMinArrayProps extends BaseOptions {
  max?: number
}

export type IsFileMax = BaseOptions & {
  maxMB: number
}

export type IsDataMatch = BaseOptions & {
  dataMatch: string
}
