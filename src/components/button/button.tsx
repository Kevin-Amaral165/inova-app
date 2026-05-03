import { JSX } from "react";
import { ButtonProps } from "./button.types";
import { ButtonVariant, HtmlType } from "@/src/enum/enum";

export function Button({
  children,
  className = "",
  disabled = false,
  htmlType = HtmlType.BUTTON,
  loading = false,
  onClick,
  variant = ButtonVariant.DEFAULT,
}: ButtonProps): JSX.Element {
  const baseStyle: string = `
    w-full 
    rounded-full 
    py-3 px-6 
    font-medium 
    flex items-center justify-center gap-2
    transition-all duration-200
  `;

  const variants: Record<ButtonVariant, string> = {
    [ButtonVariant.PRIMARY]: `
      bg-green-500 text-white
      hover:bg-green-600
      active:scale-95
    `,
    [ButtonVariant.DEFAULT]: `
      bg-gray-200 text-gray-700
      hover:bg-gray-300
      active:scale-95
    `,
    [ButtonVariant.DRAWER]: `
      bg-[#84C318] text-white
      hover:bg-[#6ea515]
      active:scale-95
    `,
  };

  const isDisabled: boolean = disabled || loading;

  return (
    <button
      type={htmlType}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-[1.02]"
        }
        ${className}
      `}
    >
      {loading && (
        <span
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
        >   
        </span>
      )}

      {children}
    </button>
  );
}