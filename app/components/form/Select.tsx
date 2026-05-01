import { UseFormRegisterReturn } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

interface Option {
  value: string | number | boolean;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  register?: UseFormRegisterReturn;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  register,
  id = "",
}) => {
  return (
    <div className="relative">
      <select
        id={id}
        className={`appearance-none h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 pr-10 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`}
        defaultValue={defaultValue}
        onChange={(e) => {
          register?.onChange?.(e); // triggers react-hook-form updates
          onChange?.(e.target.value);
        }}
        {...register}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={String(option.value)}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>
      <IoChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default Select;
