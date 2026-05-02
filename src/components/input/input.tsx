import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({
    icon,
    type = "text",
    ...props
}: InputProps) {
  return (
    <div
      className="
        flex items-center
        w-full
        h-[42px]
        px-4
        rounded-full
        bg-[#F2F2F2]
      "
    >
      {icon && (
        <span className="mr-2 flex items-center text-gray-600">
          {icon}
        </span>
      )}

      <input
        {...props}
        type={type}
        autoComplete="new-password"
        className="
          w-full
          bg-transparent
          outline-none
          text-sm
          text-gray-600
          placeholder:text-gray-400
        "
      />
    </div>
  );
}