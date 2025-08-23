import { X } from 'lucide-react';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FullScreenModal({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}: FullScreenModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/80"
        onClick={onClose}
      />

      <div className={`relative flex flex-col h-full w-full max-w-4xl max-h-[90vh]
        bg-white dark:bg-neutral-950 
        text-neutral-900 dark:text-neutral-100
        ${className}`}>

        <div className="flex items-center justify-between p-6 
          border-b border-neutral-200 dark:border-neutral-800">
          {title && (
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-2 cursor-pointer
              text-neutral-600 dark:text-neutral-400
              hover:text-neutral-900 dark:hover:text-neutral-100
              hover:bg-neutral-100 dark:hover:bg-neutral-800
              active:bg-neutral-200 dark:active:bg-neutral-700
              transition-all duration-100 ease-in"
            type="button"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}