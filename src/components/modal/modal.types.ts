export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};