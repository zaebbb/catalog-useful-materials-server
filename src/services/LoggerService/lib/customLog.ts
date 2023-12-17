import winston from 'winston'

const { format } = winston
const { printf } = format

export const customLog = printf(({ level, message }): string => {
  const date = new Date()
  const logDate = date.toLocaleDateString()
  const logTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  return `Level:[${level}] LogTime: [${logDate} - ${logTime}] Message:-[${message}]`
})
