import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email address is",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Email address is required and must be valid",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const QuizSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  file: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});
