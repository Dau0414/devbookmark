"use server"
import { actionClient } from "@/src/lib/safe-action";
import { AuthSignupSchema } from "../schemas";
import { auth } from "@/src/lib/auth";

export const SignUp=actionClient.inputSchema(AuthSignupSchema).action(async ({parsedInput:{name,email,password}})=>{
    try{
       await auth.api.signUpEmail({
        body:{
            name,
            email,
            password,
        }
       })
       return {
        success:true,
       }
    }
    catch(error){
        console.error("Error signing up:", error);
        throw new Error("Failed to sign up. Please try again.");
    }
})