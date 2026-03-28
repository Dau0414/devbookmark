"use server"
import { auth } from "@/src/lib/auth";
import { home } from "@/src/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut=async()=>{
    try{
        await auth.api.signOut({
            headers:await headers()
        });
        
    }
    catch(error){
        console.error("Error signing out:", error);
        throw new Error("Failed to sign out. Please try again.");
    }
    redirect(home)
}