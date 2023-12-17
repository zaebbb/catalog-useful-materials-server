import path from 'path'
import { filenameLog } from './filenameLog'
import { type LoggerLevel, type OptionsTransport } from './types/types'

export const loggerOptions: Record<LoggerLevel, OptionsTransport> = {
  info: {
    level: 'info',
    dirname: path.resolve(__dirname, '..', '..', '..', '..', 'logs', 'info'),
    json: true,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD-HH',
    filename: filenameLog('info'),
  },
  error: {
    level: 'error',
    dirname: path.resolve(__dirname, '..', '..', '..', '..', 'logs', 'error'),
    json: true,
    handleExceptions: true,
    filename: filenameLog('error'),
  },
  debug: {
    level: 'debug',
    json: false,
    handleExceptions: true,
    colorize: true,
  },
}
