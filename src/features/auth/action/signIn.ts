"use server";
import { actionClient } from "@/src/lib/safe-action";
import { AuthSigninSchema } from "../schemas";
import { auth } from "@/src/lib/auth";
import { home } from "@/src/path";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';

export const SignIn=actionClient.inputSchema(AuthSigninSchema).action(async ({parsedInput:{email,password}})=>{
    try{
      const result= await auth.api.signInEmail({
        headers:await headers(),
        body:{
            email,
            password,
        },
       })

       
       return {
        success:true,
       }
    }
    catch(error){
        console.error("Error signing in:", error);
        throw new Error("Something went wrong. Please try again.");
    }
    
})