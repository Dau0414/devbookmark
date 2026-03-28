"use server";
import { actionClient } from "@/src/lib/safe-action";
import { AuthSigninSchema } from "../schemas";
import { auth } from "@/src/lib/auth";
import {  signIn } from "@/src/path";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';
import { ResetPasswordSchema } from "../schemas/reset-password-schema";
import { changePasswordSchema } from '../schemas/change-password';

export const changePassword=actionClient.inputSchema(changePasswordSchema).action(async ({parsedInput:{newPassword,token}})=>{
    try{
     await auth.api.resetPassword({
        body:{
            newPassword,
            token
        },
       })

       
       
    }
    
    catch(error){
        console.error("Error signing in:", error);
        throw new Error("Failed to sign in. Please try again.");
    }
    redirect(signIn);
})