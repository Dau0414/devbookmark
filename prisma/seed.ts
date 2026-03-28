import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })

export const fakedata=[
    {
        title:"Prisma Documentation",
        url:"https://www.prisma.io/docs",
        category:"Documentation",
        description:"Official Prisma documentation for developers.",
        tags:["prisma","database","orm"],
        userId:"3Lxo0EIc2Lu0PUHGQvFiPrLLk2Bg1ap4"
    },
    {
        title:"Supabase Documentation",
        url:"https://supabase.com/docs",
        category:"Documentation",
        description:"Official Supabase documentation for developers.",
        tags:["supabase","database","backend"],
        userId:"3Lxo0EIc2Lu0PUHGQvFiPrLLk2Bg1ap4"

    },
    {
        title:"Next.js Documentation",
        url:"https://nextjs.org/docs",
        category:"Documentation",
        description:"Official Next.js documentation for developers.",
        tags:["nextjs","react","frontend"],
        userId:"3Lxo0EIc2Lu0PUHGQvFiPrLLk2Bg1ap4"

    }
]
const seed=async()=>{
    await prisma.bookmark.deleteMany()
    await prisma.bookmark.createMany({
        data:fakedata
    })
}
seed()