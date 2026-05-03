"use client";

import { JSX } from "react";
import { InputProps } from "./input.types";
import { InputType } from "@/src/enum/enum";

export function Input({
  value,
  onChange,
  placeholder,
  type = InputType.TEXT,
  disabled = false,
  icon,
  name,
}: InputProps): JSX.Element {
  return (
    <div
      className={`
        flex items-center w-full h-[42px] px-4 rounded-full
        ${disabled ? "bg-gray-200" : "bg-[#F2F2F2]"}
      `}
    >
      {icon && (
        <span className="mr-2 flex items-center text-gray-600">
          {icon}
        </span>
      )}

      <input
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className="
          w-full bg-transparent outline-none text-sm
          text-gray-600 placeholder:text-gray-400
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
}