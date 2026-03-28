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
import { myBook, resetPasswordPath, signIn, signUp } from "@/src/path";
import { SignUp } from "../action/signUp";
import { AuthSigninSchema, AuthSignupSchema } from "../schemas";
import Link from "next/link";
import { SignIn } from "../action/signIn";



export function SignInForm() {
    const router=useRouter();
    const { execute, isPending } = useAction(SignIn,{
        onSuccess: () => {
            toast.success("Signed in successfully");
            router.push(myBook);
            router.refresh();
            
        },
        onError: (error) => {
            toast.error( "Failed to sign in. Please try again.");
        }
       
    });
  const form = useForm<z.infer<typeof AuthSigninSchema>>({
    resolver: zodResolver(AuthSigninSchema),
    defaultValues: {
       
        email: "",
        password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AuthSigninSchema>) {
    const {  email, password } = values;
    await execute({
        
        email,
        password,
        
    });
  }

  const footer=()=>{
    return (
      <div className="w-full flex justify-between ">
                  <p className="text-center mt-4 text-muted-foreground"><Link href={signUp}>If you don't have an account! <span className="underline">Sign Up</span></Link></p>
                  <p className="text-center mt-4 text-muted-foreground">Forget password?<Link href={resetPasswordPath} className="underline">Reset Password</Link></p>
      </div>
    )
  }
  return (
    <div className="">
      <CardWrapper
        title="Sign In"
        description="Welcome back! Please enter your credentials to access your account."
        footer={footer()}
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
           
          </FieldGroup>
          <Button type="submit" className="mt-6 w-full mx-auto" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
}
