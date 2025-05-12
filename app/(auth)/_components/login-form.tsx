"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { login } from "@/service/authentication-service";
import { redirect, useRouter } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
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
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const LoginForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    try {
      const { token } = await login(values.email, values.password);
      localStorage.setItem("token", token);
      setSuccess("Успешна најава");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <CardWrapper
      headerLabel="Sign in"
      headerText="Please fill in the credentials"
      backButtonLabel="Don't have an account? Register here!"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe24@example.com"
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
            variant="blue"
            disabled={!isValid || isSubmitting}
            type="submit"
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
