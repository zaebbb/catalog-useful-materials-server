import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getAllUsers = async () => {
  const allUsers = await prisma.users.findMany()
  console.log(allUsers)
}

getAllUsers()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

console.log('База успешно заполнена')
