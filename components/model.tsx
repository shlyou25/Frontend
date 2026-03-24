'use client';

import { useEffect } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalPosition = "center" | "top" | "bottom";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-[95vw] h-[95vh]",
};

const positionClasses: Record<ModalPosition, string> = {
  center: "items-center justify-center",
  top: "items-start justify-center pt-20",
  bottom: "items-end justify-center pb-10",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  position = "center",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
}) => {
  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Centering Wrapper */}
      <div
        className={`fixed inset-0 flex ${positionClasses[position]} p-4`}
      >
        {/* Modal Panel */}
        <div
          className={`
            w-full ${sizeClasses[size]}
            bg-white rounded-2xl shadow-xl
            transform transition-all duration-300 ease-out
            scale-100 opacity-100
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;