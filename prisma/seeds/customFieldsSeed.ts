import { type PrismaClient } from '@prisma/client'

export const customFields = async (prisma: PrismaClient): Promise<void> => {
  await prisma.customNoteFields.upsert({
    create: { name: 'Ссылка', code: 'link' },
    update: {},
    where: { id: 1, code: 'link' },
  })

  await prisma.customNoteFields.upsert({
    create: { name: 'Файл', code: 'file' },
    update: {},
    where: { id: 2, code: 'file' },
  })

  await prisma.customNoteFields.upsert({
    create: { name: 'Несколько файлов', code: 'files-group' },
    update: {},
    where: { id: 3, code: 'files-group' },
  })

  await prisma.customNoteFields.upsert({
    create: { name: 'Описание', code: 'textarea' },
    update: {},
    where: { id: 4, code: 'textarea' },
  })

  await prisma.customNoteFields.upsert({
    create: { name: 'Поле ввода', code: 'input' },
    update: {},
    where: { id: 5, code: 'input' },
  })
}
