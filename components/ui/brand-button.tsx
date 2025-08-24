import { ReactNode } from "react";

interface BrandButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: ReactNode;
}

export function BrandButton({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  icon,
}: BrandButtonProps) {
  return (
    <button
      className={`px-6 py-1.5 cursor-pointer font-medium bg-brand dark:text-neutral-200 text-white
        hover:brightness-110 active:brightness-125 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-brand-400 dark:focus:ring-brand-300
        transition-all duration-200 ease-out flex items-center justify-between gap-2
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span>{text}</span>
      {icon && <span className="ml-auto">{icon}</span>}
    </button>
  );
}