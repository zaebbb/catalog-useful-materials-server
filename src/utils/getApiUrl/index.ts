import dotenv from 'dotenv'

dotenv.config()

export const getApiUrl = (): string => {
  const versionApi = process.env.APP_API_VERSION ?? 'v1'

  return `/api/${versionApi}`
}
