"use client";

import { useDropzone } from "react-dropzone";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { File as FileIcon } from "lucide-react";

interface FileUploadProps {
  field: {
    value: File | undefined;
    onChange: (file: File) => void;
  };
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ field, label }) => {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        field.onChange(acceptedFiles[0]);
      }
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-zinc-800"
              : "border-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
          )}
        >
          <input {...getInputProps()} />
          {field.value ? (
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {field.value.name}
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <FileIcon className="w-8 h-8" />
              <p>Drag and drop a PDF here, or click to select one</p>
            </div>
          )}
        </div>
      </FormControl>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        We’ll automatically generate your quiz based on the PDF you upload.
      </p>

      <FormMessage />
    </FormItem>
  );
};

export default FileUpload;
