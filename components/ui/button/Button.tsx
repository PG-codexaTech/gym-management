import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  label?: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  size?: "sm" | "md";
  variant?: "primary" | "outline" | "danger";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  disabled = false,
}) => {
  const sizeClass = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    danger:
      "bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClass[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
