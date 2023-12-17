import { type PrismaClient } from '@prisma/client'

export const accessSeed = async (prisma: PrismaClient): Promise<void> => {
  await prisma.access.upsert({
    update: {
      name: 'Администратор',
      code: 'admin',
    },
    where: {
      id: 1,
    },
    create: {
      name: 'Администратор',
      code: 'admin',
    },
  })

  await prisma.access.upsert({
    update: {
      name: 'Авторизованный пользователь',
      code: 'user',
    },
    where: {
      id: 2,
    },
    create: {
      name: 'Авторизованный пользователь',
      code: 'user',
    },
  })
}
