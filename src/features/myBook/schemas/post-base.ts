import z from "zod";

export const PostBase=z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    description: z.string().min(5, "Description must be at least 5 characters.").max(500, "Description must be at most 500 characters."),
    url: z.string().url("Please enter a valid URL."),
    category: z.string().min(3, "Category must be at least 3 characters.").max(20, "Category must be at most 20 characters."),
    tags: z.string().optional(),
})