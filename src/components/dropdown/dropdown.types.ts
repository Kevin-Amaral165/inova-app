import { Position } from "@/src/enum/enum";

export type DropdownItem = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
};

export type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: Position;
};