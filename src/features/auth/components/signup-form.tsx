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

import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { myBook, signIn } from "@/src/path";
import { SignUp } from "../action/signUp";
import { AuthSignupSchema } from "../schemas";
import Link from "next/link";



export function SignUpForm() {
    const router=useRouter();
    const { execute, isPending } = useAction(SignUp,{
        onSuccess: () => {
            toast.success("Signed up successfully");
            router.push(myBook);
            router.refresh();
        },
       
    });
  const form = useForm<z.infer<typeof AuthSignupSchema>>({
    resolver: zodResolver(AuthSignupSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AuthSignupSchema>) {
    const { name, email, password,confirmPassword } = values;
    await execute({
        name,
        email,
        password,
        confirmPassword
    });
  }

  return (
    <div className="">
      <CardWrapper
        title="Sign Up"
        description="Create an account to manage your bookmarks and access personalized features."
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="please enter your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Email
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="please enter your email"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="please enter your password"
                      type="password"
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
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Confirm Password
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="please confirm your password"
                      type="password"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="mt-6 w-full mx-auto" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
          <p className="text-center mt-4 text-muted-foreground"><Link href={signIn}>Already have an account? Sign In</Link></p>
        </form>
      </CardWrapper>
    </div>
  );
}
