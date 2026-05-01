import type React from "react";
import type { FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number | undefined;
  max?: string | number | undefined;
  step?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  register?: UseFormRegisterReturn;
  hint?: string;
  errorMessage?: string | undefined;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  register,
  hint,
  errorMessage,
  onInput,
  maxLength,
  onBlur,
}) => {
  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:scheme-dark ${className}`;

  if (disabled) {
    inputClasses += ` text-black border-gray-300 opacity-75 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
        onInput={onInput}
        maxLength={maxLength}
        onBlur={onBlur}
        {...register}
      />
      <div className="mt-1.5 text-xs">
        {errorMessage ? (
          <p className="text-error-500">{errorMessage}</p>
        ) : (
          hint && <p className="text-gray-500">{hint}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
