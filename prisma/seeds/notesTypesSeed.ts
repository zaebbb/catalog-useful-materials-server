import { type PrismaClient } from '@prisma/client'

export const notesTypes = async (prisma: PrismaClient): Promise<void> => {
  await prisma.notesTypes.upsert({
    create: { name: 'Статья', code: 'article' },
    update: {},
    where: { id: 1, code: 'article' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Код', code: 'code' },
    update: {},
    where: { id: 2, code: 'code' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Задача', code: 'issue' },
    update: {},
    where: { id: 3, code: 'issue' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Верстка', code: 'layout' },
    update: {},
    where: { id: 4, code: 'layout' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Сервис', code: 'service' },
    update: {},
    where: { id: 5, code: 'service' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Книга', code: 'book' },
    update: {},
    where: { id: 6, code: 'book' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Технология', code: 'technology' },
    update: {},
    where: { id: 7, code: 'technology' },
  })

  await prisma.notesTypes.upsert({
    create: { name: 'Курс', code: 'course' },
    update: {},
    where: { id: 8, code: 'course' },
  })
}
