export type ModeType = 'development' | 'production'

export interface PathsOptions {
  staticPath: string
  uploadPath: string
}

export interface ConfigOptions {
  port: number
  portSsl: number
  paths: PathsOptions
  clientApi: string
  api: string
  mode: ModeType
  sslCertificate: string
  sslPrivateKey: string
}
