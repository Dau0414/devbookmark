import z from "zod";
import { AuthBaseSchema } from "./auth-base";

export const AuthSigninSchema = z.object({
    ...AuthBaseSchema.shape,
});