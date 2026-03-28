"use server";
import { actionClient } from "@/src/lib/safe-action";
import { PostEditSchema } from "../schemas/post-edit";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/get-session";
import { isOwner } from "@/src/lib/is-owner";
import { redirect } from "next/navigation";
import { home, signIn } from "@/src/path";
import { revalidatePath } from "next/cache";

export const editPost=actionClient.inputSchema(PostEditSchema).action(async({parsedInput:{id,title,category,url,tags,description}})=>{
     const session=await getSession();
        if(!session){
            redirect(signIn)
        }
        const post=await prisma.bookmark.findUnique({
            where:{
                id,
            }
        })
        if(!post || post.userId!==session.user.id){
            throw new Error("Post not found")
        }
        
        
    try{
        const tagsArray=typeof tags==="string"?tags.split(",").map(tag=>tag.trim()).filter(tag=>tag!==""):[];
        await prisma.bookmark.update({
            where: {
                id,
            },
            data: {
                title,
                category,
                url,
                tags:tagsArray,
                description,
            }
        })
        revalidatePath(home);
        redirect(home);
    }
    catch(error){
        console.error("Error editing post:", error);
        throw new Error("Failed to edit post. Please try again.");
    }
})