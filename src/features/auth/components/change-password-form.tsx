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
import { notFound,  useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "../action/change-password";
import { changePasswordSchema } from "../schemas/change-password";



export function ChangePasswordForm() {
    const parma=useSearchParams();
    const token=parma.get("token");
    if(!token){
        return notFound();
    }
    console.log("Token",token)
    const router=useRouter();
    const { execute, isPending } = useAction(changePassword,{
        onSuccess: () => {
            toast.success("Password changed successfully. Please sign in with your new password.");
            
            
        },
        onError: (error) => {
            toast.error( "Failed to change password. Please try again.");
        }
       
    });
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
       
        newPassword: "",
        token
        
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    const {  newPassword, token } = values;
     await execute({newPassword, token});
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
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">New Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="please enter your email"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          
           
           
          </FieldGroup>
          <Button type="submit" className="mt-6 w-full mx-auto" disabled={isPending}>
            {isPending ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
}
