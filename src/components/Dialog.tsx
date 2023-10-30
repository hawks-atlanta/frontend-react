import { X } from "lucide-react";
import { ReactNode } from "react";

interface DialogProps {
  title: string;
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  onClose: () => void;
}

export const Dialog = ({ title, isOpen, children, onClose }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        className="relative rounded-md border border-gray-300 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-0 top-0 p-3" onClick={onClose}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="mb-4 max-w-[85%] text-xl text-blue-600">{title}</h1>
        {children}
      </div>
    </div>
  );
};
