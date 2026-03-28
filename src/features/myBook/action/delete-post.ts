"use server";

import { actionClient } from "@/src/lib/safe-action";
import { PostDeleteSchema } from "../schemas";
import { parse } from "path";
import { prisma } from "@/src/lib/prisma";
import { isOwner } from "@/src/lib/is-owner";
import { getSession } from "@/src/lib/get-session";

export const deletePost=actionClient.inputSchema(PostDeleteSchema).action(async({parsedInput:{id}})=>{
    const session=await getSession();
    if(!session){
        throw new Error("Unauthorized");
    }
    const owner=await isOwner(session.user.id);
    if(!owner){
        throw new Error("Unauthorized");
    }
    try{
         await prisma.bookmark.delete({
            where:{
                id,
            }
        })
        return {
            success:true,
        }
    }
    catch(error){
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post. Please try again.");
    }
})
