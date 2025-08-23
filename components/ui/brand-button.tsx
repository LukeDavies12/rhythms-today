interface BrandButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function BrandButton({
  text,
  onClick,
  className = '',
  type = 'button'
}: BrandButtonProps) {
  return (
    <button
      className={`px-10 py-2 cursor-pointer font-bold bg-brand text-neutral-200 
        hover:brightness-110 active:brightness-125 ${className} transition-all duration-100 ease-in`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}