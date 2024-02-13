import { type CookieOptions, type Response } from 'express'

export class AppResponse {
  res

  // dynamic methods
  constructor (res: Response) {
    this.res = res
    return this
  }

  public setJson (data: object): this {
    this.res.json(data)
    return this
  }

  public setBlob (data: Buffer): this {
    this.res.send(data)
    return this
  }

  public setCookie (
    key: string,
    value: string,
    options: Omit<CookieOptions, 'httpOnly' | 'secure'>
  ): this {
    this.res.cookie(key, value, {
      httpOnly: true,
      // secure: true,
      ...options,
    })
    return this
  }

  public setStatus (statusCode: number): this {
    this.res.status(statusCode)
    return this
  }

  public setHeader (name: string, value: string): this {
    this.res.setHeader(name, value)
    return this
  }

  public execute (): Response {
    return this.res
  }

  // static methods

  public static success (res: Response, data: object): Response {
    return res.status(200).json({
      success: data,
    })
  }

  public static validation (res: Response, data: object): Response {
    return res.status(400).json({
      validation: data,
    })
  }

  public static error (res: Response, message: string): Response {
    return res.status(400).json({
      error: message,
    })
  }

  public static notFound (res: Response, message: string): Response {
    return res.status(404).json({
      error: message,
    })
  }

  public static accessDenied (res: Response): Response {
    return res.status(403).json({
      error: 'Access Denied',
    })
  }

  public static internalError (res: Response): Response {
    return res.status(500).json({
      error: 'Internal Server Error',
    })
  }
}
