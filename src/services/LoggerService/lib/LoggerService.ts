import { customLog } from '@service/LoggerService/lib/customLog'
import winston, { transports } from 'winston'
import { loggerOptions } from './options'
import { type LoggerLevel } from './types/types'

const { format } = winston
const { combine } = format

export const LoggerService = (level: LoggerLevel) => {
  const logTransports = []

  if (level === 'error') {
    logTransports.push(new transports.File(loggerOptions.error))
  }

  if (level === 'debug') {
    logTransports.push(new transports.Console(loggerOptions.debug))
  }

  if (level === 'info') {
    logTransports.push(new transports.File(loggerOptions.info))
  }

  return winston.createLogger({
    format: combine(customLog),
    transports: logTransports,
    exitOnError: false,
  })
}
