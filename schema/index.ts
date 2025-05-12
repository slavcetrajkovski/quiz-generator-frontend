import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Емеил адресата е задолжителна",
  }),
  password: z.string().min(1, {
    message: "Лозинката е задолжителна",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Името е задолжително",
    }),
    email: z.string().email({
      message: "Емеил адресата е задолжителна и мора да биде валидна",
    }),
    password: z
      .string()
      .min(8, {
        message: "Лозинката мора да содржи минимум 8 карактери",
      })
      .regex(/[A-Z]/, {
        message: "Лозинката мора да содржи барем една голема буква",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Лозинката мора да содржи барем еден специјален знак",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Лозинките не се совпаѓаат",
    path: ["confirmPassword"],
  });

export const QuizSchema = z.object({
  title: z.string().min(1, {
    message: "Насловот е задолжителен",
  }),
  file: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "Само PDF датотеки се дозволени.",
  }),
});
