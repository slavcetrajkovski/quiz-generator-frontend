"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";

import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/service/authentication-service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const { token } = await register(
          values.name,
          values.email,
          values.password
        );
        localStorage.setItem("token", token);
        setSuccess("Registration has been successful");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error: any) {
        setError(error.message);
      }
    });
  };

  const { isSubmitting } = form.formState;

  return (
    <CardWrapper
      headerLabel="Register"
      headerText="Create your account"
      backButtonLabel="Already have an account? Sign in!"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*****"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*****" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            variant="pink"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
