interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function SecondaryButton({
  text,
  onClick,
  className = '',
  type = 'button'
}: SecondaryButtonProps) {
  return (
    <button
      className={`px-6 py-1.5 cursor-pointer font-medium
        bg-neutral-100 dark:bg-neutral-900
        text-neutral-700 dark:text-neutral-300
        hover:brightness-90 dark:hover:brightness-110
        active:brightness-75 dark:active:brightness-125 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600
        transition-all duration-200 ease-out text-left ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}