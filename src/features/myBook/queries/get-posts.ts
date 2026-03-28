import { prisma } from "@/src/lib/prisma"
import { Bookmark, User } from '@prisma/client';
import { SearchParams } from "../Types/SearchInput";
interface propsWithUser extends Bookmark{
    user:User
}
interface pagination{
    posts:propsWithUser[],
    totalPages:number,
    currentPage:number
}
export const getPosts = async (userId:string | undefined ,searchParams:SearchParams): Promise<pagination> => {
    const POST_PER_PAGE=3
    const currentPage=Number(searchParams.page) || 1
    const skip=(currentPage-1)*POST_PER_PAGE
    const whereCondition={
        userId:userId,
        title:{
            contains:searchParams.search ?? "",
            mode:"insensitive" as const
           }
    }
   
    const[totalCount,posts]=await prisma.$transaction([
        prisma.bookmark.count({
            where:whereCondition
        }),
        prisma.bookmark.findMany({
            orderBy: {
                createdAt: searchParams.sort==="asc" ? "asc" : "desc",
            },
            where:whereCondition,
            take:POST_PER_PAGE,
            skip,
            include:{
                user:true,
            }
            
        })
    ])
    const totalPages=Math.ceil(totalCount/POST_PER_PAGE)
    return {
        posts:posts as propsWithUser[],
        totalPages,
        currentPage
    }
}