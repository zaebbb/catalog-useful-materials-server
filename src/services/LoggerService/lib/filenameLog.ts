import { type LoggerLevel } from './types/types'

export const filenameLog = (level: LoggerLevel): string => {
  const date = new Date()
  const newDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

  return `${level}-${newDate}.log`
}
