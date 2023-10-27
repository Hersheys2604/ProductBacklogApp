const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // await prisma.user.create({
    //     data: {
    //       name: 'Alice',
    //       email: 'alice@prisma.io',
    //       password: '123456789',
    //     },
    //   })
    const allUsers = await prisma.user.findMany()
      console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })