"use client";

import * as z from "zod";
import { QuizSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import QuizWrapper from "./quiz-wrapper";
import FileUpload from "./file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createQuiz } from "@/service/quiz-service";

const CreateQuiz = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof QuizSchema>) => {
    console.log(values);
    try {
      const params = { title: values.title, file: values.file };
      const quiz = await createQuiz(params);
      router.push(`/quiz/preview/${quiz.id}`);
      toast.success("Квизот е успешно креиран");
      router.refresh();
    } catch (error: any) {
      toast.error("Грешка при креирање на квизот");
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <QuizWrapper
      headerLabel="Create your quiz"
      headerText="Start by giving us some information about your quiz"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Improve Next.js knowledge" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FileUpload field={field} label="Upload PDF" />
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="blue"
              size="lg"
              className="text-lg"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Generate Quiz
            </Button>
          </div>
        </form>
      </Form>
    </QuizWrapper>
  );
};

export default CreateQuiz;
