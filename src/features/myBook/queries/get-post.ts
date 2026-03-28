import { prisma } from "@/src/lib/prisma"

export const getPost=async(id:string)=>{
   return await prisma.bookmark.findUnique({
        where:{
            id,
        },
        include:{
            user:true,
        }
    })
}