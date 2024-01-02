import { ACCESS_CODE_USER, getAccess } from '@model/AccessModel'
import { getUserEmail } from '@model/UserModel/lib/query/getUserEmail'
import { PrismaClient } from '@prisma/client'
import { generateHash } from '@utils/hash'
import { v4 } from 'uuid'
import { type AuthGoogleParams } from '../types/UserAuthGoogleTypes'

const prisma = new PrismaClient()

export const googleAuthUser = async (profileData: AuthGoogleParams): Promise<number> => {
  const {
    mode,
    ...userData
  } = profileData

  let password: string = ''

  if (mode === 'register') {
    password = v4()

    const createUser = await prisma.users.upsert({
      create: {
        email: userData.email,
        password: await generateHash(password),
        username: userData.email,
      },
      update: {
        email: userData.email,
        username: userData.email,
      },
      where: {
        email: userData.email,
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

    await prisma.userData.upsert({
      create: {
        avatar: userData.picture,
        user_id: createUser.id,
        name: userData.given_name,
        surname: userData.family_name,
        accGoogle: true,
      },
      update: {
        avatar: userData.email,
        name: userData.given_name,
        surname: userData.family_name,
      },
      where: {
        user_id: createUser.id,
      },
    })

    return createUser.id
  }

  if (mode === 'login') {
    const getUser = await getUserEmail(userData.email)

    if (!getUser.id) {
      return await googleAuthUser({
        ...userData,
        mode: 'register',
      })
    }

    return getUser.id
  }

  return 0
}
