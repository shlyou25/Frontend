
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

type ModalPosition = "center" | "top" | "bottom" | "anchor";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-3xl",      // current default
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-[95vw] h-[95vh]",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  position = "center",
  anchorPos
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  anchorPos?: { top: number; left: number };
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30">
      <div
        className={`absolute bg-white rounded-xl shadow-xl ${sizeClasses[size]}`}
        style={
          position === "anchor"
            ? {
                top: anchorPos?.top ?? "50%",
                left: anchorPos?.left ?? "50%",
                transform: "translate(-20%, 0)"
              }
            : {}
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
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
  );
};

export default Modal;
