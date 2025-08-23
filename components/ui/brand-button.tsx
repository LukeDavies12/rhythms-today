
interface BrandButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function BrandButton({
  text,
  onClick,
  className = '',
  type = 'button'
}: BrandButtonProps) {
  return (
    <button
      className={`px-10 py-2 cursor-pointer font-bold bg-brand text-neutral-200
        hover:brightness-110 active:brightness-125 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-brand-400 dark:focus:ring-brand-300
        transition-all duration-200 ease-out ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}