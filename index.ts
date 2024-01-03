import path from 'path'
import { application } from '@app/application'
import { startServer } from '@config/startServer'
import { type ModeType, type PathsOptions } from '@config/types/config'
import dotenv from 'dotenv'

dotenv.config()

const sslCertificate: string = process.env.SSL_CERTIFICATE ?? ''
const sslPrivateKey: string = process.env.SSL_PRIVATE_KEY ?? ''
const portHttp: number = Number(process.env.APP_PORT_HTTP) || 8000
const portHttps: number = Number(process.env.APP_PORT_HTTPS) || 8443
const api: string = '/api/v1'
const clientApi: string = process.env.APP_CLIENT_URL || 'http://localhost'
const mode: ModeType = process.env.APP_MODE as ModeType ?? 'development'
const paths: PathsOptions = {
  staticPath: path.resolve(__dirname, 'public'),
  uploadPath: path.resolve(__dirname, 'upload'),
}

if (require.main === module) {
  application({
    port: portHttp,
    portSsl: portHttps,
    paths,
    clientApi,
    api,
    mode,
    sslCertificate,
    sslPrivateKey,
  })
} else {
  module.exports = startServer
}
