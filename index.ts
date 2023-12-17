import path from 'path'
import { application } from '@app/application'
import { startServer } from '@config/startServer'
import { type PathsOptions } from '@config/types/config'
import dotenv from 'dotenv'

dotenv.config()

const port: number = Number(process.env.APP_PORT) || 8088
const api: string = '/api/v1'
const clientApi: string = process.env.APP_CLIENT_URL || 'http://localhost:3000'
const paths: PathsOptions = {
  staticPath: path.resolve(__dirname, 'public'),
  uploadPath: path.resolve(__dirname, 'upload'),
}

if (require.main === module) {
  application({
    port,
    paths,
    clientApi,
    api,
  })
} else {
  module.exports = startServer
}
