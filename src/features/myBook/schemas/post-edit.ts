import z from "zod";
import { PostBase } from "./post-base";

export const PostEditSchema=z.object({
    id:z.string(),
   ...PostBase.shape,
})