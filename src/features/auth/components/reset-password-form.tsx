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
import { myBook, signIn, signUp } from "@/src/path";
import { SignUp } from "../action/signUp";
import { AuthSigninSchema, AuthSignupSchema } from "../schemas";
import Link from "next/link";
import { SignIn } from "../action/signIn";
import { resetPassword } from "../action/reset-password";
import { ResetPasswordSchema } from "../schemas/reset-password-schema";



export function ResetPasswordForm() {
    const router=useRouter();
    const { execute, isPending } = useAction(resetPassword,{
        onSuccess: () => {
            toast.success("Password reset email sent successfully. Please check your inbox.");
            
            
        },
        onError: (error) => {
            toast.error( "Failed to send password reset email. Please try again.");
        }
       
    });
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
       
        email: "",
        
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    const {  email } = values;
     await execute({email});
  }

  return (
    <div className="">
      <CardWrapper
        title="Reset Your Password"
        description="Enter your email address below, and we'll send you a link to reset your password."
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="please enter your email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          
           
           
          </FieldGroup>
          <Button type="submit" className="mt-6 w-full mx-auto" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
}
