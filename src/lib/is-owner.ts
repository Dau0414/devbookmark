"use server"
import { getSession } from "./get-session"

export const isOwner=async(userId:string)=>{
    const session=await getSession();
    return session?.user.id===userId
}