import z from "zod";

export const PostDeleteSchema=z.object({
    id:z.string(),
})