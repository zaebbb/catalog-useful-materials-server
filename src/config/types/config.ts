export interface PathsOptions {
  staticPath: string
  uploadPath: string
}

export interface ConfigOptions {
  port: number
  paths: PathsOptions
  clientApi: string
  api: string
}
