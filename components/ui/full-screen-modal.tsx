import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // keep handles so we can cancel on prop flips/unmount
  const raf1 = useRef<number | null>(null);
  const raf2 = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    // clear any pending timers/rafs when isOpen flips
    if (raf1.current) cancelAnimationFrame(raf1.current);
    if (raf2.current) cancelAnimationFrame(raf2.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);

    if (isOpen) {
      setShouldRender(true); // mount
      // Ensure the browser paints once at the hidden state before we show
      raf1.current = requestAnimationFrame(() => {
        raf2.current = requestAnimationFrame(() => {
          setIsVisible(true); // triggers open transition
        });
      });
    } else {
      // start close transition
      setIsVisible(false);
      // unmount after transition completes (duration-200)
      closeTimer.current = window.setTimeout(() => {
        setShouldRender(false);
      }, 150);
    }

    // cleanup on unmount
    return () => {
      if (raf1.current) cancelAnimationFrame(raf1.current);
      if (raf2.current) cancelAnimationFrame(raf2.current);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      // Make the container non-interactive when hidden so it never blocks the page
      className={`fixed inset-0 z-50 flex items-center justify-center p-8
        transition-opacity duration-150 ease-in
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isVisible}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute inset-0 bg-black/50 dark:bg-black/80
          transition-opacity duration-150 ease-in
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div
        className={`relative flex flex-col h-full w-full max-w-4xl max-h-[90vh]
          bg-white dark:bg-neutral-950
          text-neutral-900 dark:text-neutral-100
          transition-all duration-150 ease-in
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
          ${className}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          {title && (
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-2 cursor-pointer text-neutral-600 dark:text-neutral-400
              hover:text-neutral-900 dark:hover:text-neutral-100
              hover:bg-neutral-100 dark:hover:bg-neutral-800
              active:bg-neutral-200 dark:active:bg-neutral-700
              transition-all duration-150 ease-in rounded-md"
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
