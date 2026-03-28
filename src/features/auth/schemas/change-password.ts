import z from "zod";

export const changePasswordSchema=z.object({
   newPassword:z.string().min(8,"Password must be at least 8 characters long"),
   token:z.string()
})