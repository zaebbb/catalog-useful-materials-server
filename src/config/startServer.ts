import { type Express } from 'express'
import { type ConfigOptions } from './types/config'

export const startServer = (app: Express, options: ConfigOptions): void => {
  const {
    port,
  } = options

  app.listen(port, () => {
    console.log(`[⚡️] Server started in ${port} port`)
  })
}
