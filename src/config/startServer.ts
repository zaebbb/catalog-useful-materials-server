import fs from 'fs'
import http from 'http'
import https from 'https'
import { type Express } from 'express'
import { type ConfigOptions } from './types/config'

export const startServer = (app: Express, options: ConfigOptions): void => {
  const {
    port,
    portSsl,
    sslCertificate,
    sslPrivateKey,
  } = options

  const httpServer = http.createServer(app)

  httpServer.listen(port, () => {
    console.log(`[⚡️] Server HTTP started in ${port} port`)
  })

  if (sslCertificate && sslPrivateKey) {
    const privateKey = fs.readFileSync(sslPrivateKey, 'utf-8')
    const certificate = fs.readFileSync(sslCertificate, 'utf-8')

    const httpsServer = https.createServer({
      key: privateKey,
      cert: certificate,
    }, app)

    httpsServer.listen(portSsl, () => {
      console.log(`[⚡️] Server HTTPS started in ${portSsl} port`)
    })
  }
}
