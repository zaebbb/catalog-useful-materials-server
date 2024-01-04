import dotenv from 'dotenv'

dotenv.config()

type HttpMode = 'http' | 'https'

export const getDomain = (): string => {
  const httpMode: HttpMode = process.env.APP_HTTP_MODE as HttpMode ?? 'http'
  const portHttp = process.env.APP_PORT_HTTP ?? ''
  const portHttps = process.env.APP_PORT_HTTPS ?? ''
  const domain = process.env.APP_DOMAIN ?? ''

  if (httpMode === 'https') {
    return `https://${domain}:${portHttps}`
  }

  return `http://${domain}:${portHttp}`
}
