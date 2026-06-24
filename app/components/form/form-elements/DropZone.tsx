"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UseFormSetError, Path, FieldValues } from "react-hook-form";

export interface DropZoneProps<TFieldValues extends FieldValues> {
  value?: File | File[]; // allow single or multiple
  onChange: (file: File | File[] | undefined) => void;
  maxSizeMB?: number;
  setImageError?: UseFormSetError<TFieldValues>;
  name: Path<TFieldValues>;
  allowMutliple?: boolean;
  showPreview?: boolean;
  id?: string;
}

export const DropzoneComponent = <TFieldValues extends FieldValues>({
  value,
  onChange,
  maxSizeMB = 5,
  setImageError,
  name,
  allowMutliple = false,
  showPreview = true,
  id = "",
}: DropZoneProps<TFieldValues>) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (setImageError) setImageError(name, { message: "" });

      if (fileRejections.length > 0) {
        const fileError = fileRejections[0].errors[0];
        if (setImageError) {
          setImageError(name, {
            message:
              fileError.code === "file-too-large"
                ? `File is too large. Max size is ${maxSizeMB}MB.`
                : fileError.message,
          });
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        if (allowMutliple) {
          onChange(acceptedFiles);
          const imagePreviews = acceptedFiles
            .filter((f) => f.type.startsWith("image/"))
            .map((f) => URL.createObjectURL(f));
          setPreviewUrls(imagePreviews);
        } else {
          const file = acceptedFiles[0];
          onChange(file);
          setPreviewUrls(
            file.type.startsWith("image/") ? [URL.createObjectURL(file)] : [],
          );
        }
      }
    },
    [onChange, maxSizeMB, setImageError, name, allowMutliple],
  );

  const removeFile = (index?: number) => {
    if (allowMutliple) {
      const files = Array.isArray(value) ? [...value] : [];
      files.splice(index!, 1);
      onChange(files.length ? files : undefined);
      const updatedPreviews = [...previewUrls];
      if (previewUrls[index!]) URL.revokeObjectURL(previewUrls[index!]);
      updatedPreviews.splice(index!, 1);
      setPreviewUrls(updatedPreviews);
    } else {
      onChange(undefined);
      if (previewUrls[0]) URL.revokeObjectURL(previewUrls[0]);
      setPreviewUrls([]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: allowMutliple,
    maxSize: maxSizeMB * 1024 * 1024,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/zip": [],
      "application/x-zip-compressed": [],
    },
  });

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const filesArray = Array.isArray(value) ? value : value ? [value] : [];
  return (
    <div className="border border-dashed border-gray-400 rounded-md p-4 text-gray-400 text-center">
      {filesArray.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-3">
          {filesArray.map((file, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {showPreview && previewUrls[idx] && (
                <Image
                  src={previewUrls[idx]}
                  alt={`preview-${idx}`}
                  fill
                  className="max-h-24 mb-1 rounded"
                  sizes="96px"
                />
              )}
              <p className="text-sm">{file.name}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="text-red-500 text-xs underline hover:text-red-700 mt-1"
              >
                Remove
              </button>
            </div>
          ))}
          <div {...getRootProps()} className="cursor-pointer mt-2">
            <input id={id} {...getInputProps()} />
            <p className="text-sm text-gray-500">
              Drop more files here or click to select
            </p>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>
              Drag {`'n'`} drop {allowMutliple ? "files" : "a file"} here, or
              click to select
            </p>
          )}
        </div>
      )}
    </div>
  );
};
