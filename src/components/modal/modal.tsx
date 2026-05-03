"use client";

import { useEffect, useRef, JSX, RefObject } from "react";
import { ModalProps } from "./modal.types";
import { Button } from "../button/button";

export function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): JSX.Element | null {
  const contentRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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
    >
      <div
        ref={contentRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          bg-white rounded-2xl shadow-xl
          p-6
          transform transition-all
          animate-scaleIn
        "
      >
        {title && (
          <div className="mb-4 text-lg font-semibold text-gray-800">
            {title}
          </div>
        )}

        <div className="text-gray-600 text-sm">
          {children}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}