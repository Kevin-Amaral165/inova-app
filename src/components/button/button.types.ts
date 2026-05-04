import { ReactNode } from "react";
import { ButtonVariant, HtmlType } from "@/src/enum/enum";


export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  htmlType?: HtmlType;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
}