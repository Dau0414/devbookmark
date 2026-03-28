"use server";

import { actionClient } from "@/src/lib/safe-action";
import { PostCreateSchema } from "../schemas";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/get-session";
import { redirect } from "next/navigation";
import { signIn } from "@/src/path";

export const createPost = actionClient.inputSchema(PostCreateSchema)
.action(async ({ parsedInput: { title, category, url, tags , description } }) => {
    const session=await getSession();
    if(!session){
        return redirect(signIn)
    }
    try{
        const tagsArray = typeof tags === "string" 
        ? tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
        : [];
        await prisma.bookmark.create({
            data: {
                title,
                category,
                url,
                tags: tagsArray,
                description,
                userId:session?.user.id ,
            }
        })
        return {
            success: true,
        }
      
    }
    catch(error){
        console.error("Error creating post:", error);
        throw new Error("Failed to create post. Please try again.");
    }
    
});