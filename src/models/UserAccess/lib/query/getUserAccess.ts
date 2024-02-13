import { PrismaClient } from '@prisma/client'

export interface GetUserAccessResult {
  id: number
}

const prisma = new PrismaClient()

export const getUserAccess = async (
  userId: number,
  accessId: number
): Promise<GetUserAccessResult> => {
  const item = await prisma.userAccess.findFirst({
    select: {
      id: true,
    },
    where: {
      access_id: accessId,
      user_id: userId,
    },
  })

  return {
    id: item?.id ?? 0,
  }
}
