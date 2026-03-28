import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./send-email";

export const auth = betterAuth({

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword :async({user,url,token},request)=>{
       await sendEmail({
            to:user.email,
            subject:"Reset your password",
            resetPasswordLink:url,
        })
    }
        
    
  },
  plugins: [
    nextCookies()
  ],
});