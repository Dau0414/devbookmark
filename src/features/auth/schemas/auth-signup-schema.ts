import z from "zod";
import { AuthBaseSchema } from "./auth-base";

export const AuthSignupSchema = z.object({
  ...AuthBaseSchema.shape,
  name:z.string().min(2,"Name must be at least 2 characters long"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
        code:"custom",
      message: "Passwords do not match",
    });
  } 
})