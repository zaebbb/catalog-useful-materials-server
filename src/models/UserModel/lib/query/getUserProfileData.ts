import { PrismaClient } from '@prisma/client'
import { GetFileService } from '@service/FileService'
import { type UserProfileData } from '../types/UserModel'

const prisma = new PrismaClient()

export const getUserProfileData = async (id: number): Promise<UserProfileData> => {
  const user = await prisma.users.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
    select: {
      email: true,
      username: true,
      userData: {
        select: {
          avatar: true,
          accGithub: true,
          accGoogle: true,
          name: true,
          patronymic: true,
          surname: true,
        },
      },
    },
  })

  const userData = user?.userData
  const avatarFile = new GetFileService(userData?.avatar)

  return {
    avatar: userData?.avatar ? avatarFile.getPath() : '',
    avatarFilename: userData?.avatar ?? '',
    surname: userData?.surname ?? '',
    name: userData?.name ?? '',
    accGoogle: userData?.accGoogle ?? false,
    patronymic: userData?.patronymic ?? '',
    accGithub: userData?.accGithub ?? '',
  }
}
