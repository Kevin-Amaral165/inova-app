"use client";

import {
  useEffect,
  useRef,
  JSX,
  RefObject,
} from "react";
import { ModalProps } from "./modal.types";
import { Button } from "../button/button";

export function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): JSX.Element | null {
  const contentRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current =
      document.activeElement as HTMLElement;

    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    setTimeout(() => {
      contentRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleEsc);

      previousActiveElement.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (
      contentRef.current &&
      !contentRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        animate-fadeIn
      "
      aria-hidden="true"
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className="
          w-[90%] max-w-md
          bg-white rounded-2xl shadow-xl
          p-5 md:p-6
          transform transition-all
          animate-scaleIn
          outline-none
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            id="modal-title"
            className="mb-4 text-lg font-semibold text-gray-800"
          >
            {title}
          </div>
        )}

        <div className="text-gray-600 text-sm">
          {children}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            aria-label="Fechar modal"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}