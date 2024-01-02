import { ACCESS_CODE_USER, getAccess } from '@model/AccessModel'
import { PrismaClient } from '@prisma/client'
import { generateHash } from '@utils/hash'
import { v4 } from 'uuid'
import { type UserVkCreateParams } from '../types/UserVkCreate'

const prisma = new PrismaClient()

export const createUserVk = async (userVkData: UserVkCreateParams): Promise<number> => {
  const {
    email,
    surname,
    username,
    name,
    avatar,
  } = userVkData

  const password: string = v4()

  const createUser = await prisma.users.create({
    data: {
      email,
      password: await generateHash(password),
      username,
      userData: {
        create: {
          avatar,
          name,
          surname,
        },
      },
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
