import { PrismaClient } from '@prisma/client'
import { type AccessModel } from '../types/AccessModelTypes'

const prisma = new PrismaClient()

export const getAccess = async (code: string): Promise<AccessModel | undefined> => {
  const access = await prisma.access.findFirst({
    where: {
      code: {
        equals: code,
      },
    },
  })

  if (access?.id) {
    return {
      id: access.id,
      code: access.code,
      name: access.name,
    }
  }

  return undefined
}
