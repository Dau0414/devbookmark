import { auth } from '@/src/lib/auth';
import { headers } from 'next/headers';
import { cache } from 'react';


export const getSession=cache(async()=>{
    try{
        const session=await auth.api.getSession({
            headers:await headers()
        });
        return session;
    }
    catch(error){
        console.error("Error getting session:", error);
        return null;
    }
}   )