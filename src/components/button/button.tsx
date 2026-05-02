import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  type?: "primary" | "default";
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  className = "",
  disabled = false,
  htmlType = "button",
  loading = false,
  onClick,
  type = "default",
}: ButtonProps) {
  const baseStyle =
    "w-full rounded-full py-3 px-6 font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const styles = {
    primary:
      "bg-green-500 text-white hover:bg-green-600 active:scale-95",
    default:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95",
  };

  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${styles[type]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
}