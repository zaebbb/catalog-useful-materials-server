import { ACCESS_CODE_USER, getAccess } from '@model/AccessModel'
import { type UserRegisterValues } from '@model/UserModel'
import { PrismaClient } from '@prisma/client'
import { generateHash } from '@utils/hash'

const prisma = new PrismaClient()

export const createUser = async (userData: UserRegisterValues): Promise<number> => {
  const {
    email,
    username,
    password,
  } = userData

  const createUser = await prisma.users.create({
    data: {
      email,
      password: await generateHash(password),
      username,
    },
  })

  const access = await getAccess(ACCESS_CODE_USER)

  if (access) {
    await prisma.userAccess.upsert({
      create: {
        user_id: createUser.id,
        access_id: access.id,
      },
      update: {},
      where: {
        id: -1,
      },
    })
  }

  return createUser.id
}
