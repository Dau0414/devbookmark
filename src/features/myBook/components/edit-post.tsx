"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
 
  InputGroupTextarea,
} from "@/components/ui/input-group";
import CardWrapper from "@/src/components/card-wrapper";
import { PostCreateSchema } from "../schemas";
import { useAction } from "next-safe-action/hooks";
import { createPost } from "../action/create-post";
import { useRouter } from "next/navigation";
import { myBook } from "@/src/path";
import { PostEditSchema } from "../schemas/post-edit";
import { editPost } from "../action/edit-post";
import { Bookmark } from "@/generated/prisma/client";

type EditPostProps={
    post:Bookmark | null;
}

export function EditPost({post}:EditPostProps) {
    const router=useRouter();
    const { execute, isPending } = useAction(editPost,{
        onSuccess: () => {
            toast.success("Post created successfully");
            router.push(myBook);
        },
       
    });
  const form = useForm<z.infer<typeof PostEditSchema>>({
    resolver: zodResolver(PostEditSchema),
    defaultValues: {
      id: post?.id || "",
      title: post?.title || "",
      category: post?.category || "",
      url: post?.url || "",
      tags: post?.tags?.join(", ") || "",
      description: post?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostEditSchema>) {
    const { id,title, category, url, tags, description } = values;
    await execute({
        id,
      title,
      category,
      url,
      tags,
      description,
    });
  }

  return (
    <div className="">
      <CardWrapper
        title="Create Bookmark"
        description="Use the form below to create a new bookmark."
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="please enter a title for your bookmark"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Category
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="please enter category for your bookmark"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    URL
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="please enter url for your bookmark"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-tags">Tags (Optional)</FieldLabel>
                  <Input {...field} id="form-rhf-demo-tags" placeholder="react, ui, nextjs" autoComplete="off" />
                </Field>
              )}
            />
              <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="please briefly describe your bookmark..."
                      autoComplete="off"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  
                  </InputGroup>
                  
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="mt-6" disabled={isPending}>
            {isPending ? "Updating ..." : "Update Bookmark"}
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
}
