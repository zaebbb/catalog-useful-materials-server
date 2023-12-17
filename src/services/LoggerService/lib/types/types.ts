export type LoggerLevel =
  'info' |
  'error' |
  'debug'

export interface OptionsTransport {
  level: LoggerLevel
  json: boolean
  handleExceptions: boolean
  datePattern?: string
  dirname?: string
  filename?: string
  colorize?: boolean
}
