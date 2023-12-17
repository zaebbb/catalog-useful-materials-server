import { type PrismaClient } from '@prisma/client'

export const notesView = async (prisma: PrismaClient): Promise<void> => {
  await prisma.notesViews.upsert({
    create: { name: 'Публичный', code: 'public' },
    update: {},
    where: { id: 1, code: 'public' },
  })

  await prisma.notesViews.upsert({
    create: { name: 'Приватный', code: 'private' },
    update: {},
    where: { id: 2, code: 'private' },
  })
}
