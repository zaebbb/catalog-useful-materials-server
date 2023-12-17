import { PrismaClient } from '@prisma/client'
import { type UserProfileData } from '../types/UserModel'

const prisma = new PrismaClient()

export const editProfileData = async (id: number, profile: UserProfileData): Promise<boolean> => {
  const updateUser = await prisma.userData.upsert({
    where: {
      user_id: id,
    },
    update: {
      name: profile.name,
      surname: profile.surname,
      patronymic: profile.patronymic,
      avatar: profile.avatar,
    },
    create: {
      name: profile.name,
      surname: profile.surname,
      patronymic: profile.patronymic,
      user_id: id,
      avatar: profile.avatar,
    },
  })

  return !!updateUser.id
}
