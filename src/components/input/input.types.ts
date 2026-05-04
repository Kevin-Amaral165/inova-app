import { InputType } from "@/src/enum/enum";

export type InputProps = {
  disabled?: boolean;
  icon?: React.ReactNode;
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  value?: string;
};