"use client";

import {
  useState,
  useRef,
  useEffect,
  JSX,
  RefObject,
} from "react";
import { DropdownProps } from "./dropdown.types";
import { Position } from "@/src/enum/enum";

export function Dropdown({
  items,
  position = Position.BOTTOM_LEFT,
  trigger,
}: DropdownProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const ref: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getStyle(): React.CSSProperties {
    switch (position) {
      case Position.BOTTOM_LEFT:
        return { top: "100%", left: 0, marginTop: 8 };
      case Position.BOTTOM_RIGHT:
        return { top: "100%", right: 0, marginTop: 8 };
      case Position.TOP_LEFT:
        return { bottom: "100%", left: 0, marginBottom: 8 };
      case Position.TOP_RIGHT:
        return { bottom: "100%", right: 0, marginBottom: 8 };
      default:
        return { top: "100%", left: 0 };
    }
  }

  function handleItemClick(item: typeof items[number]): void {
    if (item.disabled) return;

    item.onClick?.();
    setOpen(false);
  }

  return (
    <div className="relative inline-flex" ref={ref}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          style={getStyle()}
          className="absolute w-44 bg-white border rounded-lg shadow-md z-50 overflow-hidden"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={index}
                  className="h-px bg-gray-200 my-1"
                />
              );
            }

            return (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`
                  px-4 py-2 text-sm
                  ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                  }
                `}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}