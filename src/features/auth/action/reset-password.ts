"use server";
import { actionClient } from "@/src/lib/safe-action";
import { AuthSigninSchema } from "../schemas";
import { auth } from "@/src/lib/auth";
import { changePasswordPath, home, resetPasswordPath, signIn } from "@/src/path";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';
import { ResetPasswordSchema } from "../schemas/reset-password-schema";

export const resetPassword=actionClient.inputSchema(ResetPasswordSchema).action(async ({parsedInput:{email}})=>{
    try{
      const result= await auth.api.requestPasswordReset({
        body:{
            email,
            redirectTo:`${process.env.BETTER_AUTH_URL}/${changePasswordPath}`
        },

       })
           

       
       return {
        success:true,
       }
    }
    catch(error){
        console.error("Error signing in:", error);
        throw new Error("Failed to sign in. Please try again.");
    }
    
})