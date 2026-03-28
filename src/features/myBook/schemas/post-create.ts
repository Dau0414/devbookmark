import z from "zod";
import { PostBase } from "./post-base";

export const PostCreateSchema=z.object({
    ...PostBase.shape,
})