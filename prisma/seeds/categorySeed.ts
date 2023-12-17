import { type PrismaClient } from '@prisma/client'

export const categorySeed = async (prisma: PrismaClient): Promise<void> => {
  await prisma.categories.upsert({
    create: { name: 'Frontend', code: 'frontend' },
    update: {},
    where: { id: 1, code: 'frontend' },
  })

  await prisma.categories.upsert({
    create: { name: 'Backend', code: 'backend' },
    update: {},
    where: { id: 2, code: 'backend' },
  })

  await prisma.categories.upsert({
    create: { name: 'Fullstack', code: 'fullstack' },
    update: {},
    where: { id: 3, code: 'fullstack' },
  })
}
