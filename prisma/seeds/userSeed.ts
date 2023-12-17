import { type PrismaClient } from '@prisma/client'
import { generateHash } from '@utils/hash'

export const userSeed = async (prisma: PrismaClient): Promise<void> => {
  await prisma.users.upsert({
    create: {
      username: 'admin',
      email: 'admin@gmail.com',
      password: await generateHash('admin'),
    },
    update: {
      accesses: {
        connect: {
          id: 1,
        },
      },
    },
    where: {
      email: 'admin@gmail.com',
    },
  })

  await prisma.users.upsert({
    create: {
      username: 'admin',
      email: 'admin@gmail.com',
      password: await generateHash('admin'),
    },
    update: {
      accesses: {
        connect: {
          id: 2,
        },
      },
    },
    where: {
      email: 'admin@gmail.com',
    },
  })

  await prisma.users.upsert({
    create: {
      username: 'user',
      email: 'user@gmail.com',
      password: await generateHash('user'),
    },
    update: {
      accesses: {
        connect: {
          id: 2,
        },
      },
    },
    where: {
      email: 'user@gmail.com',
    },
  })
}
